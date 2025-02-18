import { readdirSync } from "fs";
import { bundleMDX } from "mdx-bundler";
import rehypePrettyCode from "rehype-pretty-code";

type Article = {
    slug: string;
    title: string;
    category: string;
    writtenAt: string;
};

export async function bundlePost(slug: string) {
    const path = `${process.cwd()}/app/contents/${slug}`;
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
        mdxOptions(options, frontmatter) {
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                // 👇 you can set your own theme from vscode themes
                [rehypePrettyCode, { theme: "nord" }],
            ];
            return options;
        },
    });
}

export function getAllArticlesSlug() {
    return readdirSync(`${process.cwd()}/app/contents`);
}

export async function listAllArticles() {
    const dirs = getAllArticlesSlug();
    const articles: Article[] = await Promise.all(
        dirs.map(async (slug) => {
            const { frontmatter } = await bundlePost(slug);
            return { slug, ...frontmatter } as Article;
        }),
    );
    articles.sort((a, b) => a.writtenAt < b.writtenAt ? 1 : -1);
    return articles;
}
