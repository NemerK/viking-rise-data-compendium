'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  shape?: 'square' | 'circle' | 'diamond';
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder = 'viking-rise',
  shape = 'square',
  size = 'medium',
  label,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const shapeClasses = {
    square: 'rounded-lg',
    circle: 'rounded-full',
    diamond: 'rounded-lg rotate-45',
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File too large (max 10MB)');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err) {
      setError('Upload failed');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm text-gray-400">{label}</label>
      )}
      
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative ${sizeClasses[size]} ${shapeClasses[shape]}
          border-2 border-dashed cursor-pointer
          transition-all duration-200 overflow-hidden
          ${isDragOver 
            ? 'border-amber-500 bg-amber-500/20' 
            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        {value ? (
          <>
            <div className={`absolute inset-0 ${shape === 'diamond' ? '-rotate-45 scale-150' : ''}`}>
              <Image
                src={value}
                alt="Uploaded"
                fill
                className="object-cover"
              />
            </div>
            <button
              onClick={handleRemove}
              className={`
                absolute top-1 right-1 w-5 h-5 
                bg-red-500 text-white rounded-full 
                text-xs flex items-center justify-center
                hover:bg-red-600 z-10
                ${shape === 'diamond' ? '-rotate-45' : ''}
              `}
            >
              ×
            </button>
          </>
        ) : (
          <div className={`
            absolute inset-0 flex flex-col items-center justify-center
            text-gray-500 text-xs text-center p-2
            ${shape === 'diamond' ? '-rotate-45' : ''}
          `}>
            {isUploading ? (
              <div className="animate-spin text-lg">⏳</div>
            ) : (
              <>
                <span className="text-lg mb-1">📷</span>
                <span>Drop or click</span>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {value && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste URL..."
          className="w-full px-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded text-gray-300 focus:border-amber-500 focus:outline-none"
        />
      )}
    </div>
  );
}
