import { useEffect, useState, type ReactNode } from "react";
import { docsUrl, guiDocsUrl, hubRepository, repository, sitePath } from "../lib";

type Page = "home" | "download";

const links: Array<{ page?: Page; label: string; href: string }> = [
  { page: "home", label: "首页", href: sitePath() },
  { label: "文档", href: docsUrl },
  { label: "图形界面", href: guiDocsUrl },
  { page: "download", label: "下载", href: sitePath("download/") },
  { label: "GitHub", href: hubRepository }
];

function Brand() {
  return (
    <a href={sitePath()} className="inline-flex items-center gap-3 font-bold tracking-wide no-underline">
      <img src={sitePath("icon.svg")} alt="" width="40" height="40" className="size-10" />
      <span>言序</span>
    </a>
  );
}

export function Layout({ page, children }: { page: Page; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("yanxu-theme");
    const initial = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("yanxu-theme", next ? "dark" : "light");
  }

  return (
    <>
      <a href="#main" className="fixed -top-20 left-4 z-[100] bg-ink px-4 py-2 text-paper focus:top-4">跳到正文</a>
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition ${scrolled ? "border-black/10 bg-paper/85 dark:border-white/10 dark:bg-[#171714]/85" : "border-transparent bg-paper/70 dark:bg-[#171714]/70"}`}>
        <nav className="shell flex min-h-[4.5rem] items-center gap-8" aria-label="主导航">
          <Brand />
          <div className={`${menuOpen ? "grid" : "hidden"} absolute top-[4.6rem] right-5 left-5 gap-1 rounded-2xl border border-black/10 bg-paper p-4 shadow-paper md:static md:ml-auto md:flex md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none dark:border-white/10 dark:bg-[#171714] md:dark:bg-transparent`}>
            {links.map((link) => (
              <a key={link.label} href={link.href} aria-current={link.page === page ? "page" : undefined} className={`rounded-lg px-2 py-2 text-sm no-underline transition ${link.page === page ? "text-current" : "text-muted hover:text-current dark:text-[#aaa69b] dark:hover:text-current"}`}>{link.label}</a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <button type="button" onClick={toggleTheme} className="grid size-10 place-items-center rounded-full border border-black/15 text-sm transition hover:border-black/30 dark:border-white/15" aria-label={dark ? "切换到浅色主题" : "切换到深色主题"}>{dark ? "日" : "夜"}</button>
            <a className="button-primary hidden sm:inline-flex" href={docsUrl}>开始使用 <span aria-hidden="true">→</span></a>
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-full border border-black/15 text-lg md:hidden dark:border-white/15" aria-label="打开导航" aria-expanded={menuOpen}>☰</button>
          </div>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-black/10 py-12 dark:border-white/10">
        <div className="shell">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,.7fr)]">
            <div className="sm:col-span-2 lg:col-span-1"><Brand /><p className="mt-4 max-w-xs text-sm text-muted dark:text-[#aaa69b]">一门具有文言气韵、面向现代工程的中文编程语言。</p></div>
            <FooterColumn title="学习" links={[["快速开始", docsUrl], ["图形界面", guiDocsUrl], ["语法参考", `${docsUrl}language/`]]} />
            <FooterColumn title="获取" links={[["下载", sitePath("download/")], ["VS Code", sitePath("download/#vscode")], ["版本记录", `${repository}/releases`]]} />
            <FooterColumn title="社区" links={[["GitHub", hubRepository], ["问题反馈", `${hubRepository}/issues`], ["参与贡献", `${repository}/blob/main/CONTRIBUTING.md`]]} />
          </div>
          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-black/10 pt-6 text-xs text-muted sm:flex-row dark:border-white/10 dark:text-[#aaa69b]"><span>© 2026 言序贡献者 · MIT License</span><span>文以载道，码以成章。</span></div>
        </div>
      </footer>
    </>
  );
}

function FooterColumn({ title, links: items }: { title: string; links: Array<[string, string]> }) {
  return <div><strong className="text-sm">{title}</strong><div className="mt-3 grid gap-2">{items.map(([label, href]) => <a key={label} href={href} className="text-sm text-muted no-underline hover:text-current dark:text-[#aaa69b]">{label}</a>)}</div></div>;
}
