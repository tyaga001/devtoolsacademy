import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
    src: string | { src: string; height: number; width: number };
}

export function OptimizedImage({ src, alt, ...props }: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    const imageSrc = typeof src === 'string' ? src : src.src;
    const imageProps = typeof src === 'string' ? props : { ...props, ...src };

    return (
        <div className="relative">
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
                src={imageSrc}
                alt={alt}
                {...imageProps}
                className={`transition-opacity duration-300 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}