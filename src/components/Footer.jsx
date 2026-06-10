import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid #ccc', marginTop: 'auto' }}>
      <p>© 2026 MyE-Shop. Created for Portfolio.</p>
      <div>
        <a href="https://github.com/suphakornsook-afk" target="_blank" rel="noreferrer" style={{ marginRight: '10px' }}>GitHub</a>
        <Link to="/" style={{ 
          color: '#0d9488', 
          textDecoration: 'none', 
          fontWeight: 'bold',
          fontSize: '0.95rem'
        }}>กลับหน้าหลัก Portfolio</Link>
      </div>
    </footer>
  );
}

export default Footer;