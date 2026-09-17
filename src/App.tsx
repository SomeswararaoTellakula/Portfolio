import { useEffect, useRef, useState } from 'react'
import './App.css'

type ThemeMode = 'dark' | 'light'
type ViewMode = 'human' | 'json'

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
  name: 'Someswara Rao Tellakula',
  role: 'Computer Vision / Backend Systems Engineer',
  location: 'Hyderabad, India',
  email: 'someshtellakula@gmail.com',
  github: 'https://github.com/SomeswararaoTellakula',
  linkedin: 'https://www.linkedin.com/in/someswara-rao-tellakula',
  summary:
    'I build products that turn raw data into useful, measurable workflows across backend systems, real-time analytics, and applied computer vision.',
}

const projects: Project[] = [
  {
    name: 'Portfolio',
    type: 'Personal portfolio site',
    summary:
      'A portfolio website designed to present my experience, projects, and technical focus in a clean, structured format.',
    impact: 'Showcases expertise and project work in a reusable, public-facing profile.',
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    name: 'DeepFit',
    type: 'Vision-led fitness intelligence',
    summary:
      'A computer-vision product focused on athlete movement analysis and posture feedback for technique improvement and performance monitoring.',
    impact: 'Improves movement analysis accuracy and reduces manual observation overhead.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'FastAPI'],
  },
  {
    name: 'Crowd_Detection',
    type: 'Crowd monitoring system',
    summary:
      'A crowd density detection workflow designed to identify high-traffic areas and support situational awareness through visual analytics.',
    impact: 'Helps monitor crowd patterns and improve public-safety insights.',
    stack: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
  },
  {
    name: 'sstaxmentor',
    type: 'Mentorship / tax guidance platform',
    summary:
      'A practical web application for tax-related guidance and user learning support with a simple front-end experience.',
    impact: 'Makes information access more approachable for users seeking guided financial education.',
    stack: ['JavaScript', 'React', 'Node.js'],
  },
  {
    name: 'Task-Tracker',
    type: 'Task and time management app',
    summary:
      'A personal task organization app focused on planning, productivity, and simple frontend-driven workflow management.',
    impact: 'Helps organize daily work and improves time and task visibility.',
    stack: ['JavaScript', 'Frontend', 'Productivity'],
  },
  {
    name: 'Email-triage_scalar',
    type: 'Intelligent email workflow',
    summary:
      'An email triage project designed to accelerate prioritization and classification of incoming messages using automation principles.',
    impact: 'Improves response efficiency and streamlines triage for high-volume communication.',
    stack: ['Python', 'Automation', 'AI'],
  },
  {
    name: 'Intelligent-GST-Reconciliation-Using-Knowledge-Graphs',
    type: 'Knowledge-graph reconciliation solution',
    summary:
      'A GST reconciliation system leveraging knowledge graphs to improve financial data matching and auditing workflows.',
    impact: 'Supports more structured and dependable reconciliation decisions.',
    stack: ['R', 'Knowledge Graphs', 'Data Reconciliation'],
  },
  {
    name: 'FOOD-SERVICES',
    type: 'Food service delivery system',
    summary:
      'An integrated food services delivery application intended to streamline service ordering and operational coordination.',
    impact: 'Supports a smoother digital ordering and service experience.',
    stack: ['JavaScript', 'Backend', 'Web App'],
  },
  {
    name: 'Adobe',
    type: 'Creative tooling experiment',
    summary:
      'A project exploring design-oriented tooling and creative workflow patterns inspired by Adobe-style product experiences.',
    impact: 'Strengthens design thinking and rapid prototyping capability.',
    stack: ['Python', 'Design', 'Creative Tech'],
  },
  {
    name: 'Dynamo',
    type: 'General-purpose project',
    summary:
      'A repository focused on experimentation, prototype building, and exploring practical engineering concepts in a reusable setup.',
    impact: 'Encourages iteration and problem-solving across small technical experiments.',
    stack: ['Python', 'JavaScript', 'Prototype'],
  },
]

const research: ResearchItem[] = [
  {
    title: 'Computer vision for operational monitoring',
    note: 'Applied image understanding to problem spaces that benefit from continuous, evidence-based review.',
    tag: 'Vision',
  },
  {
    title: 'System design for human-in-the-loop automation',
    note: 'Designed workflows that combine model outputs with analyst review to improve confidence and actionability.',
    tag: 'Systems',
  },
  {
    title: 'Data-driven field operations',
    note: 'Mapped operational signals into dashboards, summaries, and alerts to support faster decisions.',
    tag: 'Analytics',
  },
]

const stackGroups = [
  {
    label: 'Core',
    items: ['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js'],
  },
  {
    label: 'ML / Vision',
    items: ['OpenCV', 'NumPy', 'MediaPipe', 'YOLO', 'TensorFlow'],
  },
  {
    label: 'Backend',
    items: ['FastAPI', 'Flask', 'PostgreSQL', 'REST APIs'],
  },
  {
    label: 'Product',
    items: ['Figma', 'Dash', 'Analytics', 'Diagnostics'],
  },
]

const education = [
  {
    title: 'B.Tech in Computer Science & Engineering',
    place: 'G. Pulla Reddy Engineering College',
    detail: 'Focused on systems, algorithms, and applied software engineering.',
  },
  {
    title: 'CGPA',
    place: '8.7 / 10',
    detail: 'Academic performance aligned with strong engineering discipline and technical consistency.',
  },
]

const honors = [
  'Awarded for technical excellence and project execution',
  'Recognized for leadership and active contribution in campus initiatives',
  'Participated in NSS and community-led learning activities',
]

function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [viewMode, setViewMode] = useState<ViewMode>('human')
  const [effectsOn, setEffectsOn] = useState(true)
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

      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--signal')
        .trim()
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

  return (
    <div className={`portfolio-shell ${theme === 'dark' ? 'theme-dark' : 'theme-light'} ${effectsOn ? 'effects-on' : 'effects-off'}`}>
      <canvas ref={canvasRef} className="background-canvas" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="topbar">
        <a href="#home" className="brand">
          Someswara Rao
        </a>

        <nav className="main-nav">
          <a href="#work">Work</a>
          <a href="#research">Research</a>
          <a href="#stack">Stack</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="topbar-actions">
          <button type="button" className="ghost-button" onClick={() => setEffectsOn((value) => !value)}>
            Effects: {effectsOn ? 'full' : 'low'}
          </button>
          <button type="button" className="icon-button" onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}>
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button type="button" className="ghost-button" onClick={() => setViewMode((value) => (value === 'human' ? 'json' : 'human'))}>
            {viewMode === 'human' ? 'Human / JSON' : 'JSON / Human'}
          </button>
        </div>
      </header>

      <main className="page-content">
        {viewMode === 'human' ? (
          <>
            <section id="home" className="hero section-shell">
              <div className="eyebrow-row">
                <span className="eyebrow">Backend systems · computer vision · product thinking</span>
              </div>

              <div className="hero-copy">
                <h1>{profile.name}</h1>
                <p className="headline">{profile.role}</p>
                <p className="summary">{profile.summary}</p>
                <div className="cta-row">
                  <a href="#work" className="primary-btn">
                    View work
                  </a>
                  <a href={`mailto:${profile.email}`} className="secondary-btn">
                    Contact
                  </a>
                </div>
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
            </section>

            <section id="work" className="section-shell">
              <div className="section-heading">
                <p className="eyebrow">Selected work</p>
                <h2>Systems that convert complexity into action.</h2>
              </div>

              <div className="project-grid">
                {projects.map((project) => (
                  <article key={project.name} className="project-card">
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

            <section id="research" className="section-shell">
              <div className="section-heading">
                <p className="eyebrow">Research + thinking</p>
                <h2>Grounded in data, tuned for outcomes.</h2>
              </div>

              <div className="research-list">
                {research.map((item) => (
                  <article key={item.title} className="research-card">
                    <span className="research-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="stack" className="section-shell">
              <div className="section-heading">
                <p className="eyebrow">Stack</p>
                <h2>Tech built for product and operational clarity.</h2>
              </div>

              <div className="stack-grid">
                {stackGroups.map((group) => (
                  <div key={group.label} className="stack-group">
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

            <section id="about" className="section-shell about-section">
              <div className="section-heading">
                <p className="eyebrow">About</p>
                <h2>Engineer-first, problem-first.</h2>
              </div>

              <div className="about-layout">
                <div className="story-box">
                  <p>
                    I’m a developer focused on software that helps teams understand reality faster and act on the right signal.
                    My work blends backend systems, applied computer vision, and operational dashboards to solve real-world problems with measurable impact.
                  </p>
                </div>

                <div className="education-box">
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
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="contact" className="section-shell contact-shell">
              <div className="section-heading">
                <p className="eyebrow">Contact</p>
                <h2>Let’s build something useful.</h2>
              </div>

              <div className="contact-row">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </section>
          </>
        ) : (
          <section className="section-shell json-shell">
            <div className="section-heading">
              <p className="eyebrow">Portfolio JSON</p>
              <h2>Structured profile data</h2>
            </div>
            <pre>{JSON.stringify({ profile, projects, research, stackGroups, education, honors }, null, 2)}</pre>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
