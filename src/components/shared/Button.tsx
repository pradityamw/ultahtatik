import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'primary' | 'gold' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  onClick,
  ...rest
}) => {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm rounded-full gap-1.5',
    md: 'px-6 py-3 text-base rounded-full gap-2 font-medium',
    lg: 'px-8 py-4 text-lg rounded-full gap-2.5 font-semibold tracking-wide',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-dreamy-500 via-pink-500 to-rose-500 text-white shadow-soft-glow hover:shadow-lg hover:from-dreamy-600 hover:to-rose-600 active:opacity-95',
    gold:
      'bg-gradient-to-r from-gold-champagne via-gold to-gold-dark text-white shadow-gold-glow hover:shadow-lg active:opacity-95',
    secondary:
      'bg-blush-light text-dreamy-800 border border-blush hover:bg-blush active:bg-blush-dark/30',
    outline:
      'bg-transparent border-2 border-dreamy-400 text-dreamy-600 hover:bg-dreamy-50 hover:border-dreamy-500',
    ghost:
      'bg-transparent text-dreamy-600 hover:bg-blush-light active:bg-blush/40',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.03, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97, y: 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`inline-flex items-center justify-center transition-colors cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};
