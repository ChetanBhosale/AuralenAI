/*
  Warnings:

  - Added the required column `userId` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_description` to the `TargetAudience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TargetAudience" ADD COLUMN     "target_description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AgentProduct" (
    "id" SERIAL NOT NULL,
    "agentId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AgentProduct_agentId_idx" ON "AgentProduct"("agentId");

-- CreateIndex
CREATE INDEX "AgentProduct_productId_idx" ON "AgentProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "AgentProduct_agentId_productId_key" ON "AgentProduct"("agentId", "productId");

-- CreateIndex
CREATE INDEX "Agent_userId_idx" ON "Agent"("userId");

-- CreateIndex
CREATE INDEX "Crawler_productId_idx" ON "Crawler"("productId");

-- CreateIndex
CREATE INDEX "Crawler_status_idx" ON "Crawler"("status");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentProduct" ADD CONSTRAINT "AgentProduct_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentProduct" ADD CONSTRAINT "AgentProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
