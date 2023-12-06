import type { Article } from "@prisma/client";

import { prisma } from "~/db.server";

export function getArticle({ id }: Pick<Article, "id">) {
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
      image_sm: true,
      image_lg: true,
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
      image_sm: true,
      image_lg: true,
    },

    orderBy: { page: "asc" },
  });
}

export function createArticle({
  edition,
  editionName,
  page,
  pageName,
  image_sm,
  image_lg,
  author,
  title,
  articleContent,
  authorDetails,
}: Pick<
  Article,
  | "articleContent"
  | "title"
  | "image_sm"
  | "image_lg"
  | "author"
  | "authorDetails"
  | "edition"
  | "editionName"
  | "page"
  | "pageName"
>) {
  return prisma.article.create({
    data: {
      edition,
      editionName,
      page,
      pageName,
      image_sm,
      image_lg,
      author,
      title,
      articleContent,
      authorDetails,
    },
  });
}

export function deleteArticle({ id }: Pick<Article, "id">) {
  return prisma.article.deleteMany({
    where: { id },
  });
}
