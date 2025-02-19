import "#app/tailwind.css";
import clsx from "clsx";
import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { useTheme } from "./routes/resources/theme-switch";
import { ClientHintCheck, getHints } from "./utils/client-hints";
import { getTheme, type Theme } from "./utils/theme.server";

export async function loader({ request }: Route.LoaderArgs) {

  return data({
    requestInfo: {
      hints: getHints(request),
    },
    userPrefs: {
      theme: getTheme(request),
    },
  });
}

export default function App() {
  const theme = useTheme();

  return (
    <Document theme={theme}>
      <Outlet />
    </Document>
  );
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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// export default function App() {
//   return (
//     <html>
//       <head>
//         <ClientHintCheck />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         {/* <Navbar /> */}
//         <Outlet />
//         {/* <Footer /> */}
//         <Scripts />
//       </body>
//     </html>
//   );
// }
