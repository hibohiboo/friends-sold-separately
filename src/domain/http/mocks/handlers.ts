// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import gyuttoAttr from './response/get-gyutto-hand-favorites';
import gyuttoHandUser from './response/get-gyutto-hand-user';

export const handlers = [
  rest.put('/v1/api/gyutto-hand-user', (req, res, ctx) => {
    console.log('put', req);
    return res(ctx.status(200));
  }),
  rest.get('/v1/api/gyutto-hand-user', (req, res, ctx) => {
    console.log('get', req);
    return res(ctx.status(200), ctx.json(gyuttoHandUser));
  }),
  rest.put('/v1/api/gyutto-hand-favorite', (req, res, ctx) => {
    console.log('put', req);
    return res(ctx.status(200));
  }),
  rest.get('/v1/api/gyutto-hand-favorite', (req, res, ctx) => {
    console.log('get', req);
    return res(ctx.status(200), ctx.json(gyuttoAttr));
  }),
];
