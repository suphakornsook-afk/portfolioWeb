// src/pages/rpg/BattleArena.jsx

import { HERO_CONFIG, WARRIOR_IMAGES, ROGUE_IMAGES } from './config/gameData';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function BattleArena({ 
  stage, player, enemy, diceResult, combatLog, 
  playerDmgTurn, enemyDmgTurn, selectedClass, onRollDice, onRetry 
}) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const isGameOver = player.currentHp <= 0;

  // ลอจิกเลือกรูปภาพผู้เล่นตามเลเวล (ดึงมาจากชุดอาร์เรย์ในเครื่อง)
  const getPlayerImage = () => {
    const imageIndex = Math.min(player.level - 1, 4);
    return selectedClass === 'warrior' ? WARRIOR_IMAGES[imageIndex] : ROGUE_IMAGES[imageIndex];
  };

  // ✨ ดึงข้อมูลคะแนนทันทีตั้งแต่เริ่มโหลดหน้าสนามรบ (เพื่อให้โชว์ตลอดเวลา)
  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('rpg_leaderboard')
          .select('player_name, chosen_class, max_stage')
          .order('max_stage', { ascending: false })
          .limit(5);

        if (error) throw error;
        setScores(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchScores();
  }, [stage]); // ✨ ใส่ stage ไว้ด้วย เพื่อให้ตารางรีเฟรชอัปเดตคะแนนสดใหม่ทุกครั้งที่คุณผ่านด่านสำเร็จครับ

  return (
    <div className="battle-arena-container">
      <h2 className="stage-title">⚔️ ARENA - STAGE {stage} ⚔️</h2>

      <div className="battle-main-layout">
        <div className="character-card">
          <h3>คุณ ({selectedClass === 'warrior' ? 'Warrior' : 'Rogue'})</h3>
          <div className="avatar-placeholder">
            <img src={getPlayerImage()} alt="Player Avatar" className="rpg-render-img" />
          </div>
          <p>เลือด: {player.currentHp} / {player.maxHp}</p>
          <p>พลังโจมตี: {player.atk}</p>
          <div className="dmg-indicator">ทำดาเมจได้: {playerDmgTurn}</div>
        </div>

        <div className="dice-control-zone">
          <p>แต้มลูกเต๋า</p>
          <div className="dice-result-box" style={{ fontSize: '2.5rem', background: '#fff', color: '#000', padding: '10px 20px', borderRadius: '8px', margin: '10px 0', fontWeight: 'bold' }}>
            {diceResult}
          </div>
        </div>

        <div className="character-card">
          <h3>{enemy.name}</h3>
          <div className="avatar-placeholder">
            <div style={{ fontSize: '4rem' }}>👾</div>
          </div>
          <p>เลือด: {enemy.currentHp} / {enemy.maxHp}</p>
          <p>พลังโจมตี: {enemy.atk}</p>
          <div className="dmg-indicator" style={{ color: '#e74c3c' }}>โดนโจมตีสวนกลับ: {enemyDmgTurn}</div>
        </div>
      </div>

      {/* 📄 กล่องข้อความ Log การต่อสู้ด้านล่าง */}
      <div className="combat-log-box">
        <p>{combatLog}</p>
      </div>

      {/* 🔄 ปุ่มกดคุมเกมด้านล่างสุด */}
      <div className="action-zone" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        {!isGameOver ? (
          <button className="rpg-btn btn-blue" onClick={onRollDice}>🎲 ทอยลูกเต๋าโจมตี</button>
        ) : (
          <button className="rpg-btn btn-orange" onClick={onRetry}>🔄 ลองใหม่อีกครั้ง</button>
        )}
      </div>

      {/* 🏆 ✨ เอาเงื่อนไขออกแล้ว: ตาราง Leaderboard จะวางประดับอยู่ข้างล่างสุดตลอดเวลาเล่นเกมแล้วครับ */}
      <div className="arena-leaderboard-zone" style={{ marginTop: '2rem' }}>
        <h3 className="arena-leaderboard-hd" style={{ color: '#f1c40f', textAlign: 'center', margin: '0 0 1rem 0' }}>🏆 ทำเนียบผู้กล้าในตำนาน (Top 5)</h3>
        
        {loading ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>กำลังเปิดสมุดบันทึกคะแนน...</p>
        ) : scores.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#aaa' }}>ยังไม่มีการบันทึกสถิติ</p>
        ) : (
          <table className="arena-sub-table" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#1a1a20', borderRadius: '6px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ backgroundColor: '#3e3e4a', color: '#f1c40f' }}>
                <th style={{ padding: '8px' }}>อันดับ</th>
                <th style={{ padding: '8px' }}>ผู้กล้า</th>
                <th style={{ padding: '8px' }}>อาชีพ</th>
                <th style={{ padding: '8px' }}>สถิติสูงสุด</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #2c2c35', textAlign: 'center', backgroundColor: idx === 0 ? 'rgba(241, 196, 15, 0.08)' : 'transparent' }}>
                  <td style={{ padding: '10px', color: idx === 0 ? '#f1c40f' : '#fff' }}>{idx + 1}</td>
                  <td style={{ padding: '10px', color: idx === 0 ? '#f1c40f' : '#fff' }}>{item.player_name}</td>
                  <td style={{ padding: '10px', color: idx === 0 ? '#f1c40f' : '#fff' }}>{item.chosen_class === 'warrior' ? '⚔️ Warrior' : '🏹 Rogue'}</td>
                  <td style={{ padding: '10px', color: '#2ecc71', fontWeight: 'bold' }}>ด่าน {item.max_stage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

export default BattleArena;