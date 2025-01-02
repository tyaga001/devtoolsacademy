import * as React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbProps {
  items: { label: string; href: string }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-neutral-500">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-2 size-4" />}
            {index === items.length - 1 ? (
              <span className="text-neutral-900 dark:text-neutral-100">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
