// src/pages/rpg/AuthForm.jsx
import React from 'react';

function AuthForm({ onGoogleLogin }) {
  return (
    <div className="auth-screen-container">
      <div className="auth-card">
        <div className="auth-game-logo">🎲</div>
        <h1 className="auth-title">RPG DICE ARENA</h1>
        <p className="auth-subtitle">กรุณาเข้าสู่ระบบเพื่อบันทึกระดับคะแนนสูงสุดของคุณลงในอันดับ Leaderboard</p>
        
        {/* ปุ่มกดสำหรับล็อกอินผ่าน Google */}
        <button className="google-login-btn" onClick={onGoogleLogin}>
            <img 
                src="https://www.vectorlogo.zone/logos/google/google-icon.svg" 
                alt="Google Logo" 
            />
          เข้าสู่ระบบด้วย Google
        </button>
      </div>
    </div>
  );
}

export default AuthForm;