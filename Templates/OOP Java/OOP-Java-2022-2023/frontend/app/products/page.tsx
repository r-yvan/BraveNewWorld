'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProducts } from '@/lib/products';
import { getUser, logout, isAuthenticated } from '@/lib/auth';
import { checkout } from '@/lib/cart';
import { Product, CartItem } from '@/types';

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    setUser(getUser());
    loadProducts();
  }, [router]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.code === product.code);
    if (existing) {
      setCart(cart.map(item =>
        item.product.code === product.code
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setMessage(`${product.name} added to cart`);
    setTimeout(() => setMessage(''), 3000);
  };

  const updateQuantity = (productCode: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.product.code !== productCode));
    } else {
      setCart(cart.map(item =>
        item.product.code === productCode ? { ...item, quantity } : item
      ));
    }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    
    try {
      await checkout(cart);
      setMessage('Checkout successful!');
      setCart([]);
      loadProducts();
    } catch (error: any) {
      alert(error.response?.data || 'Checkout failed');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const goToPurchases = () => {
    router.push('/purchases');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <>
      <div className="header">
        <div className="header-content">
          <h1>Binary Supermarket</h1>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <span>Welcome, {user?.firstname}</span>
            <span>Cart <span className="cart-badge">{cart.length}</span></span>
            <button onClick={goToPurchases} className="btn">My Purchases</button>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>

      <div className="container">
        {message && <div className="success">{message}</div>}
        
        <h2>Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.code} className="product-card">
              {product.image && <img src={product.image} alt={product.name} />}
              <h3>{product.name}</h3>
              <p>Type: {product.productType}</p>
              <p>Price: {product.price} RWF</p>
              <p>Stock: {product.availableQuantity}</p>
              <button
                onClick={() => addToCart(product)}
                className="btn btn-success"
                disabled={product.availableQuantity === 0}
                style={{width: '100%', marginTop: '10px'}}
              >
                {product.availableQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div style={{marginTop: '40px', background: 'white', padding: '20px', borderRadius: '8px'}}>
            <h2>Shopping Cart</h2>
            {cart.map(item => (
              <div key={item.product.code} style={{display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee'}}>
                <span>{item.product.name}</span>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <button onClick={() => updateQuantity(item.product.code, item.quantity - 1)} className="btn">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.code, item.quantity + 1)} className="btn">+</button>
                  <span>{item.product.price * item.quantity} RWF</span>
                </div>
              </div>
            ))}
            <div style={{marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3>Total: {cartTotal} RWF</h3>
              <button onClick={handleCheckout} className="btn btn-primary">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
