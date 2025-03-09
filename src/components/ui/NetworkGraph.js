import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styled from 'styled-components';

const GraphContainer = styled.div`
  width: 100%;
  height: ${props => props.height || '400px'};
  position: relative;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

class Node {
  constructor(id, group = 0) {
    this.id = id;
    this.group = group;
    this.connections = [];
    this.position = new THREE.Vector3(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.mass = 1 + Math.random();
  }

  connect(nodeId) {
    if (!this.connections.includes(nodeId) && this.id !== nodeId) {
      this.connections.push(nodeId);
      return true;
    }
    return false;
  }

  applyForce(force) {
    // F = ma, so a = F/m
    const f = force.clone().divideScalar(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.multiplyScalar(0.99); // Damping
    this.position.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }
}

class NetworkGraph {
  constructor(container, params = {}) {
    this.container = container;
    this.params = {
      nodeSize: 1,
      nodeColor: 0xffffff,
      lineColor: 0x333333,
      lineOpacity: 0.2,
      backgroundColor: 0x0a0a0a,
      ...params,
    };

    this.nodes = [];
    this.links = [];
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.nodeMeshes = [];
    this.linkMeshes = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredNode = null;

    this.init();
  }

  init() {
    // Set up scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.params.backgroundColor);

    // Set up camera
    const { width, height } = this.container.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.z = 100;

    // Set up renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Set up controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.rotateSpeed = 0.5;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    this.scene.add(directionalLight);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));

    // Add mouse event listeners
    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this));

    this.animate();
  }

  // Add nodes to the network
  addNode(id, group = 0) {
    const node = new Node(id, group);
    this.nodes.push(node);
    
    // Create mesh for node
    const geometry = new THREE.SphereGeometry(this.params.nodeSize, 16, 16);
    const material = new THREE.MeshPhongMaterial({
      color: this.params.nodeColor,
      emissive: this.params.nodeColor,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.8,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(node.position);
    mesh.userData.nodeId = id;
    
    this.scene.add(mesh);
    this.nodeMeshes.push(mesh);
    
    return node;
  }

  // Connect nodes
  addLink(sourceId, targetId) {
    const source = this.nodes.find(node => node.id === sourceId);
    const target = this.nodes.find(node => node.id === targetId);
    
    if (!source || !target) {
      console.error(`Cannot create link: node not found`);
      return;
    }
    
    if (source.connect(targetId) && target.connect(sourceId)) {
      this.links.push({ source: sourceId, target: targetId });
      
      // Create line mesh for link
      const material = new THREE.LineBasicMaterial({
        color: this.params.lineColor,
        transparent: true,
        opacity: this.params.lineOpacity,
      });
      
      const geometry = new THREE.BufferGeometry().setFromPoints([
        source.position,
        target.position,
      ]);
      
      const line = new THREE.Line(geometry, material);
      line.userData = { sourceId, targetId };
      
      this.scene.add(line);
      this.linkMeshes.push(line);
    }
  }

  // Generate a random network
  generateRandomNetwork(nodeCount = 30, linkProbability = 0.1) {
    // Clear existing network
    this.clear();
    
    // Add nodes
    for (let i = 0; i < nodeCount; i++) {
      const group = Math.floor(Math.random() * 5); // Random group assignment
      this.addNode(i, group);
    }
    
    // Add links with some probability
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() < linkProbability) {
          this.addLink(i, j);
        }
      }
    }
  }

  // Clear the network
  clear() {
    // Remove all meshes from scene
    this.nodeMeshes.forEach(mesh => this.scene.remove(mesh));
    this.linkMeshes.forEach(line => this.scene.remove(line));
    
    // Clear arrays
    this.nodes = [];
    this.links = [];
    this.nodeMeshes = [];
    this.linkMeshes = [];
  }

  // Physics simulation step
  simulate() {
    const repulsionForce = 1;
    const attractionForce = 0.01;
    const maxDistance = 100;
    const minDistance = 5;
    
    // Apply forces
    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA = this.nodes[i];
      
      // Repulsion forces (nodes repel each other)
      for (let j = 0; j < this.nodes.length; j++) {
        if (i !== j) {
          const nodeB = this.nodes[j];
          const direction = new THREE.Vector3().subVectors(nodeA.position, nodeB.position);
          const distance = direction.length();
          
          if (distance > 0 && distance < maxDistance) {
            const force = repulsionForce / (distance * distance);
            direction.normalize().multiplyScalar(force);
            nodeA.applyForce(direction);
          }
        }
      }
      
      // Attraction forces (connected nodes attract each other)
      for (const connectedId of nodeA.connections) {
        const connectedNode = this.nodes.find(node => node.id === connectedId);
        if (connectedNode) {
          const direction = new THREE.Vector3().subVectors(connectedNode.position, nodeA.position);
          const distance = direction.length();
          
          if (distance > minDistance) {
            const force = attractionForce * distance;
            direction.normalize().multiplyScalar(force);
            nodeA.applyForce(direction);
          }
        }
      }
      
      // Center gravity to keep nodes from drifting too far
      const centerDirection = new THREE.Vector3().subVectors(
        new THREE.Vector3(0, 0, 0),
        nodeA.position
      );
      const centerDistance = centerDirection.length();
      const centerForce = 0.001 * centerDistance;
      centerDirection.normalize().multiplyScalar(centerForce);
      nodeA.applyForce(centerDirection);
      
      // Update node physics
      nodeA.update();
      
      // Update node mesh position
      if (this.nodeMeshes[i]) {
        this.nodeMeshes[i].position.copy(nodeA.position);
      }
    }
    
    // Update link positions
    for (let i = 0; i < this.linkMeshes.length; i++) {
      const link = this.linkMeshes[i];
      const sourceId = link.userData.sourceId;
      const targetId = link.userData.targetId;
      
      const source = this.nodes.find(node => node.id === sourceId);
      const target = this.nodes.find(node => node.id === targetId);
      
      if (source && target) {
        const points = [source.position, target.position];
        link.geometry.setFromPoints(points);
        link.geometry.attributes.position.needsUpdate = true;
      }
    }
  }

  // Animation loop
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    // Update physics
    this.simulate();
    
    // Update controls
    this.controls.update();
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
    
    // Check for node hover
    this.checkNodeHover();
  }

  // Window resize handler
  onWindowResize() {
    const { width, height } = this.container.getBoundingClientRect();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // Mouse move handler for hover effects
  onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  // Mouse click handler
  onMouseClick(event) {
    // Find intersected node
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.nodeMeshes);
    
    if (intersects.length > 0) {
      const nodeId = intersects[0].object.userData.nodeId;
      // You can implement a callback here to handle node clicks
      console.log(`Node clicked: ${nodeId}`);
    }
  }

  // Check for node hover
  checkNodeHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.nodeMeshes);
    
    // Reset previously hovered node
    if (this.hoveredNode && (!intersects.length || intersects[0].object.userData.nodeId !== this.hoveredNode)) {
      const oldNode = this.nodeMeshes.find(mesh => mesh.userData.nodeId === this.hoveredNode);
      if (oldNode) {
        oldNode.scale.set(1, 1, 1);
        oldNode.material.emissiveIntensity = 0.2;
      }
      this.hoveredNode = null;
    }
    
    // Set new hovered node
    if (intersects.length > 0) {
      const nodeId = intersects[0].object.userData.nodeId;
      if (this.hoveredNode !== nodeId) {
        intersects[0].object.scale.set(1.3, 1.3, 1.3);
        intersects[0].object.material.emissiveIntensity = 0.5;
        this.hoveredNode = nodeId;
      }
    }
  }

  // Clean up resources
  dispose() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this));
    this.renderer.domElement.removeEventListener('click', this.onMouseClick.bind(this));
    
    this.clear();
    this.renderer.dispose();
  }
}

const NetworkGraphComponent = ({ height = '400px', nodeCount = 50, linkProbability = 0.05 }) => {
  const containerRef = useRef(null);
  const graphRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      graphRef.current = new NetworkGraph(containerRef.current, {
        nodeSize: 0.8,
        nodeColor: 0xffffff,
        lineColor: 0x333333,
        lineOpacity: 0.2,
        backgroundColor: 0x0a0a0a,
      });
      
      graphRef.current.generateRandomNetwork(nodeCount, linkProbability);
    }
    
    return () => {
      if (graphRef.current) {
        graphRef.current.dispose();
      }
    };
  }, [nodeCount, linkProbability]);
  
  return <GraphContainer ref={containerRef} height={height} />;
};

export default NetworkGraphComponent;