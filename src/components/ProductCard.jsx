import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {

  const {id, title, price, image, category } = product;

  return (
    <div className="product-card">
      <Link to={`/shop/product/${id}`}>
        <img src={image} alt={title} className="product-card-img"/>
      </Link>

      <div className="product-card-content">
        <span className="product-card-category">{category}</span>
        <Link to={`/shop/product/${id}`}>
          <h4 className="product-card-title">{title}</h4>
        </Link>
        <p className="product-card-price">${price}</p>
      </div>
      <button 
        onClick={onAddToCart}
        className="product-card-btn"
      >
        เพิ่มลงตะกร้า
      </button>
    </div>
  );
}

export default ProductCard;