/*
  Warnings:

  - You are about to drop the column `index` on the `Article` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "edition" TEXT NOT NULL,
    "editionName" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "pageName" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorDetails" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "articleImage" TEXT NOT NULL,
    "articleContent" TEXT NOT NULL
);
INSERT INTO "new_Article" ("articleContent", "articleImage", "author", "authorDetails", "edition", "editionName", "id", "page", "pageName", "title") SELECT "articleContent", "articleImage", "author", "authorDetails", "edition", "editionName", "id", "page", "pageName", "title" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
