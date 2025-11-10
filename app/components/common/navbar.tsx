import { ThemeSwitch } from '#app/routes/resources/theme-switch.tsx';
import type { Theme } from '#app/utils/theme.server.ts';
import { NavLink } from 'react-router';
import { twMerge } from 'tailwind-merge';


const links = [
	{ name: 'home', to: '/' },
	{ name: 'setup', to: '/setup' },
	{ name: 'github', to: 'github', href: 'https://github.com/broisnischal' }
]

export default function Navbar({ theme }: { theme: Theme | 'system' }) {


	return (
		<div className="m-auto mt-10 flex flex-row items-center gap-3">
			<ThemeSwitch userPreference={theme} key={theme} />
			{links.map(item => <LinkItem key={item.name} {...item} />)}
			{/* {<ClientOnly>
				{() => {
					const email = localStorage.getItem('email');
					return <LinkItem key={email} name="mail" to={email ? `mail?email=${email}` : 'mail'} />
				}}
			</ClientOnly>} */}
		</div>
	)
}

export function LinkItem({
	name,
	to,
	href,
	prefetch,
	className
}: {
	to: string;
	name: string;
	href?: string;
	className?: string
	// @ts-expect-error
	prefetch?: PrefetchBehavior
}) {
	return (
		<NavLink {... { target: href ? '_blank' : '_self' }} {...{ prefetch: prefetch }} className={({ isActive, isPending, isTransitioning }) => twMerge(isTransitioning ? 'transitioning' : isPending ? 'pending' : isActive ? 'active' : '', className)} to={href ?? to} > {name}</NavLink >
	)
}