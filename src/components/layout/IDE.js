import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CodeBlock from '../ui/CodeBlock';

const Container = styled(motion.div)`
  font-family: ${props => props.theme.fonts.mono};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  width: 100%;
  height: ${props => props.height || '500px'};
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const IDEHeader = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
`;

const Title = styled.div`
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.textSecondary};
`;

const Controls = styled.div`
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

const TabsContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.background};
  border-bottom: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  height: ${props => props.theme.ide.tabHeight};
  overflow-x: auto;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.border};
    border-radius: 3px;
  }
`;

const Tab = styled.div`
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textSecondary};
  background-color: ${props => props.active ? props.theme.colors.backgroundSecondary : 'transparent'};
  border-right: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
  
  ${props => props.active && `
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${props.theme.colors.accent};
    }
  `}
`;

const TabIcon = styled.span`
  margin-right: 8px;
  font-size: 0.9em;
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const FooterBar = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 4px 8px;
  font-size: 0.85em;
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  justify-content: space-between;
  border-top: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color || props.theme.colors.accent};
`;

const FileMetaInfo = styled.div`
  display: flex;
  gap: 16px;
`;

// IDE component for displaying code with tabs
const IDE = ({
  files = [],
  height = '500px',
  initialTab = 0,
  onTabChange = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(false);
  
  // File extensions to icon mapping
  const fileIcons = {
    'js': '📄',
    'jsx': '⚛️',
    'ts': '📘',
    'tsx': '📘',
    'json': '{}',
    'html': '🌐',
    'css': '🎨',
    'md': '📝',
    'py': '🐍',
    'rb': '💎',
    'go': '🔵',
    'rs': '🦀',
    'c': '🔤',
    'cpp': '🔣',
    'php': '🐘',
    'java': '☕',
    'sh': '📜',
    'sol': '💰',
    'sql': '🗃️',
    'graphql': '🔍',
    'default': '📄',
  };
  
  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };
  
  const getFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    return fileIcons[ext] || fileIcons.default;
  };
  
  const getLanguage = (filename) => {
    const ext = getFileExtension(filename);
    
    const languageMap = {
      'js': 'javascript',
      'jsx': 'jsx',
      'ts': 'typescript',
      'tsx': 'tsx',
      'json': 'json',
      'html': 'html',
      'css': 'css',
      'md': 'markdown',
      'py': 'python',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'c': 'c',
      'cpp': 'cpp',
      'php': 'php',
      'java': 'java',
      'sh': 'bash',
      'sol': 'solidity',
      'sql': 'sql',
      'graphql': 'graphql',
    };
    
    return languageMap[ext] || 'text';
  };
  
  // Simulate loading effect when changing tabs
  useEffect(() => {
    if (files.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab, files]);
  
  const handleTabChange = (index) => {
    setActiveTab(index);
    onTabChange(index);
  };
  
  // Get current active file
  const activeFile = files[activeTab] || { name: 'No files', content: '' };
  
  return (
    <Container
      height={height}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IDEHeader>
        <Title>Code Editor</Title>
        <Controls>
          <ControlButton color="#ff5f57" />
          <ControlButton color="#ffbd2e" />
          <ControlButton color="#28ca42" />
        </Controls>
      </IDEHeader>
      
      {files.length > 0 && (
        <TabsContainer>
          {files.map((file, index) => (
            <Tab
              key={index}
              active={activeTab === index}
              onClick={() => handleTabChange(index)}
            >
              <TabIcon>{getFileIcon(file.name)}</TabIcon>
              {file.name}
            </Tab>
          ))}
        </TabsContainer>
      )}
      
      <Content>
        <CodeBlock
          code={activeFile.content}
          language={getLanguage(activeFile.name)}
          showLineNumbers
          isLoading={isLoading}
        />
      </Content>
      
      <FooterBar>
        <StatusIndicator>
          <Dot color={isLoading ? '#ffbd2e' : '#28ca42'} />
          {isLoading ? 'Loading...' : 'Ready'}
        </StatusIndicator>
        
        <FileMetaInfo>
          <span>{getLanguage(activeFile.name).toUpperCase()}</span>
          <span>UTF-8</span>
          <span>LF</span>
        </FileMetaInfo>
      </FooterBar>
    </Container>
  );
};

export default IDE;