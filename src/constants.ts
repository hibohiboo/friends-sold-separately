/* eslint-disable @typescript-eslint/ban-ts-comment */

declare let VITE_DEFINE_BASE_PATH: string;
declare let VITE_DEFINE_SKYWAY_KEY: string;
declare let VITE_DEFINE_ROOM_PASSWORD: string;

export const basePath = VITE_DEFINE_BASE_PATH;
export const skywayKey = VITE_DEFINE_SKYWAY_KEY;
export const roomPassword = VITE_DEFINE_ROOM_PASSWORD;
export const spreadSheetId = import.meta.env.VITE_SPREAD_SHEET_ID;
export const spredSheetApiKey = import.meta.env.VITE_GCP_API_KEY_FOR_SPREAD_SHEET;
