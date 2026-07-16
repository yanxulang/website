import { CopyButton } from "../components/CopyButton";
import { YanxuCode } from "../components/YanxuCode";
import {
  docsUrl,
  ecosystemDocsUrl,
  gettingStartedUrl,
  languageDocsUrl,
  repository,
  sitePath,
  toolingDocsUrl,
  unixInstall,
  version,
  vscodeRepository,
  yanbaoRepository,
  yanjuRepository
} from "../lib";

const capabilities = [
  {
    index: "01",
    title: "类型与抽象",
    description: "可选类型标注、联合与可空类型、分支收窄，以及类、继承和结构协议，让程序可以从灵活试写逐步走向明确边界。",
    link: `${languageDocsUrl}basics/`
  },
  {
    index: "02",
    title: "模块与包",
    description: "模块默认私有，以“公”声明导出；项目清单、完整依赖锁图与显式包导出共同约束代码和依赖边界。",
    link: `${languageDocsUrl}modules/`
  },
  {
    index: "03",
    title: "两种执行路径",
    description: "树解释器适合直接运行源码，独立字节码 VM 承载 YXB 应用；两条路径通过兼容语料持续校对语言语义。",
    link: `${toolingDocsUrl}building-apps/`
  },
  {
    index: "04",
    title: "错误与任务",
    description: "“试、救、抛”提供结构化错误与调用踪迹；协作任务支持等待、取消与确定性的组合执行。",
    link: `${languageDocsUrl}errors/`
  },
  {
    index: "05",
    title: "标准能力",
    description: "25 个版本化标准模块覆盖文字、容器、文件、数据、网络、字节、进程与资源，并显式标注平台和权限边界。",
    link: `${languageDocsUrl}standard-library/`
  }
];

const workflow = [
  ["运行", "yanxu 主.yx"],
  ["检查", "yanxu check 主.yx"],
  ["格式化", "yanxu fmt --write 主.yx"],
  ["测试", "yanxu test tests"],
  ["构建", "yanxu compile . -o build/应用.yxb"],
  ["依赖", "yanbao add http"]
];

const ecosystem = [
  {
    title: "言包",
    label: "项目与依赖",
    description: "创建项目、管理完整依赖图、测试、构建和打包。",
    href: yanbaoRepository
  },
  {
    title: "VS Code 扩展",
    label: "编辑器",
    description: "高亮、格式化、语义编辑、LSP 与 DAP 调试入口。",
    href: vscodeRepository
  },
  {
    title: "言据",
    label: "数据格式",
    description: "面向中文文本的结构化数据格式与转换工具。",
    href: yanjuRepository
  },
  {
    title: "Web 与网络",
    label: "应用生态",
    description: "HTTP、HTML 与 Web 组织能力由独立包提供，并各自声明稳定范围。",
    href: `${ecosystemDocsUrl}web/`
  },
  {
    title: "第三方库",
    label: "包生态",
    description: "日志、校验、数据库、测试等可复用包，按项目版本独立演进。",
    href: `${ecosystemDocsUrl}libraries/`
  },
  {
    title: "桌面应用",
    label: "应用生态",
    description: "需要原生窗口时，可在生态指南中了解现有方案与实验路线。",
    href: `${ecosystemDocsUrl}desktop/`
  }
];

const quickStart = [
  {
    number: "01",
    title: "安装工具链",
    description: "安装器从正式 Release 选择当前平台构建，并校验 SHA-256。",
    command: `${unixInstall}\ncurl -fsSL https://get.yanxu.dev/yanbao | sh`
  },
  {
    number: "02",
    title: "创建项目",
    description: "生成项目清单、锁文件与第一份源码，不会自动创建 Git 仓库。",
    command: "yanbao init 我的项目 --name 示例"
  },
  {
    number: "03",
    title: "运行程序",
    description: "从任意目录指定项目路径；随后可以继续检查、测试和构建。",
    command: "yanbao run --manifest-path 我的项目"
  }
];

export function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Yanxu Programming Language</p>
            <h1 id="hero-title">
              以现代中文，
              <span>清晰组织程序。</span>
            </h1>
            <p className="hero-lede">
              言序是一门以现代中文组织程序、面向工程实践的编程语言。中文关键字、类型与模块系统、解释器和字节码工具链，共同构成一套一致的语言设计。
            </p>
            <div className="hero-actions">
              <a className="button-primary" href={gettingStartedUrl}>
                开始使用 <span aria-hidden="true">→</span>
              </a>
              <a className="button-secondary" href={docsUrl}>
                阅读文档
              </a>
            </div>
            <p className="hero-meta">
              <span>稳定版 {version}</span>
              <span>MIT 开源</span>
              <a href={repository}>查看源码 <span aria-hidden="true">↗</span></a>
            </p>
          </div>
          <YanxuCode />
        </div>
      </section>

      <section id="language" className="section-block scroll-target" aria-labelledby="language-title">
        <div className="shell">
          <div className="section-intro language-intro">
            <div>
              <p className="eyebrow">语言理念</p>
              <h2 id="language-title">中文进入语法，也进入工程边界。</h2>
            </div>
            <p>
              言序并不把中文停留在英文关键字的表面替换。声明、控制流、类型标注、模块导入和诊断共同采用中文表达，同时保留现代工程需要的明确作用域、静态检查与版本化格式。
            </p>
          </div>
          <div className="principle-list">
            <article>
              <span>表达</span>
              <h3>读得清程序结构</h3>
              <p>简洁关键字与中文标识符服务于声明关系和执行顺序；全角、半角标点均可使用，格式化器负责统一输出。</p>
            </article>
            <article>
              <span>边界</span>
              <h3>动态与静态可以并存</h3>
              <p>小程序可以省略类型，长期项目可以逐步加入类型、公开 API、协议与权限声明，不必改用另一套语言。</p>
            </article>
            <article>
              <span>工程</span>
              <h3>从文卷走向完整项目</h3>
              <p>同一工具链覆盖直接执行、检查、格式化、测试、依赖锁定和字节码应用，语言能力与项目流程彼此校验。</p>
            </article>
          </div>
        </div>
      </section>

      <section className="capability-band" aria-labelledby="capability-title">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">语言能力</p>
              <h2 id="capability-title">足够完整，也明确说明边界。</h2>
            </div>
            <a className="text-link" href={languageDocsUrl}>
              阅读语言指南 <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="capability-list">
            {capabilities.map((item) => (
              <a href={item.link} className="capability-item" key={item.index}>
                <span className="capability-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="capability-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="tooling" className="section-block scroll-target" aria-labelledby="tooling-title">
        <div className="shell tooling-layout">
          <div className="tooling-copy">
            <p className="eyebrow">工程工具链</p>
            <h2 id="tooling-title">让反馈循环保持短而明确。</h2>
            <p>
              核心命令负责语言语义、应用制品与运行时；言包负责项目创建、依赖和常用工程流程；编辑器通过 LSP 与 DAP 复用同一实现。
            </p>
            <a className="text-link" href={toolingDocsUrl}>
              查看工具链文档 <span aria-hidden="true">→</span>
            </a>
          </div>
          <ol className="workflow-list" aria-label="言序开发流程">
            {workflow.map(([label, command], index) => (
              <li key={label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{label}</strong>
                <code>{command}</code>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="quickstart-band" aria-labelledby="quickstart-title">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow eyebrow-light">快速开始</p>
              <h2 id="quickstart-title">三步进入第一份项目。</h2>
            </div>
            <p>以下命令适用于 macOS 与 Linux；Windows 安装方式和逐步说明见完整安装文档。</p>
          </div>
          <ol className="quickstart-list">
            {quickStart.map((step) => (
              <li key={step.number}>
                <div className="quickstart-step-heading">
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
                <div className="command-row">
                  <code>{step.command}</code>
                  <CopyButton compact value={step.command} label={`复制“${step.title}”命令`} />
                </div>
              </li>
            ))}
          </ol>
          <div className="quickstart-footer">
            <a className="button-on-dark" href={gettingStartedUrl}>打开完整入门教程</a>
            <a className="text-link-on-dark" href={sitePath("download/")}>查看所有平台下载</a>
          </div>
        </div>
      </section>

      <section id="ecosystem" className="section-block scroll-target" aria-labelledby="ecosystem-title">
        <div className="shell">
          <div className="section-intro ecosystem-intro">
            <div>
              <p className="eyebrow">生态概览</p>
              <h2 id="ecosystem-title">围绕语言，各自保持清晰职责。</h2>
            </div>
            <p>核心语言不把所有能力塞进运行时。项目管理、编辑器、数据格式和应用框架以独立仓库演进，并通过版本与兼容说明建立边界。</p>
          </div>
          <div className="ecosystem-grid">
            {ecosystem.map((item) => (
              <a href={item.href} className="ecosystem-item" key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-title">
        <div className="shell closing-panel">
          <p className="eyebrow eyebrow-light">从一份文卷开始</p>
          <h2 id="closing-title">先写下清楚的程序，再让工具链带它走得更远。</h2>
          <div>
            <a className="button-on-dark" href={gettingStartedUrl}>开始使用</a>
            <a className="text-link-on-dark" href={repository}>浏览语言实现 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </>
  );
}
