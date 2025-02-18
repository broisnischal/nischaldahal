import "#app/tailwind.css";
import { Links, Meta, Outlet, Scripts } from "react-router";

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
