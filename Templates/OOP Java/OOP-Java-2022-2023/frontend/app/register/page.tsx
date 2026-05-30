'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/auth';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    phone: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await register(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign Up - Binary Supermarket</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={formData.firstname}
            onChange={(e) => setFormData({...formData, firstname: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
          Sign Up
        </button>
      </form>
      
      <p style={{marginTop: '20px', textAlign: 'center'}}>
        Already have an account? <Link href="/login" style={{color: '#3498db'}}>Login</Link>
      </p>
    </div>
  );
}
