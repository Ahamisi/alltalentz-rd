export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export interface HeadingItem {
  id: string
  text: string
  level: 2 | 3 | 4 | 5 | 6
}

export function extractHeadings(body: unknown[]): HeadingItem[] {
  if (!Array.isArray(body)) return []
  return body
    .filter(
      (block): block is { _type: string; style: string; children: { text: string }[] } =>
        block !== null &&
        typeof block === 'object' &&
        (block as { _type?: string })._type === 'block' &&
        ['h2', 'h3', 'h4', 'h5', 'h6'].includes((block as { style?: string }).style ?? '')
    )
    .map((block) => {
      const text = block.children.map((span) => span.text).join('')
      const level = parseInt(block.style.replace('h', ''), 10) as 2 | 3 | 4 | 5 | 6
      return { id: slugify(text), text, level }
    })
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const CATEGORY_COLORS: Record<string, string> = {
  seo: 'bg-blue-100 text-blue-700',
  social: 'bg-pink-100 text-pink-700',
  content: 'bg-purple-100 text-purple-700',
  strategy: 'bg-green-100 text-green-700',
  analytics: 'bg-yellow-100 text-yellow-700',
  trends: 'bg-orange-100 text-orange-700',
  technology: 'bg-cyan-100 text-cyan-700',
  finance: 'bg-emerald-100 text-emerald-700',
  healthcare: 'bg-teal-100 text-teal-700',
  legal: 'bg-indigo-100 text-indigo-700',
  recruitment: 'bg-rose-100 text-rose-700',
  remote: 'bg-violet-100 text-violet-700',
}

export function getCategoryColor(title: string): string {
  const key = title.toLowerCase().replace(/\s+/g, '')
  return CATEGORY_COLORS[key] ?? 'bg-orange-100 text-[#F99621]'
}
