import { useEffect, useState, type ReactNode } from "react";
import { CopyButton } from "../components/CopyButton";
import { releaseDownloadUrl, releaseUrl, unixInstall, version, vscodeRepository, windowsInstall } from "../lib";

type OS = "windows" | "macos" | "linux" | "unknown";

const platforms = [
  { id: "windows", symbol: "WIN", title: "Windows", description: "适用于 Windows 10 / 11。", bullets: ["x86-64：Intel / AMD", "ARM64：Snapdragon", "ZIP 便携包"], primary: ["下载 x86-64", "yanxu-x86_64-pc-windows-msvc.zip"], secondary: ["下载 ARM64 版", "yanxu-aarch64-pc-windows-msvc.zip"] },
  { id: "macos", symbol: "MAC", title: "macOS", description: "适用于 macOS 12 及更新版本。", bullets: ["Apple Silicon：M1 及更新", "Intel x86-64", "tar.gz 压缩包"], primary: ["下载 Apple Silicon", "yanxu-aarch64-apple-darwin.tar.gz"], secondary: ["下载 Intel 版", "yanxu-x86_64-apple-darwin.tar.gz"] },
  { id: "linux", symbol: "LIN", title: "Linux", description: "适配常见 GNU/Linux 发行版。", bullets: ["x86-64 与 ARM64", "使用 GNU C 运行时", "tar.gz 压缩包"], primary: ["下载 x86-64", "yanxu-x86_64-unknown-linux-gnu.tar.gz"], secondary: ["下载 ARM64 版", "yanxu-aarch64-unknown-linux-gnu.tar.gz"] }
] as const;

const tabs = [
  ["macOS / Linux", unixInstall], ["Windows", windowsInstall], ["Cargo", "cargo install --git https://github.com/YanXuLang/language"]
] as const;

export function DownloadPage() {
  const [os, setOs] = useState<OS>("unknown");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const agent = navigator.userAgent;
    setOs(/Windows/i.test(agent) ? "windows" : /Macintosh|Mac OS X/i.test(agent) ? "macos" : /Linux/i.test(agent) ? "linux" : "unknown");
  }, []);

  const osLabel = { windows: "Windows", macos: "macOS", linux: "Linux", unknown: "当前平台" }[os];

  return (
    <>
      <header className="border-b border-black/10 py-16 dark:border-white/10"><div className="shell"><p className="text-xs text-muted dark:text-[#aaa69b]"><a href="../" className="no-underline">言序</a> / 下载</p><h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5rem)] leading-[1.02] font-bold tracking-[-.055em]">在你的系统上<br />运行言序。</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted dark:text-[#aaa69b]">官方发行版覆盖 Windows、macOS 与 Linux 的主流处理器架构。无需安装 Rust，解压即可使用。</p><div className="panel mt-8 flex flex-col items-start justify-between gap-5 p-5 sm:flex-row sm:items-center"><div><strong>检测到 {osLabel}</strong><p className="mt-1 text-sm text-muted dark:text-[#aaa69b]">已为你标出推荐下载。当前开发版：{version}</p></div><a className="button-secondary" href={releaseUrl}>查看所有文件</a></div></div></header>

      <section className="py-20"><div className="shell grid gap-4 lg:grid-cols-3">{platforms.map((platform) => <article key={platform.id} className={`flex min-h-[25rem] flex-col rounded-[1.2rem] border p-7 transition ${os === platform.id ? "border-vermilion shadow-[0_16px_45px_rgba(117,42,31,.11)]" : "border-black/10 dark:border-white/10"}`}><div className="grid size-14 place-items-center rounded-2xl bg-ink text-xs font-bold text-paper dark:bg-[#f2eee4] dark:text-ink">{platform.symbol}</div><h2 className="mt-6 text-2xl font-bold">{platform.title}</h2><p className="mt-2 text-sm text-muted dark:text-[#aaa69b]">{platform.description}</p><ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted dark:text-[#aaa69b]">{platform.bullets.map((item) => <li key={item}>{item}</li>)}</ul><div className="mt-auto grid gap-3 pt-7"><a className="button-primary w-full" href={`${releaseDownloadUrl}/${platform.primary[1]}`}>{platform.primary[0]}</a><a className="text-center text-xs text-muted no-underline hover:text-vermilion dark:text-[#aaa69b]" href={`${releaseDownloadUrl}/${platform.secondary[1]}`}>{platform.secondary[0]} →</a></div></article>)}</div></section>

      <section className="border-y border-black/10 bg-paper-deep/55 py-20 dark:border-white/10 dark:bg-white/[0.025]"><div className="shell"><span className="eyebrow">一行安装</span><h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-.05em]">让安装器替你选择<br />正确的构建。</h2><p className="mt-5 max-w-2xl text-muted dark:text-[#aaa69b]">安装器只从 GitHub Releases 下载文件，默认安装到用户目录，不需要管理员权限。可用环境变量自定义版本和安装位置。</p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"><div className="flex overflow-x-auto border-b border-black/10 dark:border-white/10" role="tablist" aria-label="安装命令">{tabs.map(([label], index) => <button key={label} type="button" onClick={() => setTab(index)} className={`shrink-0 border-r border-black/10 px-5 py-3.5 text-sm dark:border-white/10 ${tab === index ? "bg-black/5 text-current dark:bg-white/[.06]" : "text-muted dark:text-[#aaa69b]"}`} role="tab" aria-selected={tab === index}>{label}</button>)}</div><div className="flex flex-col items-start gap-4 bg-night p-5 text-[#ece9df] sm:flex-row sm:items-center"><code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-sm">{tabs[tab][1]}</code><CopyButton value={tabs[tab][1]} /></div></div>
        <div className="mt-12 grid gap-8 md:grid-cols-3"><Info title="固定版本">设置 <code className="inline-code">YANXU_VERSION={version}</code> 后运行脚本，可用于可复现环境。</Info><Info title="自定义目录">设置 <code className="inline-code">YANXU_INSTALL_DIR</code>，安装到你指定的用户目录。</Info><Info title="从源码构建">克隆仓库并执行 <code className="inline-code">cargo install --path .</code>，适合贡献者。</Info></div>
      </div></section>

      <section id="vscode" className="scroll-mt-24 py-24"><div className="shell"><div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><div><span className="eyebrow">官方工具</span><h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-.05em]">VS Code<br />扩展。</h2></div><p className="text-lg leading-8 text-muted dark:text-[#aaa69b]">获得 .yx 语法高亮、自动配对、常用代码片段，以及“运行当前文卷”和“打开言序 REPL”命令。扩展会使用 PATH 中的 yanxu，也支持自定义可执行文件路径。</p></div><div className="relative mt-12 overflow-hidden rounded-[1.8rem] bg-night p-8 text-[#fff8ec] sm:p-14 after:absolute after:-right-8 after:-bottom-24 after:font-kai after:text-[14rem] after:text-white/5 after:content-['序']"><h3 className="relative z-10 text-[clamp(2rem,4vw,3.5rem)] font-bold">在编辑器里保持言序。</h3><p className="relative z-10 mt-4 max-w-2xl text-white/60">从 VS Code 扩展仓库的 Release 下载 VSIX，然后在扩展面板中选择“从 VSIX 安装”。</p><a className="relative z-10 mt-7 inline-flex min-h-11 items-center rounded-full bg-[#fff8ec] px-5 text-sm font-semibold text-[#711b14] no-underline" href={`${vscodeRepository}/releases/tag/v${version}`}>下载 VS Code 扩展 →</a></div></div></section>

      <section className="border-t border-black/10 bg-paper-deep/55 py-20 dark:border-white/10 dark:bg-white/[0.025]"><div className="shell"><span className="eyebrow">校验与安全</span><h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-.05em]">每份发布，<br />都可核验。</h2><div className="mt-10 grid gap-8 md:grid-cols-3"><Info title="SHA-256">每个压缩包附带 .sha256 文件，安装器会自动验证完整性。</Info><Info title="自动化构建">所有平台产物由公开的 GitHub Actions 工作流从标签源码构建。</Info><Info title="最小权限">安装器默认写入用户目录，不修改系统文件，也不在后台运行服务。</Info></div></div></section>
    </>
  );
}

function Info({ title, children }: { title: string; children: ReactNode }) {
  return <div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted dark:text-[#aaa69b]">{children}</p></div>;
}
