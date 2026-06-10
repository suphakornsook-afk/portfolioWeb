import React from 'react';
import './BlogHome.css'; 
import { Link, useNavigate } from 'react-router-dom';

function BlogHome({ posts , onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="blog-home-container">
      <div className="blog-hero">
        <h1>ยินดีต้อนรับสู่ DevJournal</h1>
        <p>พื้นที่บันทึกการเรียนรู้ ความคิดสร้างสรรค์ และแบ่งปันสถาปัตยกรรมโค้ด</p>
        <Link to="/blog/create" className="blog-create-btn">
          + เขียนบทความใหม่
        </Link>

      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <article key={post.id} className="blog-card" onClick={() => navigate(`post/${post.id}`)}>
            <div className="blog-card-header">
              <span className="blog-card-date">
                {new Date(post.created_at).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              
              <button 
                className="blog-delete-btn" 
                onClick={(e) => {
                  e.stopPropagation(); 
                  onDelete(post.id);
                }}
              >
                ลบข้อมูล
              </button>
            </div>
            
            <h3 className="blog-card-title">{post.title}</h3>
            <p className="blog-card-desc">{post.desc}</p>
            <Link to={`post/${post.id}`} className="blog-card-link">
              อ่านบทความต่อ →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogHome;
