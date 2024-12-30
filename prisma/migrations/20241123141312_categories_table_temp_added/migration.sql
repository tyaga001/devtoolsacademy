-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");
