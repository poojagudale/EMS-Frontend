// Layout.jsx or App.jsx (where both Header and Sidebar are used)
import React, { useState } from 'react';
import Header from './Header';
import Slidebar from './Slidebar';

function Layout({ children }) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      <Header OpenSidebar={OpenSidebar} />
      <Slidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div style={{ marginTop: '60px', marginLeft: openSidebarToggle ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
