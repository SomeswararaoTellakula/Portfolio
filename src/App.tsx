import { useEffect, useRef, useState } from 'react'
import profilePhoto from '../PIC.jpg'
import { achievements, beyondCode, education, profile, projects, research, skills } from './content'
import './App.css'

type ThemeMode = 'dark' | 'light'
type ViewMode = 'human' | 'json'
type PageKey = 'home' | 'work' | 'research' | 'stack' | 'about' | 'contact'

function App() {
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [viewMode, setViewMode] = useState<ViewMode>('human')
  const [effectsOn, setEffectsOn] = useState(true)
  const [currentPage, setCurrentPage] = useState<PageKey>('home')
  const [copiedEmail, setCopiedEmail] = useState(false)
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      setCopiedEmail(false)
    }
  }

  const renderPage = () => {
    if (viewMode === 'json') {
      return (
        <section className="section-shell json-shell page-shell">
          <div className="section-heading">
            <p className="eyebrow">Portfolio JSON</p>
            <h2>Structured profile data</h2>
          </div>
          <pre>{JSON.stringify({ profile, projects, research, skills, education, achievements, beyondCode }, null, 2)}</pre>
        </section>
      )
    }

    switch (currentPage) {
      case 'work':
        return (
          <section className="section-shell page-shell">
            <div className="section-heading">
              <p className="eyebrow">Work</p>
              <h2>Projects that turn messy real-world input into structured, usable signal.</h2>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.name} className="project-card animate-float">
                  <div className="project-header">
                    <p className="project-type">{project.type}</p>
                    {project.award ? <span className="project-badge">{project.award}</span> : <span className="project-badge">{project.demo}</span>}
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="impact-box">{project.numbers}</div>
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
              <p className="eyebrow">Research</p>
              <h2>Published ideas and technical writing.</h2>
            </div>
            <div className="research-list research-plain">
              {research.map((item) => (
                <article key={item.title} className="research-card animate-float">
                  <h3>{item.title}</h3>
                  <p className="research-authors"><strong>Tellakula Someswararao</strong> and collaborators</p>
                  <p className="research-meta">{item.status}</p>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </section>
        )
      case 'stack':
        return (
          <section className="section-shell page-shell">
            <div className="section-heading">
              <p className="eyebrow">Stack</p>
              <h2>Connected skills mapped to the projects that use them.</h2>
            </div>
            <div className="stack-grid stack-page-grid">
              {skills.map((group) => (
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
              <p className="eyebrow">About</p>
              <h2>Education and the path behind the work.</h2>
            </div>
            <div className="about-layout">
              <div className="story-box animate-float">
                <p>{profile.summary}</p>
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
            <div className="timeline-wrap">
              <h3>Achievements</h3>
              <div className="timeline">
                {achievements.map((item) => (
                  <div key={`${item.year}-${item.title}`} className="timeline-item animate-float">
                    <span className="timeline-year">{item.year}</span>
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="beyond-box animate-float">
              <h3>Beyond code</h3>
              <ul>
                {beyondCode.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        )
      case 'contact':
        return (
          <section className="section-shell page-shell contact-shell">
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2>Let’s build something.</h2>
            </div>
            <div className="contact-panel animate-float">
              <div className="contact-card primary-card">
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <button type="button" className="copy-email" onClick={handleCopyEmail}>
                  {copiedEmail ? 'Copied' : 'Copy email'}
                </button>
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
                <span className="eyebrow">Backend systems · computer vision · data-driven products</span>
              </div>
              <h1>{profile.name}</h1>
              <p className="headline">{profile.role}</p>
              <p className="summary">{profile.subline}</p>
              <div className="cta-row">
                <button type="button" className="primary-btn" onClick={() => setCurrentPage('work')}>
                  See my work
                </button>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="secondary-btn">
                  Download résumé
                </a>
              </div>
              <p className="small-note">{profile.openTo}</p>
            </div>

            <div className="hero-visual animate-float">
              <div className="profile-frame">
                <img src={profilePhoto} alt={profile.name} />
              </div>

              <aside className="hero-panel">
                <div className="mini-stat">
                  <span>Focus</span>
                  <strong>Backend engineering</strong>
                </div>
                <div className="mini-stat">
                  <span>Location</span>
                  <strong>{profile.location}</strong>
                </div>
                <div className="mini-stat">
                  <span>Study</span>
                  <strong>Vasavi + IIT Madras</strong>
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
          <button type="button" className={currentPage === 'work' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('work')}>Work</button>
          <button type="button" className={currentPage === 'research' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('research')}>Research</button>
          <button type="button" className={currentPage === 'stack' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('stack')}>Stack</button>
          <button type="button" className={currentPage === 'about' ? 'nav-item active' : 'nav-item'} onClick={() => setCurrentPage('about')}>About</button>
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
