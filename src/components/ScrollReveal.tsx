import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in';
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
}: ScrollRevealProps) {
  return (
    <div
      data-aos={animation}
      data-aos-delay={delay > 0 ? Math.round(delay * 1000) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
