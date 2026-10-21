import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

// Les variantes pointent vers la famille .btn de src/index.css, pour que
// ce composant et les boutons ecrits a la main dans les pages soient le
// meme objet. Avant, il y avait quatre styles de bouton sur le site —
// deux degrades differents, une pastille translucide et celui-ci — et
// aucun ne faisait la cible tactile de 44px.
const buttonVariants = cva('btn', {
	variants: {
		variant: {
			default: 'btn-primary',
			destructive: 'btn-destructive',
			outline: 'btn-secondary',
			secondary: 'btn-secondary',
			ghost: 'btn-ghost',
			link: 'btn-link',
		},
		size: {
			default: '',
			sm: 'btn-sm',
			lg: 'btn-lg',
			icon: 'btn-icon',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
});

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			ref={ref}
			{...props}
		/>
	);
});
Button.displayName = 'Button';

export { Button, buttonVariants };
