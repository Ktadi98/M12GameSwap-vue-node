-- CreateTable
CREATE TABLE "User_Favorites" (
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Favorites_user_id_key" ON "User_Favorites"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Favorites_post_id_key" ON "User_Favorites"("post_id");

-- AddForeignKey
ALTER TABLE "User_Favorites" ADD CONSTRAINT "User_Favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Favorites" ADD CONSTRAINT "User_Favorites_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
