import { useEffect, useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import {
  collection,
  query,
  onSnapshot,
  limit,
  addDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { useAppSelector } from '@/store/hooks';
import { isNewlySelector } from '@/store/selectors/attributesSelector';
import { userProfileSelector } from '@/store/selectors/userProfileSelector';
import { getFirebaseAuth } from '../firebase/auth';
import { getFirebaseDb } from '../firebase/store';
import { ChatMessage } from './types';

const COLLECTION_NAME = 'public-beginners-chat';
const CHAT_LIMIT = 10;
const SORT_KEY = 'updatedAt';

export const useChat = () => {
  const [uid, setUid] = useState<undefined | string>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const auth = getFirebaseAuth();
  const db = getFirebaseDb();
  const user = useAppSelector(userProfileSelector);
  const isNewly = useAppSelector(isNewlySelector);
  useEffect(() => {
    signInAnonymously(auth).then((response) => {
      setUid(response.user?.uid);
    });
    const q = query(collection(db, COLLECTION_NAME), orderBy(SORT_KEY, 'desc'), limit(CHAT_LIMIT));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tmpMessages: ChatMessage[] = [];
      querySnapshot.forEach((doc) => {
        tmpMessages.push(doc.data() as ChatMessage);
      });
      setMessages(tmpMessages);
    });

    return () => unsubscribe();
  }, [auth, db]);
  const submitHandler = async () => {
    if (!text || !uid) return;
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      uid, // firebaseのid
      identifier: user.identifier, // UUIDで付けたID。ローカルストレージに保持
      twitterId: user.twitterId, // twitterのID。正式にはエイリアス
      name: user.name,
      isPublish: user.isPublish,
      isNewly,
      text,
      createdAt: serverTimestamp(), // サーバ側時刻
      updatedAt: new Date().getTime(), // フロントエンド側時刻
    });
    setText('');
  };
  return { submitHandler, messages, setText, text };
};
