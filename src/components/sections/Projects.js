import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import IDE from '../layout/IDE';

const ProjectsContainer = styled.section`
  padding: 8rem 0 4rem;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionHeader = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    
    .project-card-overlay {
      opacity: 1;
    }
  }
`;

const ProjectHeader = styled.div`
  padding: 1.5rem;
  border-bottom: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  font-weight: ${props => props.theme.fontWeights.medium};
  display: flex;
  align-items: center;
`;

const ProjectIcon = styled.span`
  margin-right: 10px;
  font-size: 1.5rem;
`;

const SecurityLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SecurityDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.border};
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectDescription = styled.p`
  margin: 0 0 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const ProjectLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
`;

const ProjectLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const ProjectCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  class-name: "project-card-overlay";
`;

const DetailsButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.accent};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: flex-start;
  }
`;

const FilterButton = styled.button`
  background-color: ${props => props.active ? props.theme.colors.accent : 'transparent'};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
  border: ${props => props.theme.borders.thin} ${props => props.active ? props.theme.colors.accent : props.theme.colors.border};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  white-space: nowrap;
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  background-color: ${props => props.theme.colors.background};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  width: 100%;
  max-width: 900px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.colors.background};
  z-index: 10;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalSection = styled.div`
  margin-bottom: 2rem;
`;

const ModalSectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.theme.colors.accent};
`;

const ModalDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 1.5rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '>';
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.accent};
    font-family: ${props => props.theme.fonts.mono};
  }
`;

const ProjectPreview = styled.div`
  margin-bottom: 2rem;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const TechItem = styled.span`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(() => {
    
    const projectsData = [

      
        {
          id: 'sentinel-swarm',
          title: 'Sentinel Swarm',
          icon: '🛰️',
          description:
            'Geo-Swarm Defensive Orchestration with adaptive edge proxies for real-time threat mitigation across distributed environments.',
          securityLevel: 5,
          tags: ['Network Security', 'Zero-Trust', 'Threat Intel'],
          links: {
            github: 'https://sentinel-swarm.net',   // replace with repo URL if public
            demo: 'https://sentinel-swarm.net/demo'
          },
          detail: {
            fullDescription:
              'Sentinel Swarm is a decentralized cybersecurity platform that fuses gossip-based intelligence sharing with a metamorphic edge proxy. ' +
              'Agents exchange IOC hashes over mutual-TLS/WireGuard, rotate keys, randomize packet sizes and routes, and push WASM filters to Envoy sidecars, ' +
              'shutting down attacks in ≤200 ms.',
            features: [
              'Gossip network with mutual-TLS & WireGuard',
              'Edge proxy that continuously morphs TLS keys, packet sizes and paths',
              'Push-pull anti-entropy for IOC synchronization',
              'WASM filter injection into Envoy for on-the-fly blocking/throttling',
              'Central control-plane hooks for Prometheus + SIEM alerts',
              'Redundancy & fail-over for 99.99 % uptime'
            ],
            technologies: ['Go', 'Rust', 'Envoy-WASM', 'WireGuard', 'NATS', 'Kubernetes'],
            codePreview: `// Simplified swarm-node gossip heartbeat
      func (n *Node) gossipHeartbeat() {
        tick := time.NewTicker(2 * time.Second)
        for range tick.C {
          peers := n.pickRandomPeers(3)
          hb := heartbeat{NodeID: n.ID, IOCCount: len(n.IOCs), TS: time.Now()}
          for _, p := range peers {
            go n.send(p, hb) // non-blocking push-pull anti-entropy
          }
        }
      }`
          }
        },
      {
        id: 'vulncrypt',
        title: 'VulnCrypt',
        icon: '🛡️',
        description: 'AI-powered static analysis tool using a custom LSTM-based RNN model to detect vulnerabilities in C source code.',
        securityLevel: 5,
        tags: ['AI', 'Static Analysis', 'Security Research'],
       
        detail: {
          fullDescription: 'VulnCrypt is an AI-powered static analysis tool using a custom LSTM-based RNN model to detect vulnerabilities in C source code. The tool analyzes source code to identify potential security issues such as buffer overflows, SQL injection, and other common vulnerabilities.',
          features: [
            'Custom LSTM-based RNN model for vulnerability detection',
            'Deep learning pipeline for tokenization and sequence processing',
            'High accuracy and recall in vulnerability prediction',
            'DevSecOps integration for automated vulnerability scanning in CI/CD pipelines',
            'Expanded datasets using SARD and CWE for continuous model improvement',
            'Detection of buffer overflows, SQL injection, and other common vulnerabilities'
          ],
          technologies: ['PyTorch', 'LSTM', 'C', 'Python', 'CI/CD'],
          codePreview: `
# VulnCrypt core detection module
import torch
import torch.nn as nn
from torch.nn.utils.rnn import pack_padded_sequence, pad_packed_sequence

class VulnDetector(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, n_layers, dropout=0.5):
        super().__init__()
        
        # Embedding layer to convert tokens to vectors
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        
        # LSTM for sequence processing
        self.lstm = nn.LSTM(embedding_dim, 
                          hidden_dim, 
                          num_layers=n_layers, 
                          bidirectional=True, 
                          dropout=dropout if n_layers > 1 else 0,
                          batch_first=True)
        
        # Fully connected layer for classification
        self.fc = nn.Linear(hidden_dim * 2, 1)
        
        # Activation function
        self.sigmoid = nn.Sigmoid()
        
    def forward(self, text, text_lengths):
        # text: [batch size, seq length]
        
        # Convert tokens to embeddings
        embedded = self.embedding(text)
        # embedded: [batch size, seq length, embedding dim]
        
        # Pack padded sequence for LSTM efficiency
        packed_embedded = pack_padded_sequence(embedded, text_lengths.cpu(), batch_first=True, enforce_sorted=False)
        
        # Run through LSTM
        packed_output, (hidden, cell) = self.lstm(packed_embedded)
        
        # Unpack sequence
        output, output_lengths = pad_packed_sequence(packed_output, batch_first=True)
        # output: [batch size, seq length, hidden dim * 2]
        
        # Get final forward and backward hidden states
        hidden = torch.cat((hidden[-2,:,:], hidden[-1,:,:]), dim=1)
        # hidden: [batch size, hidden dim * 2]
        
        # Pass through linear layer
        prediction = self.fc(hidden)
        # prediction: [batch size, 1]
        
        # Apply sigmoid activation
        prediction = self.sigmoid(prediction)
        
        return prediction
`
        }
      },
      {
        id: 'shuttle-delay-predictor',
        title: 'BU Shuttle Delay Predictor',
        icon: '🚌',
        description: 'Machine learning model that predicts shuttle delays with a Random Forest model, achieving R²=0.869 accuracy.',
        securityLevel: 3,
        tags: ['Machine Learning', 'Data Science', 'Transportation'],
  
        detail: {
            fullDescription: 'The BU Shuttle Delay Predictor is a machine learning system that analyzes historical shuttle data to predict delays on Boston University\'s shuttle routes. Using a Random Forest model, it achieved an R² value of 0.869 and identified the most unreliable route with a 20.9-minute average delay.',          features: [
            'Random Forest model with R²=0.869 accuracy',
            'Identification of most unreliable routes',
            'Automated GPS/schedule data pipelines',
            'Flask API for real-time predictions',
            'Deployment with gunicorn for handling 1,000+ daily requests',
            'Integration with BU Transit app'
          ],
          technologies: ['Python', 'scikit-learn', 'Flask', 'Pandas', 'gunicorn'],
          codePreview: `
# BU Shuttle Delay Predictor - Model Training
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# Load and prepare data
def prepare_data(data_path):
    df = pd.read_csv(data_path)
    
    # Feature engineering
    df['hour'] = pd.to_datetime(df['departure_time']).dt.hour
    df['day_of_week'] = pd.to_datetime(df['date']).dt.dayofweek
    df['month'] = pd.to_datetime(df['date']).dt.month
    df['is_holiday'] = df['is_holiday'].astype(int)
    df['is_weekend'] = (df['day_of_week'] >= 5).astype(int)
    
    # Calculate historical average delay for each route
    route_avg_delays = df.groupby('route')['delay_minutes'].mean().to_dict()
    df['route_avg_delay'] = df['route'].map(route_avg_delays)
    
    # Weather data integration
    df = pd.merge(df, weather_data, on=['date', 'hour'], how='left')
    
    # Define features and target
    features = ['hour', 'day_of_week', 'month', 'is_holiday', 'is_weekend',
                'route_avg_delay', 'temperature', 'precipitation', 'traffic_index']
    X = df[features]
    y = df['delay_minutes']
    
    return X, y

# Train model
def train_model(X, y):
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Random Forest model
    rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
    rf_model.fit(X_train_scaled, y_train)
    
    # Evaluate model
    y_pred = rf_model.predict(X_test_scaled)
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    
    print(f"Model R² score: {r2:.3f}")
    print(f"Model RMSE: {rmse:.3f} minutes")
    
    # Save model and scaler
    joblib.dump(rf_model, 'shuttle_delay_model.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    
    return rf_model, scaler, r2

# Identify problematic routes
def analyze_routes(df):
    route_stats = df.groupby('route')['delay_minutes'].agg(['mean', 'median', 'std']).reset_index()
    route_stats = route_stats.sort_values('mean', ascending=False)
    
    print("Route Delay Analysis:")
    for _, row in route_stats.iterrows():
        print(f"Route: {row['route']}, Avg Delay: {row['mean']:.1f} min, Median: {row['median']:.1f} min, Std: {row['std']:.1f} min")
    
    return route_stats
`
        }
      },
      {
        id: 'deeppacket',
        title: 'DeepPacket',
        icon: '🔍',
        description: 'AI-powered network anomaly detection using LSTM models to detect malicious traffic patterns in real-time.',
        securityLevel: 5,
        tags: ['Network Security', 'AI', 'Threat Detection'],
   
        detail: {
          fullDescription: 'DeepPacket is an AI-powered network anomaly detection system that leverages LSTM models to detect malicious traffic patterns in real-time. The system analyzes packet captures (PCAPs) to identify suspicious activities such as DDoS attacks and DNS tunneling, achieving a 98% F1-score on the CIC-IDS2017 dataset.',
          features: [
            'LSTM model for detecting malicious traffic patterns',
            'Detection of DDoS attacks and DNS tunneling',
            '98% F1-score on CIC-IDS2017 dataset',
            'Integration with Zeek/Bro for real-time alerting',
            'Kubernetes sidecar deployment for microservices monitoring',
            'East-West traffic analysis in containerized environments'
          ],
          technologies: ['PyTorch', 'Scapy', 'Zeek', 'Python', 'Kubernetes'],
          codePreview: `
import torch
import torch.nn as nn
import scapy.all as scapy
from scapy.utils import RawPcapReader
import numpy as np

class PacketFeatureExtractor:
    def __init__(self):
        self.ip_proto_map = {'tcp': 0, 'udp': 1, 'icmp': 2}
    
    def extract_features(self, packet):
        """Extract features from a single packet"""
        features = []
        
        # Basic packet info
        if scapy.IP in packet:
            ip = packet[scapy.IP]
            # Protocol (one-hot encoded)
            proto = 'other'
            if ip.proto == 6:
                proto = 'tcp'
            elif ip.proto == 17:
                proto = 'udp'
            elif ip.proto == 1:
                proto = 'icmp'
            
            proto_vec = [0, 0, 0]
            if proto in self.ip_proto_map:
                proto_vec[self.ip_proto_map[proto]] = 1
            features.extend(proto_vec)
            
            # Packet length
            features.append(float(len(packet)) / 1500.0)  # Normalize by typical MTU
            
            # IP header length
            features.append(float(ip.ihl) / 15.0)  # Normalize
            
            # TTL
            features.append(float(ip.ttl) / 255.0)  # Normalize
            
            # TCP/UDP specific features
            if proto == 'tcp' and scapy.TCP in packet:
                tcp = packet[scapy.TCP]
                features.append(1.0)  # TCP flag
                features.append(0.0)  # UDP flag
                features.append(float(tcp.sport) / 65535.0)  # Source port
                features.append(float(tcp.dport) / 65535.0)  # Destination port
                # TCP flags
                features.append(1.0 if tcp.flags & 0x02 else 0.0)  # SYN
                features.append(1.0 if tcp.flags & 0x10 else 0.0)  # ACK
                features.append(1.0 if tcp.flags & 0x01 else 0.0)  # FIN
                features.append(1.0 if tcp.flags & 0x04 else 0.0)  # RST
            elif proto == 'udp' and scapy.UDP in packet:
                udp = packet[scapy.UDP]
                features.append(0.0)  # TCP flag
                features.append(1.0)  # UDP flag
                features.append(float(udp.sport) / 65535.0)  # Source port
                features.append(float(udp.dport) / 65535.0)  # Destination port
                # No UDP flags, pad with zeros
                features.extend([0.0, 0.0, 0.0, 0.0])
            else:
                # Neither TCP nor UDP
                features.extend([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0])
        
        # If IP was not in packet, return empty feature vector
        if not features:
            features = [0.0] * 15  # Match feature dimension
        
        return np.array(features, dtype=np.float32)

class DeepPacketModel(nn.Module):
    def __init__(self, input_dim, hidden_dim, n_layers, dropout=0.2):
        super(DeepPacketModel, self).__init__()
        
        self.lstm = nn.LSTM(input_dim, hidden_dim, n_layers, 
                           batch_first=True, dropout=dropout if n_layers > 1 else 0)
        self.fc = nn.Linear(hidden_dim, 1)
        self.sigmoid = nn.Sigmoid()
        
    def forward(self, x):
        # x shape: (batch, seq_len, input_dim)
        lstm_out, _ = self.lstm(x)
        # Use last time step output for classification
        out = self.fc(lstm_out[:, -1, :])
        return self.sigmoid(out)
`
        }
      },
      {
        id: 'zero-trust-casb',
        title: 'Zero Trust CASB',
        icon: '🔐',
        description: 'Cloud Access Security Broker implementing zero-trust principles with JWT/OAuth 2.0 auth and DLP capabilities.',
        securityLevel: 4,
        tags: ['Cloud Security', 'Zero Trust', 'Access Control'],
        
        detail: {
          fullDescription: 'The Zero Trust CASB (Cloud Access Security Broker) is a security solution implementing zero-trust principles for cloud service access. It features JWT/OAuth 2.0 authentication, least-privilege access controls, and HTTPS traffic inspection through a reverse proxy architecture for SaaS, PaaS, and IaaS platforms.',
          features: [
            'JWT/OAuth 2.0 authentication',
            'Least-privilege access controls',
            'HTTPS traffic inspection via reverse proxy',
            'Data Loss Prevention (DLP) with content scanning',
            'AES-256 encryption for sensitive data',
            'Automated threat blocking via RESTful API integration',
            'Compliance monitoring for GDPR/NIST standards',
            'Real-time SIEM logging and anomaly detection'
          ],
          technologies: ['Node.js', 'Express', 'JWT', 'OAuth 2.0', 'AWS', 'GCP'],
          codePreview: `
// Zero Trust CASB - Authentication Module

const jwt = require('jsonwebtoken');
const oauth2 = require('oauth2-server');
const crypto = require('crypto');
const axios = require('axios');

class AuthenticationService {
  constructor(config) {
    this.config = config;
    this.oauth = new oauth2({
      model: require('./oauth-model'),
      accessTokenLifetime: 3600,
      refreshTokenLifetime: 1209600
    });
  }

  /**
   * Authenticate and authorize a request to access a cloud service
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async authenticate(req, res, next) {
    try {
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid token' });
      }
      
      const token = authHeader.split(' ')[1];
      
      // Verify JWT
      const decoded = jwt.verify(token, this.config.jwtSecret);
      
      // Check token expiration
      if (Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      // Get user permissions
      const userPermissions = await this.getUserPermissions(decoded.sub);
      
      // Check if user has permission to access the requested service
      const targetService = req.params.service;
      if (!this.hasAccess(userPermissions, targetService, req.method)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      
      // Add user and permissions to request object for downstream middleware
      req.user = {
        id: decoded.sub,
        email: decoded.email,
        permissions: userPermissions
      };
      
      // Log access attempt
      this.logAccessAttempt({
        userId: decoded.sub,
        service: targetService,
        action: req.method,
        timestamp: new Date(),
        successful: true,
        ipAddress: req.ip
      });
      
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(401).json({ error: 'Authentication failed' });
    }
  }

  /**
   * Check if user has permission to access the service with the specified method
   * @param {Array} permissions - User's permissions array
   * @param {String} service - Target cloud service
   * @param {String} method - HTTP method (GET, POST, etc.)
   * @returns {Boolean} - Whether user has access
   */
  hasAccess(permissions, service, method) {
    // Implement least-privilege access check
    for (const perm of permissions) {
      if (
        perm.service === service &&
        (perm.actions.includes('*') || perm.actions.includes(method))
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Fetch user permissions from database or identity provider
   * @param {String} userId - User ID
   * @returns {Array} - Array of permission objects
   */
  async getUserPermissions(userId) {
    // In a real implementation, this would fetch from a database
    // or make a call to an identity provider
    try {
      const response = await axios.get(
        \`\${this.config.permissionsApiUrl}/users/\${userId}/permissions\`
      );
      return response.data.permissions;
    } catch (error) {
      console.error('Error fetching user permissions:', error);
      return [];
    }
  }

  /**
   * Log access attempt to SIEM system
   * @param {Object} logEntry - Log entry details
   */
logAccessAttempt(logEntry) {
    // In a real implementation, this would send to a SIEM system
    console.log('Access attempt logged:', logEntry);
    
    // Example: Send to logging service
    try {
      axios.post(this.config.siemLogUrl, {
        type: 'access_attempt',
        data: logEntry
      });
    } catch (error) {
      console.error('Error logging to SIEM:', error);
    }
  }
}
`
        }
      }
    ];
    
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);
  
  // Filter projects based on selected tag
  const filterProjects = (filter) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
      );
      setFilteredProjects(filtered);
    }
  };
  
  // Handle project click
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
  // Get IDE files for selected project
  const getProjectFiles = (project) => {
    if (!project || !project.detail || !project.detail.codePreview) {
      return [];
    }
    
    const fileExtension = project.detail.technologies.includes('Python') ? 'py' 
      : project.detail.technologies.includes('Node.js') || project.detail.technologies.includes('JavaScript') ? 'js'
      : 'txt';
    
    return [
      {
        name: `${project.id}.${fileExtension}`,
        content: project.detail.codePreview
      }
    ];
  };
  
  return (
    <ProjectsContainer id="projects">
      <ContentWrapper>
        <SectionHeader>
          <Title>Security Projects</Title>
          <Description>
            Explore my cybersecurity-focused projects showcasing expertise in AI-driven vulnerability detection, 
            network security analysis, and secure system design.
          </Description>
        </SectionHeader>
        
        <FilterContainer>
          <FilterButton 
            active={activeFilter === 'all'} 
            onClick={() => filterProjects('all')}
          >
            All Projects
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'ai'} 
            onClick={() => filterProjects('ai')}
          >
            AI & ML
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'network'} 
            onClick={() => filterProjects('network')}
          >
            Network Security
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'static'} 
            onClick={() => filterProjects('static')}
          >
            Static Analysis
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'cloud'} 
            onClick={() => filterProjects('cloud')}
          >
            Cloud Security
          </FilterButton>
        </FilterContainer>
        
        <ProjectGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              onClick={() => handleProjectClick(project)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectHeader>
                <ProjectTitle>
                  <ProjectIcon>{project.icon}</ProjectIcon>
                  {project.title}
                </ProjectTitle>
                <SecurityLevel>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SecurityDot key={i} active={i < project.securityLevel} />
                  ))}
                </SecurityLevel>
              </ProjectHeader>
              <ProjectContent>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TagContainer>
                  {project.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagContainer>


                {project.links?.github && (
                  <ProjectLinks>
                    <ProjectLink
                      to={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>GitHub</span>
                    </ProjectLink>
                  </ProjectLinks>
                )}
              </ProjectContent>
              <ProjectCardOverlay className="project-card-overlay">
                <DetailsButton>View Details</DetailsButton>
              </ProjectCardOverlay>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </ContentWrapper>
      
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>
                  <ProjectIcon>{selectedProject.icon}</ProjectIcon>
                  {selectedProject.title}
                </ModalTitle>
                <ModalClose onClick={closeModal}>✕</ModalClose>
              </ModalHeader>
              <ModalBody>
                <ModalSection>
                  <ModalDescription>
                    {selectedProject.detail.fullDescription}
                  </ModalDescription>
                </ModalSection>
                
                <ModalSection>
                  <ModalSectionTitle>Features</ModalSectionTitle>
                  <FeatureList>
                    {selectedProject.detail.features.map((feature, index) => (
                      <FeatureItem key={index}>{feature}</FeatureItem>
                    ))}
                  </FeatureList>
                </ModalSection>
                
                <ModalSection>
                  <ModalSectionTitle>Technologies</ModalSectionTitle>
                  <TechList>
                    {selectedProject.detail.technologies.map((tech, index) => (
                      <TechItem key={index}>{tech}</TechItem>
                    ))}
                  </TechList>
                </ModalSection>
                
                <ModalSection>
                  <ModalSectionTitle>Code Preview</ModalSectionTitle>
                  <ProjectPreview>
                    <IDE
                      files={getProjectFiles(selectedProject)}
                      height="400px"
                    />
                  </ProjectPreview>
                </ModalSection>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects;