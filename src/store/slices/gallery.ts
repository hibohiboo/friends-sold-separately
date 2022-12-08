import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sheetName: 'hibohiboo',
};

export type GalleryState = typeof initialState;
export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
});
