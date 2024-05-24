/*
  Warnings:

  - You are about to drop the column `bookCreatorId` on the `Exchange` table. All the data in the column will be lost.
  - You are about to drop the column `bookOwnerId` on the `Exchange` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_bookCreatorId_fkey";

-- DropForeignKey
ALTER TABLE "Exchange" DROP CONSTRAINT "Exchange_bookOwnerId_fkey";

-- AlterTable
ALTER TABLE "Exchange" DROP COLUMN "bookCreatorId",
DROP COLUMN "bookOwnerId",
ADD COLUMN     "bookForCreatorId" INTEGER,
ADD COLUMN     "bookForOwnerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_bookForCreatorId_fkey" FOREIGN KEY ("bookForCreatorId") REFERENCES "BookCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_bookForOwnerId_fkey" FOREIGN KEY ("bookForOwnerId") REFERENCES "BookCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
