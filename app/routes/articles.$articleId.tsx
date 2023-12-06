import type { LoaderFunctionArgs } from "@remix-run/node";
import { json  } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getArticle } from "~/models/article.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.articleId, "articleId not found");

  const article = await getArticle({ id: Number(params.articleId) });
  if (!article) {
    throw new Response("Not Found at all", { status: 404 });
    console.log("Not Found at all");
  }
  console.log(article.id);
  return json({ article });
};



export default function ArticleDetailsPage() {  
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <img src={data.article.image_lg} alt={data.article.title} />
      <h3 className="text-2xl font-bold">{data.article.title}</h3>
      <p className="py-6">{data.article.articleContent}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>article not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
