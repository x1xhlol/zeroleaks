import { v4 as uuidv4 } from "uuid"
import { create, get, update, remove, list, count, DB_PREFIXES, DB_COLLECTIONS } from "./index"

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  message: string
  subject?: string
  status: "new" | "read" | "replied" | "archived"
  created_at?: string
  updated_at?: string
}

export async function createContactSubmission(
  data: Omit<ContactSubmission, "id" | "status">,
): Promise<ContactSubmission> {
  const id = uuidv4()

  const submission: ContactSubmission = {
    ...data,
    id,
    status: "new",
  }

  return await create(DB_PREFIXES.CONTACT, id, submission, DB_COLLECTIONS.CONTACTS)
}

export async function getContactSubmission(id: string): Promise<ContactSubmission | null> {
  return await get<ContactSubmission>(DB_PREFIXES.CONTACT, id)
}

export async function updateContactSubmission(
  id: string,
  data: Partial<ContactSubmission>,
): Promise<ContactSubmission | null> {
  return await update<ContactSubmission>(DB_PREFIXES.CONTACT, id, data)
}

export async function deleteContactSubmission(id: string): Promise<boolean> {
  return await remove(DB_PREFIXES.CONTACT, id, DB_COLLECTIONS.CONTACTS)
}

export async function listContactSubmissions(
  limit = 100,
  offset = 0,
  status?: ContactSubmission["status"],
): Promise<ContactSubmission[]> {
  const submissions = await list<ContactSubmission>(DB_COLLECTIONS.CONTACTS, limit, offset)

  // Filter by status if provided
  if (status) {
    return submissions.filter((submission) => submission.status === status)
  }

  return submissions
}

export async function countContactSubmissions(status?: ContactSubmission["status"]): Promise<number> {
  if (!status) {
    return await count(DB_COLLECTIONS.CONTACTS)
  }

  // If filtering by status, we need to count manually
  const submissions = await listContactSubmissions(1000, 0, status)
  return submissions.length
}

