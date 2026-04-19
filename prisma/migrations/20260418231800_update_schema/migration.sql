/*
  Warnings:

  - Added the required column `content` to the `Episode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "rewardTitle" TEXT;

-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "collectiveXp" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "difficulty" TEXT NOT NULL DEFAULT 'EASY';
