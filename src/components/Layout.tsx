import { useEffect, useState, type ReactNode } from "react";
import {
  docsUrl,
  gettingStartedUrl,
  hubRepository,
  languageDocsUrl,
  repository,
  sitePath,
  toolingDocsUrl
} from "../lib";

export type Page = "home" | "download" | "not-found";

const links = [
  { label: "语言", href: sitePath("#language") },
  { label: "工具链", href: sitePath("#tooling") },
  { label: "生态", href: sitePath("#ecosystem") },
  { label: "文档", href: docsUrl, external: true },
  { label: "GitHub", href: hubRepository, external: true }
];

function Brand() {
  return (
    <a href={sitePath()} className="brand" aria-label="言序首页">
      <img src={sitePath("icon.svg")} alt="" width="38" height="38" />
      <span>
        <strong>言序</strong>
        <small>Yanxu</small>
      </span>
    </a>
  );
}

export function Layout({ page, children }: { page: Page; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("yanxu-theme");
    const initial = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);

    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("yanxu-theme", next ? "dark" : "light");
  }

  return (
    <>
      <a href="#main" className="skip-link">跳到正文</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="shell site-nav" aria-label="主导航">
          <Brand />
          <div id="primary-navigation" className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                {link.external ? <span aria-hidden="true">↗</span> : null}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={dark ? "切换到浅色主题" : "切换到深色主题"}
              title={dark ? "切换到浅色主题" : "切换到深色主题"}
            >
              <span aria-hidden="true">{dark ? "日" : "夜"}</span>
            </button>
            <a className="button-primary nav-cta" href={gettingStartedUrl}>
              开始使用 <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="menu-toggle"
              aria-label={menuOpen ? "关闭导航" : "打开导航"}
              aria-controls="primary-navigation"
              aria-expanded={menuOpen}
            >
              <span aria-hidden="true">{menuOpen ? "×" : "≡"}</span>
            </button>
          </div>
        </nav>
      </header>
      <main id="main" data-page={page}>{children}</main>
      <footer className="site-footer">
        <div className="shell">
          <div className="footer-grid">
            <div className="footer-brand">
              <Brand />
              <p>一门以现代中文组织程序、兼顾清晰表达与工程实践的编程语言。</p>
            </div>
            <FooterColumn
              title="学习"
              links={[
                ["开始使用", gettingStartedUrl],
                ["语言指南", languageDocsUrl],
                ["标准库", `${languageDocsUrl}standard-library/`]
              ]}
            />
            <FooterColumn
              title="工具"
              links={[
                ["下载", sitePath("download/")],
                ["工具链", toolingDocsUrl],
                ["言包", `${toolingDocsUrl}package-manager/`]
              ]}
            />
            <FooterColumn
              title="项目"
              links={[
                ["GitHub", hubRepository],
                ["问题反馈", `${repository}/issues`],
                ["参与贡献", `${repository}/blob/main/CONTRIBUTING.md`]
              ]}
            />
          </div>
          <div className="footer-bottom">
            <span>© 2026 言序贡献者</span>
            <span>MIT License · 语言规范 1</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterColumn({ title, links: items }: { title: string; links: Array<[string, string]> }) {
  return (
    <div className="footer-column">
      <strong>{title}</strong>
      <div>
        {items.map(([label, href]) => (
          <a key={label} href={href}>{label}</a>
        ))}
      </div>
    </div>
  );
}
