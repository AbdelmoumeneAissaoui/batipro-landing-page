import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl font-bold text-[var(--color-dark)]">
        {children}
      </h2>
      <div className="mt-2 w-24 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
    </div>
  );
}