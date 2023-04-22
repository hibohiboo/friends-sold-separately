import { GYUTTO_HAND_USER_FULL_PATH } from './constants';
import { DynamoResponseUser, PutUserContext } from './types';
import { myFetch } from '../http/fetch';

export const putUser = async (context: PutUserContext) => {
  await myFetch(GYUTTO_HAND_USER_FULL_PATH, {
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
  const response = await myFetch(GYUTTO_HAND_USER_FULL_PATH, {
    method: 'GET',
  });
  const resultJson = await response.text();
  const result = JSON.parse(resultJson) as DynamoResponseUsers;
  const users = result.Items.map((r) => JSON.parse(r.json.S));
  return users as PutUserContext[];
};
type DynamoResponseUsers = {
  Count: number;
  Items: {
    json: {
      S: string;
    };
    userId: {
      S: string;
    };
  }[];
  ScannedCount: number;
};
export const getUser = async (id: string): Promise<PutUserContext> => {
  const response = await myFetch(`${GYUTTO_HAND_USER_FULL_PATH}/${id}`, {
    method: 'GET',
  });
  const resultJson = await response.text();
  const result = JSON.parse(resultJson) as DynamoResponseUser;
  const user = JSON.parse(result.Item.json.S);
  return user as PutUserContext;
};
