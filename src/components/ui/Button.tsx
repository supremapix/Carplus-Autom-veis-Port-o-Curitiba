import React from 'react';
import { Link } from 'react-router-dom';

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'whatsapp' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
  title?: string;
  'aria-label'?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  to,
  href,
  target,
  rel,
  className = '',
  children,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2.5 font-display font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full active:scale-[0.98]';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'min-h-[44px] px-5 py-2 text-xs',
    md: 'min-h-[48px] px-6 py-3 text-sm',
    lg: 'min-h-[56px] px-8 py-3.5 text-base',
    xl: 'min-h-[60px] px-10 py-4 text-base sm:text-lg',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#F59C00] hover:bg-[#F7941D] text-black shadow-lg shadow-[#F59C00]/20 border border-[#F59C00]',
    dark:
      'bg-black hover:bg-[#1A1A1A] text-white border border-[#2E2E2E] hover:border-[#F59C00]/40 shadow-md shadow-black/40',
    outline:
      'bg-white hover:bg-black text-black hover:text-white border-2 border-[#E0E0E0] hover:border-black shadow-xs',
    whatsapp:
      'bg-[#25D366] hover:bg-[#20BA5A] text-black font-extrabold shadow-lg shadow-[#25D366]/20 border border-[#25D366]',
    ghost:
      'bg-transparent hover:bg-black/5 text-[#121212] border border-transparent',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={combinedClasses}
        onClick={onClick}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children && <span>{children}</span>}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
