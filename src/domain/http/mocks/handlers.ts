// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

export const handlers = [
  rest.put('/v1/api/gyutto-hand-user', (req, res, ctx) => {
    console.log('put', req);
    return res(ctx.status(200));
  }),
  rest.get('/v1/api/gyutto-hand-user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
