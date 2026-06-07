const gh = 'https://github.com/bracketdeveloper';

export const about = {
  experienceYears: 5,
  projectsBuilt: 12,
  happyClients: 20,
  coreStack: ['React.js', 'Node.js', 'Express', 'Laravel', 'MongoDB', 'MySQL'],
  profilePic: '',
  description:
    'Full Stack Developer focused on building clean, scalable, and business-ready web applications. Experienced in frontend interfaces, backend APIs, dashboards, automation workflows, deployments, and CMS-powered websites for clients across e-commerce, healthcare, education, sports, and enterprise operations.',
};

export const skillCategories = [
  {
    tabId: 'frontend',
    name: 'Frontend',
    sortOrder: 1,
    skills: [
      { name: 'React.js & Hooks', level: 92 },
      { name: 'Vue.js Development', level: 85 },
      { name: 'Tailwind CSS & Bootstrap', level: 90 },
      { name: 'jQuery & AJAX', level: 82 },
    ],
  },
  {
    tabId: 'backend',
    name: 'Backend & APIs',
    sortOrder: 2,
    skills: [
      { name: 'Laravel Framework', level: 94 },
      { name: 'Node.js & Express', level: 90 },
      { name: 'RESTful APIs & Integration', level: 95 },
      { name: 'PHP Development', level: 92 },
      { name: 'Java (Automation & Reporting)', level: 75 },
    ],
  },
  {
    tabId: 'cloud',
    name: 'Database & Web Services',
    sortOrder: 3,
    skills: [
      { name: 'MySQL Database', level: 90 },
      { name: 'MongoDB NoSQL', level: 85 },
      { name: 'WordPress Customization', level: 88 },
      { name: 'cPanel Hosting Admin', level: 82 },
      { name: 'Website Deployment', level: 85 },
    ],
  },
  {
    tabId: 'tools',
    name: 'Tools & DevOps',
    sortOrder: 4,
    skills: [
      { name: 'Git & GitHub Versioning', level: 92 },
      { name: 'Linux System Environments', level: 80 },
      { name: 'GTmetrix Performance Audit', level: 85 },
      { name: 'Figma to Responsive HTML', level: 90 },
      { name: 'Agile & Scrum Collaboration', level: 88 },
    ],
  },
];

export const projects = [
  {
    title: 'Enterprise ISP Billing & Client Management System',
    category: 'fullstack',
    description:
      'A high-concurrency, enterprise-grade backend infrastructure engineered for a prominent Dubai-based Internet Service Provider (ISP), automating subscriber provisioning, real-time bandwidth usage tracking, multi-tier cyclic billing, and automated revenue assurance pipelines.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'Bootstrap', 'Chart.js', 'Linux Cron Jobs Framework'],
    links: { github: gh, demo: '' },
    caseStudy: {
      challenge:
        'Architecting a bulletproof, zero-downtime operations engine capable of processing massive data streams for thousands of concurrent subscribers, handling complex overlapping billing cycles, calculating bandwidth quotas dynamically, and mitigating payment delinquency through automated escalations.',
      solution:
        'Developed an enterprise full-stack ISP management platform leveraging an asynchronous, AJAX-driven core interface and a highly optimized relational database matrix. Engineered automated background workers via server cron daemons to compute usage metrics, dispatch real-time billing notifications, and compile high-performance visual data feeds via Chart.js.',
      metrics:
        'Automated 100% of core ISP billing and customer tracking workflows, reduced administrative invoice generation overhead by 95%, and dropped outstanding subscriber payment delinquency by 35% within the first quarter of deployment.',
    },
  },
  {
    title: 'VUK Player Development System',
    category: 'fullstack',
    description:
      'An advanced football sports analytics and performance monitoring platform enabling clubs to evaluate, benchmark, and compare individual players and entire squads across comprehensive physical, physiological, and metabolic parameters using interactive data visualizations.',
    tech: ['PHP', 'JavaScript', 'Bootstrap', 'MySQL', 'Chart.js'],
    links: { github: `${gh}/vuk`, demo: '' },
    caseStudy: {
      challenge:
        'Aggregating complex, multi-disciplinary athletic metrics into a unified data schema that supports real-time, multi-entity comparisons without UI lag or convoluted analytical views.',
      solution:
        'Engineered a full-stack analytics engine utilizing a PHP backend paired with an optimized database schema to process high-dimensional athletic profiles. Implemented an interactive JavaScript charting interface wrapped in a clean Bootstrap UI.',
      metrics: 'Transformed raw physiological test data into actionable coaching insights instantly, reducing tactical athletic benchmarking overhead by 80%.',
    },
  },
  {
    title: 'Manha Vogue POS',
    category: 'fullstack',
    description:
      'A comprehensive, custom Point of Sale (POS) system engineered specifically for high-end retail jewelry management, streamlining real-time inventory tracking, variant pricing, sales invoicing, and customer records.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Vue.js', 'Tailwind CSS', 'Alpine.js'],
    links: { github: gh, demo: '' },
    caseStudy: {
      challenge: 'Designing a retail operations hub that handles intricate inventory variations unique to the jewelry sector while maintaining a high-speed checkout workflow.',
      solution: 'Built a specialized full-stack POS application combining a relational database schema for jewelry item tracking with a high-performance sales interface and automated stock level adjustments.',
      metrics: 'Cut retail transaction processing speeds by 50% and established a 100% accurate, live inventory tracking channel.',
    },
  },
  {
    title: 'BYM TV',
    category: 'fullstack',
    description:
      'An elite digital broadcasting and video-on-demand platform enabling automated content aggregation from YouTube, Vimeo, and Dailymotion alongside an admin-moderated user-generated video publishing workflow.',
    tech: ['Node.js', 'Express', 'MongoDB', 'React', 'YouTube Data API', 'Vimeo API', 'Cloudinary'],
    links: { github: gh, demo: '' },
    caseStudy: {
      challenge: 'Constructing a scalable entertainment hub capable of aggregating dynamic multi-category video feeds via third-party media APIs while maintaining a secure framework for community content uploads.',
      solution: 'Developed a robust full-stack streaming portal utilizing asynchronous integration with mainstream video APIs and a protected user authentication layer with administrative moderation.',
      metrics: 'Established a fully self-sustaining digital media ecosystem with zero overhead media delivery pipelines.',
    },
  },
  {
    title: 'Twilio API Bulk SMS Sender',
    category: 'fullstack',
    description:
      'A full-stack automated communication utility enabling high-volume bulk SMS dispatch by parsing Excel files and executing mass messaging pipelines through direct Twilio API orchestration.',
    tech: ['Node.js', 'Express', 'Twilio API', 'ExcelJS', 'JavaScript', 'MongoDB'],
    links: { github: gh, demo: '' },
    caseStudy: {
      challenge: 'Eliminating the manual overhead of sending individual client notifications by building a system that securely accepts dynamic Twilio credentials and processes large contact lists without timeouts.',
      solution: 'Developed a lightweight full-stack application featuring an asynchronous file-upload pipeline that processes spreadsheet arrays and streams API requests to the Twilio gateway.',
      metrics: 'Reduced text campaign coordination times from hours to under two minutes.',
    },
  },
  {
    title: 'Optimized Body and Mind',
    category: 'fullstack',
    description:
      'A robust healthcare platform providing a seamless online booking ecosystem for blood, vitamin, and hormone screening packages, designed to bypass physical crowds and automate diagnostic appointment routing.',
    tech: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'WooCommerce', 'Fluent Forms API'],
    links: { github: gh, demo: 'https://optimizedbodyandmind.co.uk/' },
    caseStudy: {
      challenge: 'Developing a secure, high-traffic medical booking solution to shift patient registration and appointment scheduling from congested clinics to a structured online pipeline during peak demand periods.',
      solution: 'Engineered a full-stack scheduling and patient intake web application using an asynchronous time-slot allocation matrix with a secure administration panel.',
      metrics: 'Eliminated in-clinic booking bottlenecks, resulting in a 60% acceleration in user intake.',
    },
  },
  {
    title: 'PCR Lab Dubai',
    category: 'fullstack',
    description:
      'A full-stack online PCR test booking platform for PCRTEST.AE, a DHA-approved facility in Dubai, enabling home/hotel test appointments with integrated online payments and an automated admin panel.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Payment Gateway API', 'Email Notifications'],
    links: { github: gh, demo: '' },
    caseStudy: {
      challenge: 'Building a seamless end-to-end appointment booking flow from test selection and slot reservation to secure online payments and real-time email confirmations.',
      solution: 'Developed a Laravel-powered full-stack application with a public-facing booking portal and protected admin panel with dual payment support.',
      metrics: 'Reduced manual booking overhead by 70% and enabled 24/7 self-service appointment scheduling.',
    },
  },
  {
    title: 'Admin Dashboard Systems',
    category: 'fullstack',
    description:
      'A highly secure administrative portal featuring dynamic business metrics visualizations, reports compilers, and customizable user role management.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
    links: { github: gh, demo: '' },
    caseStudy: {
      challenge: 'Implementing secure role-based access controls (RBAC) while compiling and visualizing dynamic reporting charts from large database records.',
      solution: 'Developed custom express middlewares for JWT and role validations, combined with MongoDB aggregation queries and React chart layers.',
      metrics: 'Secured administrative endpoints and reduced query aggregate response times to a swift 85ms.',
    },
  },
  {
    title: 'Fourmile Health CBD Store',
    category: 'fullstack',
    description:
      'A custom full-stack e-commerce store with secure user checkout and inventory controls built to increase sales and streamline product delivery.',
    tech: ['Laravel', 'PHP', 'MySQL', 'cPanel', 'Payment Gateway'],
    links: { github: gh, demo: 'https://fourmilehealth.com/' },
    caseStudy: {
      challenge: 'Building a robust, fully secure product listing, cart, and payment processing system capable of handling secure client transaction requests smoothly.',
      solution: 'Developed a custom Laravel backend leveraging optimized MySQL index schemas, transactional payment gateways, and session management to secure checkouts.',
      metrics: 'Reduced checkout abandonment rates by 25% and accelerated database search latency under 60ms.',
    },
  },
  {
    title: 'Lahore Qalandars Website',
    category: 'frontend',
    description:
      'A high-performance responsive web portal built for the Lahore Qalandars sports franchise, geared towards maximizing user engagement and online brand visibility.',
    tech: ['React.js', 'Responsive Design', 'CSS Grid', 'SEO & Performance'],
    links: { github: gh, demo: 'https://lahoreqalandars.com' },
    caseStudy: {
      challenge: 'Creating a highly visually-appealing, animation-rich sports frontend that loads rapidly on slower mobile networks and remains stable during live matches with high user peaks.',
      solution: 'Implemented responsive layouts with modern CSS Grid and Flexbox, optimization of image assets, code splitting, and lazy loading strategies to reduce cumulative layout shifts.',
      metrics: 'Cut mobile load time by 40% and elevated GTmetrix performance metrics to a solid A rating.',
    },
  },
  {
    title: 'Milwaukee Academy Website',
    category: 'frontend',
    description:
      'An education-focused training and program discovery website developed with user-friendly layouts and navigation, boosting student enrollments.',
    tech: ['WordPress', 'Figma to HTML', 'HTML5 & CSS3', 'SEO'],
    links: { github: gh, demo: '' },
    caseStudy: {
      challenge: 'Translating Figma designs of deep academic course architectures into fully interactive, SEO-optimized, and clean layout patterns.',
      solution: 'Created custom lightweight templates, ensuring structural HTML semantics, and applied active caching headers and CDNs to support high speed indexes.',
      metrics: 'Achieved an outstanding score on GTmetrix and pushed organic Google Search indexing rankings up by 30%.',
    },
  },
  {
    title: 'Prime Home Care',
    category: 'frontend',
    description:
      'A highly accessible, senior-friendly service booking platform built on WordPress for an eldercare provider, featuring an optimized low-friction frontend and a full content management dashboard for seamless administration.',
    tech: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'ARIA Accessibility'],
    links: { github: gh, demo: 'https://primehomecare.uk/' },
    caseStudy: {
      challenge: 'Designing a digital touchpoint optimized for elderly users with potential visual or cognitive impairments, while providing the client with a flexible CMS.',
      solution: 'Developed a custom full-stack architecture on top of WordPress with large typography, high-contrast layouts, and intuitive navigation.',
      metrics: 'Achieved a 40% increase in self-service booking completions among target elderly user demographics.',
    },
  },
].map((project, index) => ({ ...project, sortOrder: index + 1 }));

export const experience = [
  {
    role: 'Freelance Full Stack Developer',
    company: 'Bracket Developer',
    location: 'Remote / Freelance',
    period: 'May 2020 - Present',
    bullets: [
      'Delivered custom web development solutions and administrative dashboards for local and international clients.',
      'Developed dynamic, SEO-optimized business applications using React.js, PHP, Laravel, and Node.js.',
      'Managed complete project lifecycles including requirements gathering, development, testing, deployment, and maintenance.',
      'Developed and customized WordPress websites for e-commerce, healthcare, and education clients.',
    ],
    tech: ['PHP', 'Laravel', 'MongoDB', 'Express', 'React.js', 'Node.js', 'WordPress', 'MySQL'],
  },
  {
    role: 'Full Stack Developer',
    company: "Jillani'z",
    location: 'Sheffield, United',
    period: 'June 2024 - Present',
    bullets: [
      'Develop and maintain complex full-stack web applications using JavaScript, PHP, Laravel, HTML, and CSS.',
      'Build responsive and highly interactive user interfaces utilizing modern React.js and Vue.js frameworks.',
      'Convert design wireframes (Figma/UI/UX) into fully functional, mobile-responsive, and pixel-perfect web pages.',
      'Design, architect, and integrate robust RESTful APIs for web-based products and internal systems.',
      'Develop backend automation modules using Node.js and Java for reporting, database triggers, and data processing.',
      'Manage and optimize deployments, hosting environments, server updates, and automated backups.',
    ],
    tech: ['React.js', 'Vue.js', 'Laravel', 'Node.js', 'MySQL'],
  },
  {
    role: 'Software Developer',
    company: 'Sony UK Technology Centre',
    location: 'United Kingdom',
    period: 'August 2023 - May 2024',
    bullets: [
      'Assisted in developing and maintaining critical internal software tools and web-based solutions for operational support.',
      'Supported frontend updates and system functionality enhancements using clean JavaScript, HTML5, and CSS3.',
      'Participated in end-to-end debugging, unit testing, and QA activities to guarantee system stability and peak operational performance.',
      'Collaborated with multi-functional teams to resolve technical bugs and improve internal workflow efficiency.',
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap & CSS Grid', 'QA Testing', 'Internal Tools'],
  },
].map((item, index) => ({ ...item, sortOrder: index + 1 }));

export const contactInfo = {
  email: 'admin@example.com',
  location: 'United Kingdom',
  github: gh,
  linkedin: 'https://www.linkedin.com/',
};
