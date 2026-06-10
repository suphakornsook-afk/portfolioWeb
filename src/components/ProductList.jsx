import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // เอาไว้ทำข้อความ "กำลังโหลด..."

  useEffect(() => {

    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data); // เอาข้อมูลสินค้าที่ได้ไปเก็บใน State
        setLoading(false); // โหลดเสร็จแล้ว เปลี่ยนเป็น false
      })
      .catch((err) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <div className="products-loading">กำลังโหลดสินค้าสักครู่นะครับ... 📦</div>;
  }

  return (

    <div className="products-grid">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={() => onAddToCart(product)} 
        />
      ))}
    </div>
  );
}

export default ProductList;