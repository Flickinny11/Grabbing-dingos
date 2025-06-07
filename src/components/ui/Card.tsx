'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
  className?: string;
  variant?: 'glass' | 'solid' | 'gradient';
  hover3d?: boolean;
  glowOnHover?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'glass', 
    hover3d = true,
    glowOnHover = false,
    children,
    onClick
  }, ref) => {
    const baseClasses = 'rounded-xl transition-all duration-300';
    
    const variantClasses = {
      glass: 'glass',
      solid: 'bg-white shadow-lg border border-gray-200',
      gradient: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20'
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hover3d && 'btn-3d',
          glowOnHover && 'hover:shadow-glow',
          className
        )}
        onClick={onClick}
        whileHover={hover3d ? { 
          scale: 1.02, 
          y: -5,
          rotateX: 2,
          rotateY: 2 
        } : { scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;