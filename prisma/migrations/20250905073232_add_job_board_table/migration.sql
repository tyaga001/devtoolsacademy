-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP');

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyLogo" TEXT,
    "location" TEXT NOT NULL,
    "type" "JobType" NOT NULL DEFAULT 'FULL_TIME',
    "salary" TEXT,
    "description" TEXT NOT NULL,
    "requirements" TEXT[],
    "benefits" TEXT[],
    "applyUrl" TEXT NOT NULL,
    "contactEmail" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "categories" TEXT[],
    "tags" TEXT[],
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_slug_key" ON "Job"("slug");

-- CreateIndex
CREATE INDEX "Job_company_idx" ON "Job"("company");

-- CreateIndex
CREATE INDEX "Job_location_idx" ON "Job"("location");

-- CreateIndex
CREATE INDEX "Job_categories_idx" ON "Job"("categories");

-- CreateIndex
CREATE INDEX "Job_tags_idx" ON "Job"("tags");

-- CreateIndex
CREATE INDEX "Job_active_idx" ON "Job"("active");

-- CreateIndex
CREATE INDEX "Job_featured_idx" ON "Job"("featured");

-- CreateIndex
CREATE INDEX "Job_slug_idx" ON "Job"("slug");

-- CreateIndex
CREATE INDEX "Job_type_idx" ON "Job"("type");

-- CreateIndex
CREATE INDEX "Job_approved_idx" ON "Job"("approved");
