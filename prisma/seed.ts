// https://dev.to/isnan__h/seeding-your-database-with-prisma-orm-935
// github.com/prisma/prisma-examples/blob/latest/typescript/remix/prisma/seed.ts
// =============================================================================
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import {articleArray} from "./data";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello again, world!",
      userId: user.id,
    },
  });

  // create article records from the articleArray
  for (const article of articleArray) {
    const {
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
    } = article;

    await prisma.article.create({
      data: {
        edition,
        editionName,
        page,
        pageName,
        image_sm: image_sm || "",
        image_lg: image_lg || "",
        author,
        title: title || "",
        articleContent: articleContent || "",
        authorDetails,
      },
    });
  }

  const articles = await prisma.article.findMany();
  console.log(articles);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
