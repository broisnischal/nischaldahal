import { cn } from "#app/lib/utils.ts";

export function Kbd({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <kbd className={cn("text-zinc-700 dark:text-zinc-50 text-sm text-center bg-zinc-100 dark:bg-zinc-900 px-1 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-700/60 font-sans", className)}        >
            {children}
        </kbd>
    )
} 