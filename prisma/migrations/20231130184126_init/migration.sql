/*
  Warnings:

  - You are about to drop the column `authorInfo` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `favorite` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Article` table. All the data in the column will be lost.
  - Added the required column `editionName` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "index" TEXT NOT NULL,
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
INSERT INTO "new_Article" ("articleContent", "articleImage", "author", "authorDetails", "edition", "id", "index", "page", "pageName", "title") SELECT "articleContent", "articleImage", "author", "authorDetails", "edition", "id", "index", "page", "pageName", "title" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
