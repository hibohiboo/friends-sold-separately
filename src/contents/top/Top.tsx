import React from 'react';
import FavoriteList from '../favorite/FavoriteList';
import Friends from '../friends/List';
import Profile from '../profile/Profile';
import Footer from './Footer';
import BottomNav from './navigation/BottomNav';

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
