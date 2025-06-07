
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const AuroraBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      
      {/* Aurora waves */}
      <motion.div
        className="absolute -inset-10 opacity-70"
        animate={{
          background: [
            "radial-gradient(600px circle at 0% 0%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(600px circle at 100% 100%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(600px circle at 0% 100%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(600px circle at 100% 0%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(600px circle at 0% 0%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Aurora overlay 1 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15) 0%, transparent 50%)`,
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora overlay 2 */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(400px circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            "radial-gradient(400px circle at 80% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            "radial-gradient(400px circle at 40% 80%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            "radial-gradient(400px circle at 60% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
            "radial-gradient(400px circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Aurora overlay 3 */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(300px circle at 70% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
            "radial-gradient(300px circle at 30% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
            "radial-gradient(300px circle at 70% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
            "radial-gradient(300px circle at 30% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
            "radial-gradient(300px circle at 70% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}
    </div>
  );
};
