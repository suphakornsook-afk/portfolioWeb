import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 

function ProductDetail({ onAddToCart }) {

  const { id } = useParams(); 
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ดึงข้อมูลสินค้าไม่สำเร็จ:", err);
        setLoading(false);
      });
  }, [id]); 

  if (loading) return <div className="products-loading">กำลังโหลดรายละเอียดสินค้า... 📦</div>;
  if (!product) return <div className="products-loading">ไม่พบข้อมูลสินค้านี้ครับ ❌</div>;


  return (
    <div className="detail-container">
      {/* ปุ่มกดกลับหน้าแรกสไตล์ Minimal */}
      <Link to="/" className="detail-back-btn">← กลับไปหน้าแรก</Link>
      
      <div className="detail-layout">
        {/* ฝั่งซ้าย: รูปภาพสินค้าใหญ่ชัดเจน */}
        <div className="detail-image-box">
          <img src={product.image} alt={product.title} />
        </div>

        {/* ฝั่งขวา: รายละเอียดสินค้าแบบจัดเต็ม */}
        <div className="detail-content">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          
          <div className="detail-rating">
            ⭐ {product.rating?.rate} ({product.rating?.count} รีวิวจากผู้ซื้อ)
          </div>

          <p className="detail-description">{product.description}</p>
          
          <div className="detail-price-section">
            <span className="detail-price">${product.price}</span>
            <button onClick={() => onAddToCart(product)} className="detail-add-btn">
              เพิ่มลงตะกร้าสินค้า 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;