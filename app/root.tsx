import "#app/tailwind.css";
import { Links, Meta, Outlet, Scripts } from "react-router";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/footer";

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <Outlet />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
