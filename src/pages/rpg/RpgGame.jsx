// src/pages/rpg/RpgGame.jsx
import React, { useState , useEffect } from 'react';
import './RpgGame.css';

// 🔗 นำเข้าชุดข้อมูลจำลอง และหน้าจอย่อยที่เราเพิ่งหั่นแยกไฟล์ออกไป
import { HERO_CONFIG, generateEnemy } from './config/gameData';
import AuthForm from './AuthForm';
import ClassSelect from './ClassSelect';
import BattleArena from './BattleArena';
import { supabase } from '../../supabaseClient';

function RpgGame() {
    
// 🕹️ State สำหรับสลับหน้าจอ (เริ่มต้นที่ 'auth' เพื่อบังคับล็อกอินผ่าน Google)
  const [gameState, setGameState] = useState('auth'); 
  const [user, setUser] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [stage, setStage] = useState(1);
  const [diceResult, setDiceResult] = useState('?');
  const [combatLog, setCombatLog] = useState('กดทอยลูกเต๋าเพื่อเริ่มโจมตี!');

  // 👤 ข้อมูลสเตตัสฝั่งผู้เล่น
  const [player, setPlayer] = useState({ level: 1, currentHp: 0, maxHp: 0, atk: 0 });
  // 👾 ข้อมูลสเตตัสฝั่งศัตรู
  const [enemy, setEnemy] = useState({ name: '', currentHp: 0, maxHp: 0, atk: 0 });
  // 💥 ความเสียหายรายเทิร์นตามดีไซน์ Mockup ของคุณ
  const [playerDmgTurn, setPlayerDmgTurn] = useState('-');
  const [enemyDmgTurn, setEnemyDmgTurn] = useState('-');

useEffect(() => {
    // ตรวจเซสชันปัจจุบัน
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setGameState('select'); // ถ้าล็อกอินแล้ว วาร์ปไปหน้าเลือกตัวละครทันที
      }
    });

    // คอยจับตาดูถ้าผู้เล่นมีการเปลี่ยนสถานะเข้าหรือออกระบบ
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setGameState('select');
      } else {
        setUser(null);
        setGameState('auth');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 🔴 2. ฟังก์ชันเรียกพลังเปิด Pop-up ล็อกอินของ Google OAuth via Supabase
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // สั่งให้วิ่งกลับมาที่หน้าเว็บเดิมหลังทำการยืนยันตัวตนเสร็จเรียบร้อย
          // redirectTo: window.location.origin + window.location.pathname 
             redirectTo:'https://portfolio-suphakornsook.vercel.app'
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ Google Login: ' + error.message);
    }
  };

  // 💾 ฟังก์ชันบันทึกสถิติด่านสูงสุดลงตาราง rpg_leaderboard บน Supabase
  const savePlayerScore = async (finalStage) => {
    if (!user) return; // ถ้าไม่ได้ล็อกอิน ไม่ต้องเซฟ

    const userId = user.id;
    // ดึงชื่อจาก Google Profile ถ้าไม่มีให้ใช้อีเมลแทน
    const playerName = user.user_metadata?.full_name || user.email; 
    const currentClass = selectedClass || 'warrior';

    try {
      // 🔍 เช็กสถิติเก่าในเบสก่อนว่าเคยทำไว้สูงสุดเท่าไหร่
        const { data, error: fetchError } = await supabase
            .from('rpg_leaderboard')
            .select('max_stage')
            .eq('user_id', userId)
            .maybeSingle();

        if (fetchError) throw fetchError;

      // 🏆 ถ้าคะแนนใหม่สูงกว่าคะแนนเก่า หรือยังไม่เคยบันทึกเลย ให้ทำการอัปเดตข้อมูลลงฐานข้อมูล
      if (!data || finalStage > data.max_stage) {
        const { error } = await supabase
          .from('rpg_leaderboard')
          .upsert({
            user_id: userId,
            player_name: playerName,
            chosen_class: currentClass, // ใช้ตัวแปรที่เราเซฟค่าสเตทสำรองไว้
            max_stage: finalStage
          }, { onConflict: 'user_id' }); // ระบบจะยอมทำงานแล้วหลังจากเราสั่งเพิ่ม UNIQUE ในหลังบ้าน

        if (error) throw error;
        console.log('🎉 บันทึกคะแนนสูงสุดใหม่สำเร็จ!');
      }
    } catch (error) {
      console.error('ไม่สามารถบันทึกสถิติได้:', error.message);
    }
  };

  // 🚪 ฟังก์ชันกดออกจากระบบเกม
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setGameState('auth');
  };


  // 🔄 ฟังก์ชันสตาร์ทเริ่มเกมด่านที่ 1
  const handleStartGame = (chosenClass) => {
    const config = HERO_CONFIG[chosenClass];
    setSelectedClass(chosenClass);
    setPlayer({
      level: 1,
      currentHp: config.baseHp,
      maxHp: config.baseHp,
      atk: config.baseAtk
    });
    setEnemy(generateEnemy(1));
    setStage(1);
    setGameState('battle');
  };

  // 🆙 ฟังก์ชันคำนวณการเลเวลอัพเมื่อเคลียร์ด่าน (บวกทศนิยมตรงตามคลาส)
  const handleLevelUp = (nextStage) => {
    const config = HERO_CONFIG[selectedClass];
    setPlayer(prev => {
      const newMaxHp = Math.round(prev.maxHp * config.hpGrowth);
      const newAtk = Math.round(prev.atk * config.atkGrowth);
      return {
        level: prev.level + 1,
        maxHp: newMaxHp,
        currentHp: newMaxHp, // เติมเลือดผู้เล่นเต็มหลอดต้อนรับด่านใหม่
        atk: newAtk
      };
    });
    setEnemy(generateEnemy(nextStage));
    setStage(nextStage);
    setPlayerDmgTurn('-');
    setEnemyDmgTurn('-');
    setDiceResult('?');
    setCombatLog(`🎉 ผ่านด่านสำเร็จ! ยินดีด้วยคุณได้ก้าวสู่ด่านที่ ${nextStage}`);
    savePlayerScore(nextStage);
  };

  // 🎲 ตรรกะระบบการทอยลูกเต๋าต่อสู้ D20
  const handleBattleTurn = () => {
    if (player.currentHp <= 0 || enemy.currentHp <= 0) return;

    const roll = Math.floor(Math.random() * 20) + 1;
    setDiceResult(roll);

    // ⚔️ สูตรดาเมจผู้เล่น: ATK / (21 - เลขที่ทอยได้)
    const pDmg = Math.round((roll / 20) * player.atk);
    setPlayerDmgTurn(pDmg);

    let nextEnemyHp = enemy.currentHp - pDmg;
    if (nextEnemyHp < 0) nextEnemyHp = 0;

    // ตรวจสอบเงื่อนไขศัตรูตาย
    if (nextEnemyHp <= 0) {
      setEnemy(prev => ({ ...prev, currentHp: 0 }));
      setCombatLog(`คุณทอยได้ ${roll}! โจมตีหนักครึ่งหมื่น -${pDmg} 💥 ปีศาจสิ้นชีพ!`);
      setTimeout(() => handleLevelUp(stage + 1), 1200);
      return;
    }

    // 👾 ปีศาจที่เหลือรอดตีสวนกลับ (แรนด้อมแรงแกว่ง)
    const randomFactor = 0.85 + (Math.random() * 0.3); // สุ่มค่าระหว่าง 0.85 ถึง 1.15
    const eDmg = Math.round(enemy.atk * randomFactor);
    setEnemyDmgTurn(eDmg);

    let nextPlayerHp = player.currentHp - eDmg;
    if (nextPlayerHp < 0) nextPlayerHp = 0;

    setEnemy(prev => ({ ...prev, currentHp: nextEnemyHp }));
    setPlayer(prev => ({ ...prev, currentHp: nextPlayerHp }));

    if (nextPlayerHp <= 0) {
      setCombatLog(`☠️ คุณพ่ายแพ้ในด่านที่ ${stage} พลาดติดอันดับสูงไปนิดเดียว!`);
      savePlayerScore(stage);
    } else {
      setCombatLog(`คุณฟาดดาเมจ -${pDmg} | โดนปีศาจตบสวนกระอัก -${eDmg}`);
    }
  };

  const handleRetryGame = () => {
    setPlayerDmgTurn('-');
    setEnemyDmgTurn('-');
    setDiceResult('?');
    setCombatLog('กดทอยลูกเต๋าเพื่อเริ่มโจมตี!');
    setGameState('select');
  };

  return (
    <div className="rpg-game-wrapper">
      {/* 👤 ถ้าล็อกอินแล้ว แอบแสดงปุ่มชื่อล็อกอินและปุ่ม Sign Out เล็กๆ ด้านบนจอ */}
      {user && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.9rem', color: '#aaa' }}>
          <span>ผู้เล่น: {user.user_metadata?.full_name || user.email}</span>
          <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>ออกจากระบบ</button>
        </div>
      )}

      {/* 🔑 1. แสดงหน้าล็อกอินหากสถานะเป็น 'auth' */}
      {gameState === 'auth' && (
        <AuthForm onGoogleLogin={handleGoogleLogin} />
      )}
      {/* 🧙‍♂️ แสดงหน้าเลือกตัวละครเมื่อสถานะเป็น 'select' */}
      {gameState === 'select' && (
        <ClassSelect onSelectClass={handleStartGame} />
      )}

      {/* ⚔️ แสดงหน้าจอสนามรบต่อสู้เมื่อสถานะเป็น 'battle' */}
      {gameState === 'battle' && (
        <BattleArena 
          stage={stage}
          player={player}
          enemy={enemy}
          diceResult={diceResult}
          combatLog={combatLog}
          playerDmgTurn={playerDmgTurn}
          enemyDmgTurn={enemyDmgTurn}
          selectedClass={selectedClass}
          onRollDice={handleBattleTurn}
          onRetry={handleRetryGame}
          showLeaderboard={gameState === 'battle' && player.currentHp <= 0}
        />
      )}

    </div>
  );
}

export default RpgGame;
