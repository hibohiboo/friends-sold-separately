import { createSlice } from '@reduxjs/toolkit';

const domain = 'https://d3snr6xc5uvnuy.cloudfront.net/gallery/hibohiboo';
const initialState = {
  items: [
    {
      name: 'スラグ',
      text: '',
      imageUrl: `${domain}/8a81e890.png`,
      sheetUrl: 'http://gurrad.verse.jp/newsheet/data/1279112241.html',
      illustCreator: '皐月紫龍',
      illustCreatorUrl: 'https://twitter.com/satukisiryu',
    },
    {
      name: 'スラグ',
      text: ' 笑顔',
      imageUrl: `${domain}/7412a469.jpg`,
      sheetUrl: 'http://gurrad.verse.jp/newsheet/data/1279112241.html',
      illustCreator: '皐月紫龍',
      illustCreatorUrl: 'https://twitter.com/satukisiryu',
    },
    {
      name: 'スラグ',
      text: '娘と。',
      imageUrl: `${domain}/0e6329b5.jpg`,
      sheetUrl: 'http://gurrad.verse.jp/newsheet/data/1279112241.html',
      illustCreator: '皐月紫龍',
      illustCreatorUrl: 'https://twitter.com/satukisiryu',
    },
    {
      name: 'イスズ',
      text: 'ワンピース',
      imageUrl: `${domain}/200805601i.jpg`,
      sheetUrl: 'http://gurrad.kuron.jp/sw4/data/1171675294.html',
      illustCreator: '老犬',
      illustCreatorUrl: 'https://twitter.com/rou_ken',
    },
    {
      name: 'セレン',
      text: '',
      imageUrl: `${domain}/1115610517.png`,
      sheetUrl: 'http://gurrad.kuron.jp/sw4/data/1115610517.html',
      illustCreator: 'ウー',
      illustCreatorUrl: 'https://www.pixiv.net/users/141468',
    },
    {
      name: 'アザム',
      text: '',
      imageUrl: `${domain}/1144849518.jpg`,
      sheetUrl: 'http://gurrad.kuron.jp/sw4/data/1144849518.html',
      illustCreator: '老犬',
      illustCreatorUrl: 'https://twitter.com/rou_ken',
    },
  ],
};

export type GalleryState = typeof initialState;
export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
});
