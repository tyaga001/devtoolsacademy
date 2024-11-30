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
  return <RandomIcon className="h-6 w-6" />;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Categories = async () => {
  const response = await getToolCategories();
  const variousCategories = response.categories;

  if (!response.status) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No Categories Found, try again later
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 pt-16 md:px-6 lg:px-48">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore Categories
          </h2>
          <p className="text-muted-foreground">
            Discover tools and resources across various categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {variousCategories?.map((category) => (
            <Link href={`/tools?categories=${category.name}`}>
              <div
                key={category.name}
                className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow"
              >
                <div
                  className={`${getRandomColor()} h-12 w-12 rounded-full flex items-center justify-center text-white`}
                >
                  {getRandomIcon()}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {capitalizeFirstLetter(category.name)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
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



