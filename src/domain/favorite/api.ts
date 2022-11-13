import { myFetch } from '../http/fetch';
import { FavoriteMessage } from './types';

const GYUTTO_HAND_USER_PATH = `/v1/api/gyutto-hand-favorite`;
export const putFavoriteMessage = async (message: FavoriteMessage, targetId: string) => {
  await myFetch(GYUTTO_HAND_USER_PATH, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: targetId,
      attributeId: message.attributeId,
      json: JSON.stringify(message),
    }),
  });
};
export const getUsers = async (): Promise<FavoriteMessage[]> => {
  const response = await myFetch(GYUTTO_HAND_USER_PATH, {
    method: 'GET',
  });
  const resultJson = await response.text();
  const result = JSON.parse(resultJson) as DynamoResponseUsers;
  const users = result.Items.map((r) => JSON.parse(r.json.S));
  return users as FavoriteMessage[];
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
