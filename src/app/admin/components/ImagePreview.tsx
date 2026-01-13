'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ImagePreview({ src, alt, size = 'medium' }: ImagePreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [showFullSize, setShowFullSize] = useState(false);

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  if (!src) {
    return (
      <div className={`${sizeClasses[size]} bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center`}>
        <span className="text-gray-600 text-xs">No Image</span>
      </div>
    );
  }

  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center`}>
        <div className="text-center p-2">
          <span className="text-red-500 text-xs">❌</span>
          <p className="text-red-500 text-xs mt-1">Not Found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${sizeClasses[size]} relative rounded-lg overflow-hidden border-2 border-gray-700 hover:border-amber-500 transition-colors cursor-pointer group`}
        onClick={() => setShowFullSize(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs">🔍 View</span>
        </div>
      </div>

      {/* Full Size Modal */}
      {showFullSize && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
          onClick={() => setShowFullSize(false)}
        >
          <div className="relative max-w-2xl max-h-full">
            <button
              onClick={() => setShowFullSize(false)}
              className="absolute -top-12 right-0 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={alt}
                width={800}
                height={800}
                className="object-contain"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="mt-4 text-center text-gray-400 text-sm">
              {src}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
