import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList'; // ปรับ path ให้ถูกต้อง

function Home({ onAddToCart }) {
  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#000000' }}>✨ สินค้าแนะนำ ✨</h2>
      <ProductList onAddToCart={onAddToCart} />
    </>
  );
}

export default Home;