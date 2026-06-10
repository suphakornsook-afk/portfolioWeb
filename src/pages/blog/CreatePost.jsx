import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

function CreatePost({ onCreate }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันไม่ให้หน้าจอรีเฟรชเองตอนกดปุ่มเซฟ
    
    if (!title.trim() || !desc.trim()) {
      alert('กรุณากรอกหัวข้อและเนื้อหาบทความให้ครบถ้วนก่อนนะครับ 📝');
      return;
    }


    onCreate({ title, desc });
    navigate('/blog');
  };

  return (
    <div className="create-post-container">
      <div className="form-header">
        <h2>✏️ เขียนบทความใหม่</h2>
        <p>บันทึกไอเดียและความรู้ของคุณลงในบล็อก</p>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">หัวข้อบทความ</label>
          <input
            type="text"
            id="title"
            placeholder="เช่น เริ่มต้นเรียนรู้สถาปัตยกรรม React..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">เนื้อหาบทความ</label>
          <textarea
            id="desc"
            rows="8"
            placeholder="พิมพ์เนื้อหาที่นี่..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/blog')} className="btn-cancel">
            ยกเลิก
          </button>
          <button type="submit" className="btn-submit">
            บันทึกบทความ
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;