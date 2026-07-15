import { CopyButton } from "../components/CopyButton";
import { docsUrl, repository, sitePath, unixInstall } from "../lib";

const capabilities = [
  ["中文表达", "中文关键字、标识符与诊断信息，支持全角和半角标点。"],
  ["工程工具", "静态检查、格式化、测试、包管理、LSP 与 DAP 集成。"],
  ["应用构建", "字节码 VM、YXB 制品和当前平台的自包含应用。"],
  ["明确边界", "模块导出、依赖锁图与文件、网络、进程权限声明。"]
];

function CodeWindow() {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-night text-[#ece9df] shadow-paper">
      <div className="flex h-12 items-center border-b border-white/10 px-4 text-xs text-white/50">
        <span className="mr-4 flex gap-1.5"><i className="size-2 rounded-full bg-vermilion" /><i className="size-2 rounded-full bg-white/25" /><i className="size-2 rounded-full bg-white/25" /></span>
        你好.yx
      </div>
      <pre className="overflow-x-auto p-6 text-sm leading-7 sm:p-8"><code><span className="syntax-keyword">法</span> <span className="syntax-function">问候</span>（姓名：<span className="syntax-type">文</span>）：<span className="syntax-type">文</span> <span className="syntax-keyword">则</span>{"\n"}  <span className="syntax-keyword">归</span> <span className="syntax-string">「你好，」</span> 加 姓名 加 <span className="syntax-string">「！」</span>；{"\n"}<span className="syntax-keyword">终</span>{"\n\n"}<span className="syntax-keyword">言</span> 问候（<span className="syntax-string">「言序」</span>）；</code></pre>
      <div className="flex items-center gap-3 border-t border-white/10 px-6 py-3 text-xs text-white/55"><span className="size-2 rounded-full bg-emerald-400" />你好，言序！</div>
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
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted dark:text-[#aaa69b]">言序是一门面向现代软件工程的中文编程语言，提供静态检查、包管理、字节码应用与可嵌入运行时。</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="button-primary" href={docsUrl}>快速开始 <span aria-hidden="true">→</span></a><a className="button-secondary" href={repository}>GitHub</a></div>
            <div className="mt-4 flex max-w-xl items-center overflow-hidden rounded-xl border border-black/10 bg-black/[0.035] py-1.5 pr-1.5 pl-4 text-xs text-muted dark:border-white/10 dark:bg-white/[0.035] dark:text-[#aaa69b]"><code className="truncate">{unixInstall}</code><CopyButton compact value={unixInstall} /></div>
          </div>
          <CodeWindow />
        </div>
      </section>

      <section className="border-y border-black/10 dark:border-white/10"><div className="shell grid grid-cols-2 lg:grid-cols-4">{[["1.1.6", "稳定版本"], ["双引擎", "解释器与 VM"], ["25", "标准模块"], ["MIT", "开源许可"]].map(([value, label], index) => <div key={value} className={`py-6 ${index % 2 ? "border-l border-black/10 pl-6 dark:border-white/10" : ""} ${index > 1 ? "border-t border-black/10 lg:border-t-0 dark:border-white/10" : ""} ${index === 2 ? "lg:border-l lg:pl-6 dark:border-white/10" : ""}`}><strong className="block font-serif text-2xl">{value}</strong><span className="text-xs text-muted dark:text-[#aaa69b]">{label}</span></div>)}</div></section>

      <section className="py-24 lg:py-28"><div className="shell">
        <div className="max-w-2xl"><span className="eyebrow">核心能力</span><h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-.05em]">中文语法，完整工具链。</h2></div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">{capabilities.map(([title, description]) => <article key={title} className="panel p-7"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-muted dark:text-[#aaa69b]">{description}</p></article>)}</div>
      </div></section>

      <section className="pb-24"><div className="shell"><div className="rounded-[1.8rem] bg-vermilion p-8 text-[#fff8ec] sm:p-12"><h2 className="max-w-3xl text-[clamp(2.2rem,5vw,3.5rem)] leading-tight font-bold">开始第一份言序项目。</h2><p className="mt-4 max-w-2xl text-white/80">安装稳定版工具链，阅读快速入门，或直接浏览语言实现。</p><div className="mt-7 flex flex-wrap gap-3"><a className="inline-flex min-h-11 items-center rounded-full bg-[#fff8ec] px-5 text-sm font-semibold text-[#711b14] no-underline" href={sitePath("download/")}>下载言序</a><a className="inline-flex min-h-11 items-center rounded-full border border-white/40 px-5 text-sm font-semibold text-white no-underline" href={docsUrl}>阅读文档</a></div></div></div></section>
    </>
  );
}
