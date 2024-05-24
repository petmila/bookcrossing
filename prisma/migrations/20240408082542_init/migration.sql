-- CreateEnum
CREATE TYPE "BookCondition" AS ENUM ('NEW', 'GREAT', 'GOOD', 'ACCEPTABLE', 'BAD');

-- CreateEnum
CREATE TYPE "BookCardStatus" AS ENUM ('MODERATION', 'ACTIVE', 'CONCEALED');

-- CreateEnum
CREATE TYPE "ExchangeStatus" AS ENUM ('ACTIVE', 'REJECTED', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bookPreference" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "condition" "BookCondition" NOT NULL DEFAULT 'GREAT',
    "status" "BookCardStatus" NOT NULL DEFAULT 'MODERATION',
    "published" BOOLEAN DEFAULT false,
    "userId" INTEGER,
    "year" INTEGER NOT NULL,

    CONSTRAINT "BookCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moderator" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "login" TEXT NOT NULL,

    CONSTRAINT "Moderator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "bookCreatorId" INTEGER NOT NULL,
    "bookOwnerId" INTEGER NOT NULL,
    "note" TEXT,
    "status" "ExchangeStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Moderator_login_key" ON "Moderator"("login");

-- AddForeignKey
ALTER TABLE "BookCard" ADD CONSTRAINT "BookCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_bookCreatorId_fkey" FOREIGN KEY ("bookCreatorId") REFERENCES "BookCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_bookOwnerId_fkey" FOREIGN KEY ("bookOwnerId") REFERENCES "BookCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
