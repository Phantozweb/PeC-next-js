import { Glasses } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground ${className}`}>
      <Glasses className="h-6 w-6" />
    </div>
  );
}
