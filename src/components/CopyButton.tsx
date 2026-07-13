import { useState } from "react";

export function CopyButton({ value, compact = false }: { value: string; compact?: boolean }) {
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
      className={compact
        ? "shrink-0 rounded-lg px-3 py-2 text-xs text-current transition hover:bg-black/5 dark:hover:bg-white/10"
        : "button-secondary shrink-0 px-4 text-xs"}
      aria-label="复制命令"
    >
      {copied ? "已复制" : "复制"}
    </button>
  );
}
