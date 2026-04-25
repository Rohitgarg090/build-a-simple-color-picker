import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset';

  const variantStyles = {
    success: 'bg-[#22c55e] text-white ring-[#22c55e]/20',
    warning: 'bg-[#f59e0b] text-white ring-[#f59e0b]/20',
    error: 'bg-[#ef4444] text-white ring-[#ef4444]/20',
    info: 'bg-[#10B981] text-white ring-[#10B981]/20',
    default: 'bg-white text-[#1E293B] ring-[#E2E8F0]',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className || ''}`;

  return (
    <span className={combinedStyles}>
      {children}
    </span>
  );
};