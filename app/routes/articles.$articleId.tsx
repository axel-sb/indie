import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getArticle } from "~/models/article.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.articleId, "articleId not found");

  const article = await getArticle({ id: Number(params.articleId) });
  if (!article) {
    throw new Response("Not Found", { status: 404 });
    console.log("Not Found");
  }
  return json({ article });
};



const handleScroll = () => {
  console.log("scrolling...");
  let prevScrollpos = window.scrollY;
  window.onscroll = function () {
    const currentScrollPos = window.scrollY;
    const header = document.querySelector("header");
    if (header) {
      header.style.top = prevScrollpos > currentScrollPos ? "0" : "-56px";
    }
    prevScrollpos = currentScrollPos;
  };
};

export default function ArticleDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div onScroll={handleScroll} className="bg-white px-4 py-16 !w-screen flex-[1_0_100vw] absolute overflow-y-auto overscroll-y-contain h-screen" style={{ scrollbarWidth: "none" }}>
      <div className="flex justify-between relative -top-12">
        <Link to="/articles" className="flex justify-start px-0">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30.8789" height="30.5508">
            <g>
              <rect height="30.5508" opacity="0" width="30.8789" x="0" y="0" />
              <path d="M15.2578 30.5273C23.6133 30.5273 30.5273 23.6133 30.5273 15.2695C30.5273 6.91406 23.6016 0 15.2461 0C6.90234 0 0 6.91406 0 15.2695C0 23.6133 6.91406 30.5273 15.2578 30.5273ZM15.2578 28.3477C8.01562 28.3477 2.19141 22.5117 2.19141 15.2695C2.19141 8.01562 8.00391 2.19141 15.2461 2.19141C22.5 2.19141 28.3359 8.01562 28.3359 15.2695C28.3359 22.5117 22.5117 28.3477 15.2578 28.3477Z" fill="#000" fillOpacity="0.5" />
              <path d="M5.96484 15.2695C5.96484 15.5156 6.05859 15.8203 6.39844 16.1484L13.0195 22.3711C13.3594 22.6758 13.6523 22.8398 14.0273 22.8398C14.5312 22.8398 14.8945 22.4766 14.8945 21.9609L14.8945 18.4805L21.9492 18.4805C23.1211 18.4805 23.7891 17.8359 23.7891 16.6992L23.7891 13.8633C23.7891 12.7266 23.1211 12.082 21.9492 12.082L14.8945 12.082L14.8945 8.61328C14.8945 8.10938 14.5312 7.69922 14.0039 7.69922C13.6406 7.69922 13.3945 7.85156 13.0195 8.21484L6.39844 14.3672C6.05859 14.707 5.96484 15 5.96484 15.2695Z" fill="#000" fillOpacity="0.5" />
            </g>
          </svg>
        </Link>
        {/* Create a button that links to the next article page (id) */}

        <Link to={(/articles/ + `${data.article.id + 1}`).toString()} className="flex justify-end px-0">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30.8789" height="30.5508">
            <g>
              <rect height="30.5508" opacity="0" width="30.8789" x="0" y="0" />
              <path d="M15.2578 30.5273C23.6133 30.5273 30.5273 23.6133 30.5273 15.2695C30.5273 6.91406 23.6016 0 15.2461 0C6.90234 0 0 6.91406 0 15.2695C0 23.6133 6.91406 30.5273 15.2578 30.5273ZM15.2578 28.3477C8.01562 28.3477 2.19141 22.5117 2.19141 15.2695C2.19141 8.01562 8.00391 2.19141 15.2461 2.19141C22.5 2.19141 28.3359 8.01562 28.3359 15.2695C28.3359 22.5117 22.5117 28.3477 15.2578 28.3477Z" fill="#000" fillOpacity="0.5" />
              <path d="M24.2461 15.2695C24.2461 15 24.1523 14.707 23.8125 14.3672L17.1914 8.21484C16.8164 7.85156 16.5703 7.69922 16.207 7.69922C15.6797 7.69922 15.3164 8.10938 15.3164 8.61328L15.3164 12.082L8.26172 12.082C7.08984 12.082 6.42188 12.7266 6.42188 13.8633L6.42188 16.6992C6.42188 17.8359 7.08984 18.4805 8.26172 18.4805L15.3164 18.4805L15.3164 21.9609C15.3164 22.4766 15.6797 22.8398 16.1836 22.8398C16.5586 22.8398 16.8516 22.6758 17.1914 22.3711L23.8125 16.1484C24.1523 15.8203 24.2461 15.5156 24.2461 15.2695Z" fill="#000" fillOpacity="0.5" />
            </g>
          </svg>

        </Link>
      </div>
      <img className="py-2" src={data.article.image_lg} alt={data.article.title} />
      <h3 className="text-xl font-bold">{data.article.title}</h3>
      <p className="py-6 hyphens-auto">{data.article.articleContent}</p>
      {/* <hr className="mt-0 mb-4" /> */}
      {/* <Form method="post">
        <button
          type="button"
          onClick={() => console.log("clicked")}
          className="rounded bg-blue-500 px-0 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button> 
      </Form>*/}
      <div className="flex justify-between">
      <Link to="/articles" className="flex justify-start px-0">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30.8789" height="30.5508">
          <g>
            <rect height="30.5508" opacity="0" width="30.8789" x="0" y="0" />
            <path d="M15.2578 30.5273C23.6133 30.5273 30.5273 23.6133 30.5273 15.2695C30.5273 6.91406 23.6016 0 15.2461 0C6.90234 0 0 6.91406 0 15.2695C0 23.6133 6.91406 30.5273 15.2578 30.5273ZM15.2578 28.3477C8.01562 28.3477 2.19141 22.5117 2.19141 15.2695C2.19141 8.01562 8.00391 2.19141 15.2461 2.19141C22.5 2.19141 28.3359 8.01562 28.3359 15.2695C28.3359 22.5117 22.5117 28.3477 15.2578 28.3477Z" fill="#000" fillOpacity="0.5" />
            <path d="M5.96484 15.2695C5.96484 15.5156 6.05859 15.8203 6.39844 16.1484L13.0195 22.3711C13.3594 22.6758 13.6523 22.8398 14.0273 22.8398C14.5312 22.8398 14.8945 22.4766 14.8945 21.9609L14.8945 18.4805L21.9492 18.4805C23.1211 18.4805 23.7891 17.8359 23.7891 16.6992L23.7891 13.8633C23.7891 12.7266 23.1211 12.082 21.9492 12.082L14.8945 12.082L14.8945 8.61328C14.8945 8.10938 14.5312 7.69922 14.0039 7.69922C13.6406 7.69922 13.3945 7.85156 13.0195 8.21484L6.39844 14.3672C6.05859 14.707 5.96484 15 5.96484 15.2695Z" fill="#000" fillOpacity="0.5" />
          </g>
        </svg>
      </Link>
      {/* Create a button that links to the next article page (id) */}
     
      <Link to={(/articles/ + `${data.article.id + 1}`).toString()} className="flex justify-end px-1">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30.8789" height="30.5508">
          <g>
            <rect height="30.5508" opacity="0" width="30.8789" x="0" y="0" />
            <path d="M15.2578 30.5273C23.6133 30.5273 30.5273 23.6133 30.5273 15.2695C30.5273 6.91406 23.6016 0 15.2461 0C6.90234 0 0 6.91406 0 15.2695C0 23.6133 6.91406 30.5273 15.2578 30.5273ZM15.2578 28.3477C8.01562 28.3477 2.19141 22.5117 2.19141 15.2695C2.19141 8.01562 8.00391 2.19141 15.2461 2.19141C22.5 2.19141 28.3359 8.01562 28.3359 15.2695C28.3359 22.5117 22.5117 28.3477 15.2578 28.3477Z" fill="#000" fillOpacity="0.5" />
            <path d="M24.2461 15.2695C24.2461 15 24.1523 14.707 23.8125 14.3672L17.1914 8.21484C16.8164 7.85156 16.5703 7.69922 16.207 7.69922C15.6797 7.69922 15.3164 8.10938 15.3164 8.61328L15.3164 12.082L8.26172 12.082C7.08984 12.082 6.42188 12.7266 6.42188 13.8633L6.42188 16.6992C6.42188 17.8359 7.08984 18.4805 8.26172 18.4805L15.3164 18.4805L15.3164 21.9609C15.3164 22.4766 15.6797 22.8398 16.1836 22.8398C16.5586 22.8398 16.8516 22.6758 17.1914 22.3711L23.8125 16.1484C24.1523 15.8203 24.2461 15.5156 24.2461 15.2695Z" fill="#000" fillOpacity="0.5" />
          </g>
        </svg>

      </Link>
      </div>
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
