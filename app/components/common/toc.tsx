export default function TOC({ children }: { children: React.ReactNode }) {
    return <div className="toc">
        <h3  className="mb-2">Table of Content</h3>
        <ul className="list-none lowercase">
            {children}
        </ul>
    </div>; 
}
 