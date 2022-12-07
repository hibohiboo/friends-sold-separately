import { createSlice } from '@reduxjs/toolkit';

export interface ConfigState {
  beta: boolean;
}
const params = new URL(document.URL).searchParams;
const initialState: ConfigState = {
  beta: params.get('beta') != null,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
});
