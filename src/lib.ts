export const repository = "https://github.com/YanXuLang/yanxu";
export const hubRepository = "https://github.com/YanXuLang/yanxu";
export const vscodeRepository = "https://github.com/YanXuLang/vscode-extension";
export const yanbaoRepository = "https://github.com/YanXuLang/yanbao";
export const docsUrl = "https://docs.yanxu.dev/";
export const version = "1.1.6";
export const vscodeVersion = "1.3.2";
export const yanbaoVersion = "0.4.0";
// GitHub Release 工作流会为当前稳定版本生成六个平台资产及校验文件。
export const binaryDownloadsReady = true;
export const releaseTag = `v${version}`;
export const releaseUrl = `${repository}/releases`;
export const releaseDownloadUrl = `${repository}/releases/download/${releaseTag}`;
export const sourceArchiveUrl = binaryDownloadsReady
  ? `${repository}/archive/refs/tags/${releaseTag}.tar.gz`
  : `${repository}/archive/refs/heads/main.tar.gz`;
export const base = import.meta.env.BASE_URL;

export function sitePath(path = "") {
  return `${base}${path}`.replace(/([^:]\/)\/+/g, "$1");
}

export const unixInstall =
  "curl -fsSL https://get.yanxu.dev | sh";
export const windowsInstall =
  "irm https://get.yanxu.dev/windows | iex";
export const yanbaoUnixInstall =
  "curl -fsSL https://get.yanxu.dev/yanbao | sh";
