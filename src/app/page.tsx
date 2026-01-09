'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login(email);
  };

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="mb-8 flex items-center gap-4 text-center">
        <Logo />
        <h1 className="font-headline text-4xl font-bold text-primary">
          Lensbox Feedback Hub
        </h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
