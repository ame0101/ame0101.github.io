import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Container = styled.div`
  font-family: ${props => props.monospace ? props.theme.fonts.mono : props.theme.fonts.main};
  color: ${props => props.theme.colors.text};
  position: relative;
  display: inline-block;
`;

const Cursor = styled.span`
  display: ${props => props.hide ? 'none' : 'inline-block'};
  width: 0.6em;
  height: 1.2em;
  background-color: ${props => props.theme.colors.accent};
  position: relative;
  top: 0.1em;
  margin-left: 2px;
  animation: ${blinkAnimation} 0.75s step-end infinite;
`;

const TypewriterText = ({
  text,
  delay = 50,
  onComplete = () => {},
  startDelay = 0,
  hideCursor = false,
  monospace = true,
  repeat = false,
  eraseDelay = 50,
  eraseBeforeRepeat = false,
  pauseBeforeErase = 2000,
  pauseBeforeRepeat = 1000,
  className = '',
  style = {}
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);
  const currentIndexRef = useRef(0);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Start typing animation
  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    currentIndexRef.current = 0;
    setIsTyping(false);
    setIsErasing(false);
    setIsComplete(false);
    setIsPaused(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Start typing after startDelay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, startDelay]);

  // Handle typing animation
  useEffect(() => {
    if (!isTyping || isPaused) return;
    
    if (currentIndexRef.current < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndexRef.current + 1));
        currentIndexRef.current += 1;
      }, delay);
    } else {
      setIsTyping(false);
      setIsComplete(true);
      onComplete();
      
      if (repeat) {
        if (eraseBeforeRepeat) {
          // Pause before starting to erase
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            setIsErasing(true);
          }, pauseBeforeErase);
          setIsPaused(true);
        } else {
          // Pause before repeating
          timeoutRef.current = setTimeout(() => {
            setIsPaused(false);
            currentIndexRef.current = 0;
            setDisplayedText('');
            setIsTyping(true);
            setIsComplete(false);
          }, pauseBeforeRepeat);
          setIsPaused(true);
        }
      }
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isTyping, isPaused, text, delay, repeat, eraseBeforeRepeat, pauseBeforeErase, pauseBeforeRepeat, onComplete]);

  // Handle erasing animation
  useEffect(() => {
    if (!isErasing || isPaused) return;
    
    if (displayedText.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length - 1));
      }, eraseDelay);
    } else {
      setIsErasing(false);
      
      // Start typing again after erasing
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        currentIndexRef.current = 0;
        setIsTyping(true);
      }, pauseBeforeRepeat);
      setIsPaused(true);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isErasing, isPaused, displayedText, text, eraseDelay, pauseBeforeRepeat]);

  return (
    <Container 
      monospace={monospace}
      className={className}
      style={style}
    >
      {displayedText}
      {!hideCursor && (isTyping || isErasing || (!isComplete && displayedText.length === 0)) && (
        <Cursor />
      )}
    </Container>
  );
};

export default TypewriterText;