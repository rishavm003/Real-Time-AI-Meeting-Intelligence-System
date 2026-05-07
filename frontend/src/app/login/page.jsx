'use client';
import { useState } from 'react';
import { fetcher } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await fetcher('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Meet Brief</h1>
        <input 
          type="email" placeholder="Email" 
          className="w-full p-2 border rounded mb-4"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-2 border rounded mb-6"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
