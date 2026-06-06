import { useMemo, useState } from 'react';
import hljs from 'highlight.js';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

/** A code block with a copy-to-clipboard button (same UX as the playground). */
export function CodeBlock({ code, label = 'Code' }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const highlightedCode = useMemo(() => {
    try {
      return hljs.highlight(code, { language: 'jsx' }).value;
    } catch {
      return hljs.highlightAuto(code).value;
    }
  }, [code]);

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
        <button className="btn" onClick={copy} title={copied ? 'Copied!' : 'Copy code'}>
          {copied ? <CheckIcon width={20} height={20} /> : <DocumentDuplicateIcon width={20} height={20} />}
        </button>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}
