'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  text?: string;
  className?: string;
}

export default function BackButton({ href, text = 'Back', className = '' }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Link 
      href={href || '/'}
      className={`inline-flex items-center text-gray-400 hover:text-white transition-colors ${className}`}
    >
      <span className="mr-2">←</span>
      {text}
    </Link>
  );
}
