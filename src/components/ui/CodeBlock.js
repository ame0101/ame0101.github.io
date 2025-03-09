import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Container = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  position: relative;
  overflow: auto;
  height: 100%;
  background-color: ${props => props.theme.colors.backgroundSecondary};
`;

const Pre = styled.pre`
  margin: 0;
  padding: ${props => props.showLineNumbers ? '1rem 1rem 1rem 3.8rem' : '1rem'};
  overflow: visible;
  font-size: 0.9rem;
  line-height: 1.5;
  tab-size: 2;
  hyphens: none;
  background: transparent;
  color: ${props => props.theme.colors.text};
  white-space: pre;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.border};
    border-radius: 3px;
  }
`;

const Code = styled.code`
  font-family: ${props => props.theme.fonts.mono};
  display: block;
  
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${props => props.theme.ide.syntaxColors.comment};
  }
  
  .token.punctuation {
    color: ${props => props.theme.colors.textSecondary};
  }
  
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol {
    color: ${props => props.theme.ide.syntaxColors.variable};
  }
  
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin {
    color: ${props => props.theme.ide.syntaxColors.string};
  }
  
  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${props => props.theme.ide.syntaxColors.operator};
  }
  
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${props => props.theme.ide.syntaxColors.keyword};
  }
  
  .token.function,
  .token.class-name {
    color: ${props => props.theme.ide.syntaxColors.function};
  }
  
  .token.regex,
  .token.important {
    color: #e90;
  }
  
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  
  .token.italic {
    font-style: italic;
  }
  
  .token.entity {
    cursor: help;
  }
`;

const LineNumbers = styled.div`
  position: absolute;
  top: 1rem;
  left: 0;
  bottom: 1rem;
  width: 2.5rem;
  text-align: right;
  padding: 0 0.5rem 0 0;
  background-color: ${props => props.theme.colors.background};
  border-right: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  color: ${props => props.theme.ide.lineNumberColor};
  font-size: 0.85em;
  user-select: none;
  overflow: hidden;
`;

const LineNumber = styled.div`
  line-height: 1.5;
`;

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const LoadingBar = styled.div`
  width: 60%;
  height: 4px;
  background-color: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      ${props => props.theme.colors.accent}, 
      transparent);
    animation: ${shimmer} 1.5s infinite;
  }
`;

const CodeBlock = ({
  code = '',
  language = 'javascript',
  showLineNumbers = true,
  isLoading = false,
}) => {
  const [formattedCode, setFormattedCode] = useState('');
  const [lines, setLines] = useState([]);
  
  // Format code using Prism.js
  useEffect(() => {
    const highlight = async () => {
      if (code) {
        // Ensure language is loaded
        try {
          // Format the code
          const formatted = Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.javascript,
            language
          );
          
          setFormattedCode(formatted);
          
          // Calculate line numbers
          const codeLines = code.split('\n');
          setLines(Array.from({ length: codeLines.length }, (_, i) => i + 1));
        } catch (error) {
          console.error('Error formatting code:', error);
          setFormattedCode(code);
        }
      } else {
        setFormattedCode('');
        setLines([]);
      }
    };
    
    highlight();
  }, [code, language]);
  
  return (
    <Container>
      {isLoading && (
        <LoadingOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingBar />
        </LoadingOverlay>
      )}
      
      {showLineNumbers && lines.length > 0 && (
        <LineNumbers>
          {lines.map(line => (
            <LineNumber key={line}>{line}</LineNumber>
          ))}
        </LineNumbers>
      )}
      
      <Pre showLineNumbers={showLineNumbers}>
        <Code dangerouslySetInnerHTML={{ __html: formattedCode }} />
      </Pre>
    </Container>
  );
};

export default CodeBlock;