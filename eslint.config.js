import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import prettierConfig from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"
import promise from "eslint-plugin-promise"
import betterTailwindcss from "eslint-plugin-better-tailwindcss"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    plugins: { promise },
    rules: promise.configs.recommended.rules,
  },
  {
    plugins: { "better-tailwindcss": betterTailwindcss },
    rules: betterTailwindcss.configs["recommended-error"].rules,
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/globals.css",
        detectComponentClasses: true,
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
])

export default eslintConfig
