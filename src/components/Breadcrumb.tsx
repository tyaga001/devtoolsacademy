import Link from 'next/link'

type BreadcrumbItem = {
    label: string;
    href: string;
}

type BreadcrumbProps = {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="text-sm text-gray-400 mb-4">
            {items.map((item, index) => (
                <span key={item.href}>
          {index > 0 && <span className="mx-2">{'>'}</span>}
                    {index === items.length - 1 ? (
                        <span className="text-gray-200">{item.label}</span>
                    ) : (
                        <Link href={item.href} className="hover:text-gray-200">
                            {item.label}
                        </Link>
                    )}
        </span>
            ))}
        </nav>
    )
}

export default Breadcrumb