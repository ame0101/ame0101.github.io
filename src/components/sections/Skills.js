import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Terminal from '../layout/Terminal';
import TypewriterText from '../ui/TypewriterText';

const SkillsContainer = styled.section`
  padding: 8rem 0;
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

const SkillsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const TerminalWrapper = styled.div`
  height: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const SkillsVisual = styled(motion.div)`
  height: 500px;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const VisualHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
`;

const VisualTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const SkillCategories = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  background-color: ${props => props.active ? props.theme.colors.accent : 'transparent'};
  color: ${props => props.active ? props.theme.colors.background : props.theme.colors.text};
  border: ${props => props.theme.borders.thin} ${props => props.active ? props.theme.colors.accent : props.theme.colors.border};
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  padding-bottom: 1rem;
  overflow-y: auto;
  max-height: 360px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.border};
    border-radius: 3px;
  }
`;

const SkillItem = styled(motion.div)`
  background-color: ${props => props.theme.colors.background};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border-color: ${props => props.theme.colors.accent};
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.8rem;
`;

const SkillLevel = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  height: 4px;
  background-color: ${props => props.theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => `${props.level * 20}%`};
    background-color: ${props => props.theme.colors.accent};
    border-radius: 2px;
  }
`;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Terminal commands for skills display
  const initialCommands = [
    'skills'
  ];
  
  // Skill data
  const skillCategories = [
    { id: 'all', label: 'All Skills' },
    { id: 'security', label: 'Security' },
    { id: 'development', label: 'Development' },
    { id: 'tools', label: 'Tools & Platforms' },
    { id: 'certifications', label: 'Certifications' }
  ];
  
  const skills = [
    // Security skills
    { name: 'Penetration Testing', icon: '🛡️', category: 'security', level: 5 },
    { name: 'Network Security', icon: '🔌', category: 'security', level: 5 },
    { name: 'Web Security', icon: '🔒', category: 'security', level: 4 },
    { name: 'Cryptography', icon: '🔐', category: 'security', level: 4 },
    { name: 'Vulnerability Assessment', icon: '🔍', category: 'security', level: 5 },
    { name: 'Security Architecture', icon: '🏗️', category: 'security', level: 4 },
    { name: 'Secure Coding', icon: '👨‍💻', category: 'security', level: 5 },
    { name: 'Threat Modeling', icon: '⚠️', category: 'security', level: 4 },
    { name: 'Incident Response', icon: '🚨', category: 'security', level: 3 },
    { name: 'Malware Analysis', icon: '🦠', category: 'security', level: 3 },
    
    // Development skills
    { name: 'JavaScript', icon: '📜', category: 'development', level: 5 },
    { name: 'Python', icon: '🐍', category: 'development', level: 4 },
    { name: 'React', icon: '⚛️', category: 'development', level: 5 },
    { name: 'Node.js', icon: '🟢', category: 'development', level: 4 },
    { name: 'C/C++', icon: '©️', category: 'development', level: 3 },
    { name: 'Rust', icon: '🦀', category: 'development', level: 3 },
    { name: 'TypeScript', icon: '📘', category: 'development', level: 4 },
    { name: 'Bash/Shell', icon: '📟', category: 'development', level: 4 },
    { name: 'SQL', icon: '🗄️', category: 'development', level: 4 },
    { name: 'GraphQL', icon: '📊', category: 'development', level: 3 },
    
    // Tools & platforms
    { name: 'Wireshark', icon: '🦈', category: 'tools', level: 5 },
    { name: 'Metasploit', icon: '🔫', category: 'tools', level: 4 },
    { name: 'Burp Suite', icon: '🐞', category: 'tools', level: 5 },
    { name: 'Nmap', icon: '🔭', category: 'tools', level: 5 },
    { name: 'Docker', icon: '🐳', category: 'tools', level: 4 },
    { name: 'Kubernetes', icon: '☸️', category: 'tools', level: 3 },
    { name: 'AWS', icon: '☁️', category: 'tools', level: 4 },
    { name: 'Linux', icon: '🐧', category: 'tools', level: 5 },
    { name: 'Git', icon: '📊', category: 'tools', level: 5 },
    { name: 'OWASP ZAP', icon: '🕸️', category: 'tools', level: 4 },
    
    // Certifications
    { name: 'OSCP', icon: '🎓', category: 'certifications', level: 5 },
    { name: 'CEH', icon: '🎓', category: 'certifications', level: 5 },
    { name: 'CISSP', icon: '🎓', category: 'certifications', level: 4 },
    { name: 'CompTIA Security+', icon: '🎓', category: 'certifications', level: 5 },
    { name: 'AWS Security', icon: '🎓', category: 'certifications', level: 4 }
  ];
  
  // Filter skills based on selected category
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  
  return (
    <SkillsContainer id="skills">
      <ContentWrapper>
        <SectionHeader>
          <Title>Technical Skills</Title>
          <Description>
            Specialized in cybersecurity and secure software development with expertise 
            across various domains, tools, and technologies.
          </Description>
        </SectionHeader>
        
        <SkillsLayout>
          <TerminalWrapper>
            <Terminal
              initialCommands={initialCommands}
              autoExecuteDelay={800}
              allowInput={true}
            />
          </TerminalWrapper>
          
          <SkillsVisual
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <VisualHeader>
              <VisualTitle>
                <TypewriterText 
                  text="Skill Assessment" 
                  delay={50}
                  startDelay={300}
                />
              </VisualTitle>
            </VisualHeader>
            
            <SkillCategories>
              {skillCategories.map(category => (
                <CategoryButton
                  key={category.id}
                  active={activeCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                </CategoryButton>
              ))}
            </SkillCategories>
            
            <SkillsGrid>
              {filteredSkills.map((skill, index) => (
                <SkillItem
                  key={`${skill.category}-${skill.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SkillIcon>{skill.icon}</SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel level={skill.level} />
                </SkillItem>
              ))}
            </SkillsGrid>
          </SkillsVisual>
        </SkillsLayout>
      </ContentWrapper>
    </SkillsContainer>
  );
};

export default Skills;