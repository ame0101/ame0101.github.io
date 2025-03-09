import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-top: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  padding: 3rem 0 1.5rem;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const LogoSection = styled(FooterSection)`
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    text-align: center;
  }
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.mono};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const LogoSymbol = styled.span`
  display: inline-block;
  margin-right: 8px;
  font-size: 1.2em;
`;

const LogoDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  max-width: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const SectionTitle = styled.h3`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1.1rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    align-items: center;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const NavLinkIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 0.8rem;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
    transform: translateY(-3px);
  }
`;

const CopyRightBar = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CopyRightText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8rem;
  text-align: center;
`;

const TerminalText = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.theme.colors.accent};
`;

const TechStack = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    justify-content: flex-end;
  }
`;

const TechItem = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${props => props.theme.colors.accent};
  opacity: 0.05;
  top: 0;
  animation: scanFooter 3s linear infinite;
  
  @keyframes scanFooter {
    0% { transform: translateY(0); }
    100% { transform: translateY(100%); }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <ScanLine />
      
      <ContentWrapper>
        <FooterGrid>
          <LogoSection>
            <Logo to="/">
              <LogoSymbol>⚡</LogoSymbol>
              <span>amelia alfonso</span>
            </Logo>
            <LogoDescription>
              Security-focused software engineer specializing in creating secure applications, 
              identifying vulnerabilities, and implementing robust defense mechanisms.
            </LogoDescription>
            <SocialContainer>
              <SocialLink href="https://github.com/ame0101" target="_blank" rel="noopener noreferrer">
                <span>GH</span>
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/ameliaalfonso" target="_blank" rel="noopener noreferrer">
                <span>LI</span>
              </SocialLink> 
              <SocialLink href="mailto:contact@yourportfolio.dev">
                <span>@</span>
              </SocialLink>
            </SocialContainer>
          </LogoSection>
          
          <FooterSection>
            <SectionTitle>Navigation</SectionTitle>
            <NavContainer>
              <NavLink to="/">
                <NavLinkIcon>&gt;</NavLinkIcon>
                Home
              </NavLink>
              <NavLink to="/about">
                <NavLinkIcon>&gt;</NavLinkIcon>
                About
              </NavLink>
              <NavLink to="/projects">
                <NavLinkIcon>&gt;</NavLinkIcon>
                Projects
              </NavLink>
              <NavLink to="/blog">
                <NavLinkIcon>&gt;</NavLinkIcon>
                Blog
              </NavLink>
              <NavLink to="/contact">
                <NavLinkIcon>&gt;</NavLinkIcon>
                Contact
              </NavLink>
            </NavContainer>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>Contact</SectionTitle>
            <NavContainer>
              <NavLink as="a" href="mailto:contact@yourportfolio.dev">
                <NavLinkIcon>&gt;</NavLinkIcon>
                aalfonso0101@gmail.com
              </NavLink>
              <NavLink as="a" href="tel:+1234567890">
                <NavLinkIcon>&gt;</NavLinkIcon>
                +1 (508)-826-5195
              </NavLink>
              <NavLink as="a" href="https://calendly.com/yourusername" target="_blank" rel="noopener noreferrer">
                <NavLinkIcon>&gt;</NavLinkIcon>
                Schedule a call
              </NavLink>
            </NavContainer>
          </FooterSection>
        </FooterGrid>
        
        <CopyRightBar>
          <CopyRightText>
            &copy; {new Date().getFullYear()} <TerminalText>amelia alfonso</TerminalText> | All rights reserved
          </CopyRightText>
          
          <TechStack>
            <TechItem>React</TechItem>
            <TechItem>•</TechItem>
            <TechItem>Three.js</TechItem>
            <TechItem>•</TechItem>
            <TechItem>Styled Components</TechItem>
          </TechStack>
        </CopyRightBar>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;