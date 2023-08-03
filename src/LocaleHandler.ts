import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import allLocales from './all-locales';

export class LocaleHandler {
	protected readonly url: URL;
	protected readonly acceptLanguages: string;
	protected readonly availableLocales: string[];
	protected readonly defaultLocale: string;

	constructor(options: {
		url: URL;
		acceptLanguages: string;
		availableLocales: string[];
		defaultLocale: string;
	}) {
		this.url = options.url;
		this.acceptLanguages = options.acceptLanguages;
		this.availableLocales = options.availableLocales;
		this.defaultLocale = options.defaultLocale;
	}

	get pathnameHasMissingLocale(): boolean {
		const pathname = this.url.pathname;
		const hasAvailableLocale =
			!!pathname &&
			this.availableLocales.some((locale) => {
				return (
					pathname.startsWith(`/${locale}/`) ||
					pathname === `/${locale}`
				);
			});
		return hasAvailableLocale !== true;
	}

	getDefaultLocaleUrl(): URL {
		return this.getUrlByLocale(this.defaultLocale);
	}

	getPreferredLocaleUrl(): URL {
		return this.getUrlByLocale(this.getPreferredLocale());
	}

	protected getPreferredLocale(): string {
		const headers = {
			'accept-language': this.acceptLanguages,
		};
		const languages = new Negotiator({ headers }).languages();
		return match(languages, this.availableLocales, this.defaultLocale);
	}

	protected getUrlByLocale(locale: string): URL {
		const pathname = this.getCleanPathname();
		const search = this.url.search;
		const hash = this.url.hash;
		const url = [
			'/' + locale,
			pathname ? '/' + pathname : '',
			search || '',
			hash || '',
		].join('');
		return new URL(url, this.url);
	}

	protected getCleanPathname(): string {
		const pathname = this.url.pathname.replace(/^\/+/g, '');
		const [currentLocale, ...segments] = pathname.split('/');
		if (allLocales.includes(currentLocale)) {
			return segments.join('/');
		} else {
			return pathname;
		}
	}
}
