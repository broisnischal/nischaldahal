import { listAllArticles, type Article } from '#app/.server/content.server.js';
import { CommonLayout } from '#app/components/common/common_layout.tsx';
import { Link } from 'react-router';
import type { Route } from './+types';
import { Kbd } from '#app/components/common/kbd.tsx';
import { Separator } from '#app/components/ui/separator.tsx';

export async function loader({ request }: Route.LoaderArgs) {

  const verbs = ['eccentric', 'inquistive', 'enthusiastic', 'explorer', 'hustler', 'insurgent', 'maverick', 'renegade'];

  const verb = verbs[Math.floor(Math.random() * verbs.length + 1)];

  return {
    posts: await listAllArticles(request),
    url: new URL(request.url),
    verb,
  };
}


export function Header({ verb }: { verb?: string }) {

  return (
    <div>
      <div className="">
        <h4 className="text-sm leading-none font-medium">a.k.a System architect <Kbd className="!text-xs !text-zinc-500 dark:!text-zinc-400">🚀</Kbd></h4>
        <p className="text-muted-foreground text-sm">
          I learn and love about technology, and also a <Kbd className="!text-xs">{verb || 'indefinite person'}</Kbd>.
        </p>
      </div>
      <Separator className="my-4 w-min" />
    </div>
  )
}



export default function Page({ loaderData }: Route.ComponentProps) {
  const command = 'npx ezyenv';

  return (
    <>
      <CommonLayout>

        {/* <p className="text-zinc-700 dark:text-zinc-50">a system architect 🚀 </p>
          <p className="text-zinc-700 dark:text-zinc-50"></p>
          <p>synonym for broisnees is <Kbd>eccentric</Kbd></p> */}
        <Header verb={loaderData.verb} />

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
