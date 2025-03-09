import React, { useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: 100px 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 60px;
    height: 3px;
    background-color: ${props => props.theme.colors.border};
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const BioText = styled.p`
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Highlight = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
`;

const SkillCategory = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  color: ${props => props.theme.colors.textSecondary};
  
  &::before {
    content: '>';
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.mono};
  }
`;

const AboutPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>About Me</Title>
        
        <Section>
          <BioText>
            I'm <Highlight>Amelia Alfonso</Highlight>, a cybersecurity-focused CS graduate specializing in AI-driven vulnerability detection, secure system design, and full-stack development. With a strong foundation in both offensive and defensive security principles, I build applications that are not just functional, but inherently secure and resilient against modern threats.
          </BioText>
          
          <BioText>
            My passion lies at the intersection of artificial intelligence and cybersecurity, where I develop innovative tools like <Highlight>VulnCrypt</Highlight>, an AI-powered static analysis tool that uses custom LSTM-based RNN models to detect vulnerabilities in source code with high accuracy.
          </BioText>
          
          <BioText>
            Currently, I work as a <Highlight>Software Engineer with a security focus</Highlight> at Boston University, where I've engineered secure employee records systems, implemented zero-breach security through encryption and role-based access control, and modernized legacy systems using containerization.
          </BioText>
          
          <BioText>
            I believe that security should be woven into the fabric of software development, not bolted on as an afterthought. This philosophy guides my approach whether I'm developing AI security tools, hardening enterprise applications, or optimizing system performance.
          </BioText>
        </Section>
        
        <Section>
          <SectionTitle>Education</SectionTitle>
          <BioText>
            <strong>Boston University</strong> - B.S. in Computer Science
          </BioText>
          <BioText>
            My coursework focused on Network Security, Cryptography, Secure Software Design, and Cloud Computing. Beyond academics, I served as Secretary of the BU Cybersecurity Club and helped organize Boston Hacks, experiences that enhanced my technical skills and leadership abilities.
          </BioText>
        </Section>
        
        <Section>
          <SectionTitle>Technical Skills</SectionTitle>
          <SkillsContainer>
            <SkillCategory>
              <CategoryTitle>Languages</CategoryTitle>
              <SkillsList>
                <SkillItem>Python</SkillItem>
                <SkillItem>JavaScript</SkillItem>
                <SkillItem>C</SkillItem>
                <SkillItem>SQL</SkillItem>
                <SkillItem>HTML/CSS</SkillItem>
              </SkillsList>
            </SkillCategory>
            
            <SkillCategory>
              <CategoryTitle>Cybersecurity</CategoryTitle>
              <SkillsList>
                <SkillItem>Static Analysis</SkillItem>
                <SkillItem>JWT/RBAC Implementation</SkillItem>
                <SkillItem>Encryption (AES-256)</SkillItem>
                <SkillItem>Wireshark/Nmap</SkillItem>
                <SkillItem>OWASP Top 10</SkillItem>
              </SkillsList>
            </SkillCategory>
            
            <SkillCategory>
              <CategoryTitle>Frameworks & Tools</CategoryTitle>
              <SkillsList>
                <SkillItem>React</SkillItem>
                <SkillItem>Node.js</SkillItem>
                <SkillItem>Express.js</SkillItem>
                <SkillItem>PyTorch</SkillItem>
                <SkillItem>scikit-learn</SkillItem>
                <SkillItem>MongoDB</SkillItem>
                <SkillItem>Docker</SkillItem>
                <SkillItem>Git</SkillItem>
              </SkillsList>
            </SkillCategory>
            
            <SkillCategory>
              <CategoryTitle>AI & Machine Learning</CategoryTitle>
              <SkillsList>
                <SkillItem>LSTM/RNN Models</SkillItem>
                <SkillItem>Tokenization & Sequence Processing</SkillItem>
                <SkillItem>Supervised Learning</SkillItem>
                <SkillItem>Feature Engineering</SkillItem>
                <SkillItem>Anomaly Detection</SkillItem>
              </SkillsList>
            </SkillCategory>
          </SkillsContainer>
        </Section>
        
        <Section>
          <SectionTitle>Areas of Expertise</SectionTitle>
          <BioText>
            <Highlight>AI-Driven Security Tools:</Highlight> Developing machine learning models for vulnerability detection, including LSTM-based systems that can identify buffer overflows, SQL injection, and other common vulnerabilities in source code.
          </BioText>
          <BioText>
            <Highlight>Secure System Design:</Highlight> Architecting systems with security as a first-class concern, implementing zero-trust principles, encryption, and fine-grained access controls.
          </BioText>
          <BioText>
            <Highlight>Full-Stack Development:</Highlight> Building end-to-end web applications with an emphasis on security best practices, from frontend to backend to infrastructure.
          </BioText>
          <BioText>
            <Highlight>Network Security Analysis:</Highlight> Using tools like Wireshark and Nmap to analyze traffic patterns, identify potential threats, and implement mitigation strategies.
          </BioText>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AboutPage;