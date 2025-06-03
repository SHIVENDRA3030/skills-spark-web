
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModernButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-300 ease-out transform';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/25',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm',
    ghost: 'bg-transparent hover:bg-white/10 text-white border border-transparent hover:border-white/20',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <Button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        'hover:scale-105 active:scale-95',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      style={{ willChange: 'transform' }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 ease-out"></div>
    </Button>
  );
};
