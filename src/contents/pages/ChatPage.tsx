import React from 'react';
import { format } from 'date-fns';
import { BsFillChatRightFill } from 'react-icons/bs';
import { MdSend } from 'react-icons/md';
import { ChatMessage } from '@/domain/chat/types';
import { useChat } from '@/domain/chat/useChat';
import Base from '../layouts/Base';
import newlyIcon from '@/assets/icons/newly.svg';

const ChatMessageComponent: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <div className="card">
      <div className="card-content" style={{ padding: '1rem' }}>
        <div className="media" style={{ marginBottom: '0' }}>
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
        <div className="content" style={{ whiteSpace: 'pre-wrap' }}>
          {message.text}
        </div>
      </div>
    </div>
  );
};

const ChatPage: React.FC = () => {
  const { submitHandler, messages, text, setText } = useChat();
  return (
    <Base>
      <section className="section">
        <h2 className="title is-flex">
          <img src={newlyIcon} alt="Beginners" style={{ width: '48px' }} />
          <div style={{ marginLeft: '1rem' }}>Beginners</div>
        </h2>
        <p>知らないことに対してはみんな初心者</p>
        <div className="control">
          <textarea
            className="textarea is-small"
            placeholder="自己紹介や挨拶、質問など自由に"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button onClick={submitHandler} type="button" role="submit" className="button is-success">
          <span>送信</span>
          <span className="icon is-small">
            <MdSend />
          </span>
        </button>
        <div style={{ padding: '10px' }}>
          {messages.map((m) => (
            <ChatMessageComponent key={`${m.uid}${m.updatedAt}`} message={m} />
          ))}
        </div>
      </section>
    </Base>
  );
};

export default ChatPage;
