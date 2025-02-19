import { xml } from "remix-utils/responses";
import type { Route } from "./+types/sitemap[.]xml";
import { Sitemap } from "#app/modules/sitemap.server.js";
import { listAllArticles } from "#app/.server/content.server.js";

export async function loader({ request }: Route.LoaderArgs) {
  // @ts-ignore
  // const build = await import('virtual:react-router/server-build');
  const blogs = await listAllArticles();

  const publicRoutes = [
    "/",
    "/blog",
    "/about",
    ...blogs.map((blog) => `/blog/${blog.slug}`),
  ];

  const url = new URL(request.url);
  const host = url.host;

  const sitemap = new Sitemap();

  for (const route of publicRoutes) {
    sitemap.append(new URL(route, `https://${host}`), new Date());
  }

  return xml(sitemap.toString());
}
