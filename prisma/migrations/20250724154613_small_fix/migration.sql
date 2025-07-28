/*
  Warnings:

  - You are about to drop the column `authorId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,recipeId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_authorId_fkey";

-- DropIndex
DROP INDEX "Rating_authorId_key";

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "authorId",
DROP COLUMN "score",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_key" ON "Rating"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_recipeId_key" ON "Rating"("userId", "recipeId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
