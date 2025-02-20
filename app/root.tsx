import "#app/tailwind.css";
import clsx from "clsx";
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import type { Route } from "./+types/root";
import Navbar from "./components/common/navbar";
import { useTheme } from "./routes/resources/theme-switch";
import { ClientHintCheck, getHints } from "./utils/client-hints";
import { getTheme, type Theme } from "./utils/theme.server";
import { clientThemeCode } from "./misc/theme-provider";

export async function loader({ request }: Route.LoaderArgs) {
  return data({
    requestInfo: {
      hints: getHints(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
  });
}

function Document({
  children,
  theme = "light",
}: {
  children: React.ReactNode;
  theme?: Theme;
}) {
  return (
    <html lang="en" className={clsx(theme)} data-theme={theme}>
      <head>
        <ClientHintCheck />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="color-scheme"
          content={theme === "light" ? "light" : "dark"}
        />
        <meta name="MobileOptimized" content="320" />
        <meta name="pagename" content="Nischal Dahal" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Meta />
        <Links />
      </head>
      <body className="">
        <Layout>
          <Navbar theme={theme} />
          {children}
        </Layout>
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: clientThemeCode,
          }}
        />
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-3xl m-auto py-10 p-4 sm:px-0">{children}</div>;
}

export default function App() {
  const theme = useTheme();

  return (
    <Document theme={theme}>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const theme = useTheme();
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
      <Document theme={theme}>
        <Layout>
          <h1 className="text-3xl font-bold">Opps Sorry!</h1>
          <br />
          <p>{error?.message ?? "Unknown error"}</p>
        </Layout>
      </Document>
    </>
  );
}
