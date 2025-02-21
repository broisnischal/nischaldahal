import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode, {
  type Theme as RehypeTheme,
} from 'rehype-pretty-code';
import { getTheme } from '../utils/theme.server';



// Rehype & Remark
import rehypeExternalLinks from 'rehype-external-links';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkSlug from 'remark-slug';
import remarkSmartypants from 'remark-smartypants';
import remarkToc from 'remark-toc';
import { visit } from 'unist-util-visit';

export type Article = {
  title: string;
  category: string;
  writtenAt: string;
};

export async function bundlePost(slug: string, request: Request) {
  const path = `${process.cwd()}/contents/${slug}`;
  const theme = getTheme(request);

  // github-dark
  let rehypeTheme: RehypeTheme = theme === 'dark' ? 'dark-plus' : 'min-light';

  return await bundleMDX({
    file: `${path}/page.mdx`,
    cwd: path,
    esbuildOptions: (options) => {
      // Configuration to allow image loading
      // https://github.com/kentcdodds/mdx-bundler#image-bundling
      options.loader = {
        ...options.loader,
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.svg': 'dataurl',
        '.gif': 'dataurl',
      };
      return options;
    },
    mdxOptions(options, frontmatter: Article) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [
          rehypePrettyCode,
          {
            ...(theme !== null ? { theme: rehypeTheme } : {}),
          },
        ],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['noopener', 'noreferrer'],
          },
        ],
        rehypeKatex, // Math support
      ];
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkDirective,
        remarkAlerts,
        remarkGfm, // GitHub-flavored markdown (tables, strikethrough, etc.)
        remarkSmartypants, // Smart typography (quotes, dashes, ellipses)
        remarkMath, // Support for `$` math notation
        [
          remarkToc,
          {
            heading: 'Table of Contents',
          },
        ],
        [
          remarkSlug, {
            slugify: (s: string) => {
              return s
                .toLowerCase()
                .replace(/[^\w]+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
            },
          }]
        // MarkdownItGitHubAlerts
      ];

      options.compact = true;



      return options;
    },
  });
}

export async function listAllArticles(request: Request) {
  // const dirs = getAllArticlesSlug();
  // const articles = await Promise.all(
  //   dirs.map(async (slug) => {
  //     const { frontmatter } = await bundlePost(slug, request);
  //     return { slug, ...frontmatter } as Article & { slug: string };
  //   })
  // );
  // articles.sort((a, b) => (a.writtenAt < b.writtenAt ? 1 : -1));
  // return articles;
  const slugs = getAllArticlesSlug();
  const articles = slugs.map((slug) => {
    const frontmatter = getArticleMetadata(slug);
    return { slug, ...frontmatter } as Article & { slug: string };
  });

  articles.sort((a, b) => (a.writtenAt < b.writtenAt ? 1 : -1));
  return articles;
}

function getArticleMetadata(slug: string): Article {
  const fileContent = readFileSync(
    `${process.cwd()}/contents/${slug}/page.mdx`,
    'utf-8',
  );
  const { data } = matter(fileContent);
  return data as Article;
}

export function getAllArticlesSlug() {
  return readdirSync(`${process.cwd()}/contents`);
}

function remarkAlerts() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        const data = node.data || (node.data = {});
        const tagName = node.name;

        if (['note', 'tip', 'warning', 'danger'].includes(tagName)) {
          data.hName = 'div';
          data.hProperties = {
            className: `alert alert-${tagName}`,
          };
        }
      }
    });
  };
}
