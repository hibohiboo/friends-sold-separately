import React from 'react';
import FavoriteList from '../favorite/FavoriteList';
import Friends from '../peers/Friends';
import Profile from '../profile/Profile';
import Footer from './Footer';
import BottomNav from './Nav';

const App: React.FC = () => {
  return (
    <div>
      <main style={{ minHeight: '100vh' }}>
        <Friends />
        <Profile />
        <FavoriteList />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default App;
