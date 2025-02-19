import {
  index,
  route,
  type RouteConfig,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/blogs.tsx"),
  //   route("blog", "routes/blogs.tsx"),
  route(":slug", "routes/_blog.tsx"),
  route("image/:id", "routes/image-details.tsx"),

  // Others
  route("robots.txt", "routes/others/[robots.txt].tsx"),
  route("sitemap.xml", "routes/others/sitemap[.]xml.tsx"),
  route("rss", "routes/others/blogs.[rss].ts"),
  route("feed", "routes/others/feed[.]json.tsx"),

  // layout("./auth/layout.tsx", [
  //   route("login", "./auth/login.tsx"),
  //   route("register", "./auth/register.tsx"),
  // ]),

  route("resources/theme-switch", "routes/resources/theme-switch.tsx"),

  ...prefix("api", [
    // index("./concerts/home.tsx"),
    // route(":city", "./concerts/city.tsx"),
    // route("blogs", "./concerts/blogs.tsx"),
  ]),
] satisfies RouteConfig;
