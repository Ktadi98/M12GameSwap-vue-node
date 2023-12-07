-- DropIndex
DROP INDEX "User_Favorites_post_id_key";

-- DropIndex
DROP INDEX "User_Favorites_user_id_key";

-- AlterTable
ALTER TABLE "User_Favorites" ADD CONSTRAINT "User_Favorites_pkey" PRIMARY KEY ("user_id", "post_id");
