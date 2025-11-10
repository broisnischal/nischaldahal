"use client";

import * as React from "react";

import { type ButtonProps } from "app/components/ui/button";
import { cn } from "#app/lib/index/utils.ts";

interface ButtonGroupContextValue {
	size?: NonNullable<ButtonProps["size"]>;
	variant?: NonNullable<ButtonProps["variant"]>;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({});

export const useButtonGroupContext = () => React.useContext(ButtonGroupContext);

interface ButtonGroupProps
	extends ButtonGroupContextValue,
	React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
	({ className, children, size, variant, ...props }, ref) => {
		const contextValue = React.useMemo(
			() => ({ size, variant }),
			[size, variant],
		);

		return (
			<ButtonGroupContext.Provider value={contextValue}>
				<div
					ref={ref}
					className={cn("flex gap-ef-4", className)}
					role="group"
					{...props}
				>
					{children}
				</div>
			</ButtonGroupContext.Provider>
		);
	},
);

ButtonGroup.displayName = "ButtonGroup";
