import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Router from './components/Router';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}
