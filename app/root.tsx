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
import { ThemeSwitch, useTheme } from "./routes/resources/theme-switch";
import { ClientHintCheck, getHints } from "./utils/client-hints";
import { getTheme, type Theme } from "./utils/theme.server";

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
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeSwitch userPreference={theme} key={theme} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  const theme = useTheme()


  return (
    <Document theme={theme}>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
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
      <Document>

        <h1>Error!</h1>
        <p>{error?.message ?? "Unknown error"}</p>
      </Document>
    </>
  );
}

