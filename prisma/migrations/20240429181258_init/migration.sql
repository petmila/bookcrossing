/*
  Warnings:

  - You are about to drop the column `published` on the `BookCard` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_bookCreatorId_fkey";

-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_bookOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_ownerId_fkey";

-- AlterTable
ALTER TABLE "BookCard" DROP COLUMN "published";

-- AlterTable
ALTER TABLE "Exchange" ALTER COLUMN "ownerId" DROP NOT NULL,
ALTER COLUMN "creatorId" DROP NOT NULL,
ALTER COLUMN "bookCreatorId" DROP NOT NULL,
ALTER COLUMN "bookOwnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_bookCreatorId_fkey" FOREIGN KEY ("bookCreatorId") REFERENCES "BookCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_bookOwnerId_fkey" FOREIGN KEY ("bookOwnerId") REFERENCES "BookCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
