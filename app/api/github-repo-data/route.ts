import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch repository data
    const repoResponse = await fetch("https://api.github.com/repos/x1xhlol/system-prompts-and-models-of-ai-tools", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "ZeroLeaks-Website",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`)
    }

    const repoData = await repoResponse.json()

    return NextResponse.json({
      stargazers_count: repoData.stargazers_count,
      forks_count: repoData.forks_count,
      watchers_count: repoData.watchers_count,
      updated_at: repoData.updated_at,
    })
  } catch (error) {
    console.error("Error fetching GitHub data:", error)

    // Return fallback data with error message
    return NextResponse.json({
      stargazers_count: 6400,
      forks_count: 2800,
      watchers_count: 78,
      updated_at: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

