import { NextRequest, NextResponse } from "next/server"

import { getClient } from "@umami/api-client"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json(
      { error: "Please send url params" },
      { status: 400 }
    )
  }

  try {
    const client = getClient()
    const { ok, data, status, error } = await client.getWebsitePageviews(
      "bbe84049-cfa8-41eb-bc81-3937ca3ee74c",
      {
        startAt: Date.now(),
        endAt: Date.now().valueOf(),
        unit: "hour",
        timezone: "America/Los_Angeles",
        url: url,
      }
    )

    if (!data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve view count" },
      { status: 500 }
    )
  }
}
