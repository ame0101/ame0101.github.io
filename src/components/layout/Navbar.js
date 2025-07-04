import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const NavContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.scrolled 
    ? props.theme.colors.backgroundSecondary 
    : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  z-index: 100;
  transition: background-color 0.3s, backdrop-filter 0.3s;
  border-bottom: ${props => props.scrolled 
    ? `${props.theme.borders.thin} ${props.theme.colors.border}`
    : 'none'};
`;

const NavInner = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.mono};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const LogoSymbol = styled.span`
  display: inline-block;
  margin-right: 8px;
  font-size: 1.2em;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  margin: 0 1rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
  padding: 0.5rem 0;
  color: ${props => props.active 
    ? props.theme.colors.accent 
    : props.theme.colors.text};
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
    transition: width 0.3s;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ConnectButton = styled(motion.button)`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.accent};
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  z-index: 99;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MobileNavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1.5rem;
  margin: 1rem 0;
  color: ${props => props.active 
    ? props.theme.colors.accent 
    : props.theme.colors.text};
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const StatusIndicator = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.accent};
  margin-left: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.accent};
    opacity: 0.5;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    70% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Check if a link is active
  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      scrolled={scrolled}
    >
      <NavInner>
        <Logo to="/">
          <LogoSymbol>⚡</LogoSymbol>
          <span>amelia alfonso</span>
        </Logo>
        
        <NavLinks>
          <NavLink to="/" active={isLinkActive('/')}>
            Home
          </NavLink>
          <NavLink to="/about" active={isLinkActive('/about')}>
            About
          </NavLink>
          <NavLink to="/projects" active={isLinkActive('/projects')}>
            Projects
          </NavLink>
  
  
          <NavLink to="/contact" active={isLinkActive('/contact')}>
            Contact
          </NavLink>
          
          <ConnectButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connect
            <StatusIndicator />
          </ConnectButton>
        </NavLinks>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </NavInner>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink to="/" active={isLinkActive('/')}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/about" active={isLinkActive('/about')}>
              About
            </MobileNavLink>
            <MobileNavLink to="/projects" active={isLinkActive('/projects')}>
              Projects
            </MobileNavLink>
      
      
            <MobileNavLink to="/contact" active={isLinkActive('/contact')}>
              Contact
            </MobileNavLink>
            
            <ConnectButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginTop: '2rem' }}
            >
              Connect
              <StatusIndicator />
            </ConnectButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar;