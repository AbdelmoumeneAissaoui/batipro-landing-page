import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'success' | 'warning';
  className?: string;
}

export function Badge({
  children,
  variant = 'primary',
  className = ''
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-[var(--color-primary)] text-white',
    accent: 'bg-[var(--color-accent)] text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
  };

  return (
    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}