import { z } from "zod";

export const SimilarRouteSchema = z.object({
  slug: z.string().min(1, { message: "slug cannot be less than 1 character" }),
  tags: z.string().array().min(1, { message: "need atleast one tag in the array" }),
  categories: z.string().array().min(1, { message: "need atleast one category in the array" })
})
