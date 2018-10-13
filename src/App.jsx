import React from 'react';

import NotesContainer from './components/Notes/NotesContainer';
import SlidesContainer from './components/Slides/SlidesContainer';

export default function App() {
  return (
    <div className="App">
      <NotesContainer />
      <SlidesContainer />
    </div>
  );
}
