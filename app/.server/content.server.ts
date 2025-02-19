import { readdirSync } from "fs";
import { bundleMDX } from "mdx-bundler";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Theme as RehypeTheme } from "rehype-pretty-code";
import { getTheme } from "../utils/theme.server";

export type Article = {
  title: string;
  category: string;
  writtenAt: string;
};

export async function bundlePost(slug: string, request: Request) {
  const path = `${process.cwd()}/app/contents/${slug}`;
  const theme = getTheme(request)

  // github-dark
  let rehypeTheme: RehypeTheme = theme === "dark" ? "dark-plus" : "min-light";

  return await bundleMDX({
    file: `${path}/page.mdx`,
    cwd: path,

    esbuildOptions: (options) => {
      // Configuration to allow image loading
      // https://github.com/kentcdodds/mdx-bundler#image-bundling
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".svg": "dataurl",
        ".gif": "dataurl",
      };
      return options;
    },
    mdxOptions(options, frontmatter: Article) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        // 👇 you can set your own theme from vscode themes
        [rehypePrettyCode, {
          ...(theme !== null ? { theme: rehypeTheme } : {}),
        }],
        [rehypeAutolinkHeadings, {
          properties: {
            className: ["anchor"],
          },
        }],
      ];
      return options;
    },

  });
}

export function getAllArticlesSlug() {
  return readdirSync(`${process.cwd()}/app/contents`);
}

export async function listAllArticles(request: Request) {
  const dirs = getAllArticlesSlug();
  const articles = await Promise.all(
    dirs.map(async (slug) => {
      const { frontmatter } = await bundlePost(slug, request);

      return { slug, ...frontmatter } as Article & { slug: string };
    })
  );
  articles.sort((a, b) => (a.writtenAt < b.writtenAt ? 1 : -1));
  return articles;
}
