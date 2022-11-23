import React from 'react';
import { format } from 'date-fns';
import { BsFillChatRightFill } from 'react-icons/bs';
import { ChatMessage } from '@/domain/chat/types';
import { useChat } from '@/domain/chat/useChat';
import Base from '../layouts/Base';
import newlyIcon from '@/assets/icons/newly.svg';

const ChatMessageComponent: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              {message.isNewly ? (
                <img src={newlyIcon} alt="初心者" style={{ width: '48px' }} />
              ) : (
                <BsFillChatRightFill size={48} />
              )}
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5">{message.name}</p>
            <p className="subtitle is-7">
              <a href={`https://twitter.com/${message.twitterId}`}>
                @{message.twitterId?.replace('@', '')}
              </a>
              <time
                style={{ marginLeft: '1rem' }}
                dateTime={format(new Date(message.updatedAt), 'yyyy-MM-dd')}
              >
                {format(new Date(message.updatedAt), 'yyyy/MM/dd HH:mm:ss')}
              </time>
            </p>
          </div>
        </div>
        <div className="content">{message.text}</div>
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  const { submitHandler, messages } = useChat();
  return (
    <Base>
      <button type="button" role="submit" onClick={submitHandler}>
        submit
      </button>
      <div style={{ padding: '10px' }}>
        {messages.map((m) => (
          <ChatMessageComponent key={`${m.uid}${m.updatedAt}`} message={m} />
        ))}
      </div>
    </Base>
  );
};

export default ChatPage;
