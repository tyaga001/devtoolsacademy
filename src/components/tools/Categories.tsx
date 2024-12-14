import { getToolCategories } from "@/lib/tools";
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
} from "lucide-react";
import Link from "next/link";

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
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

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
  ];
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
  return <RandomIcon className="w-3 h-3 md:h-6 md:w-6" />;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Categories = async () => {
  const response = await getToolCategories();
  const variousCategories = response.categories;

  if (!response.status) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center min-h-[50vh] text-center px-4">
        <div className="flex h-full items-center justify-center gap-3">
          <div className=" flex p-2 items-center justify-center rounded-full bg-sky-800">
            <Frown size={40} />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold">
            Categories Not Found
          </h1>
        </div>
        <p className="text-gray-600">
          We couldn&apos;t able to find the categories for you. It might have
          been moved or doesn&apos;t exist. Please try again later
        </p>
      </div>
    );
  }
  return (
    <div className="w-full mpx-0 py-8 pt-16 md:px-6 lg:px-48">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Categories
          </h2>
          <p className="text-muted-foreground">
            Discover tools and resources across various categories
          </p>
        </div>

        <div className="grid gap-2 md:gap-4 grid-cols-2 lg:grid-cols-4">
          {variousCategories?.map((category) => (
            <Link
              key={category.name}
              href={`/tools?categories=${category.name}`}
            >
              <div className="flex items-center space-x-4 p-2 md:p-4 bg-card shadow hover:bg-[#141414] bg-opacity-20 rounded-xl transition-all duration-300 cursor-pointer">
                <div
                  className={`${getRandomColor()} w-8 h-8 md:h-12 md:w-12 rounded-full flex items-center justify-center text-white`}
                >
                  {getRandomIcon()}
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-semibold">
                    {capitalizeFirstLetter(category.name)}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {category.count || 0} Categories
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
