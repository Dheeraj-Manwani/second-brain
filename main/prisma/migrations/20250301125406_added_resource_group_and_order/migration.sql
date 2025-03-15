/*
  Warnings:

  - The `type` column on the `Resource` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ResourceTypeSchema" AS ENUM ('YOUTUBE_VIDEO', 'INSTAGRAM_POST', 'INSTAGRAM_REEL', 'TWITTER_POST', 'UNSUPPORTED');

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "resourceGroupId" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "ResourceTypeSchema";

-- AlterTable
ALTER TABLE "ResourceGroup" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "ResourceType";

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_resourceGroupId_fkey" FOREIGN KEY ("resourceGroupId") REFERENCES "ResourceGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceGroup" ADD CONSTRAINT "ResourceGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
