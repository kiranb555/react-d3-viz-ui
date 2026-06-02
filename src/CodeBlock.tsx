import { useState } from 'react';

/** A code block with a copy-to-clipboard button (same UX as the playground). */
export function CodeBlock({ code, label = 'Code' }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  return (
    <div className="code">
      <div className="code-head">
        <span>{label}</span>
        <button className="btn" onClick={copy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
