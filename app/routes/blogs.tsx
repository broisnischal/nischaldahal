import { listAllArticles } from "#app/.server/content.server.js";
import { Link } from "react-router";
import type { Route } from "./+types/blogs";

export async function loader({ request }: Route.LoaderArgs) {
  return await listAllArticles(request);
}

export const images = [
  "https://remix.run/blog-images/headers/the-future-is-now.jpg",
  "https://remix.run/blog-images/headers/waterfall.jpg",
  "https://remix.run/blog-images/headers/webpack.png",
];

export default function Page({ loaderData }: Route.ComponentProps) {



  return (
    <>
      <div className="p-12 max-w-3xl m-auto">
        <ul>
          {loaderData.map((article) => (
            <li className="mb-2" key={article.slug}>
              <Link to={`/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>

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
