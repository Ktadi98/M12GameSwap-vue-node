/*
  Warnings:

  - The values [new,good,satisfactory] on the enum `PostCondition` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostCondition_new" AS ENUM ('nuevo', 'bueno', 'satisfactorio');
ALTER TABLE "Post" ALTER COLUMN "post_condition" TYPE "PostCondition_new" USING ("post_condition"::text::"PostCondition_new");
ALTER TYPE "PostCondition" RENAME TO "PostCondition_old";
ALTER TYPE "PostCondition_new" RENAME TO "PostCondition";
DROP TYPE "PostCondition_old";
COMMIT;
