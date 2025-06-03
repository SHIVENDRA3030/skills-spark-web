
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from './PerformantAnimations';

const stats = [
  { number: 500, label: "Students", suffix: "+" },
  { number: 50, label: "Events", suffix: "+" },
  { number: 25, label: "Startups", suffix: "+" },
  { number: 100, label: "Success", suffix: "%" }
];

const useCountUp = (end: number, isVisible: boolean, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(end * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, isVisible, duration]);

  return count;
};

export const AnimatedStats = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const count = useCountUp(stat.number, isIntersecting, 2000 + index * 200);
        
        return (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {count}{stat.suffix}
            </div>
            <div className="text-slate-400 text-sm uppercase tracking-wider">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};
