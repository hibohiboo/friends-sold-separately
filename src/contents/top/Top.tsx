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
        <h1>※友達は別売りです</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '800px' }}>
            <Profile />
          </div>

          <FavoriteList />
        </div>

        <h3>友達売り場</h3>
        <Friends />
      </main>
      <Footer />
    </div>
  );
};

export default App;
