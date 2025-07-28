-- DropIndex
DROP INDEX "Rating_recipeId_key";

-- DropIndex
DROP INDEX "Rating_userId_key";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
