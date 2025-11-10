export function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-[60vh] py-10 flex flex-col gap-4 ">
            {children}
        </div>
    );
} 