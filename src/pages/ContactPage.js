import React, { useEffect } from 'react';
import styled from 'styled-components';
import Contact from '../components/sections/Contact';
import NetworkGraph from '../components/ui/NetworkGraph';

const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.05;
  pointer-events: none;
`;

const ScanLine = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${props => props.theme.colors.accent};
  opacity: 0.05;
  z-index: 10;
  pointer-events: none;
  animation: scanAnimation 3s linear infinite;
  
  @keyframes scanAnimation {
    0% { transform: translateY(-100px); }
    100% { transform: translateY(100vh); }
  }
`;

const ContactPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      {/* Background elements */}
      <BackgroundLayer>
        <NetworkGraph particleCount={100} />
      </BackgroundLayer>
      <ScanLine />
      
      {/* Main sections */}
      <Contact />
    </PageContainer>
  );
};

export default ContactPage;