export const LINKEDIN_URL = 'https://www.linkedin.com/in/someswara-rao-tellakula'
export const RESEARCH_STATUS = 'Research collaboration / in progress'

export const profile = {
  name: 'Someswara Rao Tellakula',
  role: 'I build backend systems that turn video, images and websites into data you can act on.',
  subline:
    'Final-year IT student at Vasavi College of Engineering, Hyderabad. Also studying for a BS in Data Science at IIT Madras.',
  location: 'Hyderabad, India',
  email: 'someshtellakula@gmail.com',
  github: 'https://github.com/SomeswararaoTellakula',
  linkedin: LINKEDIN_URL,
  summary:
    'I like owning a project end to end — designing the API and the data model, building it, load-testing it, and shipping it. Most of what I build sits where backend engineering meets computer vision.',
  openTo: 'Open to backend and full-stack roles for 2027.',
}

export const projects = [
  {
    name: 'DeepFit AI',
    type: 'Sports talent assessment platform',
    description:
      'Built the Flask REST API and MongoDB schema for athlete profiles, video submissions and per-rep scoring across 4 fitness tests. Implemented pose-keypoint rep counting with joint-angle validation, live form-quality feedback, and liveness checks that reject tampered submissions. Shipped web and Android prototypes with offline capture.',
    stack: ['Flask', 'MongoDB', 'YOLOv8', 'MediaPipe', 'OpenCV', 'Kotlin'],
    numbers: '4 fitness tests',
    award: '2nd Prize, CBIT Project Expo 2026',
    link: '#',
    demo: 'Interactive illustration',
  },
  {
    name: 'CrowdGuard',
    type: 'AI crowd risk management',
    description:
      'Designed a two-server architecture that separates ML inference from video streaming, exposing 8 REST endpoints for camera management, MJPEG streaming and analysis history. Implemented density-based risk classification, grid-based hotspot detection, and camera-failure fallback with a 5-second reconnect. Validated with unit, functional and JMeter load testing, with defects tracked in Jira.',
    stack: ['Flask', 'YOLO', 'OpenCV', 'PyTorch', 'MongoDB'],
    numbers: '8 REST endpoints • 4 concurrent streams • 15 FPS • under 500 ms API response • 5-second reconnect',
    award: '',
    link: '#',
    demo: 'Interactive illustration',
  },
  {
    name: 'SiteLens',
    type: 'Website AI-readiness and engagement auditor',
    description:
      'Architected 6 composable audit modules behind a single orchestrator over a shared engine, auditing any website for crawler reachability, structured data, accessibility, freshness and on-site engagement. Built the crawl layer with connection pooling, retry backoff and robots.txt enforcement. Implemented 7 cross-page aggregation checks over a 20-page sample with deterministic JSON output, under a 2-minute runtime budget.',
    stack: ['Python', 'requests', 'BeautifulSoup4', 'lxml'],
    numbers: '6 audit modules • 7 cross-page checks • 20-page sample • under 2 minutes',
    award: '',
    link: '#',
    demo: 'Interactive illustration',
  },
]

export const research = [
  {
    title: 'PentaMark: diffusion-based image watermarking robust to deepfake face manipulation',
    authors: 'Leelavathy B. (corresponding), C. Sireesha, Tellakula Someswararao, Kandagaddala Venkata Sai Geetesh, Varshith Potnuru',
    status: 'Accepted at ICACMSDS-2026; extended version submitted to Mansoura Engineering Journal (special issue)',
    summary:
      'Hides a watermark inside images using a diffusion model so the mark survives when a face is swapped or edited. The paper compares the method against prior work and reports where it falls short as well as where it works.',
    link: '#',
  },
  {
    title: 'NeuroPlex AI: advancing oral squamous cell carcinoma detection through HetFusionNet with a multi-modal vision transformer',
    authors: 'Dr. Leelavathy Pallava, Mohammad Afrid Pasha, Tellakula Someswararao',
    status: RESEARCH_STATUS,
    summary:
      'Combines several kinds of medical images in a vision transformer to help detect oral cancer earlier.',
    link: '#',
  },
]

export const skills = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'C', 'C++', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    label: 'Backend and web',
    items: ['Flask', 'Node.js', 'React.js', 'REST APIs', 'Bootstrap'],
  },
  {
    label: 'Databases',
    items: ['MySQL', 'MongoDB', 'Schema design', 'Joins', 'Indexing', 'Query optimisation'],
  },
  {
    label: 'Cloud',
    items: ['AWS', 'Azure', 'GCP', 'OCI', 'EC2', 'S3', 'Lambda', 'RDS', 'DynamoDB'],
  },
  {
    label: 'ML and vision',
    items: ['scikit-learn', 'TensorFlow', 'PyTorch', 'OpenCV', 'YOLOv8', 'MediaPipe', 'NLP'],
  },
  {
    label: 'Testing and tools',
    items: ['Git', 'GitHub', 'Postman', 'JMeter', 'Jira', 'VS Code', 'Linux'],
  },
]

export const education = [
  {
    title: 'B.E. Information Technology',
    place: 'Vasavi College of Engineering',
    detail: 'Expected 2027 • CGPA 7.22/10',
    years: '2023 → 2027',
  },
  {
    title: 'BS in Data Science',
    place: 'IIT Madras',
    detail: '2024 to present',
    years: '2024 → present',
  },
  {
    title: 'Intermediate (MPC)',
    place: 'Sri Chaitanya Junior Kalasala',
    detail: '87.7% • 2021–2023',
    years: '2021 → 2023',
  },
  {
    title: 'SSC',
    place: 'Bala Karthikeya High School',
    detail: 'GPA 10/10 • 2021',
    years: '2021',
  },
]

export const achievements = [
  { year: '2025', title: '3rd Prize, Meta Composite Coding Competition, IIT Kharagpur' },
  { year: '2025', title: 'Qualified Round One, TCS CodeVita Season 13' },
  { year: '2026', title: '2nd Prize, CBIT Project Expo (DeepFit AI)' },
]

export const beyondCode = [
  'NSS volunteer — social awareness programmes, blood donation drives, rural development work.',
  'Languages: English (fluent), Telugu (native), Hindi (intermediate).',
  'Interests: backend engineering, cloud computing, competitive programming.',
]
