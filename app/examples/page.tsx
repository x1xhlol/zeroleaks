import { fetchGitHubRepoData } from "@/app/actions/fetch-github-data"
import { ClientExamplesContent } from "./client-content"

// Format numbers with commas
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Format date to relative time (e.g., "2 days ago")
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`
}

// Extract folder names from README content
function extractFolders(readme: string): string[] {
  // Look for bullet points with "Folder" in them
  const folderRegex = /[•\-*]\s*([\w.]+)\s*Folder/g
  const matches = [...readme.matchAll(folderRegex)]

  if (matches.length > 0) {
    return matches.map((match) => match[1].trim())
  }

  // Fallback to default folders if none found in README
  return ["v0", "Manus", "Same.dev", "Lovable"]
}

export default async function ExamplesPage() {
  // Fetch data on the server
  const repoData = await fetchGitHubRepoData()

  // Extract folders from README or use default
  const folders = repoData.readme ? extractFolders(repoData.readme) : ["v0", "Manus", "Same.dev", "Lovable"]

  // Extract description from README or use repo description
  let description = repoData.description
  if (repoData.readme) {
    const firstParagraph = repoData.readme
      .split("\n\n")[0]
      .replace(/^#.*\n/, "")
      .trim()
    if (firstParagraph && firstParagraph.length > 10) {
      description = firstParagraph
    }
  }

  // Format data for client component
  const formattedData = {
    stargazers_count: formatNumber(repoData.stargazers_count),
    forks_count: formatNumber(repoData.forks_count),
    watchers_count: formatNumber(repoData.watchers_count),
    updated_at_relative: formatRelativeTime(repoData.updated_at),
    updated_at: repoData.updated_at,
    folders,
    description,
    error: repoData.error,
    html_url: repoData.html_url,
    full_name: repoData.full_name,
  }

  return <ClientExamplesContent repoData={formattedData} />
}

