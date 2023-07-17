-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
