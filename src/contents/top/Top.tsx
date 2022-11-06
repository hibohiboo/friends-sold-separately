import React from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selfUserSelector } from '@/store/selectors/peerSelector';
import Friends from '../peers/Friends';

const App: React.FC = () => {
  const user = useAppSelector(selfUserSelector);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <h1>※友達は別売りです</h1>
      <Friends />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default App;
