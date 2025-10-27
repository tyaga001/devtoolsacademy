import { getMetadata } from "@/lib/metadata"
import CoverImage from "./cover.png"
import React from "react"

export const metadata = getMetadata({
    path: "/blog",
    title: "Blog | DevTools Academy",
    description: "Learn about awesome developer tools with our blogs",
    image: CoverImage.src,
})

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
