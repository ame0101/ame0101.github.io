import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingContent = styled(motion.div)`
  text-align: center;
  max-width: 600px;
  padding: 2rem;
`;

const Logo = styled(motion.div)`
  font-family: ${props => props.theme.fonts.mono};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 3rem;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
`;

const LogoSymbol = styled.span`
  display: inline-block;
  margin-right: 15px;
  font-size: 1.2em;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
`;

const progressAnimation = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${props => props.theme.colors.accent};
  width: 0;
  animation: ${progressAnimation} 2s ease-in-out forwards;
`;

const StatusText = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 1rem;
  min-height: 24px;
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

const DigitalNoise = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
`;

const LoadingScreen = () => {
  const [loadingStatus, setLoadingStatus] = useState('Initializing systems...');
  
  useEffect(() => {
    const statusMessages = [
      'Initializing systems...',
      'Establishing secure connection...',
      'Loading security protocols...',
      'Performing integrity checks...',
      'Decrypting assets...',
      'Scanning for vulnerabilities...',
      'Launching secure environment...'
    ];
    
    let currentIndex = 0;
    
    const statusInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statusMessages.length;
      setLoadingStatus(statusMessages[currentIndex]);
    }, 300);
    
    return () => clearInterval(statusInterval);
  }, []);
  
  return (
    <LoadingContainer>
      <DigitalNoise />
      <ScanLine />
      
      <LoadingContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <LogoSymbol>⚡</LogoSymbol>
          <TypewriterText 
            text="ame0101" 
            delay={100}
            startDelay={500}
          />
        </Logo>
        
        <ProgressBarContainer>
          <ProgressBar />
        </ProgressBarContainer>
        
        <StatusText>{loadingStatus}</StatusText>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;