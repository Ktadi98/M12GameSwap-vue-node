-- DropForeignKey
ALTER TABLE "User_Admin" DROP CONSTRAINT "User_Admin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Client" DROP CONSTRAINT "User_Client_user_id_fkey";

-- AddForeignKey
ALTER TABLE "User_Admin" ADD CONSTRAINT "User_Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Client" ADD CONSTRAINT "User_Client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
