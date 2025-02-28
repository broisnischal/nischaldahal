import {
  index,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),
  route(':slug', 'routes/single.tsx'),
  route('image/:id', 'routes/image-details.tsx'),

  // Pages
  route('life', 'routes/r/life.tsx'),
  route('mail', 'routes/r/mail/index.tsx'),

  // Others
  route('robots.txt', 'routes/others/[robots.txt].tsx'),
  route('sitemap.xml', 'routes/others/sitemap[.]xml.tsx'),
  route('rss', 'routes/others/blogs.[rss].ts'),
  route('feed', 'routes/others/feed[.]json.tsx'),

  // layout("./auth/layout.tsx", [
  //   route("login", "./auth/login.tsx"),
  //   route("register", "./auth/register.tsx"),
  // ]),

  route('resources/theme-switch', 'routes/resources/theme-switch.tsx'),

  ...prefix('api', [
    // index("./concerts/home.tsx"),
    // route(":city", "./concerts/city.tsx"),
    // route("blogs", "./concerts/blogs.tsx"),
  ]),
] satisfies RouteConfig;
