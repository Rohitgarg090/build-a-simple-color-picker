import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.192 5.792 3.042 7.709l-1.432 1.432C1.192 20.208 0 17.542 0 12h4zm12 0a7.962 7.962 0 01-4 0V0c4.627 0 9 5.373 9 12h-4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.192-5.792-3.042-7.709l1.432-1.432C22.808 3.792 24 6.458 24 12h-4z"
    ></path>
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled: propDisabled = false,
  onClick,
  children,
  className,
  type = 'button',
  ...rest
}) => {
  const disabled = propDisabled || loading;

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const mergedClassName = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabled ? disabledStyles : '',
    className
  );

  return (
    <button
      type={type}
      className={mergedClassName}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {loading && <Spinner />}
      <span className={twMerge(loading ? 'ml-2' : '', loading ? 'sr-only' : '')}>{children}</span>
    </button>
  );
};

export default Button;
