import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Terminal from '../layout/Terminal';
import TypewriterText from '../ui/TypewriterText';
import ParticleField from '../3d/ParticleField';

const HeroContainer = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding-top: 8rem;
    padding-bottom: 4rem;
  }
`;

const TextContent = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  padding: 2rem 0;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 100%;
    margin-bottom: 3rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.5;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const TerminalWrapper = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  height: 350px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    width: 100%;
    max-width: 100%;
  }
`;

const ParticleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const StatusBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-top: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  z-index: 10;
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#28ca42' : '#ff5f57'};
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${props => props.theme.colors.accent};
  opacity: 0.05;
  z-index: 3;
  pointer-events: none;
  animation: scanAnimation 3s linear infinite;
  
  @keyframes scanAnimation {
    0% { transform: translateY(-100px); }
    100% { transform: translateY(100vh); }
  }
`;

const Hero = () => {
  const [activeSystem, setActiveSystem] = useState(true);
  const [securityStatus, setSecurityStatus] = useState('Monitoring');
  const [networkStatus, setNetworkStatus] = useState('Connected');
  const [uptime, setUptime] = useState('00:00:00');
  
  // Set up terminal commands that will auto-execute
  const initialCommands = [
    'whoami',
    'ls',
    'cat README.md',
    'projects'
  ];
  
  // Auto update uptime counter
  useEffect(() => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let mounted = true;
    
    const updateTime = () => {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
      
      if (mounted) {
        setUptime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    };
    
    const intervalId = setInterval(updateTime, 1000);
    
    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);
  
  // Randomly change security status
  useEffect(() => {
    const statuses = ['Monitoring', 'Scanning', 'Analyzing', 'Secure'];
    let mounted = true;
    
    const updateStatus = () => {
      if (mounted) {
        const randomIndex = Math.floor(Math.random() * statuses.length);
        setSecurityStatus(statuses[randomIndex]);
      }
    };
    
    const intervalId = setInterval(updateStatus, 5000);
    
    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.6 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  return (
    <HeroContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ParticleBackground>
        <ParticleField />
      </ParticleBackground>
      
      <ScanLine />
      
      <ContentWrapper>
        <TextContent variants={itemVariants}>
          <Title>
            <TypewriterText 
              text="Security-Focused Software Engineer" 
              delay={50}
              startDelay={500}
              monospace={false}
            />
          </Title>
          <Subtitle>
            Developing secure systems, identifying vulnerabilities, and building 
            resilient architecture to protect digital assets.
          </Subtitle>
        </TextContent>
        
        <TerminalWrapper variants={itemVariants}>
          <Terminal 
            initialCommands={initialCommands}
            autoExecuteDelay={1500}
            allowInput={true}
          />
        </TerminalWrapper>
      </ContentWrapper>
      
      <StatusBar
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <StatusItem>
          <StatusIndicator active={activeSystem} />
          System: {activeSystem ? 'Active' : 'Inactive'}
        </StatusItem>
        
        <StatusItem>
          Security: {securityStatus}
        </StatusItem>
        
        <StatusItem>
          Network: {networkStatus}
        </StatusItem>
        
        <StatusItem>
          Uptime: {uptime}
        </StatusItem>
      </StatusBar>
    </HeroContainer>
  );
};

export default Hero;