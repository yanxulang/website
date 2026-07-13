import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const site = path.resolve(process.argv[2] || "website");
const pages = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.name.endsWith(".html")) pages.push(absolute);
  }
}

walk(site);
const failures = [];
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]));
  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const link = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(link)) continue;
    const [pathname, hash] = link.split("#");
    const projectRelative = pathname?.startsWith("/") ? pathname.slice(1) : pathname;
    let target = projectRelative
      ? path.resolve(pathname?.startsWith("/") ? site : path.dirname(page), projectRelative)
      : page;
    if (pathname?.endsWith("/")) target = path.join(target, "index.html");
    if (!fs.existsSync(target)) failures.push(`${path.relative(site, page)} → ${link}`);
    if (!pathname && hash && !ids.has(hash)) failures.push(`${path.relative(site, page)} → #${hash}`);
  }
}

if (failures.length) {
  console.error(`站点含有 ${failures.length} 个失效的本地链接：\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`站点检查通过：${pages.length} 个页面。`);
