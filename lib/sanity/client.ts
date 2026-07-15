import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "86d0qc2o"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Server-side only: has write access for uploading assets (e.g. internship CVs)
// Retries + a generous timeout so transient network blips don't surface as 500s
// during file uploads.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  maxRetries: 3,
  retryDelay: (attempt) => 500 * 2 ** attempt,
  timeout: 30000,
})
