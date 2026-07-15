import { CopyButton } from "../components/CopyButton";
import {
  docsUrl,
  guiDocsUrl,
  guiRepository,
  platformRepository,
  repository,
  sitePath,
  uiRepository,
  unixInstall
} from "../lib";

const capabilities = [
  ["中文表达", "中文关键字、标识符与诊断信息，支持全角和半角标点。"],
  ["工程工具", "静态检查、格式化、测试、包管理、LSP、DAP 与 ABI v2。"],
  ["桌面 GUI", "言窗与言界两条原生路线，覆盖六个 Windows、macOS、Linux 目标。"],
  ["明确边界", "模块导出、依赖锁图与文件、网络、GUI 等独立权限声明。"]
];

function CodeWindow() {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-night text-[#ece9df] shadow-paper">
      <div className="flex h-12 items-center border-b border-white/10 px-4 text-xs text-white/50">
        <span className="mr-4 flex gap-1.5"><i className="size-2 rounded-full bg-vermilion" /><i className="size-2 rounded-full bg-white/25" /><i className="size-2 rounded-full bg-white/25" /></span>
        对象与继承.yx
      </div>
      <pre className="overflow-x-auto p-6 text-[13px] leading-6 sm:p-7"><code><span className="syntax-keyword">类</span> 生灵 <span className="syntax-keyword">则</span>{"\n"}  <span className="syntax-keyword">公 域</span> 名：<span className="syntax-type">文</span>；{"\n"}  <span className="syntax-keyword">法</span> <span className="syntax-function">初始化</span>（名：<span className="syntax-type">文</span>）<span className="syntax-keyword">则</span> 置 此.名 为 名； <span className="syntax-keyword">终</span>{"\n"}  <span className="syntax-keyword">法</span> <span className="syntax-function">自述</span>（）：<span className="syntax-type">文</span> <span className="syntax-keyword">则</span> 归 <span className="syntax-string">「生灵：」</span>加 此.名； <span className="syntax-keyword">终</span>{"\n"}<span className="syntax-keyword">终</span>{"\n\n"}<span className="syntax-keyword">类</span> 鹤 <span className="syntax-keyword">承</span> 生灵 <span className="syntax-keyword">则</span>{"\n"}  <span className="syntax-keyword">法</span> <span className="syntax-function">初始化</span>（名：<span className="syntax-type">文</span>）<span className="syntax-keyword">则</span> 父.初始化（名）； <span className="syntax-keyword">终</span>{"\n"}  <span className="syntax-keyword">法</span> <span className="syntax-function">自述</span>（）：<span className="syntax-type">文</span> <span className="syntax-keyword">则</span>{"\n"}    <span className="syntax-keyword">归</span> 父.自述（）加 <span className="syntax-string">「，其为鹤」</span>；{"\n"}  <span className="syntax-keyword">终</span>{"\n"}<span className="syntax-keyword">终</span>{"\n\n"}<span className="syntax-keyword">定</span> 来客：生灵 <span className="syntax-keyword">为</span> 鹤（<span className="syntax-string">「皓羽」</span>）；{"\n"}<span className="syntax-keyword">言</span> 来客.自述（）；</code></pre>
      <div className="flex items-center gap-3 border-t border-white/10 px-6 py-3 text-xs text-white/55"><span className="size-2 rounded-full bg-emerald-400" />生灵：皓羽，其为鹤</div>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-28 after:pointer-events-none after:absolute after:-top-24 after:-right-8 after:-z-10 after:font-kai after:text-[30rem] after:leading-none after:text-vermilion/[0.06] after:content-['序']">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1.03fr_.97fr] lg:gap-20">
          <div>
            <span className="eyebrow">Yanxu Programming Language</span>
            <h1 className="mt-5 font-serif text-[clamp(3.3rem,7vw,6rem)] leading-[.98] font-bold tracking-[-.065em]">用中文，<br /><span className="text-vermilion">构建软件。</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted dark:text-[#aaa69b]">言序 1.1.8 提供静态检查、包管理、字节码应用与 ABI v2，并修复 Windows 图形回调栈；言窗和新的言界／言台路线可从同一份中文源码构建 Windows、macOS、Linux 原生桌面应用。</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="button-primary" href={docsUrl}>快速开始 <span aria-hidden="true">→</span></a><a className="button-secondary" href={guiDocsUrl}>图形界面</a><a className="button-secondary" href={repository}>GitHub</a></div>
            <div className="mt-4 flex max-w-xl items-center overflow-hidden rounded-xl border border-black/10 bg-black/[0.035] py-1.5 pr-1.5 pl-4 text-xs text-muted dark:border-white/10 dark:bg-white/[0.035] dark:text-[#aaa69b]"><code className="truncate">{unixInstall}</code><CopyButton compact value={unixInstall} /></div>
          </div>
          <CodeWindow />
        </div>
      </section>

      <section className="border-y border-black/10 dark:border-white/10"><div className="shell grid grid-cols-2 lg:grid-cols-4">{[["1.1.8", "当前源码版本"], ["双引擎", "解释器与 VM"], ["六目标", "原生桌面 GUI"], ["MIT", "开源许可"]].map(([value, label], index) => <div key={value} className={`py-6 ${index % 2 ? "border-l border-black/10 pl-6 dark:border-white/10" : ""} ${index > 1 ? "border-t border-black/10 lg:border-t-0 dark:border-white/10" : ""} ${index === 2 ? "lg:border-l lg:pl-6 dark:border-white/10" : ""}`}><strong className="block font-serif text-2xl">{value}</strong><span className="text-xs text-muted dark:text-[#aaa69b]">{label}</span></div>)}</div></section>

      <section className="py-24 lg:py-28"><div className="shell">
        <div className="max-w-2xl"><span className="eyebrow">核心能力</span><h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-.05em]">中文语法，完整工具链。</h2></div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">{capabilities.map(([title, description]) => <article key={title} className="panel p-7"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-muted dark:text-[#aaa69b]">{description}</p></article>)}</div>
      </div></section>

      <section className="border-y border-black/10 bg-paper-deep/45 py-24 dark:border-white/10 dark:bg-white/[0.025] lg:py-28">
        <div className="shell">
          <div className="grid items-end gap-7 lg:grid-cols-[1fr_.8fr]">
            <div><span className="eyebrow">Native Desktop GUI</span><h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-.05em]">两条原生路线，<br />按项目选择。</h2></div>
            <p className="max-w-xl leading-8 text-muted dark:text-[#aaa69b]">现有言窗继续提供成熟的立即模式控件；言界以言序实现保留模式控件树，并只经言台访问统一窗口、输入、文字与绘制原语。两条路线都不依赖浏览器或 WebView。</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="panel flex min-h-72 flex-col p-8">
              <span className="text-xs font-bold tracking-[.14em] text-vermilion-dark uppercase dark:text-[#ef756a]">现有路线 · 稳定延续</span>
              <h3 className="mt-4 font-serif text-3xl font-bold">言窗 yanxu-gui</h3>
              <p className="mt-4 leading-7 text-muted dark:text-[#aaa69b]">立即模式 GUI，封装 egui／eframe／winit，适合已有应用和希望快速使用成熟控件的项目。</p>
              <code className="mt-6 rounded-xl bg-black/[.055] px-4 py-3 text-xs dark:bg-white/[.055]">言序应用 → 言窗 → 操作系统</code>
              <a className="mt-auto pt-7 text-sm font-semibold text-vermilion-dark no-underline dark:text-[#ef756a]" href={guiRepository}>查看言窗源码 <span aria-hidden="true">→</span></a>
            </article>
            <article className="overflow-hidden rounded-[1.25rem] border border-vermilion/35 bg-night p-8 text-[#f2eee4] shadow-paper">
              <span className="text-xs font-bold tracking-[.14em] text-[#ef756a] uppercase">新路线 · 0.1.0</span>
              <h3 className="mt-4 font-serif text-3xl font-bold">言界 + 言台</h3>
              <p className="mt-4 leading-7 text-white/65">保留模式控件、布局、事件和文本编辑由言序实现；言台统一六个桌面目标的平台原语与 YXDR 整帧绘制。</p>
              <code className="mt-6 block rounded-xl bg-white/[.07] px-4 py-3 text-xs text-white/80">言序应用 → 言界 → 言台 → 操作系统</code>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold"><a className="text-[#ef756a] no-underline" href={guiDocsUrl}>阅读完整指南 →</a><a className="text-white/70 no-underline hover:text-white" href={uiRepository}>言界源码</a><a className="text-white/70 no-underline hover:text-white" href={platformRepository}>言台源码</a></div>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-24"><div className="shell"><div className="rounded-[1.8rem] bg-vermilion p-8 text-[#fff8ec] sm:p-12"><h2 className="max-w-3xl text-[clamp(2.2rem,5vw,3.5rem)] leading-tight font-bold">开始第一份言序项目。</h2><p className="mt-4 max-w-2xl text-white/80">安装稳定版工具链，阅读快速入门，或直接浏览语言实现。</p><div className="mt-7 flex flex-wrap gap-3"><a className="inline-flex min-h-11 items-center rounded-full bg-[#fff8ec] px-5 text-sm font-semibold text-[#711b14] no-underline" href={sitePath("download/")}>下载言序</a><a className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-5 text-sm font-semibold text-white no-underline" href={docsUrl}>阅读文档</a></div></div></div></section>
    </>
  );
}
