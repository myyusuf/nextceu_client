import React from 'react';
import Header from './workspace/Header';
import Sidebar from './workspace/Sidebar';

const Workspace = ({ children }) => {

  const location = (window.location.hash);

  let component = (
    <div className="layout-container">
      <Header location={location} />
      <Sidebar />
      <div className="sidebar-layout-obfuscator" />
      <div className="main-container">
        { children }
        <footer>
          <span>2017 - CEU app.</span>
        </footer>
      </div>
    </div>
  );

  if (window.location.hash === '#/login') {
    component = (
      <div className="layout-container">
        { children }
      </div>
    );
  } else {
    console.log('---------------->', window.sessionStorage.getItem('token'));
    if (!window.sessionStorage.getItem('token')) {
      window.location.href = '#/login';
    }
  }

  return (
    component
  );
};

export default Workspace;
