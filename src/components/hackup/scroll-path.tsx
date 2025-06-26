
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollPath() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const pathRef = useRef<SVGPathElement>(null);
  
  const pathLength = useTransform(scrollYProgress, (value) => {
    if (pathRef.current) {
        const totalLength = pathRef.current.getTotalLength();
        return totalLength * value;
    }
    return 0;
  });

  const sunY = useTransform(scrollYProgress, [0, 1], ['5.56%', '100%']); // 200/3600

  const pathD = "M 820 200 V 3600";
  
  return (
    <div className="absolute top-0 right-0 w-[900px] h-full pointer-events-none">
      <motion.div
        className="absolute"
        style={{
          left: '820px',
          top: sunY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600" style={{
            boxShadow: '0 0 60px 30px hsl(var(--primary) / 0.7)',
        }}/>
      </motion.div>
      <svg
        width="900"
        height="100%"
        viewBox="0 0 900 3600"
        preserveAspectRatio="xMidYMin slice"
        className="opacity-40"
      >
        <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4 8" />
        <motion.path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          style={{
            pathLength: pathLength,
            pathOffset: "0px" // This ensures it starts drawing from the top
          }}
          initial={{ pathLength: 0 }}
        />
      </svg>
    </div>
  );
}
