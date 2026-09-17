import { useEffect, useRef, useState } from 'react'
import profilePhoto from '../PIC.jpg'
import './App.css'

type ThemeMode = 'dark' | 'light'
type ViewMode = 'human' | 'json'
type PageKey = 'home' | 'projects' | 'research' | 'about' | 'contact'

type Project = {
  name: string
  type: string
  summary: string
  impact: string
  stack: string[]
}

type ResearchItem = {
  title: string
  note: string
  tag: string
}

const profile = {
  name: 'SOMESWARA RAO TELLAKULA',
  role: 'Final-year Information Technology student',
  location: 'Hyderabad, India',
  email: 'someshtellakula@gmail.com',
  github: 'https://github.com/SomeswararaoTellakula',
  linkedin: 'https://www.linkedin.com/in/someswara-rao-tellakula',
  summary:
    'Focused on backend and full-stack development, REST API design, relational and document data modeling, and owning projects from build through testing and deployment. Works across Python, Java, JavaScript, and SQL.',
}

const projects: Project[] = [
  {
    name: 'DeepFit AI',
    type: 'Sports Talent Assessment Platform',
    summary:
      'Built the Flask REST API and MongoDB schema for athlete profiles, video submissions, and per-rep scoring across 4 fitness tests.',
    impact: 'Implemented pose-keypoint rep counting, joint-angle validation, live form-quality feedback, liveness checks, and shipped web and Android prototypes. Awarded 2nd Prize, CBIT Project Expo 2026.',
    stack: ['Flask', 'MongoDB', 'YOLOv8', 'MediaPipe', 'OpenCV', 'Kotlin'],
  },
  {
    name: 'CrowdGuard',
    type: 'AI Crowd Risk Management',
    summary:
      'Designed a two-server architecture separating ML inference from video streaming and exposed 8 REST endpoints for camera management, MJPEG streaming, and analysis history.',
    impact: 'Implemented density-based risk classification, grid-based hotspot detection, camera-failure fallback with 5-second reconnect, and sustained 4 concurrent streams at 15 FPS with sub-500ms API response.',
    stack: ['Flask', 'YOLO', 'OpenCV', 'PyTorch', 'MongoDB'],
  },
  {
    name: 'SiteLens',
    type: 'Website AI-Readiness & Engagement Auditor',
    summary:
      'Architected 6 composable audit modules behind a single orchestrator over a shared engine, auditing any website for crawler reachability, structured data, accessibility, freshness, and engagement.',
    impact: 'Built the crawl layer with connection pooling, retry backoff, and robots.txt enforcement; implemented 7 cross-page aggregation checks over a 20-page sample with deterministic JSON output under a 2-minute runtime budget.',
    stack: ['Python', 'requests', 'BeautifulSoup4', 'lxml'],
  },
]

const research: ResearchItem[] = [
  { title: 'Data Structures and Algorithms', note: 'Core coursework supporting strong problem-solving and efficient software design.', tag: 'Coursework' },
  { title: 'DBMS, Operating Systems and Computer Networks', note: 'Fundamental systems knowledge for building reliable backend and distributed applications.', tag: 'Systems' },
  { title: 'Statistics, Python Programming, Data Analysis', note: 'Relevant training for data-driven reasoning and AI-oriented problem solving.', tag: 'Data Science' },
]

const stackGroups = [
  { label: 'Languages', items: ['Python', 'Java', 'JavaScript', 'C', 'C++', 'SQL', 'HTML5', 'CSS3'] },
  { label: 'Backend & Web', items: ['Flask', 'Node.js', 'React.js', 'REST APIs', 'Bootstrap'] },
  { label: 'Databases', items: ['MySQL', 'MongoDB', 'Schema Design', 'Joins', 'Query Optimization'] },
  { label: 'Cloud & AI', items: ['AWS', 'Azure', 'GCP', 'OCI', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'OpenCV', 'YOLOv8', 'MediaPipe', 'NLP'] },
]

const education = [
  { title: 'Bachelor of Engineering in Information Technology', place: 'Vasavi College of Engineering', detail: 'Expected 2027 • CGPA: 7.22/10' },
  { title: 'BS in Data Science', place: 'IIT Madras', detail: '2024 – Present • Relevant coursework: Statistics, Python Programming, Data Analysis' },
  { title: 'Intermediate (MPC)', place: 'Sri Chaitanya Junior Kalasala', detail: '2021 – 2023 • 87.7%' },
  { title: 'Secondary School Certificate (SSC)', place: 'Bala Karthikeya High School', detail: '2021 • GPA 10/10' },
]

const honors = [
  'Won 3rd Prize, Meta Composite Coding Competition, IIT Kharagpur (2025)',
  'Qualified Round One, TCS CodeVita Season 13 (2025)',
  'Won 2nd Prize, CBIT Project Expo (2026)',
  'Active NSS volunteer in social awareness programs, blood donation drives, and rural development activities',
  'Languages: English (Fluent), Telugu (Native), Hindi (Intermediate)',
  'Interests: Backend Engineering, Cloud Computing, Competitive Programming',
]

function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [viewMode, setViewMode] = useState<ViewMode>('human')
  const [effectsOn, setEffectsOn] = useState(true)
  const [currentPage, setCurrentPage] = useState<PageKey>('home')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number }> = []
    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const seed = () => {
      particles.length = 0
      const count = window.innerWidth < 768 ? 55 : 90
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          r: Math.random() * 2.1 + 1,
        })
      }
    }

    const draw = () => {
      if (!effectsOn) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        return
      }

      const accent = getComputedStyle(document.documentElement).getPropertyValue('--signal').trim()
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

        ctx.beginPath()
        ctx.fillStyle = accent
        ctx.globalAlpha = 0.5
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 0.22
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = accent
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      requestAnimationFrame(draw)
    }

    resizeCanvas()
    seed()
    draw()

    const handleResize = () => {
      resizeCanvas()
      seed()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [effectsOn, theme])

  const renderPage = () => {
    if (viewMode === 'json') {
      return (
        <section className="section-shell json-shell page-shell">
          <div className="section-heading">
            <p className="eyebrow">Portfolio JSON</p>
            <h2>Structured profile data</h2>
          </div>
          <pre>{JSON.stringify({ profile, projects, research, stackGroups, education, honors }, null, 2)}</pre>
        </section>
      )
    }

    switch (currentPage) {
      case 'projects':
        return (
          <section className="section-shell page-shell">
            <div className="section-heading">
              <p className="eyebrow">Selected work</p>
              <h2>Builds that turn complexity into usable products.</h2>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.name} className="project-card animate-float">
                  <div className="project-header">
                    <p className="project-type">{project.type}</p>
                    <span className="project-badge">Live prototype</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <div className="impact-box">{project.impact}</div>
                  <ul className="chip-list">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )
      case 'research':
        return (
          <section className="section-shell page-shell">
            <div className="section-heading">
              <p className="eyebrow">Skills</p>
              <h2>Languages, backend systems, databases, cloud, and AI workflows.</h2>
            </div>
            <div className="research-list">
              {research.map((item) => (
                <article key={item.title} className="research-card animate-float">
                  <span className="research-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
            <div className="stack-grid stack-page-grid">
              {stackGroups.map((group) => (
                <div key={group.label} className="stack-group animate-float">
                  <h3>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )
      case 'about':
        return (
          <section className="section-shell page-shell">
            <div className="section-heading">
              <p className="eyebrow">Education</p>
              <h2>Academic background and coursework.</h2>
            </div>
            <div className="about-layout">
              <div className="story-box animate-float">
                <p>
                  Final-year Information Technology student focused on backend and full-stack development, REST API design, relational and document data modeling, and owning projects from build through testing and deployment.
                </p>
              </div>
              <div className="education-box animate-float">
                {education.map((item) => (
                  <div key={item.title} className="edu-row">
                    <span>{item.title}</span>
                    <strong>{item.place}</strong>
                    <small>{item.detail}</small>
                  </div>
                ))}
              </div>
            </div>
            <ul className="honors-list">
              {honors.map((item) => (
                <li key={item} className="animate-float">{item}</li>
              ))}
            </ul>
          </section>
        )
      case 'contact':
        return (
          <section className="section-shell page-shell contact-shell">
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2>Let’s build something useful.</h2>
            </div>
            <div className="contact-panel animate-float">
              <div className="contact-card primary-card">
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="contact-card">
                <span>GitHub</span>
                <a href={profile.github} target="_blank" rel="noreferrer">github.com/SomeswararaoTellakula</a>
              </div>
              <div className="contact-card">
                <span>LinkedIn</span>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/someswara-rao-tellakula</a>
              </div>
            </div>
          </section>
        )
      case 'home':
      default:
        return (
          <section className="hero section-shell page-shell">
            <div className="hero-copy animate-float">
              <div className="eyebrow-row">
                <span className="eyebrow">Backend engineering · cloud · AI systems</span>
              </div>
              <h1>{profile.name}</h1>
              <p className="headline">{profile.role}</p>
              <p className="summary">{profile.summary}</p>
              <div className="cta-row">
                <button type="button" className="primary-btn" onClick={() => setCurrentPage('projects')}>
                  View work
                </button>
                <button type="button" className="secondary-btn" onClick={() => setCurrentPage('contact')}>
                  Contact
                </button>
              </div>
            </div>

            <div className="hero-visual animate-float">
              <div className="profile-frame">
                <img src={profilePhoto} alt={profile.name} />
              </div>

              <aside className="hero-panel">
                <div className="mini-stat">
                  <span>Focus</span>
                  <strong>Applied AI & systems</strong>
                </div>
                <div className="mini-stat">
                  <span>Location</span>
                  <strong>{profile.location}</strong>
                </div>
                <div className="mini-stat">
                  <span>Profile</span>
                  <strong>Engineer + builder</strong>
                </div>
              </aside>
            </div>
          </section>
        )
    }
  }

  return (
    <div className={`portfolio-shell ${theme === 'dark' ? 'theme-dark' : 'theme-light'} ${effectsOn ? 'effects-on' : 'effects-off'}`}>
      <canvas ref={canvasRef} className="background-canvas" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="topbar">
        <button type="button" className="brand" onClick={() => setCurrentPage('home')}>
          Someswara Rao
        </button>

        <nav className="main-nav">
          <button type="button" className={currentPage === 'home' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('home')}>Home</button>
          <button type="button" className={currentPage === 'projects' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('projects')}>Projects</button>
          <button type="button" className={currentPage === 'research' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('research')}>Skills</button>
          <button type="button" className={currentPage === 'about' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('about')}>Education</button>
          <button type="button" className={currentPage === 'contact' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('contact')}>Contact</button>
        </nav>

        <div className="topbar-actions">
          <button type="button" className="ghost-button" onClick={() => setEffectsOn((value) => !value)}>
            Effects: {effectsOn ? 'full' : 'low'}
          </button>
          <button type="button" className="icon-button" onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button type="button" className="ghost-button" onClick={() => setViewMode((value) => (value === 'human' ? 'json' : 'human'))}>
            {viewMode === 'human' ? 'Data view' : 'Human view'}
          </button>
        </div>
      </header>

      <main className="page-content">
        <div key={currentPage + viewMode} className="page-shell-wrap">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}

export default App
