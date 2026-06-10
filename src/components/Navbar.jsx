import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 5%',      // 💡 เปลี่ยนจาก 1rem เป็น '1rem 5%' เพื่อให้มีระยะเว้นจากขอบซ้ายขวา 5% เสมอไม่ว่าจอจะกว้างแค่ไหน
      backgroundColor: "#f4843f",
      width: '100%',           // 💡 ยืดเต็มจอ 100%
      boxSizing: 'border-box', // 💡 ป้องกันไม่ให้ Padding ดันขอบจอจนเกินออกไปด้านข้าง
      flexWrap: 'wrap', 
      gap: '0.5rem'
    }}>
      
      {/* ส่วนโลโก้ */}
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>🛍️ MyE-Shop</Link>
      </div>

      {/* เมนูและตะกร้า */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', margin: 0, padding: 0 }}>
          <li>
            <Link to="/" style={{ color: '#000000', textDecoration: 'none', fontWeight: '500' }}>
              หน้าแรก
            </Link>
          </li>
        </ul>

        <div className="cart-icon" style={{ cursor: 'pointer' }}>
          <Link to="/shop/cart" style={{ color: '#000000', textDecoration: 'none', fontWeight: '500' }}>
            🛒 ตะกร้าสินค้า 
            <span style={{ 
              backgroundColor: 'red', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '2px 6px', 
              marginLeft: '5px', 
              fontSize: '0.8rem' 
            }}>
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
