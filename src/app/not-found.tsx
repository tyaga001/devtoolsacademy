import { Link } from "next-view-transitions"
import * as React from "react"

interface Props {}

const NotFoundPage: React.FC<Props> = () => {
  return (
    <section className="grid min-h-screen place-content-center">
      <div className="text-center">
        <h1 className="mb-3 text-9xl font-semibold tracking-tighter text-neutral-300">
          404
        </h1>
        <p className="text-base text-neutral-300">
          Page not found, go{" "}
          <Link
            href="/"
            className="font-semibold hover:underline focus:underline"
          >
            Home
          </Link>
        </p>
      </div>
    </section>
  )
}

export default NotFoundPage
