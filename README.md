# @wezom/locale-handler

> Locale handler for middleware with redirects

| Statements                                                                               | Branches                                                                             | Functions                                                                              | Lines                                                                          |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

---

## Installation

Via [pnpm](https://pnpm.js.org/):

```sh
pnpm add @wezom/locale-handler
```

Via [npm](https://www.npmjs.com/):

```sh
npm install @wezom/locale-handler
```

Via [yarn](https://yarnpkg.com/):

```sh
yarn add @wezom/locale-handler
```

## Usage example with Next.js App Route

According to Next.js documentation
about [Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization),
you can create a own middleware to handle missing locales redirects.

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { LocaleHandler } from '@wezom/locale-handler';

export function middleware(request: NextRequest): void | NextResponse {
	const localeHandler = new LocaleHandler({
		acceptLanguages: request.headers.get('accept-language'),
		availableLocales: ['uk', 'en'],
		defaultLocale: 'uk',
		url: request.nextUrl,
	});

	if (localeHandler.pathnameHasMissingLocale) {
		const url = localeHandler.getPreferredLocaleUrl();
		return NextResponse.redirect(url);
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```
