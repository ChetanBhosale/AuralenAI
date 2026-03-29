/*
  Warnings:

  - You are about to drop the `Crawler` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WORKFLOW_TYPE" AS ENUM ('ONBOARD');

-- CreateEnum
CREATE TYPE "WORKFLOW_ACTIVITY" AS ENUM ('PRODUCT_SCRAPE', 'AGENT_GENERATE');

-- CreateEnum
CREATE TYPE "WORKFLOW_STATUS" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Crawler" DROP CONSTRAINT "Crawler_productId_fkey";

-- DropTable
DROP TABLE "Crawler";

-- DropEnum
DROP TYPE "CRAWLER_MODEL";

-- DropEnum
DROP TYPE "CRAWLER_STATUS";

-- CreateTable
CREATE TABLE "WorkflowRun" (
    "id" SERIAL NOT NULL,
    "workflow" "WORKFLOW_TYPE" NOT NULL,
    "activity" "WORKFLOW_ACTIVITY" NOT NULL,
    "status" "WORKFLOW_STATUS" NOT NULL DEFAULT 'PENDING',
    "workflow_id" TEXT,
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "sync_start" TIMESTAMP(3),
    "sync_end" TIMESTAMP(3),
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkflowRun_productId_idx" ON "WorkflowRun"("productId");

-- CreateIndex
CREATE INDEX "WorkflowRun_status_idx" ON "WorkflowRun"("status");

-- CreateIndex
CREATE INDEX "WorkflowRun_workflow_idx" ON "WorkflowRun"("workflow");

-- AddForeignKey
ALTER TABLE "WorkflowRun" ADD CONSTRAINT "WorkflowRun_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
