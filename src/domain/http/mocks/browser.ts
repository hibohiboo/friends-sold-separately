// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker } from 'msw';
import { handlers } from './handlers';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const worker = setupWorker(...handlers);
