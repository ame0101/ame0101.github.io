import React from 'react';
import { Link } from 'react-router-dom';

const nav = () => (
  <nav>
    <ul>
      <li><Link to="/">About Me</Link></li>
      <li><Link to="/work-experience">Work Experience</Link></li>
      <li><Link to="/projects">Projects</Link></li>
      <li><Link to="/assignments">Assignments</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </nav>
);
export default nav;
