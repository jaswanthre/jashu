import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const handleSignOut = () => {
    // Sign out logic here
    alert('You have signed out');
    // You might want to redirect to a login page or home page
    window.location.href = '/';
  };

  return (
    <div className="sidebar">
      <h2>Employee Dashboard</h2>
      <ul>
        <li><Link to="/dashboards">Dashboards</Link></li>
        <li><Link to="/manage-work-profile">Manage Work Profile</Link></li>
    
        <li><Link to="/my-work">My Work</Link></li>
       
        <li><button onClick={handleSignOut}>Sign Out</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
