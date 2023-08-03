import { describe, expect, it } from 'vitest';
import { LocaleHandler } from '../LocaleHandler';

describe('LocaleHandler', () => {
	describe('getter `.pathnameHasMissingLocale`', () => {
		it('it should detect pathname with the missing locale', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/ja/news'),
			});
			expect(localeHandler.pathnameHasMissingLocale).toBeTruthy();
		});

		it('it should detect pathname with the available locale', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/en/news'),
			});
			expect(localeHandler.pathnameHasMissingLocale).toBeFalsy();
		});
	});

	describe('method `.getPreferredLocaleUrl()`', () => {
		it('should redirect to the preferred locale (homepage)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/'),
			});
			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getPreferredLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/en');
		});

		it('should redirect to the preferred locale (inner page with search params)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/news/page?sort=abc'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getPreferredLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/en/news/page?sort=abc');
		});

		it('should redirect to the preferred locale (inner page with hash)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/news/page#dev'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getPreferredLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/en/news/page#dev');
		});

		it('should redirect to the preferred locale (inner page with search params and hash)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/news/page?sort=abc#dev'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getPreferredLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/en/news/page?sort=abc#dev');
		});

		it('should redirect from unacceptable locale to the preferred locale (homepage)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/nl'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getPreferredLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/en');
		});

		it('should redirect from unacceptable locale to the preferred locale (inner page with search params)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/nl/news/page?sort=abc'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getPreferredLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/en/news/page?sort=abc');
		});
	});

	describe('method `.getDefaultLocaleUrl()`', () => {
		it('should redirect to the default locale (homepage)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getDefaultLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/uk');
		});

		it('should redirect to the default locale (inner page with search params)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/news/page?sort=abc'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getDefaultLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/uk/news/page?sort=abc');
		});

		it('should redirect to the default locale (inner page with hash)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/news/page#dev'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getDefaultLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/uk/news/page#dev');
		});

		it('should redirect to the default locale (inner page with search params and hash)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/news/page?sort=abc#dev'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getDefaultLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/uk/news/page?sort=abc#dev');
		});

		it('should redirect from unacceptable locale to the default locale (homepage)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/nl'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getDefaultLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/uk');
		});

		it('should redirect from unacceptable locale to the default locale (inner page with search params)', () => {
			const localeHandler = new LocaleHandler({
				acceptLanguages: 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
				availableLocales: ['uk', 'en'],
				defaultLocale: 'uk',
				url: new URL('https://site.com/nl/news/page?sort=abc'),
			});

			let url = '';
			if (localeHandler.pathnameHasMissingLocale) {
				const redirect = localeHandler.getDefaultLocaleUrl();
				url = redirect.toString();
			}
			expect(url).toBe('https://site.com/uk/news/page?sort=abc');
		});
	});
});
