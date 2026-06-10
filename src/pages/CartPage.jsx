import React from 'react';

function CartPage({ cartItems }) {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className='cart-container'>
      <h2 className='cart-title'>🛒 ตะกร้าสินค้าของคุณ</h2>

      {cartItems.length === 0 ? (
   
        <div className='cart-empty'>
          <p>ตอนนี้ยังไม่มีสินค้าในตะกร้าเลยครับ 📦</p>
        </div>
      ) : (
        // เคสที่ 2: ถ้ามีสินค้าในตะกร้า
        <div>
          <div className='cart-list'>
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className='cart-item'
              >

                <img src={item.image} alt={item.title} className='cart-item-img' />
                

                <div className='cart-item-info'>
                  <h4>{item.title}</h4>
                  <span>ราคาต่อชิ้น: ${item.price}</span>
                </div>


                <div className='cart-item-qty'>
                  <span>จำนวน: <b>{item.quantity}</b> ชิ้น</span>
                </div>


                <div className='cart-item-price'>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              ยอดรวมทั้งหมด: <span >${totalPrice.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={() => alert('ขอบคุณที่ร่วมทดสอบระบบช้อปปิ้งครับ! 🎉')}
              className="cart-checkout-btn"
            >
              ชำระเงิน (Checkout)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;