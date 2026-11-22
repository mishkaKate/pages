import React from 'react';
import './chip.css';

export interface ChipProps {
    label: string;
    variant?: 'light' | 'dark';
    size?: 'medium' | 'big'
}

export const Chip: React.FC<ChipProps> = ({
    label,
    variant = 'light',
    size = 'medium'
}) => {
    return (
        <span
            className={`chip chip--${variant} chip--${size}`}
        >
            {label}
        </span>
    );
};
