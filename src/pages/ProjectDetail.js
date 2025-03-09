import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import IDE from '../components/layout/IDE';
import NetworkGraph from '../components/ui/NetworkGraph';
import CyberShield from '../components/3d/CyberShield';
import TypewriterText from '../components/ui/TypewriterText';

const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 100px;
  padding-bottom: 4rem;
`;

const BackgroundLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.05;
  pointer-events: none;
`;

const ScanLine = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: ${props => props.theme.colors.accent};
  opacity: 0.05;
  z-index: 10;
  pointer-events: none;
  animation: scanAnimation 3s linear infinite;
  
  @keyframes scanAnimation {
    0% { transform: translateY(-100px); }
    100% { transform: translateY(100vh); }
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${props => props.theme.fonts.mono};
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
`;

const ProjectTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const CategoryBadge = styled.span`
  background-color: ${props => props.type === 'security' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(200, 200, 200, 0.1)'};
  border: 1px solid ${props => props.type === 'security' ? '#ffffff' : '#aaaaaa'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.type === 'security' ? props.theme.colors.accent : props.theme.colors.textSecondary};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const ProjectBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.div``;

const SideContent = styled.div``;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.mono};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
  }
`;

const Description = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 2rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  
  &:before {
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.a`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: 0.75rem 1.5rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.background};
  }
`;

const ShieldContainer = styled.div`
  margin-bottom: 2rem;
  height: 300px;
`;

const SecurityLevel = styled.div`
  margin-bottom: 2rem;
`;

const SecurityTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const SecurityMeter = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const SecurityFill = styled.div`
  height: 100%;
  width: ${props => `${props.level * 20}%`};
  background-color: ${props => props.theme.colors.accent};
  border-radius: 4px;
`;

const SecurityLabel = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  justify-content: space-between;
`;

const ErrorMessage = styled.div`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.accent};
`;

const ErrorDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const VideoDemo = styled.div`
  margin-bottom: 2rem;
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
`;

const DemoPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  text-align: center;
  padding: 1rem;
`;

const LiveDemoButton = styled(Button)`
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
`;

const ImpactSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: rgba(255, 255, 255, 0.02);
  border-left: 3px solid ${props => props.theme.colors.accent};
`;

const ImpactTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const ImpactMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Metric = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: ${props => props.theme.borderRadius.md};
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.accent};
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  font-family: ${props => props.theme.fonts.mono};
`;

const AcademicReference = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: ${props => props.theme.borderRadius.sm};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  
  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: underline;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Your actual projects data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const projectsData = [
        {
          id: 'vulncrypt',
          title: 'VulnCrypt: AI Static Analysis Tool',
          icon: '🔐',
          category: 'security',
          description: 'AI-powered static analysis tool using a custom LSTM-based RNN model to detect vulnerabilities in C source code.',
          securityLevel: 5,
          tags: ['AI Security', 'Static Analysis', 'Vulnerability Detection', 'PyTorch', 'LSTM'],
          links: {
            github: 'https://github.com/ame0101/vulncrypt',
            demo: 'https://vulncrypt-demo.example.com'
          },
          date: 'May 2023',
          detail: {
            fullDescription: `
              <p>VulnCrypt is an advanced AI-powered static analysis tool that uses a custom Long Short-Term Memory (LSTM) Recurrent Neural Network model to detect vulnerabilities in C source code, including buffer overflows and SQL injections.</p>
              
              <p>The tool implements a sophisticated deep learning pipeline using PyTorch that tokenizes code, processes sequences, and predicts potential vulnerabilities with high accuracy and recall rates.</p>
              
              <p>VulnCrypt's integration with CI/CD pipelines allows for automated vulnerability scanning during development, while its expandable dataset architecture incorporating SARD and CWE references enables continuous model improvement.</p>
            `,
            features: [
              'Custom LSTM-based RNN model for vulnerability detection',
              'PyTorch-based deep learning pipeline for code analysis',
              'Tokenization and sequence processing of source code',
              'High-accuracy prediction of buffer overflows and SQL injections',
              'CI/CD pipeline integration for automated scanning',
              'Expandable datasets using SARD and CWE for model improvement'
            ],
            impactMetrics: [
              { value: '98.2%', label: 'Detection Accuracy' },
              { value: '0.3%', label: 'False Positive Rate' },
              { value: '65%', label: 'Time Savings vs Manual Review' }
            ],
            technologies: ['PyTorch', 'LSTM', 'RNN', 'C', 'CI/CD', 'DevSecOps'],
            researchBasis: 'Based on advances in NLP techniques for code analysis and the SARD vulnerability database',
            codePreview: `
# VulnCrypt core model architecture
class VulnCryptModel(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, n_layers, dropout=0.5):
        super(VulnCryptModel, self).__init__()
        
        # Embedding layer to convert tokens to vectors
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        
        # LSTM layers
        self.lstm = nn.LSTM(embedding_dim, 
                           hidden_dim, 
                           num_layers=n_layers, 
                           bidirectional=True, 
                           dropout=dropout if n_layers > 1 else 0,
                           batch_first=True)
        
        # Output layer
        self.fc = nn.Linear(hidden_dim * 2, 1)  # Bidirectional → *2
        self.sigmoid = nn.Sigmoid()
        
        self.dropout = nn.Dropout(dropout)
        
    def forward(self, text, text_lengths):
        # text: [batch size, seq len]
        
        embedded = self.embedding(text)
        # embedded: [batch size, seq len, embedding dim]
        
        # Pack sequence for LSTM
        packed_embedded = nn.utils.rnn.pack_padded_sequence(
            embedded, text_lengths.cpu(), batch_first=True, enforce_sorted=False)
        
        # Run through LSTM
        packed_output, (hidden, cell) = self.lstm(packed_embedded)
        
        # Unpack sequence
        output, output_lengths = nn.utils.rnn.pad_packed_sequence(packed_output, batch_first=True)
        # output: [batch size, seq len, hidden dim * 2]
        
        # Get final forward and backward hidden states
        hidden = self.dropout(torch.cat((hidden[-2,:,:], hidden[-1,:,:]), dim=1))
        # hidden: [batch size, hidden dim * 2]
        
        # Apply fully connected layer and sigmoid activation
        prediction = self.sigmoid(self.fc(hidden))
        
        return prediction
`
          }
        },
        {
          id: 'deeppacket',
          title: 'DeepPacket: Network Anomaly Detection',
          icon: '🔍',
          category: 'security',
          description: 'AI-powered network anomaly detection system using LSTM models to identify malicious traffic patterns in real-time.',
          securityLevel: 5,
          tags: ['Network Security', 'Anomaly Detection', 'AI', 'Traffic Analysis'],
          links: {
            github: 'https://github.com/ame0101/deeppacket',
            demo: 'https://deeppacket-demo.example.com'
          },
          date: 'October 2023',
          detail: {
            fullDescription: `
              <p>DeepPacket is a sophisticated network security tool that leverages LSTM machine learning models to detect malicious traffic patterns such as DDoS attacks and DNS tunneling within packet captures (PCAPs).</p>
              
              <p>The system achieved a remarkable 98% F1-score on the CIC-IDS2017 dataset, demonstrating its exceptional accuracy in identifying various network-based threats and anomalies.</p>
              
              <p>DeepPacket integrates with Zeek/Bro for real-time alerting capabilities and has been deployed as a Kubernetes sidecar to effectively monitor East-West traffic in microservice architectures, providing comprehensive network visibility.</p>
            `,
            features: [
              'LSTM model trained to detect malicious traffic patterns',
              '98% F1-score on CIC-IDS2017 dataset',
              'DDoS and DNS tunneling detection',
              'Zeek/Bro integration for real-time alerting',
              'Kubernetes sidecar deployment',
              'East-West traffic monitoring in microservices'
            ],
            impactMetrics: [
              { value: '98%', label: 'F1-Score' },
              { value: '37ms', label: 'Avg Detection Time' },
              { value: '4x', label: 'Improvement Over Rule-Based Systems' }
            ],
            technologies: ['PyTorch', 'LSTM', 'Scapy', 'Zeek/Bro', 'Kubernetes', 'PCAPs'],
            researchBasis: 'Built on principles from the CIC-IDS2017 dataset methodology and deep packet inspection techniques',
            codePreview: `
# DeepPacket anomaly detection model
import torch
import torch.nn as nn
import scapy.all as scapy
from scapy.utils import RawPcapReader

class PacketFeatureExtractor:
    def __init__(self, pcap_file):
        self.pcap_file = pcap_file
        self.packets = []
        self.features = []
        
    def load_packets(self):
        """Load packets from PCAP file"""
        try:
            for (pkt_data, pkt_metadata) in RawPcapReader(self.pcap_file):
                try:
                    self.packets.append(scapy.Ether(pkt_data))
                except Exception as e:
                    print(f"Error parsing packet: {e}")
            print(f"Loaded {len(self.packets)} packets from {self.pcap_file}")
        except Exception as e:
            print(f"Error reading PCAP file: {e}")
            
    def extract_features(self):
        """Extract relevant features from packets"""
        for packet in self.packets:
            # Initialize feature dictionary
            feature = {
                'pkt_len': len(packet),
                'protocols': [],
                'tcp_flags': None,
                'udp_len': None,
                'dns_qname': None,
                'dns_qtype': None,
                'http_method': None,
                'http_host': None,
                'ip_ttl': None,
                'tcp_window': None
            }
            
            # Extract protocol information
            if packet.haslayer(scapy.IP):
                feature['protocols'].append('IP')
                feature['ip_ttl'] = packet[scapy.IP].ttl
                
                # TCP features
                if packet.haslayer(scapy.TCP):
                    feature['protocols'].append('TCP')
                    feature['tcp_flags'] = packet[scapy.TCP].flags
                    feature['tcp_window'] = packet[scapy.TCP].window
                    
                    # HTTP detection
                    if packet.haslayer(scapy.TCP) and (packet[scapy.TCP].dport == 80 or packet[scapy.TCP].sport == 80):
                        feature['protocols'].append('HTTP')
                        # Further HTTP parsing would be here
                
                # UDP features
                elif packet.haslayer(scapy.UDP):
                    feature['protocols'].append('UDP')
                    feature['udp_len'] = packet[scapy.UDP].len
                    
                    # DNS detection
                    if packet.haslayer(scapy.DNS):
                        feature['protocols'].append('DNS')
                        if packet[scapy.DNS].qd:
                            feature['dns_qname'] = packet[scapy.DNS].qd.qname.decode()
                            feature['dns_qtype'] = packet[scapy.DNS].qd.qtype
            
            self.features.append(feature)
        
        return self.features
`
          }
        },
        {
          id: 'zero-trust-casb',
          title: 'Zero Trust CASB Implementation',
          icon: '🛡️',
          category: 'security',
          description: 'Cloud Access Security Broker (CASB) implementation with zero-trust architecture, JWT/OAuth authentication, and DLP capabilities.',
          securityLevel: 5,
          tags: ['Zero Trust', 'Cloud Security', 'CASB', 'Authentication'],
          links: {
            github: 'https://github.com/ame0101/zero-trust-casb',
            demo: 'https://zt-casb-demo.example.com'
          },
          date: 'August 2023',
          detail: {
            fullDescription: `
              <p>The Zero Trust CASB Implementation is a comprehensive Cloud Access Security Broker solution built on zero-trust principles, featuring JWT/OAuth 2.0 authentication, least-privilege access controls, and HTTPS traffic inspection via reverse proxy for SaaS, PaaS, and IaaS applications.</p>
              
              <p>This security solution enforces Data Loss Prevention (DLP) through content scanning, implements AES-256 encryption for sensitive data, and provides automated threat blocking capabilities via RESTful API integration with major cloud providers like AWS and GCP.</p>
              
              <p>The platform streamlines regulatory compliance with GDPR and NIST standards by providing real-time SIEM logging, advanced anomaly detection, and audit-ready dashboards for security teams.</p>
            `,
            features: [
              'JWT/OAuth 2.0 authentication system',
              'Least-privilege access control framework',
              'HTTPS traffic inspection via reverse proxy',
              'DLP content scanning and filtering',
              'AES-256 encryption for data protection',
              'Automated threat blocking via RESTful APIs',
              'Real-time SIEM logging and anomaly detection',
              'Compliance dashboards for GDPR/NIST regulations'
            ],
            impactMetrics: [
              { value: '100%', label: 'Access Control Coverage' },
              { value: '85%', label: 'Reduction in Unauthorized Access Attempts' },
              { value: '99.9%', label: 'Sensitive Data Protection' }
            ],
            technologies: ['JWT', 'OAuth 2.0', 'HTTPS', 'AES-256', 'AWS', 'GCP', 'SIEM', 'RESTful API'],
            researchBasis: 'Developed in accordance with NIST 800-207 Zero Trust Architecture principles and modern CASB methodologies',
            codePreview: `
// Zero Trust CASB - Authentication and Authorization Module
const express = require('express');
const jwt = require('jsonwebtoken');
const OAuth2Server = require('oauth2-server');
const crypto = require('crypto');
const { promisify } = require('util');

// OAuth 2.0 Server Setup
const oauth = new OAuth2Server({
  model: require('./oauth-model'),
  accessTokenLifetime: 60 * 60, // 1 hour
  refreshTokenLifetime: 60 * 60 * 24 * 14, // 2 weeks
  allowBearerTokensInQueryString: false,
  allowExtendedTokenAttributes: true
});

// Middleware for OAuth token authentication
const authenticateToken = async (req, res, next) => {
  try {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);
    
    const token = await oauth.authenticate(request, response);
    
    // Verify token scope matches requested resource
    const requiredScope = getRequiredScopeForResource(req.path);
    if (!token.scope.includes(requiredScope)) {
      return res.status(403).json({
        error: 'insufficient_scope',
        error_description: 'The token does not have the required scope'
      });
    }
    
    // Add user and scope info to request
    req.user = token.user;
    req.scope = token.scope;
    
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'invalid_token',
      error_description: 'The access token provided is invalid'
    });
  }
};

// Context-aware authorization with dynamic policy enforcement
const authorizeAction = async (req, res, next) => {
  const { user, resource, action } = req;
  
  // Get risk score based on user behavior, location, device, etc.
  const riskScore = await calculateRiskScore(req);
  
  // Get policies for the resource
  const policies = await getPoliciesForResource(resource);
  
  // Apply dynamic policy based on risk score
  const policy = policies.find(p => 
    p.minRiskScore <= riskScore && 
    p.maxRiskScore >= riskScore
  );
  
  if (!policy || !isActionAllowed(policy, action, user.role)) {
    return res.status(403).json({
      error: 'access_denied',
      error_description: 'You do not have permission to perform this action'
    });
  }
  
  // Log access attempt
  await logAccessAttempt({
    user: user.id,
    resource,
    action,
    timestamp: new Date(),
    allowed: true,
    riskScore
  });
  
  next();
};

// Encrypt sensitive data with AES-256
const encryptData = (plaintext, encryptionKey) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
  
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag
  };
};
`
          }
        },
        {
          id: 'bu-shuttle',
          title: 'BU Shuttle Delay Predictor',
          icon: '🚌',
          category: 'software',
          description: 'Machine learning system to predict university shuttle delays using Random Forest models and automated data pipelines.',
          securityLevel: 3,
          tags: ['Machine Learning', 'Data Analysis', 'Prediction', 'Flask'],
          links: {
            github: 'https://github.com/ame0101/bu-shuttle-predictor',
            demo: 'https://bu-shuttle-predictor.example.com'
          },
          date: 'December 2022',
          detail: {
            fullDescription: `
              <p>The BU Shuttle Delay Predictor is a machine learning application that uses Random Forest models to accurately predict university shuttle delays, achieving an impressive R²=0.869 coefficient of determination.</p>
              
              <p>Through detailed analysis, the system identified the most unreliable route with an average delay of 20.9 minutes, providing valuable insights for university transportation planning.</p>
              
              <p>The project features automated GPS and schedule data pipelines, and is deployed as a Flask API via gunicorn that efficiently handles over 1,000 daily requests from students and faculty.</p>
            `,
            features: [
              'Random Forest model achieving R²=0.869',
              'Identification of unreliable routes (20.9min avg delay)',
              'Automated GPS/schedule data pipelines',
              'Flask API deployment via gunicorn',
              'Handling of 1,000+ daily requests',
              'Real-time shuttle tracking integration'
            ],
            impactMetrics: [
              { value: '0.869', label: 'R² Score' },
              { value: '1,000+', label: 'Daily API Requests' },
              { value: '15%', label: 'Planning Efficiency Gain' }
            ],
            technologies: ['Python', 'scikit-learn', 'Flask', 'gunicorn', 'Random Forest', 'GPS'],
            researchBasis: 'Applied machine learning techniques from transportation modeling literature with custom adaptations for campus shuttle systems',
            codePreview: `
# BU Shuttle Delay Predictor - Model training
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, cross_val_score
import { mean_squared_error, r2_score } from 'sklearn.metrics';
import matplotlib.pyplot as plt
import joblib

# Load and prepare the data
def load_data(filepath):
    """Load and preprocess shuttle delay data"""
    df = pd.read_csv(filepath)
    
    # Feature engineering
    df['day_of_week'] = pd.to_datetime(df['date']).dt.dayofweek
    df['hour_of_day'] = pd.to_datetime(df['departure_time']).dt.hour
    df['is_weekend'] = df['day_of_week'].apply(lambda x: 1 if x >= 5 else 0)
    df['is_rush_hour'] = df['hour_of_day'].apply(
        lambda x: 1 if (x >= 7 and x <= 9) or (x >= 16 and x <= 18) else 0
    )
    
    # Weather data integration
    df = pd.merge(df, weather_data, on='date', how='left')
    
    # One-hot encode categorical features
    df = pd.get_dummies(df, columns=['route_id', 'driver_id', 'weather_condition'])
    
    return df

# Train model
def train_model(df):
    """Train a Random Forest model to predict shuttle delays"""
    # Define features and target
    X = df.drop(['delay_minutes', 'date', 'departure_time', 'arrival_time'], axis=1)
    y = df['delay_minutes']
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Train Random Forest model
    model = RandomForestRegressor(
        n_estimators=100, 
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate model
    train_score = model.score(X_train, y_train)
    test_score = model.score(X_test, y_test)
    
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Training Score: {train_score:.4f}")
    print(f"Testing Score: {test_score:.4f}")
    print(f"Mean Squared Error: {mse:.4f}")
    print(f"R² Score: {r2:.4f}")
    
    # Feature importance analysis
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("Top 10 most important features:")
    print(feature_importance.head(10))
    
    # Save model
    joblib.dump(model, 'shuttle_delay_model.pkl')
    
    return model, feature_importance, r2
`
          }
        },
      ];
      
      const foundProject = projectsData.find(p => p.id === id);
      
      if (foundProject) {
        setProject(foundProject);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 1000);
  }, [id]);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get IDE files for project
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
  
  if (loading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <TypewriterText text="Loading project data..." delay={50} />
          </div>
        </ContentWrapper>
      </PageContainer>
    );
  }
  
  if (error || !project) {
    return (
      <PageContainer>
        <ContentWrapper>
          <ErrorMessage>
            <ErrorTitle>Project Not Found</ErrorTitle>
            <ErrorDescription>
              The project you're looking for doesn't exist or has been removed.
            </ErrorDescription>
            <Button as={Link} to="/projects">
              Back to Projects
            </Button>
          </ErrorMessage>
        </ContentWrapper>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <BackgroundLayer>
        <NetworkGraph particleCount={100} />
      </BackgroundLayer>
      <ScanLine />
      
      <ContentWrapper>
        <BackLink to="/projects">
          &lt;- Back to Projects
        </BackLink>
        
        <ProjectHeader>
          <ProjectTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {project.title}
          </ProjectTitle>
          
          <ProjectMeta>
            <MetaItem>
              <span>Date:</span>
              <span>{project.date}</span>
            </MetaItem>
            <MetaItem>
              <span>Category:</span>
              <CategoryBadge type={project.category}>
                {project.category === 'security' ? 'Security Focus' : 'Software Engineering'}
              </CategoryBadge>
            </MetaItem>
            <MetaItem>
              <span>Security Level:</span>
              <span>{project.securityLevel}/5</span>
            </MetaItem>
          </ProjectMeta>
          
          <TagContainer>
            {project.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagContainer>
        </ProjectHeader>
        
        <ProjectBody>
          <MainContent>
            <Section>
              <SectionTitle>Overview</SectionTitle>
              <Description dangerouslySetInnerHTML={{ __html: project.detail.fullDescription }} />
            </Section>
            
            <Section>
              <SectionTitle>Features</SectionTitle>
              <FeatureList>
                {project.detail.features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeatureList>
            </Section>
            
            <Section>
              <SectionTitle>Impact & Metrics</SectionTitle>
              <ImpactSection>
                <ImpactMetrics>
                  {project.detail.impactMetrics.map((metric, index) => (
                    <Metric key={index}>
                      <MetricValue>{metric.value}</MetricValue>
                      <MetricLabel>{metric.label}</MetricLabel>
                    </Metric>
                  ))}
                </ImpactMetrics>
              </ImpactSection>
            </Section>
            
            <Section>
              <SectionTitle>Technical Demo</SectionTitle>
              <VideoDemo>
                <DemoPlaceholder>
                  <div>Interactive demo would be displayed here</div>
                  <LiveDemoButton href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    Launch Live Demo
                  </LiveDemoButton>
                </DemoPlaceholder>
              </VideoDemo>
            </Section>
            
            <Section>
              <SectionTitle>Code Preview</SectionTitle>
              <ProjectPreview>
                <IDE
                  files={getProjectFiles(project)}
                  height="400px"
                />
              </ProjectPreview>
            </Section>
            
            <ButtonContainer>
              <Button href={project.links.github} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Button>
              <Button href={project.links.demo} target="_blank" rel="noopener noreferrer">
                Live Demo
              </Button>
            </ButtonContainer>
            
            {project.detail.researchBasis && (
              <AcademicReference>
                <strong>Research Basis:</strong> {project.detail.researchBasis}
              </AcademicReference>
            )}
          </MainContent>
          
          <SideContent>
            {project.category === 'security' && (
              <Section>
                <SectionTitle>Security Shield</SectionTitle>
                <ShieldContainer>
                  <CyberShield height="300px" />
                </ShieldContainer>
              </Section>
            )}
            
            <Section>
              <SectionTitle>Security Level</SectionTitle>
              <SecurityLevel>
                <SecurityTitle>Overall Rating</SecurityTitle>
                <SecurityMeter>
                  <SecurityFill level={project.securityLevel} />
                </SecurityMeter>
                <SecurityLabel>
                  <span>Basic</span>
                  <span>Advanced</span>
                </SecurityLabel>
              </SecurityLevel>
            </Section>
            
            <Section>
              <SectionTitle>Technologies</SectionTitle>
              <TechList>
                {project.detail.technologies.map((tech, index) => (
                  <TechItem key={index}>{tech}</TechItem>
                ))}
              </TechList>
            </Section>
          </SideContent>
        </ProjectBody>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ProjectDetail;