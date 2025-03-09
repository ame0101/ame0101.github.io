import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Terminal from '../components/layout/Terminal';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 10rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin: 0;
  color: ${props => props.theme.colors.accent};
  opacity: 0.4;
  text-align: center;
  font-family: ${props => props.theme.fonts.mono};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 6rem;
  }
`;

const ErrorMessage = styled(motion.h2)`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const TerminalWrapper = styled(motion.div)`
  width: 100%;
  height: 300px;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const HomeButton = styled(Link)`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: 0.75rem 1.5rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
  }
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.colors.accent};
  opacity: 0.1;
  z-index: 10;
  animation: scanLine 4s linear infinite;
  
  @keyframes scanLine {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`;

const NotFound = () => {
  const [countdown, setCountdown] = useState(10);
  
  // Terminal commands
  const initialCommands = [
    'locate page',
    'scan network',
    'recover data'
  ];
  
  // Auto redirect countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else {
      window.location.href = '/';
    }
  }, [countdown]);
  
  return (
    <NotFoundContainer>
      <ScanLine />
      
      <ContentWrapper>
        <ErrorCode
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </ErrorCode>
        
        <ErrorMessage
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Page Not Found
        </ErrorMessage>
        
        <TerminalWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Terminal
            initialCommands={initialCommands}
            autoExecuteDelay={800}
            allowInput={false}
            introText={false}
          />
        </TerminalWrapper>
        
        <ButtonContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <HomeButton to="/">
            Return Home ({countdown}s)
          </HomeButton>
        </ButtonContainer>
      </ContentWrapper>
    </NotFoundContainer>
  );
};

export default NotFound;