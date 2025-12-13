// Helper component that automatically applies withBase() to image src
import React from 'react';
import { withBase } from '@/lib/withBase';

export function AssetImage({ src, alt = '', className = '', ...props }) {
  if (!src) return null;

  // Only apply withBase to local asset paths
  const resolvedSrc = (src.startsWith('/assets/') || src.startsWith('/media/'))
    ? withBase(src)
    : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      {...props}
    />
  );
}

export default AssetImage;
