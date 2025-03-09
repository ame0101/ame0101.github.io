// Available terminal commands with their handlers
const terminalCommands = [
    {
      name: 'help',
      description: 'Show available commands',
      usage: 'help',
      handler: () => {
        const commandsList = terminalCommands.map(cmd => 
          `${cmd.name.padEnd(12)} - ${cmd.description}`
        );
        
        return [
          'Available commands:',
          '==================',
          ...commandsList,
          '',
          'Type "usage [command]" for more information about a specific command.',
        ];
      }
    },
    {
      name: 'usage',
      description: 'Show usage information for a command',
      usage: 'usage [command]',
      handler: (args) => {
        if (args.length === 0) {
          return 'Usage: usage [command]';
        }
        
        const commandName = args[0];
        const command = terminalCommands.find(cmd => cmd.name === commandName);
        
        if (!command) {
          return `Command not found: ${commandName}`;
        }
        
        return [
          `Command: ${command.name}`,
          `Description: ${command.description}`,
          `Usage: ${command.usage}`,
        ];
      }
    },
    {
      name: 'about',
      description: 'Display information about me',
      usage: 'about',
      handler: () => {
        return [
          '=== Professional Profile ===',
          '',
          'Cyber security-focused CS graduate specializing in:',
          '- AI-driven vulnerability detection',
          '- Secure system design',
          '- Full-stack development',
          '',
          'Skills:',
          '- Network Security & Threat Detection',
          '- AI/ML for Security Applications',
          '- Secure Software Development',
          '- DevSecOps Implementation',
          '- Zero-Trust Architecture',
          '- Security Automation',
          '',
          'Use "contact" command to get in touch',
        ];
      }
    },
    {
      name: 'skills',
      description: 'List my technical skills',
      usage: 'skills [category]',
      handler: (args) => {
        const categories = {
          all: true,
          security: [
            'Static Analysis',
            'JWT/RBAC Implementation',
            'AES-256 Encryption',
            'Network Security',
            'Wireshark/Nmap',
            'HTTPS Traffic Inspection',
            'SIEM Integration',
            'IDS/IPS Configuration',
            'Zero Trust Architecture',
          ],
          development: [
            'Python',
            'JavaScript',
            'C',
            'SQL',
            'HTML/CSS',
            'React/Node.js',
            'Express.js',
            'MongoDB',
            'Docker',
            'CI/CD',
          ],
          ai: [
            'PyTorch',
            'scikit-learn',
            'LSTM/RNN Models',
            'Tokenization & Sequence Processing',
            'Supervised Learning',
            'Feature Engineering',
            'Model Validation',
            'Anomaly Detection',
          ],
        };
        
        if (args.length === 0 || args[0] === 'all') {
          return [
            '=== Skills Categories ===',
            '',
            'Security:',
            ...categories.security.map(skill => `  - ${skill}`),
            '',
            'Development:',
            ...categories.development.map(skill => `  - ${skill}`),
            '',
            'AI & Machine Learning:',
            ...categories.ai.map(skill => `  - ${skill}`),
          ];
        }
        
        const category = args[0].toLowerCase();
        
        if (categories[category]) {
          return [
            `=== ${category.charAt(0).toUpperCase() + category.slice(1)} Skills ===`,
            '',
            ...categories[category].map(skill => `  - ${skill}`),
          ];
        } else {
          return `Unknown category: ${category}. Available categories: all, security, development, ai`;
        }
      }
    },
    {
      name: 'projects',
      description: 'List my projects',
      usage: 'projects [tag]',
      handler: (args) => {
        const projects = [
          {
            name: 'VulnCrypt',
            description: 'AI-powered static analysis tool for vulnerability detection',
            tags: ['security', 'ai', 'static-analysis'],
            link: '/projects/vulncrypt',
          },
          {
            name: 'BU Shuttle Delay Predictor',
            description: 'ML model predicting shuttle delays with Random Forest (R²=0.869)',
            tags: ['machine-learning', 'data-science', 'transportation'],
            link: '/projects/shuttle-predictor',
          },
          {
            name: 'DeepPacket',
            description: 'AI-powered network anomaly detection for malicious traffic',
            tags: ['security', 'ai', 'network'],
            link: '/projects/deeppacket',
          },
          {
            name: 'Zero Trust CASB',
            description: 'Cloud Access Security Broker with JWT/OAuth auth and DLP',
            tags: ['security', 'cloud', 'zero-trust'],
            link: '/projects/zero-trust-casb',
          },
        ];
        
        if (args.length === 0) {
          return [
            '=== Projects ===',
            '',
            ...projects.map(project => `${project.name} - ${project.description}`),
            '',
            'Use "projects [tag]" to filter by tag',
            'Use "project [name]" to view details about a specific project',
          ];
        }
        
        const tag = args[0].toLowerCase();
        const filteredProjects = projects.filter(project => 
          project.tags.some(t => t.toLowerCase().includes(tag))
        );
        
        if (filteredProjects.length === 0) {
          return `No projects found with tag: ${tag}`;
        }
        
        return [
          `=== Projects tagged with "${tag}" ===`,
          '',
          ...filteredProjects.map(project => `${project.name} - ${project.description}`),
        ];
      }
    },
    {
      name: 'project',
      description: 'View details about a specific project',
      usage: 'project [name]',
      handler: (args) => {
        if (args.length === 0) {
          return 'Usage: project [name]';
        }
        
        const projectName = args.join(' ').toLowerCase();
        
        const projects = {
          'vulncrypt': {
            name: 'VulnCrypt',
            description: 'AI-powered static analysis tool using a custom LSTM-based RNN model to detect vulnerabilities in C source code.',
            features: [
              'Custom LSTM-based RNN model for vulnerability detection',
              'Deep learning pipeline for tokenization and sequence processing',
              'High accuracy and recall in vulnerability prediction',
              'DevSecOps integration for automated scanning in CI/CD pipelines',
              'Expanded datasets using SARD and CWE for model improvement',
              'Detection of buffer overflows, SQL injection, and other vulnerabilities',
            ],
            technologies: ['PyTorch', 'LSTM', 'C', 'Python', 'CI/CD'],
            link: '/projects/vulncrypt',
          },
          'shuttle': {
            name: 'BU Shuttle Delay Predictor',
            description: 'Machine learning model that predicts shuttle delays with a Random Forest model, achieving R²=0.869 accuracy.',
            features: [
              'Random Forest model with R²=0.869 accuracy',
              'Identification of most unreliable routes (20.9min avg delay)',
              'Automated GPS/schedule data pipelines',
              'Flask API for real-time predictions',
              'Deployment with gunicorn handling 1,000+ daily requests',
              'Integration with BU Transit app',
            ],
            technologies: ['Python', 'scikit-learn', 'Flask', 'Pandas', 'gunicorn'],
            link: '/projects/shuttle-predictor',
          },
          'deeppacket': {
            name: 'DeepPacket',
            description: 'AI-powered network anomaly detection using LSTM models to detect malicious traffic patterns in real-time.',
            features: [
              'LSTM model for detecting malicious traffic patterns',
              'Detection of DDoS attacks and DNS tunneling',
              '98% F1-score on CIC-IDS2017 dataset',
              'Integration with Zeek/Bro for real-time alerting',
              'Kubernetes sidecar deployment for microservices monitoring',
              'East-West traffic analysis in containerized environments',
            ],
            technologies: ['PyTorch', 'Scapy', 'Zeek', 'Python', 'Kubernetes'],
            link: '/projects/deeppacket',
          },
          'zero trust': {
            name: 'Zero Trust CASB',
            description: 'Cloud Access Security Broker implementing zero-trust principles with JWT/OAuth 2.0 auth and DLP capabilities.',
            features: [
              'JWT/OAuth 2.0 authentication',
              'Least-privilege access controls',
              'HTTPS traffic inspection via reverse proxy',
              'Data Loss Prevention (DLP) with content scanning',
              'AES-256 encryption for sensitive data',
              'Automated threat blocking via RESTful API integration',
              'Compliance monitoring for GDPR/NIST standards',
              'Real-time SIEM logging and anomaly detection',
            ],
            technologies: ['Node.js', 'Express', 'JWT', 'OAuth 2.0', 'AWS', 'GCP'],
            link: '/projects/zero-trust-casb',
          },
        };
        
        // Search for partial matches
        const project = Object.entries(projects).find(([key]) => 
          key.includes(projectName.toLowerCase()) || 
          projectName.toLowerCase().includes(key)
        );
        
        if (!project) {
          return `Project not found: ${args.join(' ')}. Type "projects" to see all projects.`;
        }
        
        const [_, projectData] = project;
        
        return [
          `=== ${projectData.name} ===`,
          '',
          projectData.description,
          '',
          'Features:',
          ...projectData.features.map(feature => `  - ${feature}`),
          '',
          'Technologies:',
          `  ${projectData.technologies.join(', ')}`,
          '',
          `For more information, navigate to: ${projectData.link}`,
        ];
      }
    },
    {
      name: 'contact',
      description: 'View contact information',
      usage: 'contact',
      handler: () => {
        return [
          '=== Contact Information ===',
          '',
          'Email: alfonsoa@bu.edu',
          'LinkedIn: linkedin.com/in/ameliaalfonso',
          'GitHub: github.com/ame0101',
          '',
          'Feel free to reach out for opportunities or inquiries.',
        ];
      }
    },
    {
      name: 'resume',
      description: 'View my resume',
      usage: 'resume',
      handler: () => {
        return [
          '=== Professional Resume ===',
          '',
          'EDUCATION',
          '- B.S. in Computer Science, Boston University',
          '  Coursework: Network Security, Cryptography, Secure Software Design, Cloud Computing',
          '  Leadership: Secretary, BU Cybersecurity Club; Organizer, Boston Hacks',
          '',
          'EXPERIENCE',
          '',
          'Software Engineer (Security Focus) | Boston University (Jun 2023-Present)',
          '- Engineered a secure employee records system (MongoDB/Node.js), slashing data retrieval',
          '  latency by 35% via query optimization and indexing',
          '- Enforced zero breaches over 12 months through AES-256 encryption and granular RBAC for',
          '  salary/position data',
          '- Modernized legacy systems via Docker microservices, reducing deployment downtime by 60%',
          '',
          'Freelance Full-Stack Engineer | Remote (Jan 2022-Present)',
          '- Delivered 15+ full-stack apps (React/Node.js) with 98% client satisfaction; secured auth via',
          '  OAuth2/SAML',
          '- Boosted SaaS platform retention by 25% via responsive redesigns and Lighthouse-optimized',
          '  performance (90+ scores)',
          '',
          'PROJECTS',
          '',
          'VulnCrypt: AI Static Analysis Tool | PyTorch, LSTM, C',
          '- Developed VulnCrypt, an AI-powered static analysis tool using a custom LSTM-based RNN model to',
          '  detect vulnerabilities (e.g., buffer overflows, SQL injection) in C source code',
          '- Designed and optimized a PyTorch-based deep learning pipeline for tokenization, sequence processing,',
          '  and vulnerability prediction, achieving high accuracy and recall',
          '- Enabled DevSecOps integration for automated vulnerability scanning in CI/CD pipelines',
          '',
          'BU Shuttle Delay Predictor | Python, scikit-learn, Flask',
          '- Achieved R²=0.869 with a Random Forest model, identifying the most unreliable route',
          '  (20.9min avg delay)',
          '- Automated GPS/schedule data pipelines; deployed Flask API via gunicorn handling 1,000+ daily',
          '  requests',
          '',
          'TECHNICAL SKILLS',
          '- Languages: Python, JavaScript, C, SQL, HTML/CSS',
          '- Cybersecurity: Static Analysis, JWT/RBAC, Encryption, Wireshark, Nmap',
          '- Frameworks/Tools: React, Node.js, Express.js, PyTorch, scikit-learn, MongoDB, Docker, Git',
          '- Concepts: LSTM/RNNs, RESTful APIs, CI/CD, OWASP Top 10',
          '',
          'Use "download resume" to get the full PDF version.',
        ];
      }
    },
    {
      name: 'download',
      description: 'Download files',
      usage: 'download [filename]',
      handler: (args) => {
        if (args.length === 0) {
          return 'Usage: download [filename]';
        }
        
        const availableFiles = {
          'resume': {
            name: 'resume.pdf',
            type: 'application/pdf',
            path: '/assets/files/resume.pdf',
          },
        };
        
        const filename = args[0].toLowerCase();
        const file = availableFiles[filename];
        
        if (!file) {
          return `File not found: ${filename}. Available files: ${Object.keys(availableFiles).join(', ')}`;
        }
        
        // Simulate file download
        return [
          `Downloading ${file.name}...`,
          `File would download in a real implementation.`,
          `Path: ${file.path}`,
        ];
      }
    },
    {
      name: 'clear',
      description: 'Clear the terminal',
      usage: 'clear',
      handler: () => {
        // Special handler in Terminal.js will clear the history
        return 'CLEAR_TERMINAL';
      }
    },
    {
      name: 'whoami',
      description: 'Display current user',
      usage: 'whoami',
      handler: () => {
        return 'visitor@cybersec-portfolio.io';
      }
    },
    {
      name: 'date',
      description: 'Display current date and time',
      usage: 'date',
      handler: () => {
        return new Date().toString();
      }
    },
    {
      name: 'echo',
      description: 'Display a message',
      usage: 'echo [message]',
      handler: (args) => {
        if (args.length === 0) {
          return '';
        }
        return args.join(' ');
      }
    },
    {
      name: 'ls',
      description: 'List files in current directory',
      usage: 'ls [directory]',
      handler: (args) => {
        const fileSystem = {
          '/': [
            { name: 'about', type: 'directory' },
            { name: 'projects', type: 'directory' },
            { name: 'contact', type: 'directory' },
            { name: 'skills', type: 'directory' },
            { name: 'resume.pdf', type: 'file' },
            { name: 'README.md', type: 'file' },
          ],
          '/about': [
            { name: 'bio.txt', type: 'file' },
            { name: 'experience.json', type: 'file' },
            { name: 'education.json', type: 'file' },
          ],
          '/projects': [
            { name: 'vulncrypt', type: 'directory' },
            { name: 'shuttle-predictor', type: 'directory' },
            { name: 'deeppacket', type: 'directory' },
            { name: 'zero-trust-casb', type: 'directory' },
          ],
          '/contact': [
            { name: 'email.txt', type: 'file' },
            { name: 'social.json', type: 'file' },
          ],
          '/skills': [
            { name: 'security.json', type: 'file' },
            { name: 'development.json', type: 'file' },
            { name: 'ai.json', type: 'file' },
          ],
        };
        
        let directory = '/';
        
        if (args.length > 0) {
          directory = args[0];
          
          // Add leading slash if not present
          if (!directory.startsWith('/')) {
            directory = '/' + directory;
          }
          
          // Remove trailing slash if present
          if (directory.length > 1 && directory.endsWith('/')) {
            directory = directory.slice(0, -1);
          }
        }
        
        if (!fileSystem[directory]) {
          return `Directory not found: ${directory}`;
        }
        
        const files = fileSystem[directory];
        const directories = files.filter(file => file.type === 'directory').map(file => `${file.name}/`);
        const regularFiles = files.filter(file => file.type === 'file').map(file => file.name);
        
        return [
          `Directory listing for ${directory}:`,
          '',
          ...directories.map(dir => `drwxr-xr-x  ${dir}`),
          ...regularFiles.map(file => `-rw-r--r--  ${file}`),
        ];
      }
    },
    {
      name: 'cat',
      description: 'Display file contents',
      usage: 'cat [filename]',
      handler: (args) => {
        if (args.length === 0) {
          return 'Usage: cat [filename]';
        }
        
        const filename = args[0];
        
        const files = {
          'README.md': [
            '# Cybersecurity Portfolio',
            '',
            'Welcome to my professional portfolio showcasing my work in cybersecurity, AI-driven security tools, and software development.',
            '',
            'Use the terminal interface to navigate through my projects, skills, and experience.',
            '',
            'Type "help" to see available commands.',
          ],
          'about/bio.txt': [
            'I am a Boston University CS graduate specializing in AI-driven vulnerability detection, secure system design, and full-stack development.',
            '',
            'With expertise in both machine learning and secure development, I bring a comprehensive approach to cybersecurity.',
            '',
            'My background in software engineering allows me to bridge the gap between development and security,',
            'creating solutions that are both functional and secure.',
          ],
        };
        
        // Normalize path
        let normalizedFilename = filename;
        if (!normalizedFilename.startsWith('/')) {
          normalizedFilename = '/' + normalizedFilename;
        }
        
        // Remove leading slash for lookup
        const lookupKey = normalizedFilename.startsWith('/') ? normalizedFilename.substring(1) : normalizedFilename;
        
        if (!files[lookupKey]) {
          return `File not found: ${filename}`;
        }
        
        return files[lookupKey].join('\n');
      }
    },
    {
      name: 'cd',
      description: 'Change directory',
      usage: 'cd [directory]',
      handler: (args) => {
        // This would actually change the current directory in a real terminal
        // For this simulation, we'll just return a message
        if (args.length === 0) {
          return 'Changed to home directory';
        }
        
        const directory = args[0];
        return `Changed directory to ${directory}`;
      }
    },
    {
      name: 'pwd',
      description: 'Print working directory',
      usage: 'pwd',
      handler: () => {
        // In a real terminal, this would return the current directory
        return '/home/visitor';
      }
    },
    {
      name: 'ping',
      description: 'Test connectivity',
      usage: 'ping [host]',
      handler: (args) => {
        if (args.length === 0) {
          return 'Usage: ping [host]';
        }
        
        const host = args[0];
        
        return [
          `PING ${host} (127.0.0.1): 56 data bytes`,
          '64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.035 ms',
          '64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.046 ms',
          '64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.042 ms',
          '',
          `--- ${host} ping statistics ---`,
          '3 packets transmitted, 3 packets received, 0.0% packet loss',
          'round-trip min/avg/max/stddev = 0.035/0.041/0.046/0.005 ms',
        ];
      }
    },
    {
      name: 'nmap',
      description: 'Simulate a network scan',
      usage: 'nmap [host]',
      handler: (args) => {
        if (args.length === 0) {
          return 'Usage: nmap [host]';
        }
        
        const host = args[0];
        
        return [
          `Starting Nmap scan for ${host}`,
          'Nmap scan report for portfolio-site.local (127.0.0.1)',
          'Host is up (0.00035s latency).',
          'Not shown: 996 closed ports',
          'PORT     STATE SERVICE',
          '22/tcp   open  ssh',
          '80/tcp   open  http',
          '443/tcp  open  https',
          '8080/tcp open  http-proxy',
          '',
          'Nmap done: 1 IP address (1 host up) scanned in 0.05 seconds',
        ];
      }
    },
    {
      name: 'scan',
      description: 'Run a simulated security scan',
      usage: 'scan [target]',
      handler: (args) => {
        if (args.length === 0) {
          return 'Usage: scan [target]';
        }
        
        const target = args[0];
        
        return [
          `Initiating security scan for ${target}...`,
          '[+] Checking for open ports...',
          '[+] Detecting running services...',
          '[+] Testing for common vulnerabilities...',
          '[+] Analyzing security headers...',
          '[+] Scanning for outdated software...',
          '',
          'Scan completed. Results:',
          '- 0 Critical vulnerabilities',
          '- 2 Medium vulnerabilities',
          '- 5 Low vulnerabilities',
          '',
          'This is a simulated scan for demonstration purposes.',
        ];
      }
    },
    {
      name: 'social',
      description: 'Display social media links',
      usage: 'social',
      handler: () => {
        return [
          '=== Social Media ===',
          '',
          'GitHub: github.com/ame0101',
          'LinkedIn: linkedin.com/in/ameliaalfonso',
        
        ];
      }
    },
    {
      name: 'crypto',
      description: 'Encrypt or decrypt a message',
      usage: 'crypto [encrypt|decrypt] [message]',
      handler: (args) => {
        if (args.length < 2) {
          return 'Usage: crypto [encrypt|decrypt] [message]';
        }
        
        const action = args[0].toLowerCase();
        const message = args.slice(1).join(' ');
        
        if (action === 'encrypt') {
          // Simple base64 encoding for demonstration
          const encoded = btoa(message);
          return [
            'Encrypting message...',
            '',
            `Original: ${message}`,
            `Encrypted: ${encoded}`,
            '',
            'Note: This is a simple Base64 encoding for demonstration purposes only.',
            'Real encryption would use proper cryptographic algorithms.',
          ];
        } else if (action === 'decrypt') {
          try {
            // Simple base64 decoding for demonstration
            const decoded = atob(message);
            return [
              'Decrypting message...',
              '',
              `Encrypted: ${message}`,
              `Decrypted: ${decoded}`,
              '',
              'Note: This is a simple Base64 decoding for demonstration purposes only.',
              'Real decryption would use proper cryptographic algorithms.',
            ];
          } catch (e) {
            return 'Error: Could not decrypt message. Make sure it is properly formatted.';
          }
        } else {
          return `Unknown action: ${action}. Use "encrypt" or "decrypt".`;
        }
      }
    },
    {
      name: 'analyze',
      description: 'Analyze sample code for vulnerabilities',
      usage: 'analyze [code-sample]',
      handler: (args) => {
        if (args.length === 0) {
          return [
            'Usage: analyze [code-sample]',
            '',
            'Available samples: buffer-overflow, sql-injection, xss, auth-bypass'
          ];
        }
        
        const sample = args[0].toLowerCase();
        
        const samples = {
          'buffer-overflow': {
            code: `
void copy_data(char *user_input) {
    char buffer[64];
    strcpy(buffer, user_input);  // Vulnerable: no bounds checking
    printf("Data copied successfully\\n");
}`,
            vulnerabilities: [
              'Buffer Overflow: strcpy() used without bounds checking',
              'Risk: Critical - Can lead to memory corruption and code execution',
              'Fix: Use strncpy() with proper size limit or use safer alternatives'
            ]
          },
          'sql-injection': {
            code: `
function getUserData(username) {
    const query = "SELECT * FROM users WHERE username = '" + username + "'";
    return db.execute(query);  // Vulnerable: direct string concatenation
}`,
            vulnerabilities: [
              'SQL Injection: User input directly concatenated in query',
              'Risk: Critical - Can lead to data breach or data manipulation',
              'Fix: Use parameterized queries with prepared statements'
            ]
          },
          'xss': {
            code: `
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(\`<h1>Search results for: \${query}</h1>\`);  // Vulnerable: unescaped output
});`,
            vulnerabilities: [
              'Cross-Site Scripting (XSS): Unescaped user input in HTML response',
              'Risk: High - Can lead to session hijacking or malicious actions',
              'Fix: Use a proper HTML escaping function before outputting user data'
            ]
          },
          'auth-bypass': {
            code: `
function verifyAdmin(role) {
    if (role = "admin") {  // Vulnerable: assignment instead of comparison
        return true;
    }
    return false;
}`,
            vulnerabilities: [
              'Authentication Bypass: Assignment operator (=) used instead of comparison (==)',
              'Risk: Critical - Always returns true, allowing unauthorized access',
              'Fix: Use equality operator (==) or strict equality (===) for comparison'
            ]
          }
        };
        
        if (!samples[sample]) {
          return `Unknown code sample: ${sample}. Available samples: buffer-overflow, sql-injection, xss, auth-bypass`;
        }
        
        const { code, vulnerabilities } = samples[sample];
        
        return [
          `=== Vulnerability Analysis: ${sample} ===`,
          '',
          'Code Sample:',
          code,
          '',
          'Analysis Results:',
          ...vulnerabilities,
          '',
          'Note: This is a demonstration of VulnCrypt\'s analysis capabilities.',
        ];
      }
    }
  ];
  
  export default terminalCommands;