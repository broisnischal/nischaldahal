import { bundlePost } from "#app/.server/content.server.js";
import { getMDXComponent } from "mdx-bundler/client/index.js";
import React from "react";
import type { Route } from "./+types/_blog";

export async function loader({ request, params }: Route.LoaderArgs) {
  const data = await bundlePost(params.slug);
  return data;
}

export const meta: Route.MetaFunction = ({ data }) => {
  return [{ title: data.frontmatter.title }];
};

export default function Page({ loaderData }: Route.ComponentProps) {
  const { code, frontmatter } = loaderData;
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="py-12 max-w-3xl m-auto flex flex-col gap-4">
      <h1 className="dark:text-cyan-400">{frontmatter.title}</h1>
      <Component
        // mdx allow you to customize the components used in the markdown
        // this is optional but in most use cases you want to customize them
        components={{
          h1: (props) => (
            <h1 style={{ fontSize: "24px", fontWeight: "700" }} {...props} />
          ),
          h2: (props) => (
            <h2 style={{ fontSize: "20px", fontWeight: "500" }} {...props} />
          ),
          a: (props) => (
            <a
              style={{ color: "lightblue", textDecoration: "underline" }}
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote
              style={{ borderLeft: "5px solid lightblue", padding: "0 20px" }}
              {...props}
            />
          ),
          // you shoud define style or className after passing props to avoid being overwritten by children's style
          pre: (props) => (
            <pre
              {...props}
              style={{
                padding: "12px",
                overflow: "auto",
              }}
              className="border text-sm dark:bg-black/10 rounded-xl border-red-400 dark:border-gray-200/10"
            />
          ),
        }}
      />
    </div>
  );
}
