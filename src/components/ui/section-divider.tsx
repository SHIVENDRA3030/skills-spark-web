
import { motion } from 'framer-motion';

interface SectionDividerProps {
  type?: 'wave' | 'diagonal' | 'curve';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  type = 'wave', 
  className = '' 
}) => {
  const renderDivider = () => {
    switch (type) {
      case 'wave':
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <motion.path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        );
      case 'diagonal':
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <motion.path
              d="M0,120 L1200,0 L1200,120 Z"
              fill="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        );
      case 'curve':
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <motion.path
              d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"
              fill="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative h-20 text-slate-800 dark:text-slate-900 ${className}`}>
      {renderDivider()}
    </div>
  );
};
