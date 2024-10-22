import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BoxProps {
  children: ReactNode;
  className?: string;
}

export const Box: React.FC<BoxProps> = ({ children, className }) => {
  return <div className={`box ${className}`}>{children}</div>;
};

interface HBoxProps {
  children: ReactNode;
  gutter?: number;
}

export const HBox: React.FC<HBoxProps> = ({ children, gutter = 16 }) => {
  return (
    <div className="flex" style={{ gap: `${gutter}px` }}>
      {children}
    </div>
  );
};

interface VBoxProps {
  children: ReactNode;
  gutter?: number;
}

export const VBox: React.FC<VBoxProps> = ({ children, gutter = 16 }) => {
  return (
    <div className="flex flex-col" style={{ gap: `${gutter}px` }}>
      {children}
    </div>
  );
};

interface GridProps {
  children: ReactNode;
  gutter?: number;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  gutter = 16,
  className,
}) => {
  const gridClasses = cn(
    'grid',
    className,
    'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2',
  );

  return (
    <div className={gridClasses} style={{ gap: `${gutter}px` }}>
      {children}
    </div>
  );
};
