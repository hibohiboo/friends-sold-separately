import { getFirestore, serverTimestamp as getServerTimestamp, Timestamp } from 'firebase/firestore';
import type { TimeStamp } from './types';
import type { Firestore } from 'firebase/firestore';
import { firebaseApp } from '.';

let db: Firestore | null = null;
export const getFirebaseDb = () => {
  if (db) return db;
  db = getFirestore(firebaseApp);
  return db;
};
export const serverTimestamp = getServerTimestamp;

// createdAtがserializeではないオブジェクトなのでstringifyを経由することによりserialize化
export const toSerializeObject = (obj: any) => JSON.parse(JSON.stringify(obj));
export const toTimestamp = ({ seconds, nanoseconds }: TimeStamp) =>
  new Timestamp(Number(seconds), Number(nanoseconds));
