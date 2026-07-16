import { useState } from "react";

export function CopyButton({
  value,
  compact = false,
  label = "复制命令"
}: {
  value: string;
  compact?: boolean;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("复制此命令：", value);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`copy-button ${compact ? "is-compact" : ""}`}
      aria-label={copied ? "已复制" : label}
    >
      <span aria-live="polite">{copied ? "已复制" : "复制"}</span>
    </button>
  );
}
