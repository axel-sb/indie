import type { Article } from "@prisma/client";

import { prisma } from "~/db.server";

export function getArticle({ id, }: Pick<Article, "id">) {
  return prisma.article.findFirst({
    select: {
      id: true,
      title: true,
      articleContent: true,
      page: true,
      pageName: true,
      edition: true,
      editionName: true,
      author: true,
      authorDetails: true,
      articleImage: true,
    },
    where: { id },
    /* orderBy: { page: "asc" }, */
  });
}
export function getArticleListItems() {
  return prisma.article.findMany({
    select: {
      id: true,
      title: true,
      articleContent: true,
      page: true,
      pageName: true,
      edition: true,
      editionName: true,
      author: true,
      authorDetails: true,
      articleImage: true,
    },
    
    orderBy: { page: "asc" },
  });
}

export function createArticle({
  edition,
  editionName,
  page,
  pageName,
  articleImage,
  author,
  title,
  articleContent,
  authorDetails,
}: Pick<Article, "articleContent" | "title" | "articleImage" | "author" | "authorDetails" | "edition" | "editionName" | "page" | "pageName" >) {
  return prisma.article.create({
    data: {
      edition,
      editionName,
      page,
      pageName,
      articleImage,
      author,
      title,
      articleContent,
      authorDetails,
    },
  });
}

export function deleteArticle({
  id,
}: Pick<Article, "id"> ) {
  return prisma.article.deleteMany({
    where: { id },
  });
}
