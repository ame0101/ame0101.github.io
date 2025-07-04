import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/theme';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Main site Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';



// Loading screen component
import LoadingScreen from './components/ui/LoadingScreen';

const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate a loading period
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // adjust the timeout as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Navbar />
          <main>
            <Routes>
              {/* Main site routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<ContactPage />} />
              

              {/* Catch-all for undefined routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      )}
    </ThemeProvider>
  );
};

export default App;
