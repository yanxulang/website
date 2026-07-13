export const repository = "https://github.com/YanXuLang/language";
export const hubRepository = "https://github.com/YanXuLang/yanxu";
export const vscodeRepository = "https://github.com/YanXuLang/vscode";
export const docsUrl = "https://yanxulang.github.io/docs/";
export const version = "0.3.0-alpha.1";
export const releaseTag = `v${version}`;
export const releaseUrl = `${repository}/releases/tag/${releaseTag}`;
export const releaseDownloadUrl = `${repository}/releases/download/${releaseTag}`;
export const base = import.meta.env.BASE_URL;

export function sitePath(path = "") {
  return `${base}${path}`.replace(/([^:]\/)\/+/g, "$1");
}

export const unixInstall =
  "curl -fsSL https://raw.githubusercontent.com/YanXuLang/language/main/scripts/install.sh | sh";
export const windowsInstall =
  "irm https://raw.githubusercontent.com/YanXuLang/language/main/scripts/install.ps1 | iex";
