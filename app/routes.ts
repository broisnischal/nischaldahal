import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
    index('routes/index.tsx'),
    route('blog', 'routes/blogs.tsx'),
    route('blog/:slug', 'routes/_blog.tsx'),
] satisfies RouteConfig;
