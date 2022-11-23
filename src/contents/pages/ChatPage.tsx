import React from 'react';
import { useChat } from '@/domain/chat/useChat';
import Base from '../layouts/Base';

const ChatPage: React.FC = () => {
  const { submitHandler } = useChat();
  return (
    <Base>
      <button type="button" role="submit" onClick={submitHandler}>
        submit
      </button>
    </Base>
  );
};

export default ChatPage;
