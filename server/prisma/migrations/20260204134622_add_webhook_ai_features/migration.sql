-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "triggerType" TEXT NOT NULL,
    "triggerValue" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "apiUrl" TEXT,
    "apiMethod" TEXT DEFAULT 'POST',
    "apiPayload" TEXT,
    "responseContent" TEXT,
    "responseMediaType" TEXT DEFAULT 'TEXT',
    "responseMediaUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sessionId" TEXT,
    "filterGroupId" TEXT,
    "credentialId" INTEGER,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rule_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "AiCredential" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Rule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rule" ("actionType", "apiMethod", "apiPayload", "apiUrl", "createdAt", "id", "isActive", "name", "responseContent", "responseMediaType", "responseMediaUrl", "sessionId", "triggerType", "triggerValue", "updatedAt", "userId") SELECT "actionType", "apiMethod", "apiPayload", "apiUrl", "createdAt", "id", "isActive", "name", "responseContent", "responseMediaType", "responseMediaUrl", "sessionId", "triggerType", "triggerValue", "updatedAt", "userId" FROM "Rule";
DROP TABLE "Rule";
ALTER TABLE "new_Rule" RENAME TO "Rule";
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "messageType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "actionType" TEXT NOT NULL DEFAULT 'TEXT',
    "apiUrl" TEXT,
    "apiMethod" TEXT DEFAULT 'GET',
    "apiPayload" TEXT,
    "credentialId" INTEGER,
    "cronExpression" TEXT NOT NULL,
    "lastRun" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Schedule_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "AiCredential" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Schedule" ("content", "createdAt", "cronExpression", "id", "isActive", "lastRun", "mediaUrl", "messageType", "recipient", "sessionId", "updatedAt", "userId") SELECT "content", "createdAt", "cronExpression", "id", "isActive", "lastRun", "mediaUrl", "messageType", "recipient", "sessionId", "updatedAt", "userId" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
CREATE TABLE "new_Broadcast" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "name" TEXT,
    "tag" TEXT NOT NULL,
    "messageType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "actionType" TEXT NOT NULL DEFAULT 'TEXT',
    "apiUrl" TEXT,
    "apiMethod" TEXT DEFAULT 'GET',
    "apiPayload" TEXT,
    "credentialId" INTEGER,
    "total" INTEGER NOT NULL DEFAULT 0,
    "sent" INTEGER NOT NULL DEFAULT 0,
    "failed" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PROCESSING',
    "userId" INTEGER NOT NULL,
    "cratedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Broadcast_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "AiCredential" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Broadcast_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Broadcast" ("content", "cratedAt", "failed", "id", "mediaUrl", "messageType", "name", "sent", "sessionId", "status", "tag", "total", "userId") SELECT "content", "cratedAt", "failed", "id", "mediaUrl", "messageType", "name", "sent", "sessionId", "status", "tag", "total", "userId" FROM "Broadcast";
DROP TABLE "Broadcast";
ALTER TABLE "new_Broadcast" RENAME TO "Broadcast";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
