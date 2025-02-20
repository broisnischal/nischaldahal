import { listAllArticles, type Article } from "#app/.server/content.server.js";
import { Link } from "react-router";
import type { Route } from "./+types/blogs";
import { Suspense, use } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  return listAllArticles(request);
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <div className="py-12 max-w-3xl m-auto ">
        <p className="tracking-wide">
          I'm <strong>Nischal Dahal</strong>, self-started software developer
          focusing on serverless architecture, android development, user
          experience, and product development. I am not Stack biased and always
          open to learning new technologies.
        </p>

        <br />

        <Blogs data={loaderData} />

        {/* <div className="image-list">
          <h1>Image List</h1>
          <div>
            {images.map((src, idx) => (
              <NavLink
                key={src}
                to={`/image/${idx}`}
                viewTransition // Enable view transitions for this link
              >
                <p>Image Number {idx}</p>
                <img className="max-w-full contain-layout" src={src} />
              </NavLink>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
}

function Blogs({ data }: { data: (Article & { slug: string })[] }) {
  // let value = use(data);

  return (
    <ul>
      {data.map((article) => (
        <li className="mb-2" key={article.slug}>
          <Link
            prefetch="intent"
            className="text-sm text-blue-600 dark:text-cyan-400 hover:underline hover:text-black dark:hover:text-white"
            to={`/${article.slug}`}
          >
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
