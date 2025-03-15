/*
  Warnings:

  - Made the column `type` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "ResourceGroup" ADD COLUMN     "parentResourceGroupId" TEXT;

-- AddForeignKey
ALTER TABLE "ResourceGroup" ADD CONSTRAINT "ResourceGroup_parentResourceGroupId_fkey" FOREIGN KEY ("parentResourceGroupId") REFERENCES "ResourceGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
