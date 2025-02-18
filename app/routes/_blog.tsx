import { bundlePost } from "#app/.server/content.server.js";
import { getMDXComponent } from "mdx-bundler/client/index.js";
import React from 'react';
import type { Route } from "./+types/_blog";

export async function loader({ request, params }: Route.LoaderArgs) {
    return await bundlePost(params.slug);
}

export const meta: Route.MetaFunction = ({ data }) => {
    return [{ title: data.frontmatter.title }];
};

export default function Page({ loaderData }: Route.ComponentProps) {
    const { code, frontmatter } = loaderData;
    const Component = React.useMemo(() => getMDXComponent(code), [code]);
    return (
        <div>
            <h1>{frontmatter.title}</h1>
            <Component
                // mdx allow you to customize the components used in the markdown
                // this is optional but in most use cases you want to customize them
                components={{
                    h1: (props) => <h1 style={{ fontSize: "24px", fontWeight: "700" }} {...props} />,
                    h2: (props) => <h2 style={{ fontSize: "20px", fontWeight: "500" }} {...props} />,
                    a: (props) => <a style={{ color: "lightblue", textDecoration: "underline" }} {...props} />,
                    blockquote: (props) => <blockquote style={{ borderLeft: "5px solid lightblue", padding: "0 20px" }} {...props} />,
                    // you shoud define style or className after passing props to avoid being overwritten by children's style
                    pre: (props) => <pre {...props} style={{ borderRadius: "8px", margin: "8px", padding: "8px", overflow: "auto", backgroundColor: "gray" }} />,
                }}
            />
        </div>
    );
}
