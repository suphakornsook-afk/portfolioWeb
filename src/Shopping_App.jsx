import React,{ useState } from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './Shopping_App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard'

function Shopping_App() {
  const [cartItems, setCartItems] = useState([]);
  
  const handleAddToCart = (product) => {
    setCartItems((prevItems) =>{
      const isExist = prevItems.find((item) => item.id === product.id);
      
      if(isExist){
        return prevItems.map((item)=> 
          item.id === product ? { ...item, quantity: item.quantity + 1 } : item
        
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    }) 
  }
  
  const totalQuantities = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar cartCount={totalQuantities} />
      <main style={{ 
      flex: 1, 
      padding: '2rem 5%',       // ด้านบน-ล่าง 2rem, ด้านซ้าย-ขวา 5% (ล้อไปกับสไตล์ของ Navbar)
      width: '100%', 
      boxSizing: 'border-box'   // บังคับไม่ให้ padding ดันจอจนเกิดขอบดำด้านข้าง
      }}>
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} /> 
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />   {/* มันคือ /shop/cart */}
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} /> {/* มันคือ /shop/product/:id */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default Shopping_App;


