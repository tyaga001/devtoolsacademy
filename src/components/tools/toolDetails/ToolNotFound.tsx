import { FrownIcon } from "lucide-react"
import Link from "next/link"

const ToolNotFound = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-[50vh] text-center px-4">
      <div className="flex h-full items-center justify-center gap-3">
        <div className="flex p-2 items-center justify-center rounded-full bg-sky-800">
          <FrownIcon size={40} />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold">Tool Not Found</h1>
      </div>
      <p className="text-gray-600">
        We couldn&apos;t find the tool you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>
      <Link
        href="/tools"
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Browse Tools
      </Link>
    </div>
  )
}

export default ToolNotFound
