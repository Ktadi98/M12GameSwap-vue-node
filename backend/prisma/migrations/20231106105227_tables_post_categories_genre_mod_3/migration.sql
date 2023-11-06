/*
  Warnings:

  - You are about to drop the `Platform_Genre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Platform_Genre" DROP CONSTRAINT "Platform_Genre_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "Platform_Genre" DROP CONSTRAINT "Platform_Genre_platform_id_fkey";

-- DropTable
DROP TABLE "Platform_Genre";
