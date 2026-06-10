// สร้างไฟล์ใหม่ที่ src/pages/blog/PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // 💡 เช็คตำแหน่งพาธไฟล์ supabaseClient ให้ถูกตามโปรเจกต์ของคุณน้า

function PostDetail() {
  const { id } = useParams(); // ดึง id ออกมาจาก URL ปลายทาง
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSinglePost = async () => {
      setLoading(true);
      // ค้นหาใน Supabase เฉพาะโพสต์ที่มี id ตรงกัน
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single(); 

      if (!error) {
        setPost(data);
      } else {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error.message);
      }
      setLoading(false);
    };

    fetchSinglePost();
  }, [id]);

  if (loading) {
    return <div style={{ color: '#94a3b8', textAlign: 'center', marginTop: '3rem' }}>กำลังเปิดอ่านบทความ... 📖</div>;
  }

  if (!post) {
    return (
      <div style={{ color: '#ffffff', textAlign: 'center', marginTop: '3rem' }}>
        <h3>❌ ไม่พบบทความที่คุณกำลังตามหา</h3>
        <Link to="/blog" style={{ color: '#0d9488' }}>กลับไปหน้าบทความทั้งหมด</Link>
      </div>
    );
  }

  return (
    <div style={{ color: '#ffffff', padding: '1rem', lineHeight: '1.8' }}>
      {/* ปุ่มกดกดย้อนกลับไปหน้ารวมบล็อก */}
      <Link to="/blog" style={{ color: '#0d9488', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem', fontWeight: '500' }}>
        ← กลับไปหน้าบทความทั้งหมด
      </Link>

      <article style={{ background: '#1e293b', padding: '2.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: '#f8fafc', lineHeight: '1.3' }}>
          {post.title}
        </h1>
        
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>
          📅 เผยแพร่เมื่อ: {new Date(post.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        <hr style={{ borderColor: '#334155', marginBottom: '2rem' }} />
        
        {/* แสดงเนื้อหารายละเอียดของบทความ */}
        <div style={{ fontSize: '1.05rem', whiteSpace: 'pre-wrap', color: '#cbd5e1' }}>
          {post.desc}
        </div>
      </article>
    </div>
  );
}

export default PostDetail;
