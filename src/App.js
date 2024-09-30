import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

import Navigation from './components/nav';
import AboutMe from './components/aboutme';
import WorkExperience from './components/workexperience';
import Projects from './components/projects';
import Assignments from './components/assignments';
import Contact from './components/contact';

const App = () => {
  // ... (code for 3D background remains the same as in the previous artifact)
  
  return (
    <Router>
      <div ref={mountRef} style={{ position: 'fixed', zIndex: -1 }} />
      <div>
        <h1>My Portfolio</h1>
        <Navigation />

        <Route exact path="/" component={aboutme} />
        <Route path="/work-experience" component={workexperience} />
        <Route path="/projects" component={projects} />
        <Route path="/assignments" component={assignments} />
        <Route path="/contact" component={contact} />
      </div>
    </Router>
  );
};

export default App;