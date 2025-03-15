-- AlterEnum
ALTER TYPE "ResourceType" ADD VALUE 'UNSUPPORTED';

-- CreateTable
CREATE TABLE "ResourceStorage" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "s3Url" TEXT NOT NULL,

    CONSTRAINT "ResourceStorage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourceStorage_resourceId_key" ON "ResourceStorage"("resourceId");

-- AddForeignKey
ALTER TABLE "ResourceStorage" ADD CONSTRAINT "ResourceStorage_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
