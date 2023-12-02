-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "index" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "pageName" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorInfo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "articleImage" TEXT NOT NULL,
    "articleContent" TEXT NOT NULL,
    "authorDetails" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
