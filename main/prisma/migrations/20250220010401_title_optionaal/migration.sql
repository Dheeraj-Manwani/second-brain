/*
  Warnings:

  - Made the column `title` on table `Resource` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Resource" ALTER COLUMN "title" SET NOT NULL;

-- CreateTable
CREATE TABLE "ResourceGroup" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResourceGroup_pkey" PRIMARY KEY ("id")
);
