/*
  Warnings:

  - You are about to drop the column `post_reviewd` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "post_reviewd",
ADD COLUMN     "post_reviewed" BOOLEAN NOT NULL DEFAULT false;
