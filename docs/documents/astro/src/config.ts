export const SITE = {
  title: 'Doc',
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
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/hibohiboo/friends-sold-separately/tree/main/docs`;
export const BASE_PATH = 'friends-sold-separately';

export type Sidebar = Record<
  typeof KNOWN_LANGUAGE_CODES[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  ja: {
    目次: [
      { text: 'イントロダクション', link: `${BASE_PATH}/ja/introduction` },
      { text: '機能一覧', link: `${BASE_PATH}/ja/page-2` },
      { text: 'フロントエンド', link: `${BASE_PATH}/ja/frontend` },
      { text: 'ぎゅっとはんど', link: `${BASE_PATH}/ja/shakehand` },
      { text: '僕の私の説明書 作成ページ', link: `${BASE_PATH}/ja/profile` },
      { text: '僕の私の説明書 個人ページ', link: `${BASE_PATH}/ja/friendProfile` },
      { text: '僕も私も', link: `${BASE_PATH}/ja/notice` },
      { text: 'Beginners', link: `${BASE_PATH}/ja/beginners` },
      { text: 'Gallery', link: `${BASE_PATH}/ja/gallery` },
    ],
    開発用: [
      { text: 'OpenAPI Redoc', link: `${BASE_PATH}/api-schema/index.html` },
      { text: 'ユニットテスト カバレッジ', link: `${BASE_PATH}/coverage/index.html` },
      { text: 'リンク集', link: `${BASE_PATH}/ja/links` },
      { text: 'import依存関係図', link: `${BASE_PATH}/ja/dependencyCruiser` },
      // { text: 'Typedoc', link: `${BASE_PATH}/typedoc/index.html` },
    ],
  },
};
