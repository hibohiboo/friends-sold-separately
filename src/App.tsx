import React, { useState } from 'react';
import './App.css';
import Logo from '@/contents/toppage/Logo';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { sampleSlice } from './store/slices/sample';
import { countSelector } from './store/selectors/sampleSelector';

const App: React.FC = () => {
  const count = useAppSelector(countSelector);
  const dispatch = useAppDispatch();
  const countClickHandler = () => {
    dispatch(sampleSlice.actions.setCount(count + 1));
  };
  return (
    <div className="App">
      <Logo />
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={countClickHandler}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
};

export default App;
