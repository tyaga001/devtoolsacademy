-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categories" TEXT[],
    "stars" INTEGER NOT NULL,
    "forks" INTEGER NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "logo" TEXT NOT NULL,
    "tags" TEXT[],
    "githubUrl" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "documentation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_githubUrl_key" ON "Tool"("githubUrl");

-- CreateIndex
CREATE INDEX "Tool_name_idx" ON "Tool"("name");

-- CreateIndex
CREATE INDEX "Tool_categories_idx" ON "Tool"("categories");

-- CreateIndex
CREATE INDEX "Tool_tags_idx" ON "Tool"("tags");
