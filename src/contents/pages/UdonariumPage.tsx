import React from 'react';
import { MdSend } from 'react-icons/md';
import Base from '../layouts/Base';
import { useUdonariumPageHooks } from '@/hooks/useUdonariumPageHooks';

const src = 'http://localhost:4200/?pl&post-message';

const UdonariumPage: React.FC = () => {
  const vm = useUdonariumPageHooks();
  return (
    <Base>
      <section className="section">
        <h2 className="title is-flex">
          <div style={{ marginLeft: '1rem' }}>Udonarium</div>
        </h2>
        <div>ID: {vm.userId}</div>

        <div className="control">
          <textarea className="textarea is-small" placeholder="自己紹介や挨拶、質問など自由に" />
        </div>
        <button type="button" role="submit" className="button is-success">
          <span>送信</span>
          <span className="icon is-small">
            <MdSend />
          </span>
        </button>
      </section>
      <iframe
        title="udonarium"
        id="iframe-udonarium"
        src={src}
        allowFullScreen
        width="100%"
        height="100%"
      />
    </Base>
  );
};

export default UdonariumPage;
