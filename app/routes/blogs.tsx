import { listAllArticles } from "#app/.server/content.server.js";
import { Link } from "react-router";
import type { Route } from "./+types/blogs";

export async function loader() {
  return await listAllArticles();
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Blog list</h1>
      <ul>
        {loaderData.map((article) => (
          <li key={article.slug}>
            <Link to={`/blog/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
