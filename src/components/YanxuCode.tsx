import type { CSSProperties } from "react";
import example from "../data/home-example.json";
import highlighted from "../data/home-example.tokens.json";
import { CopyButton } from "./CopyButton";

type TokenStyle = CSSProperties & {
  "--syntax-light": string;
  "--syntax-dark": string;
};

export function YanxuCode() {
  return (
    <figure className="code-window">
      <figcaption className="code-window-bar">
        <span className="code-window-mark" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{example.filename}</span>
        <CopyButton compact value={example.source} label="复制示例代码" />
      </figcaption>
      <pre className="code-window-source" tabIndex={0} aria-label="言序示例代码">
        <code>
          {highlighted.lines.map((line, lineIndex) => (
            <span className="code-line" key={lineIndex}>
              <span className="code-line-number" aria-hidden="true">
                {lineIndex + 1}
              </span>
              <span>
                {line.map((token, tokenIndex) => (
                  <span
                    className="syntax-token"
                    key={tokenIndex}
                    style={
                      {
                        "--syntax-light": token.light,
                        "--syntax-dark": token.dark,
                        fontStyle:
                          token.fontStyle === 1
                            ? "italic"
                            : token.fontStyle === 2
                              ? "oblique"
                              : undefined,
                      } as TokenStyle
                    }
                  >
                    {token.content}
                  </span>
                ))}
                {"\n"}
              </span>
            </span>
          ))}
        </code>
      </pre>
      <div className="code-window-output" aria-label="运行输出">
        <span aria-hidden="true">$</span>
        <span>{example.output.join("\n")}</span>
      </div>
    </figure>
  );
}
