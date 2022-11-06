import React from 'react';
import './App.css';
import Friends from '../peers/Friends';
import Profile from '../profile/Profile';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>※友達は別売りです</h1>
      <Profile />
      <Friends />
    </div>
  );
};

export default App;
