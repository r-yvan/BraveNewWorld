'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPurchaseHistory } from '@/lib/purchases';
import { getUser, logout, isAuthenticated } from '@/lib/auth';
import { PurchaseReport } from '@/types';

export default function Purchases() {
  const router = useRouter();
  const [purchases, setPurchases] = useState<PurchaseReport[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    setUser(getUser());
    loadPurchases();
  }, [router]);

  const loadPurchases = async () => {
    try {
      const data = await getPurchaseHistory();
      setPurchases(data);
    } catch (error) {
      console.error('Failed to load purchase history', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const goToProducts = () => {
    router.push('/products');
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <>
      <div className="header">
        <div className="header-content">
          <h1>Binary Supermarket</h1>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <span>Welcome, {user?.firstname}</span>
            <button onClick={goToProducts} className="btn">Products</button>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Purchase History</h2>
        
        {purchases.length === 0 ? (
          <div style={{textAlign: 'center', padding: '40px'}}>
            <p>No purchases yet</p>
            <button onClick={goToProducts} className="btn btn-primary" style={{marginTop: '20px'}}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden'}}>
              <thead>
                <tr style={{background: '#f5f5f5'}}>
                  <th style={{padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd'}}>Order #</th>
                  <th style={{padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd'}}>Date</th>
                  <th style={{padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd'}}>Product</th>
                  <th style={{padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd'}}>Quantity</th>
                  <th style={{padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd'}}>Unit Price</th>
                  <th style={{padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd'}}>Total</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase) => (
                  <tr key={purchase.no} style={{borderBottom: '1px solid #eee'}}>
                    <td style={{padding: '12px'}}>{purchase.no}</td>
                    <td style={{padding: '12px'}}>{new Date(purchase.date).toLocaleDateString()}</td>
                    <td style={{padding: '12px'}}>{purchase.productName}</td>
                    <td style={{padding: '12px', textAlign: 'right'}}>{purchase.quantity}</td>
                    <td style={{padding: '12px', textAlign: 'right'}}>{purchase.unitPrice.toFixed(2)} RWF</td>
                    <td style={{padding: '12px', textAlign: 'right', fontWeight: 'bold'}}>{purchase.total.toFixed(2)} RWF</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{background: '#f5f5f5', fontWeight: 'bold'}}>
                  <td colSpan={5} style={{padding: '12px', textAlign: 'right'}}>Grand Total:</td>
                  <td style={{padding: '12px', textAlign: 'right'}}>
                    {purchases.reduce((sum, p) => sum + p.total, 0).toFixed(2)} RWF
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
