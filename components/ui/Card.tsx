import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const hoverClasses = hover
    ? 'hover:shadow-xl transition-all duration-300'
    : 'shadow-sm';

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 ${hoverClasses} overflow-hidden ${className}`}>
      {children}
    </div>
  );
}