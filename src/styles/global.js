import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'SF Pro Display';
    src: url('/assets/fonts/SF-Pro-Display-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF Pro Display';
    src: url('/assets/fonts/SF-Pro-Display-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF Pro Display';
    src: url('/assets/fonts/SF-Pro-Display-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'SF Mono';
    src: url('/assets/fonts/SFMono-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --color-bg: #0a0a0a;
    --color-bg-secondary: #121212;
    --color-text: #f0f0f0;
    --color-text-secondary: #a0a0a0;
    --color-border: #333333;
    --color-accent: #ffffff;
    --font-main: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'SF Mono', monospace;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-main);
    font-size: 16px;
    line-height: 1.5;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--color-border) var(--color-bg);
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-border);
    border-radius: 3px;
  }

  body::-webkit-scrollbar {
    width: 8px;
  }

  a {
    color: var(--color-text);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  a:hover {
    color: var(--color-accent);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-main);
    font-weight: 700;
    line-height: 1.2;
  }

  button, input, textarea {
    font-family: var(--font-main);
    font-size: 1rem;
  }

  /* Terminal-style elements */
  .terminal {
    font-family: var(--font-mono);
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 1rem;
  }

  .code {
    font-family: var(--font-mono);
    background-color: rgba(255, 255, 255, 0.05);
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.9em;
  }

  /* IDE-style elements */
  .ide-panel {
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 4px;
  }

  .ide-tab {
    background-color: var(--color-bg);
    padding: 8px 16px;
    border-right: 1px solid var(--color-border);
    font-family: var(--font-mono);
    font-size: 0.9rem;
  }

  .ide-tab.active {
    background-color: var(--color-bg-secondary);
    border-bottom: 2px solid var(--color-accent);
  }

  /* Add cybersecurity theme elements */
  .scanner-line {
    height: 2px;
    background-color: var(--color-accent);
    opacity: 0.7;
    animation: scan 3s ease-in-out infinite;
  }

  @keyframes scan {
    0% {
      transform: translateY(0);
      opacity: 0.7;
    }
    50% {
      transform: translateY(100vh);
      opacity: 0.3;
    }
    100% {
      transform: translateY(0);
      opacity: 0.7;
    }
  }

  /* Blinking cursor animation */
  .blinking-cursor {
    display: inline-block;
    width: 8px;
    height: 18px;
    background-color: var(--color-accent);
    animation: blink 1s step-start infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  /* Network node styling */
  .node {
    fill: var(--color-accent);
    stroke: var(--color-accent);
    stroke-width: 1;
  }

  .link {
    stroke: var(--color-border);
    stroke-opacity: 0.6;
  }

  /* Container layouts */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
`;

export default GlobalStyle;