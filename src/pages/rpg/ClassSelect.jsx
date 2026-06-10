// src/pages/rpg/ClassSelect.jsx
import React from 'react';
import { WARRIOR_IMAGES, ROGUE_IMAGES } from './config/gameData';

function ClassSelect({ onSelectClass }) {
  return (
    <div className="class-selection-screen">
      <h1 className="rpg-title">เลือกสายอาชีพลงสนามรบ</h1>
      <div className="class-cards-container">
        
        {/* การ์ดเลือกนักรบ */}
        <div className="class-select-card" onClick={() => onSelectClass('warrior')}>
          <div className="class-avatar-img">
            <img src={WARRIOR_IMAGES[0]} alt="Warrior Level 1" />
          </div>
          <h2>Warrior (สายถึก)</h2>
          <p>HP: 3000 | ATK: 1200</p>
          <button className="select-btn">เลือกนักรบ</button>
        </div>

        {/* การ์ดเลือกจอมโจร */}
        <div className="class-select-card" onClick={() => onSelectClass('rogue')}>
          <div className="class-avatar-img">
            <img src={ROGUE_IMAGES[0]} alt="Rogue Level 1" />
          </div>
          <h2>Rogue (สายตีแรง)</h2>
          <p>HP: 2000 | ATK: 1600</p>
          <button className="select-btn">เลือกจอมโจร</button>
        </div>

      </div>
    </div>
  );
}

export default ClassSelect;