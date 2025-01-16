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
        <div className="flex h-full items-center justify-center gap-3">
          <div className=" flex items-center justify-center rounded-full bg-sky-800 p-2">
            <Frown size={40} />
          </div>
          <h1 className="text-2xl font-bold md:text-4xl">
            Categories Not Found
          </h1>
        </div>
        <p className="text-neutral-600">
          We couldn&apos;t able to find the categories for you. It might have
          been moved or doesn&apos;t exist. Please try again later
        </p>
      </div>
    )
  }
  return (
    <div className="w-full px-0 py-8 pt-16 text-neutral-200 md:px-6 lg:px-48">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Categories
          </h2>
          <p className="text-neutral-400">
            Discover tools and resources across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
          {variousCategories?.map((category) => (
            <Link
              key={category.name}
              href={`/tools?categories=${category.name}`}
            >
              <div className="flex cursor-pointer items-center space-x-4 rounded-xl bg-neutral-900 p-2 shadow transition-all duration-300 hover:bg-[#141414] md:p-4">
                <div
                  className={`${getRandomColor()} flex size-8 items-center justify-center rounded-full text-white md:size-12`}
                >
                  {getRandomIcon()}
                </div>
                <div>
                  <h3 className="text-sm font-semibold md:text-lg">
                    {capitalizeFirstLetter(category.name)}
                  </h3>
                  <p className="text-xs text-muted-foreground md:text-sm">
                    {category.count || 0} Categories
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
