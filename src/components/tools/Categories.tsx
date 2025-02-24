import { getToolCategories } from "@/lib/tools"
import {
  Briefcase,
  Code,
  PenTool,
  Smartphone,
  Globe,
  BookOpen,
  Camera,
  Music,
  Frown,
  ShoppingBag,
  Zap,
  Coffee,
  Truck,
} from "lucide-react"
import { Link } from "next-view-transitions"

const getRandomColor = () => {
  const colors = [
    "bg-orange-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-red-400",
    "bg-cyan-400",
    "bg-emerald-400",
    "bg-blue-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const getRandomIcon = () => {
  const icons = [
    Briefcase,
    Code,
    PenTool,
    Smartphone,
    Globe,
    BookOpen,
    Camera,
    Music,
    ShoppingBag,
    Zap,
    Coffee,
    Truck,
  ]
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)]
  return <RandomIcon className="size-3 md:size-6" />
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const Categories = async () => {
  const response = await getToolCategories()
  const variousCategories = response.categories

  if (!response.status) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center text-neutral-400">
        <h2 className="text-2xl font-semibold tracking-tight">
          Categories Not Found
        </h2>
        <p className="text-neutral-600">
          We couldn&apos;t able to find the categories for you. It might have
          been moved or doesn&apos;t exist. Please try again later
        </p>
      </div>
    )
  }
  return (
    <section className="mb-20">
      <hr className="border-dashed border-neutral-100/15" />
      <div className="mx-auto flex max-w-7xl items-start">
        <div className="p-8">
          <h2 className="mb-2 text-3xl font-semibold tracking-tight">
            Explore Categories
          </h2>
          <p className="text-sm text-neutral-500">
            Discover tools and resources across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {variousCategories?.map((category) => (
            <Link
              key={category.name}
              href={`/tools?categories=${category.name}`}
            >
              <div className="flex cursor-pointer items-center space-x-4 p-2 shadow transition-colors hover:bg-neutral-900 md:p-4">
                <div
                  className={`${getRandomColor()} flex size-6 items-center justify-center rounded-full text-neutral-200 md:size-12`}
                >
                  {getRandomIcon()}
                </div>
                <div>
                  <h3 className="text-sm font-semibold md:text-lg">
                    {capitalizeFirstLetter(category.name)}
                  </h3>
                  <p className="text-xs text-neutral-500 md:text-sm">
                    {category.count || 0} Categories
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <hr className="border-dashed border-neutral-100/15" />
    </section>
  )
}

export default Categories
