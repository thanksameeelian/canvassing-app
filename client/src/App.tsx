import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CommunityNotes from './pages/CommunityNotes';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/community-notes" element={<CommunityNotes />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
