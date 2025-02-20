import { ThemeSwitch } from '#app/routes/resources/theme-switch.tsx'
import type { Theme } from '#app/utils/theme.server.ts'
import { NavLink } from 'react-router'

export default function Navbar({ theme }: { theme: Theme | 'system' }) {
	return (
		<div className="m-auto mt-10 flex max-w-3xl flex-row items-center gap-3 self-center">
			<ThemeSwitch userPreference={theme} key={theme} />
			<NavLink to={'/'}>/index</NavLink>
			<NavLink to={'/life'}>/life</NavLink>
		</div>
	)
}
