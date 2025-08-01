import '#app/tailwind.css';
import clsx from 'clsx';
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from 'react-router';
import type { Route } from './+types/root';
import Footer from '#app/components/common/footer.tsx';
import Navbar from '#app/components/common/navbar.tsx';
import { PublicEnv, ScriptDangerously } from '#app/lib/index.tsx';
import { getPublicEnv } from './misc/env.common';
import { useTheme } from './routes/resources/theme-switch';
import { ClientHintCheck, getHints } from './utils/client-hints';
import { getTheme, type Theme } from './utils/theme.server';
import ProgessBar from './components/common/progress';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'



export async function loader({ request }: Route.LoaderArgs) {
  return data({
    requestInfo: {
      hints: getHints(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
    publicEnv: getPublicEnv(),
  });
}


export const meta: Route.MetaFunction = ({ data, location }) => {
  return [
    { title: "Nischal Dahal - aka broisnischal" },
    {
      name: "description",
      content: "self-started software developer focusing on serverless architecture, android development, user experience, and product development. I am not Stack biased and always open to learning new technologies, list of articles wrote by @broisnees.",
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Nischal Dahal",
        sameAs: [
          "https://github.com/broisnischal",
          "https://twitter.com/broisnees",
          "https://www.linkedin.com/in/nischalxdahal/",
          "https://t.me/broisnees",
          "https://instagram.com/broisnischal",
        ],
      })
    }
  ];
};

function Document({
  children,
  theme = 'dark',
  loaderData,
}: {
  children: React.ReactNode;
  loaderData: Route.ComponentProps['loaderData'];
  theme?: Theme | 'system';
}) {

  return (
    <html lang="en" className={clsx(theme)} data-theme={theme}>
      <head>
        <ClientHintCheck nonce={new Date().toString()} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="color-scheme"
          content={theme === 'light' ? 'light' : 'dark'}
        />
        <meta name="MobileOptimized" content="320" />
        <meta name="pagename" content="Nischal Dahal" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="google-site-verification" content="SAicmvgme7yZ8Zn1YN8znyRQdE6jRbPQ3pz7-aQSjig" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8W9712L3LK"></script>
        <Meta />
        <Links />
      </head>
      <body className="">

        <Layout>
          <ProgessBar />

          <Navbar theme={theme} />
          {children}
          <Footer />
        </Layout>
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
        <Scripts />
        <ScriptDangerously html={`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-8W9712L3LK');`}
        />
        <PublicEnv {...loaderData.publicEnv} />
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="m-auto max-w-4xl p-4 py-0 md:py-10 sm:px-0">{children}</div>;
}

/**Root App */
export default function App({ loaderData }: Route.ComponentProps) {
  const theme = useTheme();

  return (
    <Document loaderData={loaderData} theme={theme}>
      <NuqsAdapter>
        <Outlet />
      </NuqsAdapter>
    </Document>
  );
}

export function ErrorBoundary({ }: Route.ErrorBoundaryProps) {
  const theme = useTheme();
  const loaderDataA = useLoaderData();
  const error: any = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  return (
    <>
      <Document loaderData={loaderDataA} theme={theme}>
        <Layout>
          <h1 className="text-3xl font-bold">Opps Sorry!</h1>
          <br />
          <p>{error?.message ?? 'Unknown error'}</p>
        </Layout>
      </Document>
    </>
  );
}
