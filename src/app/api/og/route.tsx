import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get("title")

  return new (ImageResponse as any)(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_URL}/og-bg.png")`,
        }}
      >
        <h1 tw="absolute inset-0 flex justify-center items-center mb-96 flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            tw="h-10 w-10"
            alt="Alt"
            // @ts-ignore
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/favicon.png`}
          />
          <span
            tw="ml-3"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(156, 163, 175, 1) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: 35,
              letterSpacing: "-1.5px",
            }}
          >
            DevToolsAcademy
          </span>
        </h1>

        {postTitle && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <p
              style={{
                whiteSpace: "pre-wrap",
                alignContent: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(180deg, rgba(105, 105, 105, 1) 0%, rgba(211, 211, 211, 1) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                textAlign: "center",
                fontSize: 100,
                letterSpacing: "-5px",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              {postTitle}
            </p>
          </div>
        )}

        <h1 tw="absolute inset-0 flex justify-center items-center mt-57 flex-col">
          <span
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(156, 163, 175, 1) 100%)",
              // "linear-gradient(180deg,rgba(240,238,249,.8) 0%,#E2E8FF 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: 50,
              letterSpacing: "-1.5px",
              marginTop: 150,
            }}
          >
            A special blog made for Developers.
          </span>
        </h1>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  )
}
