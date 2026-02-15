import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TacticalBadgeProps {
    children: React.ReactNode;
    variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
    className?: string;
    icon?: React.ReactNode;
}

export const TacticalBadge: React.FC<TacticalBadgeProps> = ({
    children,
    variant = 'neutral',
    className,
    icon
}) => {
    const variants = {
        neutral: "bg-slate-100 text-slate-500 border-slate-200",
        success: "bg-emerald-50 text-emerald-600 border-emerald-200",
        warning: "bg-amber-50 text-amber-600 border-amber-200",
        error: "bg-rose-50 text-rose-600 border-rose-200",
        info: "bg-blue-50 text-blue-600 border-blue-200"
    };

    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest mono shadow-sm",
            variants[variant],
            className
        )}>
            {icon && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
            {children}
        </span>
    );
};
