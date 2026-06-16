/**
 * One-off migration: WordPress (REST API) -> Sanity CMS.
 *
 * Pulls published posts from a WordPress site's REST API and writes them into
 * Sanity as `post` documents, auto-creating the referenced `author` and
 * `category` documents and re-hosting every image as a Sanity asset.
 *
 * The script is IDEMPOTENT: documents use deterministic _ids derived from the
 * WordPress IDs and are written with createOrReplace, so re-running upserts the
 * same documents instead of duplicating them.
 *
 * Usage:
 *   npm run migrate:wp                 # full migration
 *   npm run migrate:wp -- --limit=5    # only the first 5 posts (smoke test)
 *   npm run migrate:wp -- --dry-run    # fetch + map + log, no uploads or writes
 *   npm run migrate:wp -- --self-test  # offline HTML->Portable Text check
 *
 * Env (loaded from .env / .env.local):
 *   SANITY_WRITE_TOKEN   write token with Editor permissions
 *   WORDPRESS_API_URL    base URL of the WP site (e.g. https://blog.example.com)
 */

import { createClient } from '@sanity/client'
import { htmlToBlocks, type DeserializerRule } from '@portabletext/block-tools'
import { compileSchema } from '@portabletext/schema'
import { JSDOM } from 'jsdom'
import { config as loadEnv } from 'dotenv'

loadEnv({ path: '.env.local' })
loadEnv({ path: '.env' })

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2)
const DRY_RUN = argv.includes('--dry-run')
const SELF_TEST = argv.includes('--self-test')
const LIMIT = (() => {
  const a = argv.find((x) => x.startsWith('--limit='))
  return a ? parseInt(a.split('=')[1], 10) : Infinity
})()
// Restrict to a single post by WP id or slug (e.g. --only=4369 or --only=talent-acquisition).
const ONLY = (() => {
  const a = argv.find((x) => x.startsWith('--only='))
  return a ? a.split('=')[1] : null
})()

// ---------------------------------------------------------------------------
// Sanity client (write)
// ---------------------------------------------------------------------------
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '86d0qc2o',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// ---------------------------------------------------------------------------
// Portable Text target schema.
//
// Mirrors schemas/blockContent.ts. Defined inline (rather than importing the
// project schema) so this Node script does not have to import the `sanity`
// Studio package. Keep in sync with schemas/blockContent.ts.
// ---------------------------------------------------------------------------
const blockSchema = compileSchema({
  styles: [
    { name: 'normal' },
    { name: 'h2' },
    { name: 'h3' },
    { name: 'h4' },
    { name: 'h5' },
    { name: 'h6' },
    { name: 'blockquote' },
  ],
  lists: [{ name: 'bullet' }, { name: 'number' }],
  decorators: [{ name: 'strong' }, { name: 'em' }, { name: 'code' }],
  annotations: [
    {
      name: 'link',
      fields: [
        { name: 'href', type: 'string' },
        { name: 'blank', type: 'boolean' },
      ],
    },
  ],
  blockObjects: [
    {
      name: 'image',
      fields: [
        { name: 'alt', type: 'string' },
        { name: 'caption', type: 'string' },
      ],
    },
    {
      name: 'table',
      fields: [
        { name: 'headerRow', type: 'array' },
        { name: 'rows', type: 'array' },
      ],
    },
    {
      name: 'ctaButton',
      fields: [
        { name: 'text', type: 'string' },
        { name: 'url', type: 'string' },
        { name: 'style', type: 'string' },
        { name: 'openInNewTab', type: 'boolean' },
      ],
    },
    { name: 'faq', fields: [{ name: 'items', type: 'array' }] },
  ],
  inlineObjects: [],
})

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

/** Stable per-document key generator (deterministic across runs). */
function makeKeyGen(prefix = 'k') {
  let n = 0
  return () => `${prefix}${n++}`
}

/** Decode HTML entities and strip tags, returning plain text. */
function htmlToText(html: string): string {
  if (!html) return ''
  const doc = new JSDOM(`<body>${html}</body>`).window.document
  return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim()
}

/** Decode entities in a short string (e.g. a title) without stripping intent. */
function decodeText(text: string): string {
  return htmlToText(text)
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 96)
}

/** Truncate at a word boundary, keeping the result <= max chars (incl. ellipsis). */
function truncate(text: string, max = 300): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…'
}

function basename(url: string): string {
  try {
    const p = new URL(url).pathname
    return decodeURIComponent(p.split('/').pop() || 'image')
  } catch {
    return 'image'
  }
}

function imageRef(assetId: string, extra: Record<string, unknown> = {}) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    ...extra,
  }
}

// ---------------------------------------------------------------------------
// Image upload (with cache)
// ---------------------------------------------------------------------------
const assetCache = new Map<string, string | null>() // srcUrl -> asset._id (or null on failure)

async function uploadImage(url: string | undefined | null): Promise<string | null> {
  if (!url) return null
  if (assetCache.has(url)) return assetCache.get(url)!
  if (DRY_RUN || SELF_TEST) {
    const fake = `image-DRYRUN-${assetCache.size}`
    assetCache.set(url, fake)
    return fake
  }
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const asset = await client.assets.upload('image', buf, { filename: basename(url) })
    assetCache.set(url, asset._id)
    return asset._id
  } catch (err) {
    console.warn(`  ! image upload failed (${url}): ${(err as Error).message}`)
    assetCache.set(url, null)
    return null
  }
}

// ---------------------------------------------------------------------------
// HTML -> Portable Text
// ---------------------------------------------------------------------------

/** Collect every <img> src in the HTML so we can pre-upload before conversion. */
function collectImageSrcs(html: string): string[] {
  const doc = new JSDOM(`<body>${html}</body>`).window.document
  return Array.from(doc.querySelectorAll('img'))
    .map((img) => img.getAttribute('src') || '')
    .filter(Boolean)
}

/**
 * Build the htmlToBlocks deserializer rules. `imageMap` maps an <img> src to a
 * pre-uploaded Sanity asset id (uploads are async, but rules are synchronous,
 * hence the pre-upload pass).
 */
function buildRules(
  imageMap: Map<string, string>,
  keyGen: () => string,
  convertFragment: (html: string) => unknown[],
): DeserializerRule[] {
  return [
    // WordPress Gutenberg accordion (.wp-block-accordion) -> faq block.
    {
      deserialize(el) {
        const node = el as unknown as HTMLElement
        if (node.nodeType !== 1 || !node.classList?.contains('wp-block-accordion')) {
          return undefined
        }
        const itemEls = Array.from(node.querySelectorAll('.wp-block-accordion-item'))
        const items: Array<Record<string, unknown>> = []
        for (const item of itemEls) {
          // Question = the title span only (ignores the "+"/"-" toggle icon span).
          const titleEl = item.querySelector('.wp-block-accordion-heading__toggle-title')
          const question = (titleEl?.textContent ?? '').replace(/\s+/g, ' ').trim()
          if (!question) continue
          const panel = item.querySelector('.wp-block-accordion-panel') as HTMLElement | null
          // Some posts nest accordions inside each other. querySelectorAll above
          // already flattens every item out, so strip any nested accordion from
          // this panel before converting — otherwise answers nest recursively and
          // blow past Sanity's max attribute depth (20).
          let answer: unknown[] = []
          if (panel) {
            const clone = panel.cloneNode(true) as HTMLElement
            clone.querySelectorAll('.wp-block-accordion').forEach((n) => n.remove())
            // Run the full pipeline so links/marks get markDefs and spans get _keys.
            answer = convertFragment(clone.innerHTML)
          }
          items.push({ _type: 'faqItem', _key: keyGen(), question, answer })
        }
        if (!items.length) return undefined
        return { _type: 'faq', _key: keyGen(), items }
      },
    },
    // <img> -> image block referencing the pre-uploaded asset
    {
      deserialize(el) {
        if (el.nodeName?.toLowerCase() !== 'img') return undefined
        const node = el as unknown as HTMLImageElement
        const src = node.getAttribute('src') || ''
        const assetId = imageMap.get(src)
        if (!assetId) return undefined
        const alt = node.getAttribute('alt') || undefined
        return {
          _type: 'image',
          _key: keyGen(),
          asset: { _type: 'reference', _ref: assetId },
          ...(alt ? { alt } : {}),
        }
      },
    },
    // <table> -> table block (headerRow + rows[].cells)
    {
      deserialize(el) {
        if (el.nodeName?.toLowerCase() !== 'table') return undefined
        const table = el as unknown as HTMLTableElement
        const allRows = Array.from(table.querySelectorAll('tr'))
        if (allRows.length === 0) return undefined
        const cellText = (row: Element) =>
          Array.from(row.querySelectorAll('th,td')).map((c) =>
            (c.textContent ?? '').replace(/\s+/g, ' ').trim(),
          )
        // Header row = first row that uses <th>, else first row.
        const headerIdx = allRows.findIndex((r) => r.querySelector('th'))
        const headerRow = headerIdx >= 0 ? cellText(allRows[headerIdx]) : []
        const bodyRows = allRows.filter((_, i) => i !== headerIdx)
        return {
          _type: 'table',
          _key: keyGen(),
          ...(headerRow.length ? { headerRow } : {}),
          rows: bodyRows.map((r) => ({
            _type: 'tableRow',
            _key: keyGen(),
            cells: cellText(r),
          })),
        }
      },
    },
  ]
}

async function htmlToPortableText(html: string): Promise<unknown[]> {
  if (!html?.trim()) return []
  // Pass 1: upload every image referenced in the body.
  const imageMap = new Map<string, string>()
  for (const src of collectImageSrcs(html)) {
    if (imageMap.has(src)) continue
    const assetId = await uploadImage(src)
    if (assetId) imageMap.set(src, assetId)
  }
  // Pass 2: convert, resolving images from the map.
  const keyGen = makeKeyGen()
  const parseHtml = (h: string) => new JSDOM(h).window.document
  // `convertFragment` reruns the full pipeline on a sub-fragment (e.g. an FAQ
  // answer panel) so nested content is fully normalized. Declared via `let`
  // because the rules close over it but it needs the rules to be built first.
  let convertFragment: (fragment: string) => unknown[]
  const rules = buildRules(imageMap, keyGen, (fragment) => convertFragment(fragment))
  convertFragment = (fragment) =>
    htmlToBlocks(fragment, blockSchema, { parseHtml, keyGenerator: keyGen, rules }) as unknown[]

  const blocks = htmlToBlocks(html, blockSchema, { parseHtml, keyGenerator: keyGen, rules })
  return mergeAdjacentFaqs(cleanBlocks(blocks as Array<Record<string, any>>))
}

/**
 * WordPress often emits each FAQ as its own single-item accordion block, so the
 * converter produces a run of adjacent `faq` blocks. Merge them into one
 * cohesive accordion.
 */
function mergeAdjacentFaqs(blocks: unknown[]): unknown[] {
  const out: Array<Record<string, any>> = []
  for (const block of blocks as Array<Record<string, any>>) {
    const prev = out[out.length - 1]
    if (block?._type === 'faq' && prev?._type === 'faq') {
      prev.items = [...(prev.items ?? []), ...(block.items ?? [])]
    } else {
      out.push(block)
    }
  }
  return out
}

/**
 * Tidy the converted Portable Text:
 *  - dedupe repeated decorators on a span (e.g. nested <strong> -> ["strong","strong"])
 *  - drop empty text blocks (e.g. WP accordion filler between FAQ Q&A)
 */
function cleanBlocks(blocks: Array<Record<string, any>>): unknown[] {
  return blocks.filter((block) => {
    // Recurse into FAQ answers so they get the same tidying + valid _keys.
    if (block?._type === 'faq' && Array.isArray(block.items)) {
      for (const item of block.items) {
        if (Array.isArray(item.answer)) {
          item.answer = cleanBlocks(item.answer).map((b: any, i: number) => ({
            _key: b._key ?? `a${i}`,
            ...b,
          }))
        }
      }
      // Drop pure-wrapper items left with no answer content.
      block.items = block.items.filter(
        (item: any) => item.question && Array.isArray(item.answer) && item.answer.length > 0,
      )
      return block.items.length > 0
    }
    if (block?._type !== 'block') return true
    if (Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child?._type === 'span' && Array.isArray(child.marks)) {
          child.marks = [...new Set(child.marks)]
        }
      }
    }
    // Drop blocks (non-list, normal style) whose every span is whitespace-only.
    const isEmpty =
      !block.listItem &&
      Array.isArray(block.children) &&
      block.children.every(
        (c: any) => c?._type === 'span' && (!c.text || !c.text.trim()),
      )
    return !isEmpty
  })
}

/** First image asset id found in a converted body (used as mainImage fallback). */
function firstBodyImageAsset(body: unknown[]): string | null {
  for (const block of body as Array<Record<string, any>>) {
    if (block?._type === 'image' && block?.asset?._ref) return block.asset._ref as string
  }
  return null
}

// ---------------------------------------------------------------------------
// WordPress fetch
// ---------------------------------------------------------------------------
const WP_BASE = (process.env.WORDPRESS_API_URL ?? '').replace(/\/+$/, '')

async function fetchAllPosts(): Promise<any[]> {
  // Single-post mode: fetch just the requested id or slug.
  if (ONLY) {
    const q = /^\d+$/.test(ONLY) ? `include[]=${ONLY}` : `slug=${encodeURIComponent(ONLY)}`
    const res = await fetch(`${WP_BASE}/wp-json/wp/v2/posts?${q}&_embed&status=publish`)
    if (!res.ok) throw new Error(`WordPress fetch failed (${res.status})`)
    return (await res.json()) as any[]
  }
  const perPage = 100
  const all: any[] = []
  let page = 1
  let totalPages = 1
  do {
    const url = `${WP_BASE}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed&status=publish`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`WordPress fetch failed (${res.status}) for ${url}`)
    totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10) || 1
    const batch = (await res.json()) as any[]
    all.push(...batch)
    console.log(`  fetched page ${page}/${totalPages} (${batch.length} posts)`)
    page += 1
  } while (page <= totalPages && all.length < LIMIT)
  return all.slice(0, LIMIT)
}

// ---------------------------------------------------------------------------
// Author / Category upserts (deduped, idempotent)
// ---------------------------------------------------------------------------
const DEFAULT_AUTHOR = { id: 0, name: 'AllTalentz', slug: 'alltalentz' }
const authorCache = new Map<number, string>() // wpId -> sanity _id
const categoryCache = new Map<number, string>() // wpId -> sanity _id

function largestAvatar(avatarUrls?: Record<string, string>): string | null {
  if (!avatarUrls) return null
  const sizes = Object.keys(avatarUrls)
    .map(Number)
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => b - a)
  return sizes.length ? avatarUrls[String(sizes[0])] : null
}

async function getOrCreateAuthor(wpAuthor: any): Promise<string> {
  const a = wpAuthor && !wpAuthor.code && wpAuthor.id ? wpAuthor : DEFAULT_AUTHOR
  const _id = `author-${a.id}`
  if (authorCache.has(a.id)) return _id

  const name = decodeText(a.name) || 'AllTalentz'
  const imageId = a.avatar_urls ? await uploadImage(largestAvatar(a.avatar_urls)) : null
  const doc = {
    _id,
    _type: 'author',
    name,
    slug: { _type: 'slug', current: a.slug || slugify(name) },
    ...(a.description ? { bio: htmlToText(a.description) } : {}),
    ...(imageId ? { image: imageRef(imageId) } : {}),
  }
  if (DRY_RUN) console.log('  [dry-run] author:', doc._id, name)
  else await client.createOrReplace(doc)
  authorCache.set(a.id, _id)
  return _id
}

async function getOrCreateCategories(embeddedTerms: any): Promise<string[]> {
  // _embedded['wp:term'] is an array of arrays (categories, tags, ...).
  const terms: any[] = Array.isArray(embeddedTerms) ? embeddedTerms.flat() : []
  const categories = terms.filter((t) => t && t.taxonomy === 'category' && t.id)
  const ids: string[] = []
  for (const cat of categories) {
    const _id = `category-${cat.id}`
    ids.push(_id)
    if (categoryCache.has(cat.id)) continue
    const title = decodeText(cat.name) || 'Uncategorized'
    const doc = {
      _id,
      _type: 'category',
      title,
      slug: { _type: 'slug', current: cat.slug || slugify(title) },
      ...(cat.description ? { description: htmlToText(cat.description) } : {}),
    }
    if (DRY_RUN) console.log('  [dry-run] category:', doc._id, title)
    else await client.createOrReplace(doc)
    categoryCache.set(cat.id, _id)
  }
  return ids
}

// ---------------------------------------------------------------------------
// Post mapping
// ---------------------------------------------------------------------------
async function migratePost(post: any, noImage: string[]) {
  const title = decodeText(post.title?.rendered ?? '') || 'Untitled'
  console.log(`\n→ ${title}`)

  // Body first so we can fall back to a body image for mainImage if needed.
  const body = await htmlToPortableText(post.content?.rendered ?? '')

  // Featured image -> mainImage (optional; falls back to first body image,
  // and the site shows a branded placeholder if there's none at all).
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const featuredUrl = media && !media.code ? media.source_url : null
  let mainImageAsset = await uploadImage(featuredUrl)
  const mainAlt = media?.alt_text ? decodeText(media.alt_text) : ''
  if (!mainImageAsset) {
    mainImageAsset = firstBodyImageAsset(body)
    if (mainImageAsset) console.log('  using first body image as main image')
  }
  if (!mainImageAsset) {
    noImage.push(title)
    console.log('  (no image — will use site placeholder)')
  }

  const author = await getOrCreateAuthor(post._embedded?.author?.[0])
  const categoryIds = await getOrCreateCategories(post._embedded?.['wp:term'])

  let excerpt = truncate(htmlToText(post.excerpt?.rendered ?? ''))
  if (!excerpt) excerpt = truncate(htmlToText(post.content?.rendered ?? ''))

  const doc = {
    _id: `post-${post.id}`,
    _type: 'post',
    title,
    slug: { _type: 'slug', current: post.slug || slugify(title) },
    author: { _type: 'reference', _ref: author },
    ...(mainImageAsset
      ? { mainImage: imageRef(mainImageAsset, mainAlt ? { alt: mainAlt } : {}) }
      : {}),
    categories: categoryIds.map((id, i) => ({
      _type: 'reference',
      _ref: id,
      _key: `cat${i}`,
    })),
    publishedAt: new Date(post.date_gmt + 'Z').toISOString(),
    featured: false,
    excerpt,
    body,
  }

  const depth = maxDepth(doc)
  if (depth > 19) {
    console.warn(`  ! attribute depth ${depth} exceeds Sanity's limit (20) — skipping`)
    throw new Error(`attribute depth ${depth} exceeds limit of 20`)
  }

  if (DRY_RUN) {
    console.log(`  [dry-run] post doc (depth ${depth}, ${body.length} blocks):`)
    console.log(JSON.stringify(doc, null, 2))
  } else {
    await client.createOrReplace(doc)
    console.log(`  ✓ wrote ${doc._id} (${body.length} blocks, depth ${depth})`) // eslint-disable-line
  }
}

/** Maximum nesting depth of a value (Sanity rejects documents deeper than 20). */
function maxDepth(value: unknown, current = 1): number {
  if (Array.isArray(value)) {
    return value.reduce((m: number, v) => Math.max(m, maxDepth(v, current + 1)), current)
  }
  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).reduce(
      (m: number, v) => Math.max(m, maxDepth(v, current + 1)),
      current,
    )
  }
  return current
}

// ---------------------------------------------------------------------------
// Offline self-test for the HTML -> Portable Text conversion
// ---------------------------------------------------------------------------
async function selfTest() {
  const sample = `
    <h2>Hello World</h2>
    <p>This is <strong>bold</strong>, <em>italic</em>, and a
      <a href="https://example.com" target="_blank">link</a>.</p>
    <ul><li>First</li><li>Second</li></ul>
    <p><strong><strong>Double bold</strong></strong></p>
    <p></p>
    <blockquote>A quote</blockquote>
    <figure><img src="https://example.com/pic.jpg" alt="A picture" /></figure>
    <table>
      <thead><tr><th>Name</th><th>Role</th></tr></thead>
      <tbody><tr><td>Ada</td><td>Engineer</td></tr></tbody>
    </table>
    <div class="wp-block-accordion" role="group">
      <div class="wp-block-accordion-item">
        <h3><button class="wp-block-accordion-heading__toggle">
          <span class="wp-block-accordion-heading__toggle-title">What is this?</span>
          <span class="wp-block-accordion-heading__toggle-icon">+</span>
        </button></h3>
        <div class="wp-block-accordion-panel"><p>It is an <strong>answer</strong> with a <a href="https://x.com">link</a>.</p></div>
      </div>
    </div>
    <div class="wp-block-accordion" role="group">
      <div class="wp-block-accordion-item">
        <h3><button class="wp-block-accordion-heading__toggle">
          <span class="wp-block-accordion-heading__toggle-title">Second question?</span>
          <span class="wp-block-accordion-heading__toggle-icon">+</span>
        </button></h3>
        <div class="wp-block-accordion-panel"><p>Second answer.</p></div>
      </div>
    </div>
  `
  const body = await htmlToPortableText(sample)
  console.log(JSON.stringify(body, null, 2))
  const types = (body as Array<{ _type: string }>).map((b) => b._type)
  console.log('\nblock types:', types.join(', '))
  const faqBlocks = (body as Array<{ _type: string; items?: unknown[] }>).filter(
    (b) => b._type === 'faq',
  )
  const faqMerged = faqBlocks.length === 1 && (faqBlocks[0].items?.length ?? 0) === 2
  const ok =
    types.includes('image') &&
    types.includes('table') &&
    types.includes('faq') &&
    faqMerged &&
    types.some((t) => t === 'block')
  console.log(`faq blocks: ${faqBlocks.length}, items in first: ${faqBlocks[0]?.items?.length ?? 0}`)
  console.log(ok ? '\nSELF-TEST PASSED' : '\nSELF-TEST FAILED')
  if (!ok) process.exitCode = 1
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  if (SELF_TEST) {
    await selfTest()
    return
  }

  if (!WP_BASE) throw new Error('WORDPRESS_API_URL is not set in .env')
  if (!DRY_RUN && !process.env.SANITY_WRITE_TOKEN)
    throw new Error('SANITY_WRITE_TOKEN is not set in .env')

  console.log(`Migrating from ${WP_BASE}${DRY_RUN ? ' (dry-run)' : ''}`)
  const posts = await fetchAllPosts()
  console.log(`\nProcessing ${posts.length} post(s)...`)

  const noImage: string[] = []
  const errored: { title: string; reason: string }[] = []
  for (const post of posts) {
    try {
      await migratePost(post, noImage)
    } catch (err) {
      const title = decodeText(post?.title?.rendered ?? '') || `post-${post?.id}`
      errored.push({ title, reason: (err as Error).message })
      console.error(`  ! error on "${title}": ${(err as Error).message}`)
    }
  }

  console.log(`\nDone. ${posts.length - errored.length}/${posts.length} migrated.`)
  if (noImage.length) {
    console.log(`\nMigrated but using the placeholder image (add one in Studio if desired):`)
    for (const t of noImage) console.log(`  - ${t}`)
  }
  if (errored.length) {
    console.log('\nFailed (needs attention):')
    for (const s of errored) console.log(`  - ${s.title}: ${s.reason}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
