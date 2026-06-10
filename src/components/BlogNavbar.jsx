import React from 'react';
import { Link } from 'react-router-dom';

function BlogNavbar() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem 2rem', 
      background: '#ffffff', 
      borderBottom: '1px solid #e2e8f0' 
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/blog" style={{ textDecoration: 'none', color: '#0f172a' }}>🌐 DevJournal</Link>
      </div>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, padding: 0 }}>
          <li>
            <Link to="/blog" style={{ textDecoration: 'none', color: '#0f172a', fontWeight: '500' }}>บทความทั้งหมด</Link>
          </li>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#0d9488', fontWeight: 'bold' }}>← กลับหน้าพอร์ต</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default BlogNavbar;