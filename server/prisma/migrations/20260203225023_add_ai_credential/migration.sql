/*
  Warnings:

  - You are about to drop the column `authKey` on the `AiTool` table. All the data in the column will be lost.
  - You are about to drop the column `authLocation` on the `AiTool` table. All the data in the column will be lost.
  - You are about to drop the column `authToken` on the `AiTool` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AiCredential" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'API_KEY',
    "key" TEXT,
    "value" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT 'HEADER',
    "refreshUrl" TEXT,
    "refreshPayload" TEXT,
    "tokenPath" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AiCredential_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AiTool" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'GET',
    "baseUrl" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "parameters" TEXT NOT NULL,
    "headers" TEXT,
    "body" TEXT,
    "authType" TEXT NOT NULL DEFAULT 'NONE',
    "authRefreshUrl" TEXT,
    "authRefreshPayload" TEXT,
    "authTokenPath" TEXT,
    "credentialId" INTEGER,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "AiTool_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "AiCredential" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "AiTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AiTool" ("authRefreshPayload", "authRefreshUrl", "authTokenPath", "authType", "baseUrl", "body", "createdAt", "description", "endpoint", "headers", "id", "isEnabled", "method", "name", "parameters", "updatedAt", "userId") SELECT "authRefreshPayload", "authRefreshUrl", "authTokenPath", "authType", "baseUrl", "body", "createdAt", "description", "endpoint", "headers", "id", "isEnabled", "method", "name", "parameters", "updatedAt", "userId" FROM "AiTool";
DROP TABLE "AiTool";
ALTER TABLE "new_AiTool" RENAME TO "AiTool";
CREATE UNIQUE INDEX "AiTool_name_key" ON "AiTool"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "AiCredential_userId_name_key" ON "AiCredential"("userId", "name");
