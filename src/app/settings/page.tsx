'use client';
import { AppLayout } from '@/components/app-layout';
import { SettingsForm } from '@/components/settings/settings-form';
import { useAuth } from '@/hooks/use-auth';
import { MOCK_EMPLOYEES } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { AppSettings } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const defaultLogo = PlaceHolderImages.find(img => img.id === 'company-logo');

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [settings, setSettings] = useState<AppSettings>({
    logoUrl: defaultLogo?.imageUrl || '',
    whatsappTemplate: 'Hello {customerName}, thank you for your purchase from Lensbox! We hope you are enjoying your new eyewear.',
    employees: MOCK_EMPLOYEES,
  });

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
    // In a real app, you would save this to a database
    console.log('Settings updated:', newSettings);
  };
  
  if (loading || !user || user.role !== 'admin') {
    return (
      <AppLayout>
        <div className="text-center text-muted-foreground">Loading or unauthorized...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your application settings and user configurations.
          </p>
        </div>
        <SettingsForm settings={settings} onSave={handleSettingsChange} />
      </div>
    </AppLayout>
  );
}
