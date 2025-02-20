import { ThemeSwitch } from '#app/routes/resources/theme-switch.tsx';
import type { Theme } from '#app/utils/theme.server.ts';
import { NavLink } from 'react-router';

export default function Navbar({ theme }: { theme: Theme | 'system' }) {
	return (
		<div className="m-auto mt-10 flex max-w-3xl flex-row items-center gap-3 self-center">
			<ThemeSwitch userPreference={theme} key={theme} />
			{[{ name: 'index', to: '/' }, { name: 'life', to: '/life' }, { name: 'github', to: 'github', href: 'https://github.com/broisnischal' }].map(item => <LinkItem key={item.name} {...item} />)}
		</div>
	)
}


function LinkItem({
	name,
	to,
	href,
	prefetch
}: {
	to: string;
	name: string;
	href?: string
	// @ts-expect-error
	prefetch?: PrefetchBehavior
}) {
	return (
		<NavLink {... { target: href ? '_blank' : '_self' }} {...{ prefetch: prefetch }} className={({ isActive, isPending, isTransitioning }) => isTransitioning ? 'transitioning' : isPending ? 'pending' : isActive ? 'active' : ''} to={href ?? to} > {name}</NavLink >
	)
}