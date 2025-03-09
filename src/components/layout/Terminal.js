import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  font-family: ${props => props.theme.fonts.mono};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  width: 100%;
  height: ${props => props.fullscreen ? '100vh' : '400px'};
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
`;

const TerminalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const TerminalControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;

const ControlButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.color};
  cursor: pointer;
  transition: opacity ${props => props.theme.transitions.fast};
  
  &:hover {
    opacity: 0.8;
  }
`;

const TerminalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const OutputLine = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  color: ${props => props.theme.colors.text};
  
  &.error {
    color: ${props => props.theme.colors.error};
  }
  
  &.success {
    color: ${props => props.theme.colors.success};
  }
`;

const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: ${props => props.theme.colors.accent};
  margin-left: 4px;
  animation: ${blinkAnimation} ${props => props.theme.terminal.cursorSpeed} step-end infinite;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
`;

const Prompt = styled.span`
  color: ${props => props.theme.colors.accent};
  margin-right: ${props => props.theme.spacing.xs};
  white-space: nowrap;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1rem;
  flex: 1;
  caret-color: transparent;
  
  &:focus {
    outline: none;
  }
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${props => props.theme.colors.accent};
  opacity: ${props => props.theme.cyber.scanLineOpacity};
  pointer-events: none;
  z-index: 10;
  animation: scanAnimation 3s linear infinite;
  
  @keyframes scanAnimation {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
`;

// Simple placeholder commands for the terminal
const defaultCommands = [
  {
    name: 'help',
    description: 'Show available commands',
    usage: 'help',
    handler: () => {
      return [
        'Available commands:',
        '==================',
        'help       - Show available commands',
        'about      - Display information about me',
        'skills     - List my technical skills',
        'projects   - List my projects',
        'contact    - Display contact information',
        'clear      - Clear the terminal',
        '',
        'Type "help [command]" for more information about a specific command.',
      ];
    }
  },
  {
    name: 'about',
    description: 'Display information about me',
    usage: 'about',
    handler: () => {
      return [
        '=== Professional Profile ===',
        '',
        'Software Engineer specializing in Cybersecurity',
        '',
        'Skills:',
        '- Network Security Architecture',
        '- Penetration Testing',
        '- Secure Code Development',
        '- Threat Modeling & Analysis',
        '- Incident Response',
        '- Security Automation',
        '',
        'Use "contact" command to get in touch',
      ];
    }
  },
  {
    name: 'skills',
    description: 'List my technical skills',
    usage: 'skills [category]',
    handler: (args) => {
      return [
        '=== Skills Categories ===',
        '',
        'Security:',
        '  - Network Security',
        '  - Web Application Security',
        '  - Penetration Testing',
        '',
        'Development:',
        '  - JavaScript/TypeScript',
        '  - React',
        '  - Node.js',
        '',
        'Tools:',
        '  - Wireshark',
        '  - Burp Suite',
        '  - Nmap',
      ];
    }
  },
  {
    name: 'projects',
    description: 'List my projects',
    usage: 'projects',
    handler: () => {
      return [
        '=== Projects ===',
        '',
        'VulnCrypt - AI-powered static analysis tool',
        'BU Shuttle Delay Predictor - Machine learning model for shuttle delays',
        'DeepPacket - AI-powered network anomaly detection',
        'Zero Trust CASB - Cloud Access Security Broker with zero-trust principles',
        '',
        'Use "project [name]" to view details about a specific project',
      ];
    }
  },
  {
    name: 'contact',
    description: 'View contact information',
    usage: 'contact',
    handler: () => {
      return [
        '=== Contact Information ===',
        '',
        'Email: aalfonso0101@gmail.com',
        'LinkedIn: linkedin.com/in/ameliaalfonso',
        'GitHub: github.com/ame0101',
        '',
        'Feel free to reach out for collaboration opportunities or inquiries.',
      ];
    }
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    usage: 'clear',
    handler: () => {
      return 'CLEAR_TERMINAL';
    }
  },
];

const Terminal = ({ 
  initialCommands = [], 
  autoExecuteDelay = 800, 
  fullscreen = false, 
  allowInput = true,
  introText = true,
  onCommandExecuted = () => {},
  customCommands = []
}) => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [executing, setExecuting] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  
  // Combine default and custom commands
  const terminalCommands = [...defaultCommands, ...customCommands];

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on click
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && allowInput && !executing) {
        inputRef.current.focus();
      }
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('click', handleClick);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [allowInput, executing]);

  // Auto execute initial commands
  useEffect(() => {
    if (initialCommands.length > 0) {
      const timer = setTimeout(() => {
        executeNextInitialCommand(0);
      }, autoExecuteDelay);
      
      return () => clearTimeout(timer);
    }
  }, [initialCommands, autoExecuteDelay]);

  // Add intro text on first render
  useEffect(() => {
    if (introText) {
      setHistory([
        { content: 'Welcome to Cybersecurity Portfolio Terminal', type: 'system' },
        { content: 'Type "help" for available commands', type: 'system' },
        { content: '--------------------------------------------', type: 'system' }
      ]);
    }
  }, [introText]);

  const executeNextInitialCommand = (index) => {
    if (index < initialCommands.length) {
      setInput(initialCommands[index]);
      setTimeout(() => {
        executeCommand(initialCommands[index]);
        setTimeout(() => {
          executeNextInitialCommand(index + 1);
        }, autoExecuteDelay);
      }, 100);
    }
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    
    // Add command to history
    setHistory(prev => [...prev, { content: `${trimmedCmd}`, type: 'command' }]);
    
    // Process command
    if (trimmedCmd) {
      setExecuting(true);
      
      // Special case for clear command
      if (trimmedCmd === 'clear') {
        setHistory([]);
        setExecuting(false);
        return;
      }
      
      // Find command in available commands
      const cmdParts = trimmedCmd.split(' ');
      const cmdName = cmdParts[0];
      const args = cmdParts.slice(1);
      
      const command = terminalCommands.find(c => c.name === cmdName);
      
      if (command) {
        // Execute command handler
        try {
          const result = command.handler(args);
          
          // Add response to history after a short delay
          setTimeout(() => {
            if (Array.isArray(result)) {
              setHistory(prev => [...prev, ...result.map(line => ({ content: line, type: 'output' }))]);
            } else {
              setHistory(prev => [...prev, { content: result, type: 'output' }]);
            }
            onCommandExecuted(cmdName, args, 'success');
            setExecuting(false);
          }, 300);
        } catch (error) {
          setTimeout(() => {
            setHistory(prev => [...prev, { content: `Error: ${error.message}`, type: 'error' }]);
            onCommandExecuted(cmdName, args, 'error');
            setExecuting(false);
          }, 300);
        }
      } else {
        // Command not found
        setTimeout(() => {
          setHistory(prev => [...prev, { content: `Command not found: ${cmdName}. Type "help" for available commands.`, type: 'error' }]);
          onCommandExecuted(cmdName, args, 'not-found');
          setExecuting(false);
        }, 300);
      }
    } else {
      setExecuting(false);
    }
    
    // Reset input
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && !executing) {
      executeCommand(input);
    }
  };

  return (
    <Container 
      ref={containerRef}
      fullscreen={fullscreen}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ScanLine />
      
      <TerminalHeader>
        <TerminalTitle>
          Terminal - {fullscreen ? 'Portfolio.sh' : 'Portfolio Interactive Shell'}
        </TerminalTitle>
        <TerminalControls>
          <ControlButton color="#ff5f57" />
          <ControlButton color="#ffbd2e" />
          <ControlButton color="#28ca42" />
        </TerminalControls>
      </TerminalHeader>
      
      <TerminalContent>
        {history.map((entry, index) => (
          <OutputLine 
            key={index} 
            className={entry.type === 'error' ? 'error' : entry.type === 'success' ? 'success' : ''}
          >
            {entry.type === 'command' ? (
              <>
                <Prompt>{'visitor@cybersec-portfolio:~ $ '}</Prompt>
                {entry.content}
              </>
            ) : (
              entry.content
            )}
          </OutputLine>
        ))}
        
        {allowInput && (
          <InputLine>
            <Prompt>{'visitor@cybersec-portfolio:~ $ '}</Prompt>
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              disabled={executing}
              autoFocus
            />
            {!input && <Cursor />}
          </InputLine>
        )}
      </TerminalContent>
    </Container>
  );
};

export default Terminal;