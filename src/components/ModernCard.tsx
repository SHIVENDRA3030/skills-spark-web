
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <Card 
      className={`
        bg-white/5 backdrop-blur-sm border border-white/10
        ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/10' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
      style={{ willChange: 'transform, background-color, border-color' }}
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
};

export const GlowCard: React.FC<ModernCardProps> = ({ 
  children, 
  className = '', 
  hover = true 
}) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
      <Card 
        className={`
          relative bg-slate-900/90 backdrop-blur-sm border border-white/10
          ${hover ? 'group-hover:bg-slate-800/90' : ''}
          transition-all duration-300 ease-out
          ${className}
        `}
      >
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
