import { CopyButton } from "../components/CopyButton";
import { docsUrl, repository, sitePath, unixInstall } from "../lib";

const features = [
  ["壹", "文", "自然的中文语序", "以「令」「若」「当」「法」「类」组织代码。全角半角标点均可，诊断准确指向源码。"],
  ["贰", "型", "执行前静态检查", "可选标注保持轻便；继承/覆写检查与「值 是 类型」分支收窄又能提前阻止确定错误。"],
  ["叁", "器", "完整对象与双引擎", "单继承、协议、动态派发与「父.方法」由树解释器和独立字节码 VM 一致执行。"],
  ["肆", "网", "生产 I/O 与标准库", "22 个双引擎标准模块覆盖数据与宿主能力；HTTP/HTTPS 与 TCP/UDP 套接字均有权限、超时、上限和稳定错误代码。"],
  ["伍", "候", "结构化任务", "「异 法」产生可取消任务；「候」与「并候」以确定顺序传播结果、失败和取消。"],
  ["陆", "工", "1.0 稳定工具链", "规范、兼容迁移、资源预算、语义 LSP、DAP、测试、API 文档与 Tree-sitter 已形成完整闭环。"]
];

const syntax = [
  ["声明", "令 年岁：数 为 18；"], ["不可改写", "定 名录：列 为【「甲」，「乙」】；"],
  ["判断", "若 来客 是 鹤 则 … 否则 … 终"], ["迭代", "逐 项 于 名录 则 … 终"],
  ["父类", "归 父.自述（） 加 「，鹤」；"],
  ["函数", "法 加一（值：数）：数 则 … 终"], ["任务", "异 法 求（）：数 则 … 终；候 求（）"],
  ["错误", "试 则 … 救 所误 则 … 终"]
];

function CodeWindow() {
  return (
    <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-night text-[#ece9df] shadow-paper lg:rotate-[1.2deg]">
      <div className="flex h-12 items-center border-b border-white/10 px-4 text-xs text-white/50"><span className="mr-4 flex gap-1.5"><i className="size-2 rounded-full bg-vermilion" /><i className="size-2 rounded-full bg-white/25" /><i className="size-2 rounded-full bg-white/25" /></span>初见.yx</div>
      <pre className="overflow-x-auto p-6 text-[13px] leading-7 sm:p-8 sm:text-sm"><code><span className="syntax-comment"># 定义一位有类型的人</span>{"\n"}<span className="syntax-keyword">类</span> 人 <span className="syntax-keyword">则</span>{"\n"}  <span className="syntax-keyword">法</span> <span className="syntax-function">初始化</span>（姓名：<span className="syntax-type">文</span>）<span className="syntax-keyword">则</span>{"\n"}    <span className="syntax-keyword">置</span> 此.姓名 <span className="syntax-keyword">为</span> 姓名；{"\n"}  <span className="syntax-keyword">终</span>{"\n\n"}  <span className="syntax-keyword">法</span> <span className="syntax-function">问候</span>（）：<span className="syntax-type">文</span> <span className="syntax-keyword">则</span>{"\n"}    <span className="syntax-keyword">归</span> <span className="syntax-string">「吾名」</span> 加 此.姓名；{"\n"}  <span className="syntax-keyword">终</span>{"\n"}<span className="syntax-keyword">终</span>{"\n\n"}<span className="syntax-keyword">定</span> 子：人 <span className="syntax-keyword">为</span> 人（<span className="syntax-string">「言序」</span>）；{"\n"}<span className="syntax-keyword">言</span> 子.问候（）；</code></pre>
      <div className="flex items-center gap-3 border-t border-white/10 px-6 py-3 text-xs text-white/55"><span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,.12)]" />吾名言序 <span className="ml-auto">18 ms</span></div>
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
            <h1 className="mt-5 font-serif text-[clamp(3.3rem,7vw,6rem)] leading-[.98] font-bold tracking-[-.065em]">以中文<br /><span className="text-vermilion">写程序。</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted dark:text-[#aaa69b]">言序 1.1.3 是一门由 Rust 驱动的稳定中文编程语言。保留文言的简洁与节奏，也提供完整对象、类型判断、逐跳授权的 HTTPS、受 DNS 复查和配额保护的 TCP/UDP 套接字、模块、任务、沙箱嵌入与完整工具链。</p>
            <div className="mt-8 flex flex-wrap gap-3"><a className="button-primary" href={docsUrl}>五分钟入门 <span aria-hidden="true">→</span></a><a className="button-secondary" href={repository}>查看源码</a></div>
            <div className="mt-4 flex max-w-xl items-center overflow-hidden rounded-xl border border-black/10 bg-black/[0.035] py-1.5 pr-1.5 pl-4 text-xs text-muted dark:border-white/10 dark:bg-white/[0.035] dark:text-[#aaa69b]"><code className="truncate">{unixInstall}</code><CopyButton compact value={unixInstall} /></div>
          </div>
          <CodeWindow />
        </div>
      </section>

      <section className="border-y border-black/10 dark:border-white/10"><div className="shell grid grid-cols-2 lg:grid-cols-4">{[["1.1.3", "当前稳定发行"], ["双引擎", "树解释器 · 独立 VM"], ["22 库", "含 HTTPS 与 TCP/UDP"], ["MIT", "自由、开放、可嵌入"]].map(([value, label], i) => <div key={value} className={`py-6 ${i % 2 ? "border-l border-black/10 pl-6 dark:border-white/10" : ""} ${i > 1 ? "border-t border-black/10 lg:border-t-0 dark:border-white/10" : ""} ${i === 2 ? "lg:border-l lg:pl-6 dark:border-white/10" : ""}`}><strong className="block font-serif text-2xl">{value}</strong><span className="text-xs text-muted dark:text-[#aaa69b]">{label}</span></div>)}</div></section>

      <section className="py-24 lg:py-28"><div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><div><span className="eyebrow">语言所长</span><h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-.05em]">中文是本体，<br />不是皮肤。</h2></div><p className="max-w-2xl text-lg leading-8 text-muted dark:text-[#aaa69b]">从关键字到错误信息，言序都直接用中文思考。它不是把另一门语言逐词翻译过来，而是在现代工程约束下寻找中文程序的自然表达。</p></div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map(([index, icon, title, description]) => <article key={index} className="panel group min-h-72 p-7 transition hover:-translate-y-1 hover:border-vermilion/50"><div className="flex justify-between font-mono text-sm text-vermilion"><span>{index}</span><span className="font-kai text-3xl">{icon}</span></div><h3 className="mt-16 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted dark:text-[#aaa69b]">{description}</p></article>)}</div>
      </div></section>

      <section className="border-y border-black/10 bg-paper-deep/55 py-24 dark:border-white/10 dark:bg-white/[0.025]"><div className="shell grid items-start gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-28"><span className="eyebrow">一眼可读</span><h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.08] font-bold tracking-[-.05em]">少一些符号，<br />多一些语意。</h2><p className="mt-5 max-w-md text-muted dark:text-[#aaa69b]">无需先学古汉语。关键字简洁但不晦涩，代码结构与现代编程概念一一对应。</p><a className="button-secondary mt-6" href={`${docsUrl}language/`}>阅读语法参考</a></div>
        <div className="border-t border-black/10 dark:border-white/10">{syntax.map(([label, code]) => <div key={label} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-black/10 py-5 dark:border-white/10"><span className="text-xs text-muted dark:text-[#aaa69b]">{label}</span><code className="text-sm [overflow-wrap:anywhere]">{code}</code></div>)}</div>
      </div></section>

      <section className="py-24"><div className="shell"><div className="relative overflow-hidden rounded-[1.8rem] bg-vermilion p-8 text-[#fff8ec] sm:p-14 after:absolute after:-right-4 after:-bottom-28 after:font-kai after:text-[15rem] after:text-white/10 after:content-['言']"><h2 className="relative z-10 max-w-3xl text-[clamp(2.4rem,5vw,4rem)] leading-tight font-bold">写下你的第一卷言序程序。</h2><p className="relative z-10 mt-4 max-w-2xl text-white/75">安装命令行与官方 VS Code 扩展，从交互环境开始，或直接运行仓库里的完整示例。</p><a className="relative z-10 mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#fff8ec] px-5 text-sm font-semibold text-[#711b14] no-underline transition hover:-translate-y-0.5" href={sitePath("download/")}>选择你的平台 <span aria-hidden="true">→</span></a></div></div></section>
    </>
  );
}
