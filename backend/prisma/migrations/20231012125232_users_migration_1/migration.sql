-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('client', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_email" VARCHAR(255) NOT NULL,
    "user_password" VARCHAR(255) NOT NULL,
    "user_salt" VARCHAR(255) NOT NULL,
    "user_created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_type" "UserRole" NOT NULL DEFAULT 'client',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "User_Admin" (
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "User_Client" (
    "user_id" INTEGER NOT NULL,
    "user_ranking" INTEGER,
    "user_name" VARCHAR(255) NOT NULL,
    "user_status" BOOLEAN NOT NULL DEFAULT true,
    "user_photo" VARCHAR(255) NOT NULL,
    "user_phone" VARCHAR(20) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Admin_user_id_key" ON "User_Admin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_Client_user_id_key" ON "User_Client"("user_id");

-- AddForeignKey
ALTER TABLE "User_Admin" ADD CONSTRAINT "User_Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Client" ADD CONSTRAINT "User_Client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
