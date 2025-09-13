import { z } from "zod"

export const SimilarRouteSchema = z.object({
  slug: z.string().min(1, { message: "slug cannot be less than 1 character" }),
  tags: z
    .string()
    .array()
    .min(1, { message: "need atleast one tag in the array" }),
  categories: z
    .string()
    .array()
    .min(1, { message: "need atleast one category in the array" }),
})

export const JobSubmissionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Job title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  company: z
    .string()
    .min(1, { message: "Company name is required" })
    .max(50, { message: "Company name must be less than 50 characters" }),
  companyLogo: z
    .string()
    .url({ message: "Company logo must be a valid URL" })
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .min(1, { message: "Location is required" })
    .max(50, { message: "Location must be less than 50 characters" }),
  type: z.enum(
    ["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE", "INTERNSHIP"],
    { message: "Invalid job type" }
  ),
  salary: z
    .string()
    .max(50, { message: "Salary must be less than 50 characters" })
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(50, { message: "Description must be at least 50 characters" })
    .max(5000, { message: "Description must be less than 5000 characters" }),
  requirements: z
    .string()
    .array()
    .max(20, { message: "Maximum 20 requirements allowed" })
    .optional(),
  benefits: z
    .string()
    .array()
    .max(20, { message: "Maximum 20 benefits allowed" })
    .optional(),
  applyUrl: z.string().url({ message: "Apply URL must be a valid URL" }),
  contactName: z
    .string()
    .min(1, { message: "Contact name is required" })
    .max(50, { message: "Contact name must be less than 50 characters" }),
  contactEmail: z.string().email({ message: "Invalid email format" }),
  categories: z
    .string()
    .array()
    .max(5, { message: "Maximum 5 categories allowed" })
    .optional(),
  tags: z
    .string()
    .array()
    .max(10, { message: "Maximum 10 tags allowed" })
    .optional(),
  featured: z.boolean().optional(),
})

export const JobUpdateSchema = JobSubmissionSchema.extend({
  active: z.boolean().optional(),
  approved: z.boolean().optional(),
})
