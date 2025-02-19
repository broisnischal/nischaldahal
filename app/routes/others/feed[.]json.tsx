import { listAllArticles } from "#app/.server/content.server.js";
import { data } from "react-router";
import type { Route } from "./+types/feed[.]json";

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const posts = await listAllArticles();

  const list = posts.reduce((acc, post) => {
    acc.push({
      id: `${post.slug}`,
      url: `https://${url.host}/blog/${post.slug}`,
      title: post.title,
      content_text: post.title,
      date_published: post.writtenAt,
    });
    return acc;
  }, [] as any[]);

  return data({
    version: "https://jsonfeed.org/version/1",
    title: "nischal-dahal.com.np",
    home_page_url: `https://${url.host}`,
    feed_url: `https://${url.host}/feed.json`,
    description:
      "Nischal Dahal is a full-stack developer and a founder of nischal-dahal.com.np",
    next_url: "https://bret.io/2017.json",
    icon: "https://avatars.githubusercontent.com/u/98168009?v=4",
    author: {
      name: "Nischal Dahal",
      url: `https://x.com/broisnees`,
      avatar: "https://avatars.githubusercontent.com/u/98168009?v=4",
    },
    items: [...list],
  });
}
