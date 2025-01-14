import * as React from "react"
import { Link } from "next-view-transitions"

type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mb-4 text-sm text-neutral-500">
      {items.map((item, index) => (
        <span key={item.href}>
          {index > 0 && <span className="mx-2">{">"}</span>}
          {index === items.length - 1 ? (
            <span className="text-neutral-300">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="outline-none hover:text-neutral-200 focus:text-neutral-200 no-underline"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb
