import type { Config } from "prettier"
import * as tailwindConfig from "prettier-plugin-tailwindcss"

const config: Config = {
  plugins: [tailwindConfig],
  tailwindFunctions: ["classNames"],
}

export default config
