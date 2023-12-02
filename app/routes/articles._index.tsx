import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
  return (
    <>
      <p>
        No article selected. Select an article on the left, or{" "}
        <Link to="new" className="text-blue-500 underline">
          create a new article.
        </Link>
      </p>
      <p style={{ position: "fixed", bottom: "2rem", right: "1.5rem", }}>
        <Link to="/." className="text-blue-500 underline">
          <img style={{ background: "black" }}
            src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
            alt="Remix"
            className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
          />
        </Link>
      </p>
    </>
  );
}
