import React from 'react';
import { useChat } from '@/domain/chat/useChat';
import Base from '../layouts/Base';

const;

const ChatPage: React.FC = () => {
  const { submitHandler, messages } = useChat();
  return (
    <Base>
      <button type="button" role="submit" onClick={submitHandler}>
        submit
      </button>
      <div>
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">John Smith</p>
                <p className="subtitle is-6">@johnsmith</p>
              </div>
            </div>

            <div className="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.{' '}
              <a>@bulmaio</a>.<a href="#">#css</a> <a href="#">#responsive</a>
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ChatPage;
