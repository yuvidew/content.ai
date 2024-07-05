import React from 'react';
import { Loader } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva(
    'text-muted-foreground animate-spin text-purple-700',
    {
        variants: {
            size: {
                default: 'h-4 w-4',
                sm: 'h-2 w-2',
                lg: 'h-6 w-6',
                icon: 'h-10 w-10'
            },
            color : {
                dark : "text-purple-200",
                light : "text-purple-700",
                transparent : "text-white"
            }
        },
        defaultVariants: {
            size: 'default',
            color : 'light',
        },
        
    }
);

interface SpinnerSizeProps {
    size?: 'default' | 'sm' | 'lg' | 'icon';
    color?:"dark" | "light" | "transparent";
}



const Spinner: React.FC<SpinnerSizeProps> = ({ size = 'default' , color = "light" }) => {
    return (
        <Loader className={cn(spinnerVariants({ size  , color}))} />
    );
};

export default Spinner;
