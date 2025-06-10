import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import Settings from './components/Settings';
import './App.css';

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const token = useSelector((state) => state.auth.token);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSidebarToggle = () => setSidebarOpen((open) => !open);
  return (
    <Router>
      {token && <Navbar onSidebarToggle={handleSidebarToggle} />}
      {token && <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />}
      <div style={{ marginLeft: token && sidebarOpen ? 220 : 0, transition: 'margin-left 0.2s' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
