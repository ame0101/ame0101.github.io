import React from 'react';

const assignments = () => (
  <section>
    <h2>Assignments</h2>
    <div className="assignment">
      <h3>Assignment 1</h3>
      <p>Brief explanation of how you approached the assignment.</p>
      <a href="https://github.com/username/username-assignment-1">Github Link</a>
      <h3>Assignment 2: K Means Cluser Visualizer</h3>
      <p>This assignment involved creating an interactive web application that 
        demonstrates the KMeans clustering algorithm with various initialization methods, 
        allowing users to visualize the clustering process step-by-step. The project requires 
        functionality to generate datasets, select initialization strategies, and dynamically 
        update cluster assignments on a 2D plot, with the entire setup tested via a Makefile and GitHub Actions.
    </p>
      <a href="https://github.com/ame0101/alfonsoa-assignment-2">Github Link</a>
    </div>
    {/* Add more assignments here */}
  </section>
);

export default assignments;