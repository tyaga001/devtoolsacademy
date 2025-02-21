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
    console.log("lorem ipsum")

    const { data } = await client.getWebsitePageviews(
      "bbe84049-cfa8-41eb-bc81-3937ca3ee74c", // website id
      {
        startAt: Date.now(),
        endAt: Date.now().valueOf(),
        unit: "hour", // try with "day"
        timezone: "America/Los_Angeles",
        url: url,
      }
    )

    console.log("data", data)

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
