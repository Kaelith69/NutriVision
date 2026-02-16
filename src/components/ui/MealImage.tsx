
import React, { useState, useEffect } from 'react';
import { getImage } from '../../services/db';
import { ImageOff } from 'lucide-react';

interface MealImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    imageId: string;
}

export const MealImage: React.FC<MealImageProps> = ({ imageId, className, alt, ...props }) => {
    const [src, setSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;

        const fetchImage = async () => {
            try {
                setLoading(true);
                // First try to load from DB (assuming imageId is the key)
                const data = await getImage(imageId);
                if (data && mounted) {
                    setSrc(data);
                } else if (imageId && imageId.startsWith('data:image')) {
                    // Fallback for legacy data if any
                    if (mounted) setSrc(imageId);
                } else {
                    // If not found, maybe it's a URL?
                    if (mounted) setSrc(imageId);
                }
            } catch (err) {
                console.error("Failed to load image", err);
                setError(true);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (imageId) {
            fetchImage();
        } else {
            setLoading(false);
            setError(true);
        }

        return () => {
            mounted = false;
        };
    }, [imageId]);

    if (loading) {
        return <div className={`animate-pulse bg-slate-200 ${className}`} />;
    }

    if (error || !src) {
        return (
            <div className={`bg-slate-100 flex items-center justify-center text-slate-300 ${className}`}>
                <ImageOff className="w-1/3 h-1/3" />
            </div>
        );
    }

    return <img src={src} alt={alt} className={className} {...props} />;
};
