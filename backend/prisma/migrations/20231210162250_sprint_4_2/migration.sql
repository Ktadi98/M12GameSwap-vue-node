/*
  Warnings:

  - You are about to drop the column `post_keep` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "post_keep",
ADD COLUMN     "post_buyed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "post_reserved" BOOLEAN NOT NULL DEFAULT false;
