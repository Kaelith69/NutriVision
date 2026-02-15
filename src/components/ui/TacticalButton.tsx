import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TacticalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
}

export const TacticalButton: React.FC<TacticalButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    active = false,
    ...props
}) => {
    const baseStyles = "relative font-black uppercase tracking-widest transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 rounded-xl group overflow-hidden";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20 hover:shadow-blue-600/30 ring-1 ring-white/10",
        secondary: "bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700 shadow-lg shadow-black/20",
        ghost: "bg-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-100",
        danger: "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-900/20"
    };

    const sizes = {
        sm: "text-[9px] px-3 py-2",
        md: "text-[10px] px-5 py-3",
        lg: "text-xs px-8 py-5"
    };

    const activeStyles = active ? "ring-2 ring-blue-500 bg-slate-800 text-blue-400" : "";

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], activeStyles, className)}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[message_1s_ease-in-out]" />
            )}
        </button>
    );
};
