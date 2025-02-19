import { listAllArticles } from "#app/.server/content.server.js";
import { RSS } from "#app/modules/rss.server.js";
import { xml } from "remix-utils/responses";
import type { Route } from "./+types/blogs.[rss]";

export async function loader({ request, context }: Route.LoaderArgs) {
  // void new Logger(context).http(request);
  const url = new URL(request.url);

  // let db = database(context.db);
  // let articles = await Article.list({ db });

  let posts = await listAllArticles(request);

  let rss = new RSS({
    title: "Blogs by Nischal Dahal",
    description: "The complete list of articles wrote by @broisnees.",
    link: "https://nischal-dahal.com.np/blogs.rss",
  });

  for (let article of posts) {
    // let link = new URL(`/blog/${article.slug}`, ).toString();
    let link = `${url.host}/blog/${article.slug}`;
    rss.addItem({
      guid: article.slug,
      title: article.slug.replace(/-/g, " "),
      description: `${article.title}\n<a href="${link}">Read it on the web</a>`,
      link,
      pubDate: new Date(article.writtenAt).toUTCString(),
    });
  }
  return xml(rss.toString());
}
