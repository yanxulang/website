import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { createHighlighter } from "shiki";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const grammarPath = path.join(root, "syntaxes/yanxu.tmLanguage.json");
const examplePath = path.join(root, "src/data/home-example.json");
const outputPath = path.join(root, "src/data/home-example.tokens.json");
const upstreamUrl =
  "https://raw.githubusercontent.com/YanXuLang/vscode-extension/main/syntaxes/yanxu.tmLanguage.json";

const grammar = JSON.parse(fs.readFileSync(grammarPath, "utf8"));
const example = JSON.parse(fs.readFileSync(examplePath, "utf8"));
grammar.name = "yanxu";
grammar.aliases = ["yx", "言序"];

function normalize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function collectScopes(tokens) {
  return tokens.flatMap((line) =>
    line.flatMap((token) =>
      (token.explanation ?? []).flatMap((part) =>
        part.scopes.map((scope) => ({
          content: part.content,
          scope: scope.scopeName,
        })),
      ),
    ),
  );
}

async function verifyGrammar(highlighter) {
  const fixture = `引「标准:JSON」为 JSON；
公 类 示例 则
    公 域 名：文；
    法 读取（次数：数）：文 则
        定 若然：理 为 真；
        若 次数 不小于 1 且 若然 则
            归 JSON.序列化（{「名」：此.名}）；
        终
        试 抛「失败」；救 错误 则 归「空」；终
    终
终
言 读取（2）；`;
  const required = [
    "keyword.control.import.yanxu",
    "storage.type.class.yanxu",
    "storage.type.function.yanxu",
    "entity.name.function.call.yanxu",
    "support.type.yanxu",
    "constant.language.yanxu",
    "constant.numeric.yanxu",
    "keyword.operator.yanxu",
    "string.quoted.double.corner.yanxu",
    "punctuation.yanxu",
  ];

  for (const language of ["yanxu", "yx", "言序"]) {
    const result = highlighter.codeToTokens(fixture, {
      lang: language,
      theme: "github-light",
      includeExplanation: true,
    });
    const scopes = collectScopes(result.tokens);
    for (const expected of required) {
      if (!scopes.some(({ scope }) => scope === expected)) {
        throw new Error(`${language} 未产生作用域 ${expected}`);
      }
    }
    const embeddedKeyword = scopes.filter(({ content }) => content === "若然");
    if (embeddedKeyword.some(({ scope }) => scope === "keyword.control.yanxu")) {
      throw new Error("普通中文标识符“若然”被错误识别为关键字");
    }
  }
}

async function generate() {
  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: [grammar],
  });

  try {
    await verifyGrammar(highlighter);
    const light = highlighter.codeToTokens(example.source, {
      lang: "yanxu",
      theme: "github-light",
    }).tokens;
    const dark = highlighter.codeToTokens(example.source, {
      lang: "yanxu",
      theme: "github-dark",
    }).tokens;

    if (light.length !== dark.length) {
      throw new Error("浅色与深色主题产生了不同的代码行数");
    }

    return {
      language: "yanxu",
      source: example.source,
      lines: light.map((line, lineIndex) => {
        const darkLine = dark[lineIndex];
        if (
          line.length !== darkLine.length ||
          line.some((token, index) => token.content !== darkLine[index].content)
        ) {
          throw new Error(`浅色与深色主题在第 ${lineIndex + 1} 行的分词不一致`);
        }
        return line.map((token, index) => ({
          content: token.content,
          light: token.color,
          dark: darkLine[index].color,
          fontStyle: token.fontStyle,
        }));
      }),
    };
  } finally {
    highlighter.dispose();
  }
}

if (process.argv.includes("--upstream")) {
  const response = await fetch(upstreamUrl);
  if (!response.ok) {
    throw new Error(`无法读取 VS Code 语法真源：HTTP ${response.status}`);
  }
  const upstream = await response.json();
  if (normalize(upstream) !== normalize(JSON.parse(fs.readFileSync(grammarPath, "utf8")))) {
    throw new Error("官网言序语法与 VS Code 扩展真源不一致；请先运行语法同步");
  }
}

const generated = normalize(await generate());
if (process.argv.includes("--check")) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, "utf8") !== generated) {
    throw new Error("首页语法高亮制品已过期；请运行 npm run syntax:generate");
  }
  console.log("言序语法与首页高亮制品检查通过。");
} else {
  fs.writeFileSync(outputPath, generated);
  console.log(`已生成 ${path.relative(root, outputPath)}。`);
}
