import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaUser, FaCog, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`}> 
      <button className="sidebar-collapse" onClick={onToggle} title="Toggle sidebar">
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaTachometerAlt /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaBoxOpen /> <span>Products</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaUser /> <span>Profile</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaCog /> <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar; 