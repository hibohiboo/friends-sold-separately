import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a
        href="https://github.com/hibohiboo/friends-sold-separately/tree/develop#%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3"
        target="_blank"
        rel="noreferrer"
      >
        利用素材
      </a>
      /
      <a
        href="https://d3snr6xc5uvnuy.cloudfront.net/cartagraph/privacy"
        target="_blank"
        rel="noreferrer"
      >
        プライバシーポリシー
      </a>
      /
      <a
        href="https://d3snr6xc5uvnuy.cloudfront.net/cartagraph/agreement"
        target="_blank"
        rel="noreferrer"
      >
        利用規約
      </a>
      /©hibohiboo from 2022
    </footer>
  );
};

export default Footer;
