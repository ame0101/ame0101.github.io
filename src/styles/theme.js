const theme = {
  colors: {
    background: '#0a0a0a',
    backgroundSecondary: '#121212',
    text: '#f0f0f0',
    textSecondary: '#a0a0a0',
    border: '#333333',
    accent: '#ffffff',
    error: '#ff3333',
    success: '#33ff33',
  },
  fonts: {
    main: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'SF Mono', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem',
    display: '3rem',
    hero: '4rem',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '5rem',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  borders: {
    thin: '1px solid',
    medium: '2px solid',
    thick: '3px solid',
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '16px',
    round: '50%',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
  zIndices: {
    base: 0,
    elevated: 1,
    dropdown: 10,
    sticky: 100,
    overlay: 200,
    modal: 300,
    popover: 400,
    tooltip: 500,
  },
  // Terminal-specific theme properties
  terminal: {
    prompt: '$ ',
    promptUser: 'visitor@',
    promptHost: 'cybersec-portfolio:~',
    cursorSpeed: '750ms',
    typingSpeed: '40ms',
  },
  // IDE-specific theme properties
  ide: {
    tabHeight: '40px',
    lineNumberColor: '#555',
    syntaxColors: {
      keyword: '#ffffff',
      string: '#dddddd',
      comment: '#777777',
      function: '#eeeeee',
      variable: '#cccccc',
      operator: '#ffffff',
    }
  },
  // Cybersecurity visual elements
  cyber: {
    scanLineOpacity: 0.05,
    nodeSize: 5,
    linkDistance: 100,
    networkAnimationSpeed: '5s',
  }
};

export default theme;