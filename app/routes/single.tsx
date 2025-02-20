import { bundlePost } from '#app/.server/content.server.ts';
import { getMDXComponent } from 'mdx-bundler/client/index.js';
import React from 'react';
import type { Route } from './+types/single.ts';
import { useTheme } from './resources/theme-switch.tsx';

export async function loader({ request, params }: Route.LoaderArgs) {
  const data = await bundlePost(params.slug, request);
  return data;
}

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: data.frontmatter.title }];
};

export default function Page({ loaderData }: Route.ComponentProps) {
  const theme = useTheme();

  const { code, frontmatter } = loaderData;
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="pt-12 pb-32 max-w-3xl m-auto flex flex-col gap-4">
      <h1 className="dark:text-cyan-400 text-blue-500 font-bold">
        {frontmatter.title}
      </h1>
      <Component
        // mdx allow you to customize the components used in the markdown
        // this is optional but in most use cases you want to customize them
        components={{
          h1: (props) => (
            <h1 style={{ fontSize: '24px', fontWeight: '700' }} {...props} />
          ),
          h2: (props) => (
            <h2 style={{ fontSize: '20px', fontWeight: '500' }} {...props} />
          ),
          a: (props) => (
            <a
              style={{ textDecoration: 'underline' }}
              className="text-blue-600 dark:text-cyan-400 hover:underline hover:text-black dark:hover:text-white"
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote
              style={{ borderLeft: '5px solid lightblue', padding: '0 20px' }}
              {...props}
            />
          ),
          // you shoud define style or className after passing props to avoid being overwritten by children's style
          pre: (props) => (
            <pre
              {...props}
              style={{
                padding: '12px',
                overflow: 'auto',
                border:
                  theme === 'dark'
                    ? '1px solid #e0e0e020'
                    : '1px solid #e0e0e0',
                background: theme === 'dark' ? '#1f1f1f90' : '#f8f8f8',
              }}
              className="text-sm rounded-xl"
            />
          ),
          img: (props) => (
            <img
              {...props}
              className="rounded-md border border-gray-300/50 dark:border-gray-500/50"
            />
          ),
          code: (props) => <code {...props} />,
          p: (props) => <p {...props} className="" />,
          li: (props) => <li {...props} />,
        }}
      />
    </div>
  );
}
