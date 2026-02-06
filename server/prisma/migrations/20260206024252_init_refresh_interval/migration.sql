-- AlterTable
ALTER TABLE "AiCredential" ADD COLUMN "lastRefreshed" DATETIME;
ALTER TABLE "AiCredential" ADD COLUMN "refreshInterval" INTEGER;
