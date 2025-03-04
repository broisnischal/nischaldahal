import { listAllArticles, type Article } from '#app/.server/content.server.js';
import { CommonLayout } from '#app/components/ui/common_layout.tsx';
import { Link } from 'react-router';
import type { Route } from './+types';




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
      <CommonLayout>

        <div>
          <h1 className="">About me</h1>
          <p className="text-zinc-500">a system architect 🚀 </p>
        </div>

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
      </CommonLayout>
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
      <p className="text-zinc-700 dark:text-zinc-50 mb-2">
        Subscribe to my articles using{' '}
        <a className="underline" href={url + 'rss'}>
          RSS
        </a>
        .
      </p>
      <ul className=" md:list-inside md:list-disc flex flex-col gap-2">
        {data.map((article) => (
          <li className="" key={article.slug}>
            <Link
              viewTransition
              state={{ back: url }}
              prefetch="intent"
              className=" visited:!text-zinc-500 dark:visited:!text-zinc-300 text-blue-600 dark:!text-blue-400 hover:underline hover:text-black dark:hover:text-white"
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
