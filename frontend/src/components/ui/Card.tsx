import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string; // e.g., "20px", "1rem 2rem"
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding,
  onClick,
}) => {
  const cardStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF', // surface token
    border: '1px solid #E2E8F0', // border token
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // subtle box-shadow
    padding: padding || '16px', // Default padding if not provided
  };

  return (
    <div
      style={cardStyles}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
}