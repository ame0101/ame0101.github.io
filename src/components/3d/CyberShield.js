import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ShieldContainer = styled.div`
  width: 100%;
  height: ${props => props.height || '300px'};
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.md};
`;

class CyberShieldAnimation {
  constructor(container, params = {}) {
    this.container = container;
    this.params = {
      color: 0xffffff,
      backgroundColor: 0x0a0a0a,
      rotationSpeed: 0.002,
      pulseSpeed: 0.005,
      ...params
    };

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.shield = null;
    this.glowSphere = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.params.backgroundColor);

    // Camera setup
    const { width, height } = this.container.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    this.scene.add(directionalLight);

    // Create shield
    this.createShield();

    // Add glow effect
    this.createGlow();

    // Add network lines
    this.createNetworkLines();

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));

    // Mouse move handler for interactivity
    this.container.addEventListener('mousemove', this.onMouseMove.bind(this));

    // Start animation loop
    this.animate();
  }

  createShield() {
    // Create base shield geometry
    const geometry = new THREE.IcosahedronGeometry(1, 2);
    
    // Create wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: this.params.color,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    // Create shield mesh
    this.shield = new THREE.Mesh(geometry, wireframeMaterial);
    this.scene.add(this.shield);
    
    // Create inner shield
    const innerGeometry = new THREE.IcosahedronGeometry(0.95, 1);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: this.params.color,
      emissive: this.params.color,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    
    this.innerShield = new THREE.Mesh(innerGeometry, innerMaterial);
    this.scene.add(this.innerShield);
    
    // Add points at vertices
    const pointsMaterial = new THREE.PointsMaterial({
      color: this.params.color,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });
    
    this.vertices = new THREE.Points(geometry, pointsMaterial);
    this.scene.add(this.vertices);
  }

  createGlow() {
    // Create glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.1, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        "c": { type: "f", value: 0.2 },
        "p": { type: "f", value: 3.0 },
        glowColor: { type: "c", value: new THREE.Color(this.params.color) },
        viewVector: { type: "v3", value: this.camera.position }
      },
      vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normal);
          vec3 vNormel = normalize(viewVector);
          intensity = pow(c - dot(vNormal, vNormel), p);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, 1.0);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    this.glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
    this.scene.add(this.glowSphere);
  }

  createNetworkLines() {
    // Create network lines between random vertices
    const geometry = this.shield.geometry;
    const positions = geometry.attributes.position.array;
    
    this.networkLines = new THREE.Group();
    
    // Create lines between random vertices
    const lineMaterial = new THREE.LineBasicMaterial({
      color: this.params.color,
      transparent: true,
      opacity: 0.2
    });
    
    // Create around 20 network lines
    for (let i = 0; i < 20; i++) {
      // Get two random vertex indices
      const index1 = Math.floor(Math.random() * (positions.length / 3)) * 3;
      const index2 = Math.floor(Math.random() * (positions.length / 3)) * 3;
      
      // Create line geometry
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(
          positions[index1],
          positions[index1 + 1],
          positions[index1 + 2]
        ),
        new THREE.Vector3(
          positions[index2],
          positions[index2 + 1],
          positions[index2 + 2]
        )
      ]);
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      
      // Store original positions for animation
      line.userData = {
        originalPoints: [
          new THREE.Vector3(
            positions[index1],
            positions[index1 + 1],
            positions[index1 + 2]
          ),
          new THREE.Vector3(
            positions[index2],
            positions[index2 + 1],
            positions[index2 + 2]
          )
        ],
        pulseSpeed: 0.005 + Math.random() * 0.01,
        pulseOffset: Math.random() * Math.PI * 2
      };
      
      this.networkLines.add(line);
    }
    
    this.scene.add(this.networkLines);
  }

  // Create pulse effect on network lines
  animateNetworkLines(time) {
    this.networkLines.children.forEach(line => {
      const { originalPoints, pulseSpeed, pulseOffset } = line.userData;
      const pulse = Math.sin(time * pulseSpeed + pulseOffset) * 0.05 + 0.95;
      
      // Update line points
      const positions = line.geometry.attributes.position.array;
      
      for (let i = 0; i < 2; i++) {
        const point = originalPoints[i].clone().multiplyScalar(pulse);
        
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      }
      
      line.geometry.attributes.position.needsUpdate = true;
    });
  }

  // Handle window resize
  onWindowResize() {
    const { width, height } = this.container.getBoundingClientRect();
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }

  // Handle mouse move for interactivity
  onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    const rect = this.container.getBoundingClientRect();
    
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Slightly move shield based on mouse position
    const rotationSpeed = 0.001;
    this.shield.rotation.y += this.mouse.x * rotationSpeed;
    this.shield.rotation.x += this.mouse.y * rotationSpeed;
    
    this.innerShield.rotation.y += this.mouse.x * rotationSpeed;
    this.innerShield.rotation.x += this.mouse.y * rotationSpeed;
  }

  // Animation loop
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    const time = performance.now() * 0.001; // Convert to seconds
    
    // Rotate shield
    this.shield.rotation.y += this.params.rotationSpeed;
    this.innerShield.rotation.y -= this.params.rotationSpeed * 0.5;
    this.vertices.rotation.y += this.params.rotationSpeed;
    
    // Pulse effect on shield
    const pulse = Math.sin(time * this.params.pulseSpeed) * 0.05 + 1;
    this.shield.scale.set(pulse, pulse, pulse);
    
    // Animate network lines
    this.animateNetworkLines(time);
    
    // Update glow shader
    if (this.glowSphere) {
      this.glowSphere.material.uniforms.viewVector.value = 
        new THREE.Vector3().subVectors(this.camera.position, this.glowSphere.position);
    }
    
    // Update controls
    this.controls.update();
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  // Clean up resources
  dispose() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.container.removeEventListener('mousemove', this.onMouseMove.bind(this));
    
    this.controls.dispose();
    
    // Dispose geometries and materials
    this.shield.geometry.dispose();
    this.shield.material.dispose();
    this.innerShield.geometry.dispose();
    this.innerShield.material.dispose();
    this.vertices.geometry.dispose();
    this.vertices.material.dispose();
    this.glowSphere.geometry.dispose();
    this.glowSphere.material.dispose();
    
    // Dispose network lines
    this.networkLines.children.forEach(line => {
      line.geometry.dispose();
      line.material.dispose();
    });
    
    // Remove everything from scene
    while(this.scene.children.length > 0) { 
      this.scene.remove(this.scene.children[0]); 
    }
    
    // Remove renderer from DOM
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    
    this.renderer.dispose();
  }
}

const CyberShield = ({ height = '300px', backgroundColor = 0x0a0a0a, shieldColor = 0xffffff }) => {
  const containerRef = useRef();
  const animationRef = useRef();
  
  useEffect(() => {
    if (containerRef.current) {
      animationRef.current = new CyberShieldAnimation(containerRef.current, {
        color: shieldColor,
        backgroundColor: backgroundColor
      });
    }
    
    return () => {
      if (animationRef.current) {
        animationRef.current.dispose();
      }
    };
  }, [backgroundColor, shieldColor]);
  
  return <ShieldContainer ref={containerRef} height={height} />;
};

export default CyberShield;