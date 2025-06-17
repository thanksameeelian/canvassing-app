import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CommunityNotes from './pages/CommunityNotes';
import CreateNote from './pages/CreateNote';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/community-notes" element={<CommunityNotes />}/>
          <Route path="/create-note" element={<CreateNote />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
