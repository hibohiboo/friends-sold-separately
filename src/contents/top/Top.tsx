import React from 'react';
import './App.css';
import FavoriteList from '../favorite/FavoriteList';
import Friends from '../peers/Friends';
import Profile from '../profile/Profile';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <div>
      <main style={{ minHeight: '100vh' }}>
        <h1>ぎゅっとはんど</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
          <div style={{ maxWidth: '800px', maxHeight: '500px', overflowY: 'auto' }}>
            <Profile />
          </div>
          <div style={{ maxHeight: '500px', overflowY: 'auto', maxWidth: '300px' }}>
            <FavoriteList />
          </div>
        </div>

        <h3>ミエルトモダチ</h3>
        <Friends />
      </main>
      <Footer />
    </div>
  );
};

export default App;
