"use server"

export type GitHubRepoData = {
  name: string
  full_name: string
  html_url: string
  description: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  subscribers_count: number
  updated_at: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  readme?: string
  error?: string
}

export async function fetchGitHubRepoData(): Promise<GitHubRepoData> {
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

    // Try to fetch README content
    let readme = ""
    try {
      const readmeResponse = await fetch(
        "https://api.github.com/repos/x1xhlol/system-prompts-and-models-of-ai-tools/readme",
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "ZeroLeaks-Website",
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
        },
      )

      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json()
        // GitHub returns README content as base64 encoded
        if (readmeData.content) {
          readme = Buffer.from(readmeData.content, "base64").toString("utf-8")
        }
      }
    } catch (error) {
      console.error("Error fetching README:", error)
      // Continue without README if there's an error
    }

    return {
      ...repoData,
      readme,
    }
  } catch (error) {
    console.error("Error fetching GitHub data:", error)
    return {
      name: "system-prompts-and-models-of-ai-tools",
      full_name: "x1xhlol/system-prompts-and-models-of-ai-tools",
      html_url: "https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools",
      description: "FULL v0, Cursor, Manus, Same.dev & Lovable System Prompts & AI Models",
      stargazers_count: 6400,
      forks_count: 2800,
      watchers_count: 78,
      subscribers_count: 0,
      updated_at: new Date().toISOString(),
      owner: {
        login: "x1xhlol",
        avatar_url: "https://github.com/x1xhlol.png",
        html_url: "https://github.com/x1xhlol",
      },
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

