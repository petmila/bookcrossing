/*
  Warnings:

  - Added the required column `updateTime` to the `BookCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookCard" ADD COLUMN     "updateTime" TIMESTAMP(3) NOT NULL;
