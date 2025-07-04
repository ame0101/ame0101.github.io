import React, { useEffect } from 'react';
import styled from 'styled-components';

/* ——— styled-component definitions stay unchanged ——— */

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

/* … other styled components unchanged … */

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>About Me</Title>

        {/* —— BIO —— */}
        <Section>
          <BioText>
            I'm <Highlight>Amelia Alfonso</Highlight>, a Boston-based security engineer and founder of <Highlight>Sentinel Swarm</Highlight> — a decentralized defense platform that fuses Geo-Swarm Defensive Orchestration with adaptive edge proxies to thwart network-layer attacks in real time.
          </BioText>

          <BioText>
            At Boston University, I engineered a campus-wide <Highlight>zero-trust architecture</Highlight>, hardening critical services with TLS 1.3, field-level encryption, and micro-segmented Docker networks that cut unauthorized access attempts to zero.
          </BioText>

          <BioText>
            I’ve shipped 15 + production-grade React / Node SaaS products, each hardened with OAuth2 and SAML single-sign-on, consistently meeting tight deadlines and budget targets while maintaining zero critical security findings.
          </BioText>

          <BioText>
            My research passion is AI-driven security: projects like <Highlight>DeepPacket</Highlight> (LSTM anomaly detection with 98 % F1) and <Highlight>VulnCrypt</Highlight> (CI-integrated static analyzer for CWE classes) prove that machine learning can outpace modern threat actors when paired with solid engineering.
          </BioText>

          <BioText>
            Whether I’m writing C++20 packet parsers or Terraforming zero-trust networks, my core belief is simple: <Highlight>security is a first-class feature</Highlight>, not a bolt-on afterthought.
          </BioText>
        </Section>

        {/* —— EDUCATION —— */}
        <Section>
          <SectionTitle>Education</SectionTitle>
          <BioText>
            <strong>Boston University</strong> — B.A. in Computer Science
          </BioText>
          <BioText>
            Focus areas: Network Security, Cryptography, Secure Software Design, Cloud Computing. I also served as Secretary of the BU Cybersecurity Club and led Boston Hacks.
          </BioText>
        </Section>

        {/* —— TECHNICAL SKILLS —— */}
        <Section>
          <SectionTitle>Technical Skills</SectionTitle>
          <SkillsContainer>
            {/* Languages */}
            <SkillCategory>
              <CategoryTitle>Languages</CategoryTitle>
              <SkillsList>
                <SkillItem>Python</SkillItem>
                <SkillItem>C/C++</SkillItem>
                <SkillItem>Java</SkillItem>
                <SkillItem>JavaScript / TypeScript</SkillItem>
                <SkillItem>SQL</SkillItem>
              </SkillsList>
            </SkillCategory>

            {/* Cybersecurity */}
            <SkillCategory>
              <CategoryTitle>Cybersecurity</CategoryTitle>
              <SkillsList>
                <SkillItem>Zero-Trust Architecture</SkillItem>
                <SkillItem>Static & Dynamic Analysis</SkillItem>
                <SkillItem>WireGuard / mTLS Hardening</SkillItem>
                <SkillItem>Snort IDS / Zeek Bro</SkillItem>
                <SkillItem>OWASP Top 10 Mitigations</SkillItem>
              </SkillsList>
            </SkillCategory>

            {/* Frameworks & Tools */}
            <SkillCategory>
              <CategoryTitle>Frameworks & Tools</CategoryTitle>
              <SkillsList>
                <SkillItem>React & Node.js</SkillItem>
                <SkillItem>Docker / Kubernetes & Calico</SkillItem>
                <SkillItem>Ansible & Terraform</SkillItem>
                <SkillItem>GitHub Actions / Jenkins</SkillItem>
                <SkillItem>PyTorch / scikit-learn</SkillItem>
              </SkillsList>
            </SkillCategory>

            {/* AI & ML */}
            <SkillCategory>
              <CategoryTitle>AI & Machine Learning</CategoryTitle>
              <SkillsList>
                <SkillItem>LSTM / RNN Sequence Models</SkillItem>
                <SkillItem>Anomaly Detection Pipelines</SkillItem>
                <SkillItem>Feature Engineering for Code</SkillItem>
                <SkillItem>Supervised & Semi-Supervised Learning</SkillItem>
              </SkillsList>
            </SkillCategory>
          </SkillsContainer>
        </Section>

        {/* —— AREAS OF EXPERTISE —— */}
        <Section>
          <SectionTitle>Areas of Expertise</SectionTitle>
          <BioText>
            <Highlight>Swarm-Based Threat Intelligence:</Highlight> building gossip networks that share IOC hashes and orchestrate defensive actions across distributed agents.
          </BioText>
          <BioText>
            <Highlight>Cloud & Container Security:</Highlight> designing Calico-net-policy micro-segments, hardened TLS ingress, and CIS-benchmarked images.
          </BioText>
          <BioText>
            <Highlight>AI-Driven Detection:</Highlight> training LSTM models to flag buffer overflows, SQLi, and anomalous traffic with CI-integrated feedback loops.
          </BioText>
          <BioText>
            <Highlight>End-to-End Web & API Engineering:</Highlight> delivering React front-ends and Go / Node back-ends that meet strict security SLAs.
          </BioText>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AboutPage;
