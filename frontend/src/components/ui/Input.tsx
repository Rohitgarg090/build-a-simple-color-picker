import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  id,
  required,
  ...rest
}) => {
  const inputId = id || (name ? `input-${name}` : undefined) || (label ? `input-${label.toLowerCase().replace(/\s/g, '-')}` : undefined) || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#1E293B] mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 rounded-md
          bg-[#FFFFFF] border border-[#E2E8F0] text-[#1E293B]
          focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent
          ${disabled ? 'opacity-70 cursor-not-allowed bg-gray-50' : ''}
          ${error ? 'border-red-500' : ''}
        `}
        {...rest}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};