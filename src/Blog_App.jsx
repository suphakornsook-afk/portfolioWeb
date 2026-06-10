import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BlogHome from './pages/blog/BlogHome';
import BlogNavbar from './components/BlogNavbar';
import Footer from './components/Footer';
import CreatePost from './pages/blog/CreatePost';
import { supabase } from './supabaseClient';
import PostDetail from './pages/blog/PostDetail';

function Blog_App() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreatePost = async (newPost) => {
        const { error } = await supabase
            .from('posts')
            .insert([{ title: newPost.title, desc: newPost.desc }]);

        if (!error) fetchPosts();
    };

    const handleDeletePost = async (id) => {
        const confirmDelete = window.confirm('คุณแน่ใจใช่ไหมว่าจะลบเนื้อหาบทความนี้? 🗑️');
        if (!confirmDelete) return;

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) {
            alert('ลบบทความไม่สำเร็จ: ' + error.message);
        } else {
            fetchPosts(); // ลบเสร็จดึงข้อมูลใหม่มาอัปเดตหน้าจอ
        }
  };

    return (
    <div className="blog-app-scope" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <BlogNavbar />
      
      <main style={{ flex: 1, padding: '2rem', maxWidth: '900px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <Routes>
          {/* 🔗 ผูกฟังก์ชัน handleDeletePost ส่งไปให้หน้าบ้านผ่าน Props ชื่อ onDelete */}
          <Route path="/" element={<BlogHome posts={posts} onDelete={handleDeletePost} />} />
          <Route path="create" element={<CreatePost onCreate={handleCreatePost} />} />
          <Route path="post/:id" element={<PostDetail />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default Blog_App;
