import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Terminal from '../layout/Terminal';
import TypewriterText from '../ui/TypewriterText';

const ContactContainer = styled.section`
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

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactFormContainer = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  padding-bottom: 1rem;
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const FormSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const InputPrefix = styled.span`
  color: ${props => props.theme.colors.accent};
  margin-right: 0.5rem;
`;

const Input = styled.input`
  background-color: ${props => props.theme.colors.background};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1rem;
  padding: 0.75rem 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const TextArea = styled.textarea`
  background-color: ${props => props.theme.colors.background};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1rem;
  padding: 0.75rem 1rem;
  width: 100%;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: ${props => props.theme.borders.thin} ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
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

const TerminalWrapper = styled(motion.div)`
  height: 450px;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const StatusIcon = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${props => props.success ? '#28ca42' : props.error ? '#ff5f57' : props.loading ? '#ffbd2e' : props.theme.colors.accent};
`;

const StatusText = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9rem;
  color: ${props => props.success ? '#28ca42' : props.error ? '#ff5f57' : props.loading ? '#ffbd2e' : props.theme.colors.textSecondary};
`;

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    type: null, // 'success', 'error', 'loading'
    message: ''
  });
  
  // Terminal commands
  const initialCommands = [
    'contact'
  ];
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || !formState.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }
    
    // Set loading state
    setStatus({
      type: 'loading',
      message: 'Sending message...'
    });
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real implementation, you would send the form data to your backend
      console.log('Form submitted:', formState);
      
      // Set success state
      setStatus({
        type: 'success',
        message: 'Message sent successfully!'
      });
      
      // Reset form after successful submission
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({
          type: null,
          message: ''
        });
      }, 5000);
    }, 2000);
  };
  
  return (
    <ContactContainer id="contact">
      <ContentWrapper>
        <SectionHeader>
          <Title>Get In Touch</Title>
          <Description>
            Have a security project in mind or want to discuss potential vulnerabilities?
            Reach out and let's talk about securing your digital assets.
          </Description>
        </SectionHeader>
        
        <ContactLayout>
          <ContactFormContainer
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FormHeader>
              <FormTitle>
                <TypewriterText 
                  text="Send Me a Message" 
                  delay={50}
                  startDelay={300}
                />
              </FormTitle>
              <FormSubtitle>
                I'll get back to you as soon as possible.
              </FormSubtitle>
            </FormHeader>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>
                  <InputPrefix>&gt;</InputPrefix>
                  Name
                </Label>
                <Input 
                  type="text" 
                  name="name" 
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>
                  <InputPrefix>&gt;</InputPrefix>
                  Email
                </Label>
                <Input 
                  type="email" 
                  name="email" 
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>
                  <InputPrefix>&gt;</InputPrefix>
                  Subject
                </Label>
                <Input 
                  type="text" 
                  name="subject" 
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>
                  <InputPrefix>&gt;</InputPrefix>
                  Message
                </Label>
                <TextArea 
                  name="message" 
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                />
              </FormGroup>
              
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </SubmitButton>
              
              <StatusIndicator show={status.type !== null}>
                <StatusIcon 
                  success={status.type === 'success'} 
                  error={status.type === 'error'}
                  loading={status.type === 'loading'}
                />
                <StatusText
                  success={status.type === 'success'} 
                  error={status.type === 'error'}
                  loading={status.type === 'loading'}
                >
                  {status.message}
                </StatusText>
              </StatusIndicator>
            </Form>
          </ContactFormContainer>
          
          <TerminalWrapper
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Terminal
              initialCommands={initialCommands}
              autoExecuteDelay={800}
              allowInput={true}
            />
          </TerminalWrapper>
        </ContactLayout>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default Contact;