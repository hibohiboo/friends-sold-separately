import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatPage from '@/contents/pages/ChatPage';
import FriendsPage from '@/contents/pages/FriendsPage';
import NoticePage from '@/contents/pages/NoticePage';
import ProfilePage from '@/contents/pages/ProfilePage';

const RoutesApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FriendsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/beginners" element={<ChatPage />} />
      <Route element={<FriendsPage />} />
    </Routes>
  );
};

export default RoutesApp;
