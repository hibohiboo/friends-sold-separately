import React from 'react';
import FavoriteList from '../favorite/FavoriteList';
import Friends from '../friends/List';
import Profile from '../profile/Profile';
import BottomNav from './BottomNav';
import Footer from './Footer';

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
