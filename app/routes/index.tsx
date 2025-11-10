import { listAllArticles, type Article } from '#app/.server/content.server.js';
import { CommonLayout } from '#app/components/common/common_layout.tsx';
import { Link } from 'react-router';
import type { Route } from './+types';
import { Kbd } from '#app/components/common/kbd.tsx';
import { Separator } from '#app/components/ui/separator.tsx';

export async function loader({ request }: Route.LoaderArgs) {

  const verbs = ['eccentric', 'inquistive', 'enthusiastic', 'explorer', 'hustler', 'insurgent', 'maverick', 'renegade'];

  const verb = verbs[Math.floor(Math.random() * verbs.length - 1)];

  return {
    posts: await listAllArticles(request),
    url: new URL(request.url),
    verb,
  };
}


export function Header({ verb }: { verb?: string }) {

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm leading-none font-medium">a.k.a System architect <Kbd className="!text-xs !text-zinc-500 dark:!text-zinc-400">🚀</Kbd></h4>
      <p className="text-muted-foreground text-sm">
        I learn and love about technology, and also a <Kbd className="!text-xs">{verb || 'indefinite person'}</Kbd>.
      </p>
    </div>
  )
}



export default function Page({ loaderData }: Route.ComponentProps) {
  const command = 'npx ezyenv';

  return (
    <>
      <CommonLayout>
        <Header verb={loaderData.verb} />
        <Separator className="my-2 w-auto" />
        <Blogs data={loaderData.posts} url={loaderData.url.toString()} />
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
