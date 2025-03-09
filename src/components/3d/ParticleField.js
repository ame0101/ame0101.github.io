import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

// Particle field configuration
const PARAMS = {
  particleCount: 200,
  particleSize: 2,
  defaultColor: 0xffffff,
  maxDistance: 150,
  connectionOpacity: 0.2,
  defaultSpeed: 0.2,
};

class ParticleSystem {
  constructor(container, params = {}) {
    this.container = container;
    this.params = { ...PARAMS, ...params };

    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera setup
    const { width, height } = container.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.z = 30;
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);
    
    // Particle system
    this.particles = [];
    this.particleSystem = null;
    this.connectionLines = null;
    
    // Mouse interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(0, 0);
    this.mousePosition = new THREE.Vector3(0, 0, 0);
    this.mouseSpeed = 0;
    
    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    container.addEventListener('mousemove', this.onMouseMove.bind(this));
    
    // Initialize
    this.init();
    this.animate();
  }
  
  init() {
    // Create particles
    this.createParticles();
    
    // Create connections
    this.createConnections();
  }
  
  createParticles() {
    const { particleCount, particleSize, defaultColor } = this.params;
    
    // Particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocity = new Float32Array(particleCount * 3);
    
    const color = new THREE.Color(defaultColor);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * 100;   // x
      positions[i3 + 1] = (Math.random() - 0.5) * 100;  // y
      positions[i3 + 2] = (Math.random() - 0.5) * 100;  // z
      
      // Color
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Size
      sizes[i] = particleSize * (0.5 + Math.random() * 0.5);
      
      // Velocity
      velocity[i3] = (Math.random() - 0.5) * this.params.defaultSpeed;       // vx
      velocity[i3 + 1] = (Math.random() - 0.5) * this.params.defaultSpeed;   // vy
      velocity[i3 + 2] = (Math.random() - 0.5) * this.params.defaultSpeed;   // vz
      
      // Store particle data
      this.particles.push({
        position: new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]),
        velocity: new THREE.Vector3(velocity[i3], velocity[i3 + 1], velocity[i3 + 2]),
        acceleration: new THREE.Vector3(0, 0, 0),
        original: {
          size: sizes[i],
          color: new THREE.Color(color.r, color.g, color.b)
        }
      });
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create material
    const material = new THREE.PointsMaterial({
      size: particleSize,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
    
    // Create particle system
    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }
  
  createConnections() {
    // Create line geometry for connections
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: this.params.connectionOpacity,
      blending: THREE.AdditiveBlending,
    });
    
    this.connectionLines = new THREE.LineSegments(geometry, material);
    this.scene.add(this.connectionLines);
  }
  
  updateParticles() {
    const { particleCount } = this.params;
    const positions = this.particleSystem.geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const particle = this.particles[i];
      
      // Update position based on velocity
      particle.position.add(particle.velocity);
      
      // Apply mouse influence
      this.applyMouseInfluence(particle);
      
      // Boundary check with bounce
      this.boundaryCheck(particle);
      
      // Update position array
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;
    }
    
    // Update connections
    this.updateConnections();
    
    // Update buffer attributes
    this.particleSystem.geometry.attributes.position.needsUpdate = true;
  }
  
  applyMouseInfluence(particle) {
    if (this.mouseSpeed > 0) {
      const distance = particle.position.distanceTo(this.mousePosition);
      if (distance < 20) {
        const force = new THREE.Vector3()
          .subVectors(particle.position, this.mousePosition)
          .normalize()
          .multiplyScalar(0.05 * this.mouseSpeed);
        
        particle.velocity.add(force);
      }
    }
  }
  
  boundaryCheck(particle) {
    const bounds = 50;
    
    // X boundary
    if (particle.position.x > bounds) {
      particle.position.x = bounds;
      particle.velocity.x *= -1;
    } else if (particle.position.x < -bounds) {
      particle.position.x = -bounds;
      particle.velocity.x *= -1;
    }
    
    // Y boundary
    if (particle.position.y > bounds) {
      particle.position.y = bounds;
      particle.velocity.y *= -1;
    } else if (particle.position.y < -bounds) {
      particle.position.y = -bounds;
      particle.velocity.y *= -1;
    }
    
    // Z boundary
    if (particle.position.z > bounds) {
      particle.position.z = bounds;
      particle.velocity.z *= -1;
    } else if (particle.position.z < -bounds) {
      particle.position.z = -bounds;
      particle.velocity.z *= -1;
    }
    
    // Apply damping
    particle.velocity.multiplyScalar(0.99);
  }
  
  updateConnections() {
    const { particleCount, maxDistance, connectionOpacity } = this.params;
    const particles = this.particles;
    
    // Calculate connections
    const positions = [];
    let connectionCount = 0;
    
    for (let i = 0; i < particleCount; i++) {
      const particleA = particles[i];
      
      for (let j = i + 1; j < particleCount; j++) {
        const particleB = particles[j];
        const distance = particleA.position.distanceTo(particleB.position);
        
        if (distance < maxDistance) {
          positions.push(
            particleA.position.x, particleA.position.y, particleA.position.z,
            particleB.position.x, particleB.position.y, particleB.position.z
          );
          connectionCount++;
        }
      }
    }
    
    // Update line geometry
    const geometry = this.connectionLines.geometry;
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.attributes.position.needsUpdate = true;
    
    // Adjust opacity based on connection count
    const opacity = Math.min(connectionOpacity, 2000 / (connectionCount + 1));
    this.connectionLines.material.opacity = opacity;
  }
  
  onWindowResize() {
    const { width, height } = this.container.getBoundingClientRect();
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
  
  onMouseMove(event) {
    const { width, height } = this.container.getBoundingClientRect();
    const rect = this.container.getBoundingClientRect();
    
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    this.mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
    
    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Find intersections with an invisible plane
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const point = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(plane, point);
    
    // Calculate mouse speed
    const lastMousePosition = this.mousePosition.clone();
    this.mousePosition.copy(point);
    this.mouseSpeed = this.mousePosition.distanceTo(lastMousePosition);
  }
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    // Update particles
    this.updateParticles();
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
  
  dispose() {
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.container.removeEventListener('mousemove', this.onMouseMove.bind(this));
    
    // Dispose of resources
    this.particleSystem.geometry.dispose();
    this.particleSystem.material.dispose();
    this.connectionLines.geometry.dispose();
    this.connectionLines.material.dispose();
    
    // Remove elements
    this.scene.remove(this.particleSystem);
    this.scene.remove(this.connectionLines);
    
    // Remove renderer
    this.container.removeChild(this.renderer.domElement);
    this.renderer.dispose();
  }
}

const ParticleField = ({ particleCount = 200, particleSize = 2, maxDistance = 150 }) => {
  const containerRef = useRef(null);
  const systemRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      systemRef.current = new ParticleSystem(containerRef.current, {
        particleCount,
        particleSize,
        maxDistance,
      });
    }
    
    return () => {
      if (systemRef.current) {
        systemRef.current.dispose();
      }
    };
  }, [particleCount, particleSize, maxDistance]);
  
  return <ParticleContainer ref={containerRef} />;
};

export default ParticleField;