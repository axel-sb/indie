import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

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

export default function ArticlesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-2 text-white fixed w-full -top-0 transition-all">

        <Link to="/"
            style={{ background: "url('data:image/svg+xml, %3Csvg%20height%3D%22100%25%22%20stroke-miterlimit%3D%2210%22%20style%3D%22fill-rule%3Anonzero%3Bclip-rule%3Aevenodd%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%22%20version%3D%221.1%22%20viewBox%3D%220%200%2041%2037%22%20width%3D%22100%25%22%20xml%3Aspace%3D%22preserve%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%0A%3Cdefs/%3E%0A%3Cg%20id%3D%22Layer-1%22%3E%0A%3Cpath%20d%3D%22M40.9758%2016.8L40.9758%2010.2L35.3261%2010.2L35.3261%208.5C35.3261%206.6%2035.5279%206%2037.5456%206C38.4536%206%2039.3616%206%2040.9758%206.1L40.9758%200.8C39.1599%200.4%2036.6377%200%2034.0146%200C28.1631%200%2025.2373%202.5%2025.2373%208.4L25.2373%2010.2L21%2010.2L21%2016.4L25.2373%2016.8L25.2373%2037L35.427%2037L35.427%2016.8L40.9758%2016.8Z%22%20fill%3D%22%23983e97%22%20fill-rule%3D%22nonzero%22%20opacity%3D%221%22%20stroke%3D%22none%22/%3E%0A%3Cpath%20d%3D%22M19.9758%2016.8L19.9758%2010.2L14.3261%2010.2L14.3261%208.5C14.3261%206.6%2014.5279%206%2016.5456%206C17.4536%206%2018.3616%206%2019.9758%206.1L19.9758%200.8C18.1599%200.4%2015.6377%200%2013.0146%200C7.16306%200%204.2373%202.5%204.2373%208.4L4.2373%2010.2L0%2010.2L0%2016.4L4.2373%2016.8L4.2373%2037L14.427%2037L14.427%2016.8L19.9758%2016.8Z%22%20fill%3D%22%23ffffff%22%20fill-rule%3D%22nonzero%22%20opacity%3D%221%22%20stroke%3D%22none%22/%3E%0A%3C/g%3E%0A%3C/svg%3E')", width:"32px",height:"32px", display:"block",position:"relative",marginLeft:"1rem",backgroundRepeat:"no-repeat"}}>
          </Link>
        <Link to="." className="flex items-center">
          <span className="text-xl pr-2">Inhalt</span>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25.5117" height="32.3086">
            <g>
              <rect height="32.3086" opacity="0" width="25.5117" x="0" y="0" />
              <path d="M0 27.75C0 30.7734 1.51172 32.3086 4.51172 32.3086L20.6484 32.3086C23.6484 32.3086 25.1602 30.7734 25.1602 27.75L25.1602 4.57031C25.1602 1.54688 23.6484 0.0117188 20.6484 0.0117188L4.51172 0.0117188C1.51172 0.0117188 0 1.54688 0 4.57031ZM2.07422 27.7031L2.07422 4.61719C2.07422 2.97656 2.94141 2.08594 4.62891 2.08594L20.5312 2.08594C22.2188 2.08594 23.0859 2.97656 23.0859 4.61719L23.0859 27.7031C23.0859 29.3438 22.2188 30.2344 20.5312 30.2344L4.62891 30.2344C2.94141 30.2344 2.07422 29.3438 2.07422 27.7031Z" fill="#ffffff" fillOpacity="0.425" />
              <path d="M5.85938 17.6836C6.62109 17.6836 7.24219 17.0625 7.24219 16.3008C7.24219 15.5273 6.62109 14.9062 5.85938 14.9062C5.09766 14.9062 4.46484 15.5391 4.46484 16.3008C4.46484 17.0508 5.09766 17.6836 5.85938 17.6836ZM10.1016 17.1211L19.875 17.1211C20.332 17.1211 20.6953 16.7578 20.6953 16.3008C20.6953 15.8438 20.3438 15.4805 19.875 15.4805L10.1016 15.4805C9.63281 15.4805 9.28125 15.8438 9.28125 16.3008C9.28125 16.7578 9.64453 17.1211 10.1016 17.1211Z" fill="#ffffff" fillOpacity="0.85" />
              <path d="M5.85938 12.8203C6.62109 12.8203 7.24219 12.1992 7.24219 11.4258C7.24219 10.6523 6.62109 10.043 5.85938 10.043C5.08594 10.043 4.46484 10.6641 4.46484 11.4258C4.46484 12.1992 5.08594 12.8203 5.85938 12.8203ZM10.1016 12.2461L19.875 12.2461C20.3438 12.2461 20.6953 11.8945 20.6953 11.4258C20.6953 10.9688 20.3438 10.6172 19.875 10.6172L10.1016 10.6172C9.63281 10.6172 9.28125 10.9688 9.28125 11.4258C9.28125 11.8945 9.63281 12.2461 10.1016 12.2461Z" fill="#ffffff" fillOpacity="0.85" />
              <path d="M5.85938 8.12109C6.62109 8.12109 7.24219 7.5 7.24219 6.72656C7.24219 5.96484 6.62109 5.34375 5.85938 5.34375C5.09766 5.34375 4.46484 5.97656 4.46484 6.72656C4.46484 7.48828 5.09766 8.12109 5.85938 8.12109ZM10.1016 7.55859L19.875 7.55859C20.332 7.55859 20.6953 7.18359 20.6953 6.72656C20.6953 6.26953 20.332 5.90625 19.875 5.90625L10.1016 5.90625C9.64453 5.90625 9.28125 6.26953 9.28125 6.72656C9.28125 7.18359 9.64453 7.55859 10.1016 7.55859Z" fill="#ffffff" fillOpacity="0.85" />
            </g>
          </svg>

          </Link>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-2 py-1 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex">
        <div onScroll={handleScroll} className="h-[100vh]  pt-24 pb-4 min-w-[25%] max-w-[25%] border-r bg-[#f5f5f2] overflow-y-auto overscroll-y-contain" style={{ scrollbarWidth: "none" }}>


          {data.articleListItems.length === 0 ? (
            <p className="p-4">No articles yet</p>
          ) : (
            <ol className="py-1">
              {data.articleListItems.map((article) => (
                <li key={article.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-3 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    // convert id to String because NavLink only accepts strings
                    to={(article.id).toString()}
                  >
                    <img src={article.image_sm} alt={article.title} />
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>


          <Outlet />
  
      </main>
    </div>
  );
}
