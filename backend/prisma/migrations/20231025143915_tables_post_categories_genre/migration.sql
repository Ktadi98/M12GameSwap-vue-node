-- CreateEnum
CREATE TYPE "PostCondition" AS ENUM ('new', 'good', 'satisfactory');

-- CreateTable
CREATE TABLE "Platform" (
    "platform_id" SERIAL NOT NULL,
    "platform_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("platform_id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "genre_id" SERIAL NOT NULL,
    "genre_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "Platform_Genre" (
    "platform_genre_id" SERIAL NOT NULL,
    "platform_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "Platform_Genre_pkey" PRIMARY KEY ("platform_genre_id")
);

-- CreateTable
CREATE TABLE "Post" (
    "post_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "platform_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "post_title" VARCHAR(255) NOT NULL,
    "post_photos" VARCHAR(100)[],
    "post_description" TEXT NOT NULL,
    "post_keep" BOOLEAN NOT NULL DEFAULT true,
    "post_condition" "PostCondition" NOT NULL,
    "post_created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "post_price" INTEGER NOT NULL,
    "post_status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Platform_platform_name_key" ON "Platform"("platform_name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genre_name_key" ON "Genre"("genre_name");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_Genre_platform_id_key" ON "Platform_Genre"("platform_id");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_Genre_genre_id_key" ON "Platform_Genre"("genre_id");

-- AddForeignKey
ALTER TABLE "Platform_Genre" ADD CONSTRAINT "Platform_Genre_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform"("platform_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platform_Genre" ADD CONSTRAINT "Platform_Genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("genre_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Client"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "Platform"("platform_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("genre_id") ON DELETE RESTRICT ON UPDATE CASCADE;
