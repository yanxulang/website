import { useEffect, useState, type ReactNode } from "react";
import { CopyButton } from "../components/CopyButton";
import {
  binaryDownloadsReady,
  gettingStartedUrl,
  releaseDownloadUrl,
  releaseUrl,
  sourceArchiveUrl,
  unixInstall,
  version,
  vscodeRepository,
  vscodeVersion,
  windowsInstall,
  yanbaoRepository,
  yanbaoUnixInstall,
  yanbaoVersion
} from "../lib";

type OS = "windows" | "macos" | "linux" | "unknown";

const platforms = [
  {
    id: "windows",
    symbol: "WIN",
    title: "Windows",
    description: "Windows 10 / 11",
    bullets: ["x86-64：Intel / AMD", "ARM64：Snapdragon", "ZIP 便携归档"],
    primary: ["下载 x86-64", "yanxu-x86_64-pc-windows-msvc.zip"],
    secondary: ["下载 ARM64", "yanxu-aarch64-pc-windows-msvc.zip"]
  },
  {
    id: "macos",
    symbol: "MAC",
    title: "macOS",
    description: "macOS 12 及更新版本",
    bullets: ["Apple Silicon：M1 及更新", "Intel x86-64", "tar.gz 归档"],
    primary: ["下载 Apple Silicon", "yanxu-aarch64-apple-darwin.tar.gz"],
    secondary: ["下载 Intel", "yanxu-x86_64-apple-darwin.tar.gz"]
  },
  {
    id: "linux",
    symbol: "LIN",
    title: "Linux",
    description: "常见 GNU/Linux 发行版",
    bullets: ["x86-64 与 ARM64", "GNU C 运行时", "tar.gz 归档"],
    primary: ["下载 x86-64", "yanxu-x86_64-unknown-linux-gnu.tar.gz"],
    secondary: ["下载 ARM64", "yanxu-aarch64-unknown-linux-gnu.tar.gz"]
  }
] as const;

const installers = [
  ["macOS / Linux", unixInstall],
  ["Windows", windowsInstall],
  ["Cargo", "cargo install --git https://github.com/YanXuLang/yanxu --tag v1.1.8"]
] as const;

export function DownloadPage() {
  const [os, setOs] = useState<OS>("unknown");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const agent = navigator.userAgent;
    setOs(
      /Windows/i.test(agent)
        ? "windows"
        : /Macintosh|Mac OS X/i.test(agent)
          ? "macos"
          : /Linux/i.test(agent)
            ? "linux"
            : "unknown"
    );
  }, []);

  const osLabel = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    unknown: "当前平台"
  }[os];

  return (
    <>
      <header className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="breadcrumb"><a href="../">言序</a><span>/</span>下载</p>
            <p className="eyebrow">稳定版 {version}</p>
            <h1>在你的系统上运行言序。</h1>
            <p>
              正式 Release 为 Windows、macOS 与 Linux 的 x86-64 / ARM64 目标提供归档和独立 SHA-256。安装后即可运行源码、静态检查、格式化、测试和构建 YXB 应用。
            </p>
          </div>
          <div className="download-recommendation">
            <span>检测到</span>
            <strong>{osLabel}</strong>
            <p>推荐构建已在下方标出。也可以使用安装器自动选择目标。</p>
            <a href={releaseUrl}>查看 v{version} Release <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </header>

      <section className="section-block" aria-labelledby="platform-title">
        <div className="shell">
          <div className="section-heading-row compact-heading">
            <div>
              <p className="eyebrow">平台归档</p>
              <h2 id="platform-title">选择目标与架构。</h2>
            </div>
            <p>归档适合离线安装和固定制品；日常安装可直接使用下一节脚本。</p>
          </div>
          <div className="platform-grid">
            {platforms.map((platform) => (
              <article
                key={platform.id}
                className={`platform-item ${os === platform.id ? "is-recommended" : ""}`}
              >
                <div className="platform-heading">
                  <span>{platform.symbol}</span>
                  {os === platform.id ? <small>推荐</small> : null}
                </div>
                <h3>{platform.title}</h3>
                <p>{platform.description}</p>
                <ul>{platform.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="platform-actions">
                  {binaryDownloadsReady ? (
                    <>
                      <a className="button-primary" href={`${releaseDownloadUrl}/${platform.primary[1]}`}>
                        {platform.primary[0]}
                      </a>
                      <a href={`${releaseDownloadUrl}/${platform.secondary[1]}`}>
                        {platform.secondary[0]} <span aria-hidden="true">↓</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a className="button-primary" href={releaseUrl}>查看构建状态</a>
                      <a href={sourceArchiveUrl}>下载源码归档</a>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="installer-band" aria-labelledby="installer-title">
        <div className="shell installer-layout">
          <div>
            <p className="eyebrow">命令行安装</p>
            <h2 id="installer-title">让安装器选择正确构建。</h2>
            <p>
              安装器仅从 GitHub Releases 下载制品，验证摘要后写入用户目录；默认不需要管理员权限，也不会在后台运行服务。
            </p>
          </div>
          <div className="installer-terminal">
            <div role="tablist" aria-label="安装命令">
              {installers.map(([label], index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setTab(index)}
                  role="tab"
                  aria-controls="install-command"
                  aria-selected={tab === index}
                  tabIndex={tab === index ? 0 : -1}
                >
                  {label}
                </button>
              ))}
            </div>
            <div id="install-command" role="tabpanel" className="command-row command-row-dark">
              <code>{installers[tab][1]}</code>
              <CopyButton value={installers[tab][1]} compact />
            </div>
          </div>
          <div className="installer-notes">
            <Info title="固定版本">
              设置 <code className="inline-code">YANXU_VERSION={version}</code> 后运行脚本。
            </Info>
            <Info title="自定义目录">
              使用 <code className="inline-code">YANXU_INSTALL_DIR</code> 指定用户安装目录。
            </Info>
            <Info title="验证安装">
              运行 <code className="inline-code">yanxu --version</code>，应显示“言序 {version}”。
            </Info>
          </div>
        </div>
      </section>

      <section id="vscode" className="section-block scroll-target" aria-labelledby="tools-title">
        <div className="shell tools-layout">
          <div className="section-intro tools-intro">
            <div>
              <p className="eyebrow">配套工具</p>
              <h2 id="tools-title">编辑器与项目工作流。</h2>
            </div>
            <p>核心工具链安装完成后，可按需加入 VS Code 扩展与言包。它们复用言序的语言服务、格式化器和版本化工程协议。</p>
          </div>
          <div className="tool-downloads">
            <article>
              <span>编辑器</span>
              <h3>VS Code 扩展 {vscodeVersion}</h3>
              <p>语法高亮、代码片段、格式化、工作区索引、LSP 语义编辑与 DAP 调试。</p>
              <a className="text-link" href={`${vscodeRepository}/releases/tag/v${vscodeVersion}`}>
                获取 VSIX <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article>
              <span>项目与依赖</span>
              <h3>言包 {yanbaoVersion}</h3>
              <p>创建项目、管理依赖与锁文件，并串联检查、测试、运行、构建和打包。</p>
              <div className="command-row">
                <code>{yanbaoUnixInstall}</code>
                <CopyButton compact value={yanbaoUnixInstall} />
              </div>
              <a className="text-link" href={`${yanbaoRepository}/releases`}>
                查看言包 Release <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="verification-band" aria-labelledby="verification-title">
        <div className="shell">
          <div className="section-heading-row compact-heading">
            <div>
              <p className="eyebrow">校验与来源</p>
              <h2 id="verification-title">每份发布都可以核验。</h2>
            </div>
            <a className="button-secondary" href={gettingStartedUrl}>阅读安装文档</a>
          </div>
          <div className="verification-grid">
            <Info title="SHA-256">每个归档附带独立摘要，安装器下载后自动核验。</Info>
            <Info title="公开构建">平台制品由仓库内公开的 GitHub Actions 工作流从标签源码构建。</Info>
            <Info title="源码可得"><a href={sourceArchiveUrl}>下载 v{version} 源码归档</a>，也可从 Git 仓库自行构建。</Info>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="info-item">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
