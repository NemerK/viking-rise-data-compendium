'use client';

import Image from 'next/image';
import { HeroClass } from '@/types';

interface HeroClassIconProps {
  heroClass: HeroClass;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const classIconMap: Record<HeroClass, string> = {
  'Infantry': '/images/infantry-icon.png',
  'Pikeman': '/images/pikemen-icon.png',
  'Archer': '/images/archer-icon.png',
  'Porter': '/images/porter-icon.png',
  'Polymath': '/images/infantry-icon.png', // Using infantry icon as fallback
};

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export default function HeroClassIcon({ heroClass, size = 'md', className = '' }: HeroClassIconProps) {
  const iconSize = sizeMap[size];
  
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src={classIconMap[heroClass]}
        alt={`${heroClass} class`}
        width={iconSize}
        height={iconSize}
        className="object-contain"
      />
    </div>
  );
}
