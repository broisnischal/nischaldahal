import { LinkItem } from "./navbar";

export default function Footer() {
  return <>
    <div>
      <p className="text-sm text-zinc-700">© {new Date().getFullYear()} - present <LinkItem className="text-slate-400" href="https://twitter.com/broisnees" to="" name="@nischalxdahal" />. All Rights Reserved.</p>
    </div>
  </>;
}
