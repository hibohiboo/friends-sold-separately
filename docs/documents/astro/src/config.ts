export const SITE = {
  title: 'Documentation',
  description: 'Your website description.',
  defaultLanguage: 'ja_JP',
};

export const OPEN_GRAPH = {
  image: {
    src: 'https://d3snr6xc5uvnuy.cloudfront.net/friends-shakehand/assets/icons/fa-handshake-regular.svg',
    alt: 'font awesome',
  },
  twitter: 'hibohiboo',
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: 'ltr' | 'rtl';
  ogLocale?: string;
  lang?: string;
};

export const KNOWN_LANGUAGES = {
  日本語: 'ja',
  English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/hibohiboo/friends-sold-separately/tree/main/docs`;
