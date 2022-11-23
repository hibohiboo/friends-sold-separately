import { useEffect, useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import { collection, query, onSnapshot, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseAuth } from '../firebase/auth';
import { getFirebaseDb } from '../firebase/store';

const COLLECTION_NAME = 'public-beginners-chat';
const CHAT_LIMIT = 10;
export const useChat = () => {
  const [uid, setUid] = useState<undefined | string>(undefined);
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  useEffect(() => {
    signInAnonymously(auth).then((response) => {
      setUid(response.user?.uid);
    });
    const q = query(collection(db, COLLECTION_NAME), limit(CHAT_LIMIT));
    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      const cities: any[] = [];
      querySnapshot.forEach((doc: any) => {
        cities.push(doc.data().name);
      });
      console.log('Current ', cities.join(', '));
    });

    return () => unsubscribe();
  }, [auth, db]);
  const submitHandler = async () => {
    if (!uid) return;
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      uid,
      name: 'Tokyo',
      country: 'Japan',
      createdAt: serverTimestamp(),
    });
  };
  return { submitHandler };
};
