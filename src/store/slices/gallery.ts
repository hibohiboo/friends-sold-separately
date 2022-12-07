import { createSlice } from '@reduxjs/toolkit';

const domain = 'https://d3snr6xc5uvnuy.cloudfront.net';
const initialState = {
  items: [
    {
      name: 'スラグ',
      text: '娘と。',
      imageUrl: `${domain}/gallery/hibohiboo/0e6329b5.jpg`,
      sheetUrl: 'http://gurrad.verse.jp/newsheet/data/1279112241.html',
      illustCreator: '皐月紫龍',
      illustCreatorUrl: 'https://twitter.com/satukisiryu',
    },
  ],
};
export type GalleryState = typeof initialState;
export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
});
