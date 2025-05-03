import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = 'javascript' }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute top-4 right-4 transition-opacity duration-200">
        <button
          onClick={handleCopy}
          className={`copy-button ${copied ? 'copied' : ''}`}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <ClipboardDocumentCheckIcon className="h-5 w-5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="h-5 w-5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.75rem',
            padding: '1.5rem',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </motion.div>
    </div>
  );
};

export default CodeBlock; 