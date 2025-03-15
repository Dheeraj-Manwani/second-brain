/*
  Warnings:

  - Made the column `resourceGroupId` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_resourceGroupId_fkey";

-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "resourceGroupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_resourceGroupId_fkey" FOREIGN KEY ("resourceGroupId") REFERENCES "ResourceGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
