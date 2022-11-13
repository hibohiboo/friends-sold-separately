import { myFetch } from '../http/fetch';
import { PutUserContext } from './types';

export const putUesr = async (user: PutUserContext) => {
  await myFetch(`/v1/api/gyutto-hand-user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user.userId,
      json: JSON.stringify(user),
    }),
  });
};
