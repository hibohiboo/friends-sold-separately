import React from 'react';
import { MdSend } from 'react-icons/md';
import Base from '../layouts/Base';
import { useUdonariumPageHooks } from '@/hooks/useUdonariumPageHooks';

const src = `${import.meta.env.VITE_UDONARIUM_URL}?pl&post-message`;

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
      <button type="button" onClick={vm.toggleMapHandler}>
        マップを{vm.toggleMapMessage}
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
        <button type="button" role="submit" className="button is-success">
          <span>送信</span>
          <span className="icon is-small">
            <MdSend onClick={vm.sendText} />
          </span>
        </button>
      </div>
    </Base>
  );
};

export default UdonariumPage;
