import React, { useEffect, useRef, useState } from 'react';
import { Highlight, Prism } from 'prism-react-renderer';
import * as styles from '../styles/codeBlock.module.css';

// prism-react-renderer bundles common languages only; register the extra ones
// a DevOps blog needs. The prismjs components expect a global `Prism`.
(typeof global !== 'undefined' ? global : window).Prism = Prism;
require('prismjs/components/prism-bash');
require('prismjs/components/prism-shell-session');
require('prismjs/components/prism-powershell');
require('prismjs/components/prism-docker');
require('prismjs/components/prism-hcl');
require('prismjs/components/prism-ini');
require('prismjs/components/prism-toml');
require('prismjs/components/prism-nginx');
require('prismjs/components/prism-sql');
require('prismjs/components/prism-diff');

const LANGUAGE_ALIASES = {
  javascript: 'jsx',
  js: 'jsx',
  typescript: 'tsx',
  ts: 'tsx',
  shell: 'bash',
  sh: 'bash',
  zsh: 'bash',
  console: 'shell-session',
  terminal: 'shell-session',
  dockerfile: 'docker',
  terraform: 'hcl',
  tf: 'hcl',
  yml: 'yaml',
  html: 'markup',
  xml: 'markup',
  ps1: 'powershell',
  py: 'python'
};

function normalizeLanguage(language) {
  const lang = (language || '').trim().toLowerCase();
  return LANGUAGE_ALIASES[lang] || lang || 'plain';
}

// Syntax colors built from the site palette.
const theme = {
  plain: { color: '#feffff', backgroundColor: '#0f1b1f' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#7f9ea3', fontStyle: 'italic' } },
    { types: ['punctuation', 'operator'], style: { color: '#b7c9cc' } },
    { types: ['keyword', 'selector', 'important', 'atrule', 'tag'], style: { color: '#3aafa9' } },
    { types: ['string', 'char', 'attr-value', 'inserted', 'regex'], style: { color: '#a8e6cf' } },
    { types: ['function', 'class-name', 'builtin'], style: { color: '#7fdbd5' } },
    { types: ['number', 'boolean', 'constant', 'symbol'], style: { color: '#f2c572' } },
    { types: ['property', 'attr-name', 'variable', 'parameter'], style: { color: '#def2f1' } },
    { types: ['deleted'], style: { color: '#ff8a80' } }
  ]
};

export default function CodeBlock({ code, language, filePath }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const lang = normalizeLanguage(language);

  return (
    <figure className={styles.block}>
      <figcaption className={styles.header}>
        <span className={styles.file}>{filePath || language || 'Code'}</span>
        <button type='button' className={styles.copy} onClick={onCopy} aria-live='polite'>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </figcaption>
      <Highlight code={code.replace(/\n$/, '')} language={lang} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.pre}`} style={style}>
            <code>
              {tokens.map((line, i) => (
                <span key={i} {...getLineProps({ line })} className={styles.line}>
                  <span className={styles.lineNumber} aria-hidden='true'>
                    {i + 1}
                  </span>
                  <span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </figure>
  );
}
