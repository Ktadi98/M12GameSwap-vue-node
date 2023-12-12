-- CreateTable
CREATE TABLE "User_Favorites" (
    "user_favorites_id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "User_Favorites_pkey" PRIMARY KEY ("user_favorites_id")
);

-- AddForeignKey
ALTER TABLE "User_Favorites" ADD CONSTRAINT "User_Favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Client"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
