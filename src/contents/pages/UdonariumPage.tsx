import React from 'react';
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
      <div style={{ paddingTop: '5px' }}>
        <HorizonLabelForm label="ニックネーム" id="nickname">
          <input
            className="input is-small"
            value={vm.playerName}
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
            value={vm.targetUserId}
            id="targetPlayerId"
            style={{ width: '150px' }}
            onChange={vm.targetUserIdChangeHandler}
          />
        </HorizonLabelForm>
        <button
          onClick={vm.connectPrivateHandler}
          type="button"
          role="submit"
          className="button is-success"
        >
          <span>プライベート接続</span>
        </button>
      </div>

      <iframe
        title="udonarium"
        id="iframe-udonarium"
        src={src}
        allowFullScreen
        width="100%"
        height="80%"
      />
    </Base>
  );
};

export default UdonariumPage;
