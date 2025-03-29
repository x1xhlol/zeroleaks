import { kv } from "@vercel/kv"
import { create, get, update, remove, list, count, DB_PREFIXES, DB_COLLECTIONS } from "./index"

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  content: string
  author: string
  publishedAt?: string
  updatedAt?: string
  tags?: string[]
  image?: string
  published: boolean
  created_at?: string
  updated_at?: string
}

export async function createBlogPost(
  data: Omit<BlogPost, "id" | "slug" | "publishedAt" | "updatedAt">,
): Promise<BlogPost> {
  const id = generateId()
  const slug = generateSlug(data.title)

  // Check if slug already exists
  const existingId = await kv.get(`${DB_PREFIXES.BLOG_SLUG}${slug}`)
  if (existingId) {
    throw new Error(`Blog post with slug "${slug}" already exists`)
  }

  const post: BlogPost = {
    ...data,
    id,
    slug,
    publishedAt: data.published ? new Date().toISOString() : undefined,
    updatedAt: new Date().toISOString(),
  }

  // Store post
  await create(DB_PREFIXES.BLOG_POST, id, post, DB_COLLECTIONS.BLOG_POSTS)

  // Store slug mapping
  await kv.set(`${DB_PREFIXES.BLOG_SLUG}${slug}`, id)

  return post
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  return await get<BlogPost>(DB_PREFIXES.BLOG_POST, id)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const id = await kv.get<string>(`${DB_PREFIXES.BLOG_SLUG}${slug}`)
  if (!id) {
    return null
  }

  return await getBlogPost(id)
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const post = await getBlogPost(id)
  if (!post) {
    return null
  }

  // Handle slug change
  if (data.title && !data.slug) {
    data.slug = generateSlug(data.title)
  }

  if (data.slug && data.slug !== post.slug) {
    // Check if new slug already exists
    const existingId = await kv.get(`${DB_PREFIXES.BLOG_SLUG}${data.slug}`)
    if (existingId && existingId !== id) {
      throw new Error(`Blog post with slug "${data.slug}" already exists`)
    }

    // Delete old slug mapping
    await kv.del(`${DB_PREFIXES.BLOG_SLUG}${post.slug}`)

    // Store new slug mapping
    await kv.set(`${DB_PREFIXES.BLOG_SLUG}${data.slug}`, id)
  }

  // Handle publishing
  if (data.published === true && !post.published) {
    data.publishedAt = new Date().toISOString()
  }

  // Always update updatedAt
  data.updatedAt = new Date().toISOString()

  return await update<BlogPost>(DB_PREFIXES.BLOG_POST, id, data)
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const post = await getBlogPost(id)
  if (!post) {
    return false
  }

  // Delete slug mapping
  await kv.del(`${DB_PREFIXES.BLOG_SLUG}${post.slug}`)

  // Delete post
  return await remove(DB_PREFIXES.BLOG_POST, id, DB_COLLECTIONS.BLOG_POSTS)
}

export async function listBlogPosts(limit = 100, offset = 0, publishedOnly = true): Promise<BlogPost[]> {
  const posts = await list<BlogPost>(DB_COLLECTIONS.BLOG_POSTS, limit, offset)

  // Filter by published status if needed
  if (publishedOnly) {
    return posts.filter((post) => post.published)
  }

  return posts
}

export async function countBlogPosts(publishedOnly = true): Promise<number> {
  if (!publishedOnly) {
    return await count(DB_COLLECTIONS.BLOG_POSTS)
  }

  // If filtering by published status, we need to count manually
  const posts = await listBlogPosts(1000, 0, publishedOnly)
  return posts.length
}

// Helper functions
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15)
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

