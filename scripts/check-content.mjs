import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const packageJson = JSON.parse(read("package.json"));
const example = JSON.parse(read("src/data/home-example.json"));
const library = read("src/lib.ts");
const layout = read("src/components/Layout.tsx");
const home = read("src/pages/HomePage.tsx");
const download = read("src/pages/DownloadPage.tsx");

assert.match(library, new RegExp(`export const version = "${packageJson.version}"`));
assert.match(home, /<YanxuCode \/>/);
for (const id of ["language", "tooling", "ecosystem"]) {
  assert.match(home, new RegExp(`id="${id}"`), `首页缺少 #${id} 导航目标`);
}

const forbiddenNavigation = ["图形界面", "GUI", "桌面开发", "言窗", "言界", "言台"];
for (const label of forbiddenNavigation) {
  assert.ok(!new RegExp(`label:\\s*"${label}"`, "i").test(layout), `主导航不得包含“${label}”`);
}
assert.ok(!/guiDocsUrl|guiRepository|platformRepository|uiRepository/.test(home), "首页不得突出 GUI 仓库或专题入口");
assert.ok(!/guiDocsUrl|guiRepository|platformRepository|uiRepository/.test(download), "下载页不得突出 GUI 仓库或专题入口");

assert.ok(example.source.includes("法 问候"));
assert.deepEqual(example.output, ["你好，言序", "你好，开发者"]);
assert.ok(!/TODO|待补|占位|lorem ipsum/i.test(`${home}\n${download}`), "用户可见页面含占位内容");

function inspectHtml(file, canonical, { noindex = false, structured = false } = {}) {
  const html = read(file);
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<meta name="viewport"/);
  assert.match(html, /<title>[^<]{4,80}<\/title>/);
  if (noindex) {
    assert.match(html, /<meta name="robots" content="noindex"/);
    return;
  }
  assert.match(html, /<meta name="description" content="[^<]{20,180}"/);
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`));
  assert.ok(html.includes(`<meta property="og:url" content="${canonical}"`));
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /<meta property="og:description"/);
  assert.ok(html.includes('<meta property="og:image" content="https://yanxu.dev/og.png"'));
  assert.ok(html.includes('<meta name="twitter:card" content="summary_large_image"'));
  if (structured) {
    const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(block, "首页缺少 JSON-LD");
    const data = JSON.parse(block[1]);
    assert.equal(data.name, "言序");
    assert.equal(data.softwareVersion, packageJson.version);
  }
}

inspectHtml("index.html", "https://yanxu.dev/", { structured: true });
inspectHtml("download/index.html", "https://yanxu.dev/download/");
inspectHtml("404.html", "", { noindex: true });

const sitemap = read("public/sitemap.xml");
for (const url of ["https://yanxu.dev/", "https://yanxu.dev/download/"]) {
  assert.ok(sitemap.includes(`<loc>${url}</loc>`));
}
assert.ok(read("public/robots.txt").includes("https://yanxu.dev/sitemap.xml"));
assert.ok(fs.statSync(path.join(root, "public/og.png")).size > 50_000, "社交分享图缺失或过小");

console.log("官网内容、导航与元数据检查通过。");
