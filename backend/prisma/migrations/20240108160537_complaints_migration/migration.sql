-- CreateTable
CREATE TABLE "Complaint" (
    "complaint_id" SERIAL NOT NULL,
    "complaint_motive" VARCHAR(50) NOT NULL,
    "complaint_text" VARCHAR(255) NOT NULL,
    "complaint_created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complaint_status" BOOLEAN NOT NULL DEFAULT true,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("complaint_id")
);

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_Client"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
