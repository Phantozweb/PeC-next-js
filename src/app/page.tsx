'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <main className="login-page">
      {/* Left Side: Visuals & Theme */}
      <div className="visual-side">
        {/* Abstract Shapes matching theme */}
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        
        {/* Glass Card Decoration */}
        <div className="glass-card-decor">
            <h2>Visionary Insights.</h2>
            <p>Welcome to the Lensbox Feedback Hub. Helping you see customer satisfaction clearly.</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="form-side">
        <div className="login-container">
            
            {/* Logo area */}
            <div className="logo-text">
                <div className="logo-icon"></div>
                LENSBOX
            </div>

            <div className="divider"></div>

            <h1>Welcome Back!</h1>
            <p className="subtitle">Enter your credentials to sign in to your account.</p>

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="you@example.com" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      placeholder="••••••••" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn-submit">Sign In</button>
            </form>

        </div>
      </div>
    </main>
  );
}
