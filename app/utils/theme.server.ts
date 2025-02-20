import * as cookie from 'cookie'

export type Theme = 'light' | 'dark'

const cookieName = 'en_theme' // 'CH-prefers-color-scheme'

export function setTheme(theme: Theme | 'system') {
	if (theme === 'system') {
		return cookie.serialize(cookieName, '', { path: '/', maxAge: -1 })
	} else {
		return cookie.serialize(cookieName, theme, { path: '/', maxAge: 31536000 })
	}
}

export function getTheme(request: Request): Theme | 'system' | null {
	const cookieHeader = request.headers.get('cookie')
	const parsed = cookieHeader
		? cookie.parse(cookieHeader)[cookieName]
		: 'system'
	if (parsed === 'light' || parsed === 'dark' || parsed === 'system')
		return parsed
	return null
}
