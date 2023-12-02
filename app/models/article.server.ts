import type { Article } from "@prisma/client";

import { prisma } from "~/db.server";

export function getArticle() {
  return prisma.article.findFirst({
    select: { id: true, articleContent: true, title: true },
  });
}

export function getArticleListItems() {
  return prisma.article.findMany({
    select: { id: true, title: true },
    /* orderBy: { updatedAt: "desc" }, */
  });
}

export function createArticle({
  articleContent,
  title,
}: Pick<Article, "articleContent" | "title"> ) {
  return prisma.article.create({
    data: {
      title,
      articleContent,
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
