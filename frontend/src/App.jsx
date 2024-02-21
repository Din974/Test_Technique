import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './UserList';
import UserDetail from './UserDetail';
import AlbumDetail from './AlbumDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user-list" />} />
        <Route path="/user-list" element={<UserList />} /> {/* Utilisez element prop pour spécifier le composant à rendre */}
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/album/:albumId" element={<AlbumDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
