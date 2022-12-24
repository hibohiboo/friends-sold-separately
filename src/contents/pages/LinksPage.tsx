import React from 'react';
import { IoIosConstruct } from 'react-icons/io';
import Base from '../layouts/Base';
import { useLinksPageHooks } from '@/hooks/useLinksPageHooks';

const LinksPage: React.FC = () => {
  const links = useLinksPageHooks();
  return (
    <Base>
      <section className="section">
        <h2 className="title is-flex">
          <IoIosConstruct size={50} />
          <div style={{ marginLeft: '1rem' }}>開発物置き場</div>
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>名前</th>
              <th>説明</th>
            </tr>
          </thead>
          <tbody>
            {links.items.map((item) => (
              <tr key={item.url}>
                <td>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="subtitle">ガラクタ置き場</h3>
        <p>作りかけで投げ出しているものたち。</p>
        <table className="table">
          <thead>
            <tr>
              <th>名前</th>
              <th>説明</th>
            </tr>
          </thead>
          <tbody>
            {links.junks.map((item) => (
              <tr key={item.url}>
                <td>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Base>
  );
};

export default LinksPage;
