import { Separator } from "#app/components/ui/separator.tsx";
import { Kbd } from "./kbd";

export default function TOC({ children }: { children: React.ReactNode }) {
    return <div className="toc">
        <h3 className="mb-2 flex items-center gap-2">Page Contents  <Kbd className="!text-xs !text-zinc-500 dark:!text-zinc-400">&darr;</Kbd></h3>
        <ul className="list-none lowercase ">
            {children}
        </ul>
    </div>;
}
