import { myFetch } from '../http/fetch';
import { PutUserContext } from './types';

const GYUTTO_HAND_USER_PATH = `/v1/api/gyutto-hand-user`;
export const putUser = async (context: PutUserContext) => {
  await myFetch(GYUTTO_HAND_USER_PATH, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: context.profile.userId,
      json: JSON.stringify(context),
    }),
  });
};
export const getUsers = async (): Promise<PutUserContext[]> => {
  const response = await myFetch(GYUTTO_HAND_USER_PATH, {
    method: 'GET',
  });
  const resultJson = await response.text();
  const result = JSON.parse(resultJson);
  const users = result.map((r: any) => JSON.parse(r.json));
  return users as PutUserContext[];
};
