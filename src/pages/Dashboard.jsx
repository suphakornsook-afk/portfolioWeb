import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">My Developer Portfolio</h1>
      <p className="dashboard-subtitle">ยินดีต้อนรับเข้าสู่คลังโปรเจกต์ของฉัน เลือกชมเว็บด้านล่างได้เลยครับ</p>
      
      <div className="dashboard-grid">
        <Link to="/shop" className="portfolio-card">
          <div className="card-badge status-done">Ready</div>
          <h2>Web 1: Shopping Web</h2>
          <p>ระบบร้านค้าออนไลน์ ดึงข้อมูลสินค้าจาก Fake Store API, มีระบบตะกร้าสินค้า และหน้าแจกแจงรายละเอียดสินค้า</p>
          <span className="card-link">ลองเข้าชมเว็บ →</span>
        </Link>

        
          <Link to="/blog" className="portfolio-card">
            <div className="card-badge status-done" >Ready</div>
            <h2>Web 2: CRUD Blog Web</h2>
            <p>Blog ที่ imprement ระบบ CRUD</p>
            <span className="card-link">ลองเข้าชมเว็บ →</span>
          </Link>


          <Link to="/rpg" className="portfolio-card">
            <div className="card-badge status-done" >Ready</div>
            <h2>Web 3: RPG Dice-game Web</h2>
            <p>เว็บเกมที่มีระบบเกมเล็กน้อย กับระบบล็อกอินเก็บคะแนนขึ้น leaderboard</p>
            <span className="card-link">ลองเข้าชมเว็บ →</span>
          </Link>

      </div>
    </div>
  );
}

export default Dashboard;