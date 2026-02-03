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
    "authKey" TEXT,
    "authToken" TEXT,
    "authLocation" TEXT DEFAULT 'HEADER',
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "AiTool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AiTool" ("baseUrl", "body", "createdAt", "description", "endpoint", "headers", "id", "isEnabled", "method", "name", "parameters", "updatedAt", "userId") SELECT "baseUrl", "body", "createdAt", "description", "endpoint", "headers", "id", "isEnabled", "method", "name", "parameters", "updatedAt", "userId" FROM "AiTool";
DROP TABLE "AiTool";
ALTER TABLE "new_AiTool" RENAME TO "AiTool";
CREATE UNIQUE INDEX "AiTool_name_key" ON "AiTool"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
