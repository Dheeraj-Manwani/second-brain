-- CreateEnum
CREATE TYPE "VisibilitySchema" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "visibility" "VisibilitySchema" NOT NULL DEFAULT 'PRIVATE';

-- AlterTable
ALTER TABLE "ResourceGroup" ADD COLUMN     "visibility" "VisibilitySchema" NOT NULL DEFAULT 'PRIVATE';
