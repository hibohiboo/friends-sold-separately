import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useAppSelector } from '@/store/hooks';
import { gallerySelector } from '@/store/selectors/gallerySelector';
import Base from '../layouts/Base';

const GalleryPage: React.FC = () => {
  const gallery = useAppSelector(gallerySelector);
  return (
    <Base>
      <section className="hibo-gh-gallery">
        <h2 className="title is-flex">ギャラリー</h2>
        <div className="masonry">
          {gallery.items.map((item) => (
            <div className="item_m" key={item.imageUrl}>
              <img src={item.imageUrl} alt={item.name} />
              <h3 className="subtitle">
                <LinkableText url={item.sheetUrl} text={item.name} />
              </h3>
              <p>{item.text}</p>
              <p style={{ textAlign: 'right' }}>
                <LinkableText
                  url={item.illustCreatorUrl}
                  text={`illusted by ${item.illustCreator}`}
                />
              </p>
            </div>
          ))}
        </div>
      </section>
    </Base>
  );
};

const LinkableText: React.FC<{ url: string; text: string }> = ({ url, text }) => {
  return url ? (
    <a href={url} target="_blank" rel="noreferrer">
      <span style={{ marginLeft: '1rem' }}>{text}</span>
      <FaExternalLinkAlt style={{ marginLeft: '1rem' }} />
    </a>
  ) : (
    <span> {text}</span>
  );
};

export default GalleryPage;
