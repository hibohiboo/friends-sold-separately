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
      attributeId: message.attributeId,
      userId: targetId,
      json: JSON.stringify(message),
    }),
  });
};
export const getFavoriteMessage = async (userId: string): Promise<FavoriteMessage[]> => {
  const response = await myFetch(`${GYUTTO_HAND_USER_PATH}/${userId}`, {
    method: 'GET',
  });
  const resultJson = await response.text();
  const result = JSON.parse(resultJson) as DynamoResponseFavorite;
  const users = result.Items.flatMap((r) => JSON.parse(r.json.S));
  return users as FavoriteMessage[];
};
type DynamoResponseFavorite = {
  Count: number;
  Items: {
    json: {
      S: string;
    };
  }[];
  ScannedCount: number;
};
