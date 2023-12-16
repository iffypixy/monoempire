-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ELDER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
