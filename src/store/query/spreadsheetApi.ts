import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GalleryItem, GalleryItemSpreadSheet } from '@/domain/gallery/types';
import { spreadSheetId, spredSheetApiKey } from '@/constants';

type SpreadSheetResponse<T> = {
  range: string;
  majorDimension: string;
  values: T;
};

const range = 'A1:H200';
type SheetName = string;

export const spreadsheetApi = createApi({
  reducerPath: 'spreadsheet',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/',
  }),
  endpoints: (builder) => ({
    getGallery: builder.query<GalleryItem[], SheetName>({
      query: (sheet) => `${spreadSheetId}/values/${sheet}!${range}?key=${spredSheetApiKey}`,
      transformResponse(response: SpreadSheetResponse<GalleryItemSpreadSheet>) {
        const [first, , , ...rest] = response.values;
        const ret = rest
          .map(([name, text, imageUrl, sheetUrl, illustCreator, illustCreatorUrl]) => ({
            name,
            text,
            imageUrl,
            sheetUrl,
            illustCreator,
            illustCreatorUrl,
          }))
          .filter((item) => item.name && item.imageUrl);
        return ret;
      },
    }),
  }),
});
