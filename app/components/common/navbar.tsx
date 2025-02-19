import { ThemeSwitch } from "#app/routes/resources/theme-switch.tsx";
import type { Theme } from "#app/utils/theme.server.ts";
import { NavLink } from "react-router";

export default function Navbar({ theme }: {
  theme: Theme
}) {
  return (
    <div className="mt-10 flex flex-row gap-3 items-center self-center max-w-3xl m-auto">
      <ThemeSwitch userPreference={theme} key={theme} />
      <NavLink to={"/"}>/index</NavLink>
      <NavLink to={"/life"}>/life</NavLink>
    </div>
  );
}
