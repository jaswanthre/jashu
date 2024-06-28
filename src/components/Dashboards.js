import React from 'react';
import Summary from './Summary';

import './Dashboards.css';
import Sidebar from './Sidebar';

function Dashboards() {
  return (
    <div className="dashboard">
        <Sidebar/>
      <header>
        <h1>Resource Management System</h1>
      </header>
      <div className="dashboard-content">
        <Summary />
        
   
      </div>
    </div>
  );
}

export default Dashboards;
