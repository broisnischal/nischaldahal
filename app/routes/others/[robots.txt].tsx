import type { Route } from "./+types/[robots.txt]";

export const loader = ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  let host = url.host;

  const robotText = `User-agent: *
Allow: /
Disallow: /dashboard
Sitemap: https://${host}/sitemap.xml`;

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
