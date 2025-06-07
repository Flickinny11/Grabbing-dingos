'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  animate3d?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    icon, 
    iconPosition = 'left',
    animate3d = true,
    children, 
    disabled,
    onClick,
    type = 'button'
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-gradient-to-r from-electric-blue to-neon-cyan text-white hover:shadow-glow focus:ring-electric-blue',
      secondary: 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-700 hover:bg-white/20 focus:ring-gray-300',
      ghost: 'text-gray-700 hover:bg-white/10 focus:ring-gray-300',
      glass: 'glass text-gray-700 hover:shadow-glow focus:ring-electric-blue',
      gradient: 'bg-gradient-to-r from-iridescent-purple to-coral-pink text-white hover:shadow-glow focus:ring-iridescent-purple'
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg'
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          animate3d && 'btn-3d',
          className
        )}
        disabled={disabled || isLoading}
        onClick={onClick}
        whileHover={animate3d ? { scale: 1.02, y: -2 } : { scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {isLoading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && !isLoading && (
          <span className="ml-2">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;