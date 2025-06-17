import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CommunityNotes from './pages/CommunityNotes';
import CreateNote from './pages/CreateNote';
import ViewNote from './pages/ViewNote';
import EditNote from './pages/EditNote';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/community-notes" element={<CommunityNotes />}/>
          <Route path="/create-note" element={<CreateNote />}/>
          <Route path="/community-notes/:id" element={<ViewNote />} ErrorBoundary={NotFound}/>
          <Route path="/community-notes/edit/:id" element={<EditNote />} ErrorBoundary={NotFound}/>
          <Route path="*" element={<NotFound />}/>
          <Route path="/not-found" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
