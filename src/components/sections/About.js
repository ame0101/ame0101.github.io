import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import IDE from '../layout/IDE';
import TypewriterText from '../ui/TypewriterText';

const AboutContainer = styled.section`
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

const AboutLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AboutContent = styled(motion.div)`
  position: relative;
`;

const BioContainer = styled.div`
  margin-bottom: 2rem;
`;

const BioText = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const Highlight = styled.span`
  color: ${props => props.theme.colors.accent};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const ExperienceTimeline = styled.div`
  position: relative;
  padding-left: 2rem;
  margin-top: 3rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: ${props => props.theme.colors.border};
  }
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding-bottom: 2rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: -2rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

const JobTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CompanyName = styled.span`
  margin-right: 1rem;
`;

const JobPeriod = styled.span`
  padding: 0.2rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
`;

const JobDescription = styled.p`
  margin-bottom: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
`;

const JobResponsibilities = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Responsibility = styled.li`
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

const IDEWrapper = styled(motion.div)`
  height: 600px;
  width: 100%;
`;

const TabNavigation = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.textSecondary};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.active ? props.theme.colors.accent : 'transparent'};
    transition: background-color 0.3s;
  }
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

// Experience data for the timeline
const experience = [
  {
    title: "Software Engineer (Security Focus)",
    company: "Boston University",
    period: "Jun 2023 - Present",
    description: "Security-focused software engineer working on secure system design and implementation.",
    responsibilities: [
      "Engineered a secure employee records system (MongoDB/Node.js), slashing data retrieval latency by 35% via query optimization and indexing",
      "Enforced zero breaches over 12 months through AES-256 encryption and granular RBAC for salary/position data",
      "Modernized legacy systems via Docker microservices, reducing deployment downtime by 60%",
      "Implemented AI-driven security monitoring and anomaly detection systems",
      "Collaborated with development teams to integrate security into CI/CD pipelines"
    ]
  },
  {
    title: "Freelance Full-Stack Engineer",
    company: "Remote",
    period: "Jan 2022 - Present",
    description: "Full-stack developer specializing in secure application development and optimization.",
    responsibilities: [
      "Delivered 15+ full-stack apps (React/Node.js) with 98% client satisfaction; secured auth via OAuth2/SAML",
      "Boosted SaaS platform retention by 25% via responsive redesigns and Lighthouse-optimized performance (90+ scores)",
      "Implemented secure coding practices and vulnerability assessments in client projects",
      "Developed custom security tools for monitoring and threat detection",
      "Provided security consulting and recommendations for client infrastructure"
    ]
  }
];

const About = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Files for IDE display
  const aboutFiles = [
    {
      name: 'profile.json',
      content: `{
  "name": "Amelia Alfonso",
  "title": "Cybersecurity-Focused Software Engineer",
  "location": "Boston, MA",
  "website": "github.com/ame0101",
  "email": "aalfonso0101@gmail.com",
  "about": "Cyber security-focused CS graduate specializing in AI-driven vulnerability detection, secure system design, and full-stack development, with proven expertise in hardening enterprise applications and deploying predictive analytics at scale.",
  "interests": [
    "AI-Driven Security",
    "Vulnerability Research",
    "Secure Software Development",
    "Network Security",
    "Machine Learning",
    "Static Analysis"
  ],
  "education": [
    {
      "degree": "B.S. Computer Science",
      "institution": "Boston University",
      "year": "2025",
      "courses": [
        "Network Security",
        "Cryptography",
        "Secure Software Design", 
        "Cloud Computing"
      ]
    }
  ]
}`
    },
    {
      name: 'experience.json',
      content: `[
  {
    "title": "Software Engineer (Security Focus)",
    "company": "Boston University",
    "period": "Jun 2023 - Present",
    "description": "Security-focused software engineering role developing and maintaining secure enterprise systems.",
    "responsibilities": [
      "Engineered a secure employee records system (MongoDB/Node.js), slashing data retrieval latency by 35% via query optimization and indexing",
      "Enforced zero breaches over 12 months through AES-256 encryption and granular RBAC for salary/position data",
      "Modernized legacy systems via Docker microservices, reducing deployment downtime by 60%",
      "Architected a zero-trust employee records system with TLS 1.3 and MongoDB encrypted-at-rest",
      "Cut data exfiltration risks by 40% through HTTPS traffic inspection (Wireshark/Nmap) and microservice isolation"
    ],
    "technologies": ["MongoDB", "Node.js", "AES-256", "RBAC", "Docker", "Wireshark", "Nmap", "TLS 1.3"]
  },
  {
    "title": "Freelance Full-Stack Engineer",
    "company": "Remote",
    "period": "Jan 2022 - Present",
    "description": "Independent full-stack development focusing on secure, performant web applications.",
    "responsibilities": [
      "Delivered 15+ full-stack apps (React/Node.js) with 98% client satisfaction; secured auth via OAuth2/SAML",
      "Boosted SaaS platform retention by 25% via responsive redesigns and Lighthouse-optimized performance (90+ scores)",
      "Implemented secure authentication and authorization mechanisms for client applications",
      "Developed and deployed scalable, secure web solutions for diverse client requirements"
    ],
    "technologies": ["React", "Node.js", "OAuth2", "SAML", "JavaScript", "Responsive Design", "Performance Optimization"]
  }
]`
    },
    {
      name: 'education.json',
      content: `{
  "degrees": [
    {
      "type": "B.S.",
      "field": "Computer Science",
      "institution": "Boston University",
      "location": "Boston, Massachusetts",
      "year": "2025",
      "highlights": [
        "Security-focused curriculum with emphasis on practical applications"
      ],
      "courses": [
        "Network Security",
        "Cryptography",
        "Secure Software Design",
        "Cloud Computing",
        "Data Structures and Algorithms",
        "Operating Systems",
        "Web Application Development"
      ]
    }
  ],
  "leadership": [
    {
      "role": "Secretary",
      "organization": "BU Cybersecurity Club",
      "period": "2022 - Present",
      "responsibilities": [
        "Organized weekly meetings and workshops",
        "Coordinated guest speakers from industry",
        "Managed club communications and documentation"
      ]
    },
    {
      "role": "Organizer",
      "organization": "Boston Hacks",
      "period": "2023",
      "responsibilities": [
        "Helped plan and execute university hackathon",
        "Led security track and workshops",
        "Mentored participants on security best practices"
      ]
    }
  ],
  "skills": {
    "languages": ["Python", "JavaScript", "C", "SQL", "HTML/CSS"],
    "security": ["Static Analysis", "JWT/RBAC", "Encryption", "Wireshark", "Nmap"],
    "frameworks": ["React", "Node.js", "Express.js", "PyTorch", "scikit-learn"],
    "tools": ["MongoDB", "Docker", "Git"],
    "concepts": ["LSTM/RNNs", "RESTful APIs", "CI/CD", "OWASP Top 10"]
  }
}`
    }
  ];

  return (
    <AboutContainer id="about">
      <ContentWrapper>
        <SectionHeader>
          <Title>About Me</Title>
          <Description>
            Security-focused software engineer with a passion for building secure systems and identifying vulnerabilities.
          </Description>
        </SectionHeader>
        
        <AboutLayout>
          <AboutContent
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BioContainer>
              <BioText>
                I'm a CS graduate with a focus in <Highlight>cybersecurity</Highlight> with expertise in both AI-driven security solutions and secure software development. My background combines software engineering and security knowledge to build systems that are not just functional, but resilient against modern threats.
              </BioText>
              <BioText>
                With experience across <Highlight>machine learning for security</Highlight>, <Highlight>static analysis</Highlight>, and <Highlight>secure development</Highlight>, I focus on identifying and addressing vulnerabilities before they can be exploited. I believe that security should be integrated throughout the development lifecycle, not added as an afterthought.
              </BioText>
              <BioText>
                When I'm not securing systems or building detection tools, I contribute to open-source security projects and share knowledge through the BU Cybersecurity Club. I'm particularly interested in <Highlight>AI-driven vulnerability detection</Highlight> and <Highlight>zero-trust architecture</Highlight>.
              </BioText>
            </BioContainer>
            
            <ExperienceTimeline>
              <TimelineTitle>
                <TypewriterText 
                  text="Professional Experience" 
                  delay={50}
                  startDelay={300}
                />
              </TimelineTitle>
              
              {experience.map((job, index) => (
                <TimelineItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <JobTitle>{job.title}</JobTitle>
                  <CompanyInfo>
                    <CompanyName>{job.company}</CompanyName>
                    <JobPeriod>{job.period}</JobPeriod>
                  </CompanyInfo>
                  <JobDescription>{job.description}</JobDescription>
                  <JobResponsibilities>
                    {job.responsibilities.map((item, i) => (
                      <Responsibility key={i}>{item}</Responsibility>
                    ))}
                  </JobResponsibilities>
                </TimelineItem>
              ))}
            </ExperienceTimeline>
          </AboutContent>
          
          <IDEWrapper
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TabNavigation>
              <Tab 
                active={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
              >
                profile.json
              </Tab>
              <Tab 
                active={activeTab === 'experience'} 
                onClick={() => setActiveTab('experience')}
              >
                experience.json
              </Tab>
              <Tab 
                active={activeTab === 'education'} 
                onClick={() => setActiveTab('education')}
              >
                education.json
              </Tab>
            </TabNavigation>
            
            <IDE 
              files={aboutFiles}
              initialTab={aboutFiles.findIndex(file => file.name.includes(activeTab))}
              height="500px"
              onTabChange={(index) => {
                const fileName = aboutFiles[index].name;
                if (fileName.includes('profile')) setActiveTab('profile');
                else if (fileName.includes('experience')) setActiveTab('experience');
                else if (fileName.includes('education')) setActiveTab('education');
              }}
            />
          </IDEWrapper>
        </AboutLayout>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;