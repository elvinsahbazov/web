import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

export default function Container({ children, className = '', wide }: Props) {
  return (
    <div className={`mx-auto w-full px-6 lg:px-12 ${wide ? 'max-w-[1800px]' : 'max-w-[1536px]'} ${className}`}>
      {children}
    </div>
  );
}
