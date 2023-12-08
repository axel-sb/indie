import { json } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";

import { getArticleListItems } from "~/models/article.server";

export const loader = async () => {
  const articleListItems = await getArticleListItems();
  console.log(articleListItems);
  return json({ articleListItems });
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


export default function ArticleIndexPage() {
  const data = useLoaderData<typeof loader>();
  return (
    
    <div onScroll={handleScroll} className="px-4 scroll-mb-4 overflow-y-auto overscroll-y-contain">

      <p className="h-[10%] pt-28 pb-4 pl-2 text-2xl sticky top-1 bg-white z-[-1] ">{data.articleListItems[0].editionName}</p>
        {data.articleListItems.length === 0 ? (
          <p className="p-4">No articles yet</p>
        ) : (
          <ol className="overflow-auto h-[80vh] relative z-[-2] pt-8">
            {data.articleListItems.map((article) => (
              <li key={article.id}>
                <NavLink style={{fontFamily:"SF Compact Display"}}
                  className={({ isActive }) =>
                    `block pl-2 pt-0 text-base ${isActive ? "bg-white" : ""}`
                  }
                  // convert id to String because NavLink only accepts strings
                  to={(article.id).toString()}
                >
                  <span className="pr-2 font-bold text-neutral-500">{article.page}</span> {article.title}
                </NavLink>
              </li>
            ))}
          </ol>
        )}
      </div>
   
  );
}
