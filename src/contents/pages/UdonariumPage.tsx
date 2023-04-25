import React from 'react';
import { format } from 'date-fns';
import { MdSend } from 'react-icons/md';
import { ChatMessage } from '@/domain/udonarium/types';
import Base from '../layouts/Base';
import { useUdonariumPageHooks } from '@/hooks/useUdonariumPageHooks';

const src = `${import.meta.env.VITE_UDONARIUM_URL}?pl&post-message&${window.location.search.replace(
  '?',
  ''
)}`;

const HorizonLabelForm: React.FC<{ children: React.ReactNode; label: string; id: string }> = ({
  children,
  id,
  label,
}) => (
  <div className="field is-horizontal">
    <div className="field-label">
      <label htmlFor={id}> {label}</label>
    </div>
    <div className="field-body">
      <div className="field">
        <div className="control">{children}</div>
      </div>
    </div>
  </div>
);

const UdonariumPage: React.FC = () => {
  const vm = useUdonariumPageHooks();
  return (
    <Base>
      <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <HorizonLabelForm label="ニックネーム" id="nickname">
          <input
            className="input is-small"
            defaultValue={vm.playerName}
            id="nickname"
            style={{ width: '150px' }}
            onChange={vm.nickNameChangeHandler}
          />
        </HorizonLabelForm>
      </div>
      <div style={{ display: vm.visiblePeerArea ? 'block' : 'none' }}>
        <HorizonLabelForm label="ID" id="id">
          {vm.userId}
        </HorizonLabelForm>
        <HorizonLabelForm label="接続相手のID" id="targetPlayerId">
          <input
            className="input is-small"
            defaultValue={vm.targetUserId}
            id="targetPlayerId"
            style={{ width: '150px' }}
            onChange={vm.targetUserIdChangeHandler}
          />
        </HorizonLabelForm>
        <div className="field">
          <div className="control">
            <button
              onClick={vm.connectPrivateHandler}
              type="button"
              role="submit"
              className="button is-success"
            >
              <span>プライベート接続</span>
            </button>
          </div>
        </div>
      </div>

      <button
        style={{ marginTop: '10px' }}
        className="button"
        type="button"
        onClick={vm.toggleMapHandler}
      >
        マップ を{vm.toggleMapMessage}
      </button>

      <iframe
        title="udonarium"
        id="iframe-udonarium"
        src={src}
        allowFullScreen
        width="100%"
        height="80%"
        style={{ display: vm.visibleMap ? 'block' : 'none' }}
      />
      <div>
        <div className="control">
          <textarea
            className="textarea is-small"
            placeholder="ユドナリウムにチャットを送る"
            value={vm.chatText}
            onChange={(e) => vm.setText(e.target.value)}
          />
        </div>
        <button onClick={vm.sendText} type="button" role="submit" className="button is-success">
          <span>送信</span>
          <span className="icon is-small">
            <MdSend />
          </span>
        </button>
      </div>
      <div>
        {vm.chatList.map((chat) => (
          <ChatMessageComponent key={chat.id} message={chat} />
        ))}
      </div>
    </Base>
  );
};

export default UdonariumPage;

const ChatMessageComponent: React.FC<{ message: ChatMessage }> = ({ message }) => {
  return (
    <div className="card">
      <div className="card-content" style={{ padding: '1rem' }}>
        <div className="media" style={{ marginBottom: '0' }}>
          {/* <div className="media-left">
            <figure className="image is-48x48">
              <BsFillChatRightFill size={48} />
            </figure>
          </div> */}
          <div className="media-content">
            <p className="title is-5">{message.name}</p>
            <p className="subtitle is-7">
              <time
                style={{ marginLeft: '1rem' }}
                dateTime={format(new Date(message.timestamp), 'yyyy-MM-dd')}
              >
                {format(new Date(message.timestamp), 'yyyy/MM/dd HH:mm:ss')}
              </time>
              <span style={{ marginLeft: '1rem' }}>{message.from}</span>
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
