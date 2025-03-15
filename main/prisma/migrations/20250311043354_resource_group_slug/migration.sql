/*
  Warnings:

  - You are about to drop the column `parentResourceGroupId` on the `ResourceGroup` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ResourceGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `ResourceGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ResourceGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ResourceGroupTypeSchema" AS ENUM ('DEFAULT', 'CUSTOM');

-- DropForeignKey
ALTER TABLE "ResourceGroup" DROP CONSTRAINT "ResourceGroup_parentResourceGroupId_fkey";

-- AlterTable
ALTER TABLE "ResourceGroup" DROP COLUMN "parentResourceGroupId",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "type" "ResourceGroupTypeSchema" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResourceGroup_slug_key" ON "ResourceGroup"("slug");
