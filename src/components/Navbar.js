import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { FaBell, FaBars, FaUserCircle } from 'react-icons/fa';

const Navbar = ({ onSidebarToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {onSidebarToggle && (
          <button className="sidebar-toggle" title="Toggle sidebar" onClick={onSidebarToggle}>
            <FaBars size={22} />
          </button>
        )}
        <Link to="/dashboard" className="navbar-logo">CRM Dashboard</Link>
      </div>
      <div className="navbar-right">
        <button className="navbar-icon" title="Notifications">
          <FaBell size={20} />
        </button>
        {user && (
          <span className="navbar-user">
            {user.image ? (
              <img src={user.image} alt="avatar" className="navbar-avatar" />
            ) : (
              <FaUserCircle size={24} style={{ marginRight: 6 }} />
            )}
            {user.firstName || user.username}
          </span>
        )}
        <button className="navbar-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar; 