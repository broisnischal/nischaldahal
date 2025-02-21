export default function TOC({ children }: { children: React.ReactNode }) {
    return <div className="toc">
        <h1 className="text-2xl mb-2">Table of Content</h1>
        {children}
    </div>;
}
