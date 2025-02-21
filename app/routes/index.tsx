import { listAllArticles, type Article } from '#app/.server/content.server.js';
import { Link } from 'react-router';
import type { Route } from './+types';
import { ClipboardCheck, Clipboard } from 'lucide-react';
import { useState } from 'react';

export async function loader({ request }: Route.LoaderArgs) {
  return {
    posts: await listAllArticles(request),
    url: new URL(request.url),
  };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const command = 'npx ezyenv';

  return (
    <>
      <div className="py-12 min-w-2xl m-auto ">
        <p className="tracking-wide text-balance">
          I am <strong>Nischal Dahal</strong>, self-started software developer
          focusing on serverless architecture, android development, user
          experience, and product development. I am not Stack biased and always
          open to learning new technologies.
        </p>

        {/* <ClientOnly>
          {() => {
            console.log(window.PUBLIC_ENV);
            return <h1>{window.PUBLIC_ENV?.googleMapsApiKey} </h1>;
          }}
        </ClientOnly> */}

        <br />

        {/* {getPublicEnv().stripePublicKey} */}

        <Blogs data={loaderData.posts} url={loaderData.url.toString()} />

        {/* <div className="image-list">
          <h1>Image List</h1>
          <div>
            {images.map((src, idx) => (
              <NavLink
                key={src}
                to={`/image/${idx}`}
                viewTransition // Enable view transitions for this link
              >
                <p>Image Number {idx}</p>
                <img className="max-w-full contain-layout" src={src} />
              </NavLink>
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
}

function Blogs({
  data,
  url,
}: {
  data: (Article & { slug: string })[];
  url: string;
}) {
  // let value = use(data);

  return (
    <div>
      <p className="text-zinc-600 dark:text-zinc-400 mb-2">
        Subscribe to my articles using{' '}
        <a className="underline" href={url + 'rss'}>
          RSS
        </a>
        .
      </p>
      <ul className="list-inside list-disc">
        {data.map((article) => (
          <li className="" key={article.slug}>
            <Link
              viewTransition
              state={{ back: url }}
              prefetch="intent"
              className="text-sm text-blue-600 dark:!text-blue-400 hover:underline hover:text-black dark:hover:text-white"
              to={`/${article.slug}`}
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
