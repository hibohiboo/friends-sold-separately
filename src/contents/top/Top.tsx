import React from 'react';
import './App.css';
import FavoriteList from '../favorite/FavoriteList';
import Friends from '../peers/Friends';
import Profile from '../profile/Profile';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <main style={{ minHeight: '100vh' }}>
        <h1>ぎゅっとはんど</h1>

        <h3>ミエルトモダチ</h3>
        <Friends />
        <Profile />
        <FavoriteList />
      </main>
      <Footer />
    </div>
  );
};

export default App;
