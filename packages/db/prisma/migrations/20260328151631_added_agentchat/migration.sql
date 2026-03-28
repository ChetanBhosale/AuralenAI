/*
  Warnings:

  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `profile_pic` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SPEECH" AS ENUM ('CASUAL', 'FORMAL', 'FRIENDLY');

-- CreateEnum
CREATE TYPE "OUTREACH_GOAL" AS ENUM ('SALES', 'NETWORKING', 'PARTNERSHIPS', 'BRAND_BUILDING', 'BOOK_MEETING');

-- CreateEnum
CREATE TYPE "CRAWLER_MODEL" AS ENUM ('PRODUCT');

-- CreateEnum
CREATE TYPE "CRAWLER_STATUS" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "profile_pic" SET NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_md" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "product_scrape_md" TEXT NOT NULL,
    "prduct_description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetAudience" (
    "id" SERIAL NOT NULL,
    "job_roles" TEXT[],
    "industries" TEXT[],
    "locations" TEXT[],
    "goal" "OUTREACH_GOAL" NOT NULL DEFAULT 'BOOK_MEETING',
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TargetAudience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "speech" "SPEECH" NOT NULL DEFAULT 'FORMAL',
    "agent_md" TEXT NOT NULL,
    "tone_context" TEXT,
    "goal" "OUTREACH_GOAL" NOT NULL DEFAULT 'BOOK_MEETING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crawler" (
    "id" SERIAL NOT NULL,
    "model" "CRAWLER_MODEL" NOT NULL,
    "status" "CRAWLER_STATUS" NOT NULL DEFAULT 'PENDING',
    "sync_start" TIMESTAMP(3),
    "sync_end" TIMESTAMP(3),
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crawler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TargetAudience_productId_key" ON "TargetAudience"("productId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetAudience" ADD CONSTRAINT "TargetAudience_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crawler" ADD CONSTRAINT "Crawler_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
