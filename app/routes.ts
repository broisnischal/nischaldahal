import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/blogs.tsx"),
  //   route("blog", "routes/blogs.tsx"),
  route("blog/:slug", "routes/_blog.tsx"),
  route("robots.txt", "routes/seo/[robots.txt].tsx"),
  route("sitemap.xml", "routes/seo/sitemap[.]xml.tsx"),
] satisfies RouteConfig;
