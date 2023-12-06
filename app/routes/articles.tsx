import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getArticleListItems } from "~/models/article.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const articleListItems = await getArticleListItems();
  console.log(articleListItems);
  return json({ articleListItems });
};

export default function ArticlesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Articles</Link>
        </h1>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-32 border-r bg-gray-50">
          

          {data.articleListItems.length === 0 ? (
            <p className="p-4">No articles yet</p>
          ) : (
            <ol>
              {data.articleListItems.map((article) => (
                <li key={article.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    // convert id to String because NavLink only accepts strings
                    to={(article.id).toString()} 
                  >
                    📝 {article.title}
                    <img src={article.image_sm} alt={article.title} />
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
