import { FrownIcon } from "lucide-react"
import { Link } from "next-view-transitions"

const ToolNotFound = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <div className="flex h-full items-center justify-center gap-3">
        <div className=" flex items-center justify-center rounded-full bg-sky-800 p-2">
          <FrownIcon size={40} />
        </div>
        <h1 className="text-2xl font-bold md:text-4xl">Tool Not Found</h1>
      </div>
      <p className="text-neutral-600">
        We could not find the tool you are looking for. It might have been moved
        or does not exist.
      </p>
      <Link
        href="/tools"
        className="rounded-lg bg-primary px-6 py-2 text-white transition-colors hover:bg-primary/90"
      >
        Browse Tools
      </Link>
    </div>
  )
}
export default ToolNotFound
