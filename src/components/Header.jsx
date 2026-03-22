import React from 'react';

function Header({ OpenSidebar }) {
  return (
    <nav
      className="navbar navbar-dark bg-dark px-3"
      style={{ height: '60px', position: 'fixed', width: '100%', top: 0, zIndex: 1100 }}
    >
      <button
        className="btn text-white "
        onClick={OpenSidebar}
        style={{
          fontSize: '1.5rem',
          background: 'none',
          border: 'none',
        }}
      >
        ☰
      </button>
      <span className="navbar-brand mb-0 h1 ms-3">WELCOME TO GANESH TEXTILES</span>
    </nav>
  );
}

export default Header;
