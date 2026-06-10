import React, { useEffect } from 'react'; // เพิ่ม useEffect
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate
import { supabase } from './supabaseClient'; // import ตัว supabase
import Dashboard from './pages/Dashboard';
import Shopping_App from './Shopping_App';
import Blog_App from './Blog_App';
import RpgGame from './pages/rpg/RpgGame';

// สร้างคอมโพเนนต์ย่อยเพื่อใช้ useNavigate (เพราะ useNavigate ต้องอยู่ใน Router)
function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบว่าล็อกอินสำเร็จหรือไม่
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/rpg'); // ถ้าล็อกอินสำเร็จ ให้เด้งไปหน้าเกม
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return null; // ไม่แสดงผลอะไร แค่ทำหน้าที่จัดการ Redirect
}

function App() {
  return (
    <Router>
      <AuthHandler /> {/* เอาตัวจัดการมาวางไว้ใน Router */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shop/*" element={<Shopping_App />} />
        <Route path="/blog/*" element={<Blog_App />} />
        <Route path="/rpg" element={<RpgGame />} />
      </Routes>
    </Router>
  );
}

export default App;
