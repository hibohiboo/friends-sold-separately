import React from 'react';
import './App.css';
import Logo from '@/contents/toppage/Logo';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { sampleSlice } from './store/slices/sample';
import { countSelector } from './store/selectors/sampleSelector';

const App: React.FC = () => {
  const count = useAppSelector(countSelector);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <h1>※友達は別売りです</h1>
    </div>
  );
};

export default App;
