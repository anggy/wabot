-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "credits" INTEGER NOT NULL DEFAULT 0,
    "planType" TEXT NOT NULL DEFAULT 'PAY_AS_YOU_GO',
    "planExpiresAt" DATETIME,
    "messageCost" INTEGER NOT NULL DEFAULT 1,
    "aiApiKey" TEXT,
    "aiProvider" TEXT NOT NULL DEFAULT 'openai',
    "aiBriefing" TEXT,
    "isAiEnabled" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("aiApiKey", "aiBriefing", "createdAt", "credits", "email", "id", "isActive", "isAiEnabled", "messageCost", "password", "phone", "planExpiresAt", "planType", "role", "username") SELECT "aiApiKey", "aiBriefing", "createdAt", "credits", "email", "id", "isActive", "isAiEnabled", "messageCost", "password", "phone", "planExpiresAt", "planType", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
