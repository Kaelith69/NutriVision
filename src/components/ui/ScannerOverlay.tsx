import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ScannerOverlayProps {
    active?: boolean;
    className?: string;
}

export const ScannerOverlay: React.FC<ScannerOverlayProps> = ({
    active = true,
    className
}) => {
    if (!active) return null;

    return (
        <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Scanning Line */}
            <div className="absolute inset-x-0 h-0.5 bg-blue-500/50 shadow-[0_0_15px_#3b82f6] animate-scan" />

            {/* Corner Markers */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500 rounded-tl-xl" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500 rounded-tr-xl" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-500 rounded-bl-xl" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-xl" />

            {/* Center Reticle */}
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
                <div className="w-12 h-12 border border-blue-500/30 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-blue-500 rounded-full" />
                </div>
            </div>
        </div>
    );
};
