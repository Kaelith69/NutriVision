import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TacticalCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export const TacticalCard: React.FC<TacticalCardProps> = ({
    children,
    className,
    hoverEffect = false,
    ...props
}) => {
    return (
        <div
            className={cn(
                "bg-white rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden backdrop-blur-xl",
                hoverEffect && "group hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500",
                className
            )}
            {...props}
        >
            {hoverEffect && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};
