import { useEffect, useMemo, useState } from 'react'
import { achievements, education, profile, projects, research, skills } from './content'
import './App.css'

type ShiftMode = 'day' | 'night'

type MonitorChannel = {
  id: string
  code: string
  name: string
  stack: string[]
  summary: string
  metric: string
  signal: string
  tone: 'info' | 'alert' | 'critical'
}

const monitorChannels: MonitorChannel[] = [
  {
    id: 'deepfit',
    code: 'CH 01',
    name: 'DeepFit AI',
    stack: ['Flask', 'MongoDB', 'YOLOv8', 'MediaPipe', 'OpenCV', 'Kotlin'],
    summary:
      'Built the Flask REST API and MongoDB schema for athlete profiles, video submissions and per-rep scoring across 4 fitness tests. Implemented pose-keypoint rep counting with joint-angle validation, live form-quality feedback, and liveness checks that reject tampered submissions.',
    metric: '4 tests • live feedback',
    signal: 'strong',
    tone: 'info',
  },
  {
    id: 'crowdguard',
    code: 'CH 02',
    name: 'CrowdGuard',
    stack: ['Flask', 'YOLO', 'OpenCV', 'PyTorch', 'MongoDB'],
    summary:
      'Designed a two-server architecture separating ML inference from video streaming, exposing 8 REST endpoints for camera management, MJPEG streaming and analysis history. Implemented density-based risk classification and a 5-second reconnect fallback under load.',
    metric: '8 endpoints • 15 FPS',
    signal: 'watch',
    tone: 'alert',
  },
  {
    id: 'sitelens',
    code: 'CH 03',
    name: 'SiteLens',
    stack: ['Python', 'requests', 'BeautifulSoup4', 'lxml'],
    summary:
      'Architected 6 composable audit modules for reachability, structured data, accessibility, freshness and engagement. The crawl layer enforces robots.txt, handles retry backoff and compiles deterministic JSON under a 2-minute runtime budget.',
    metric: '6 modules • 20 pages',
    signal: 'stable',
    tone: 'info',
  },
  {
    id: 'dark-pattern',
    code: 'CH 04',
    name: 'Dark Pattern Detector',
    stack: ['Chrome Extension', 'UX Audit', 'Research'],
    summary:
      'A browser extension that scans a page for manipulative design patterns such as pre-selected actions, false urgency and deceptive flows, and scores the level of risk in each category.',
    metric: 'in progress',
    signal: 'draft',
    tone: 'critical',
  },
]

function App() {
  const [shiftMode, setShiftMode] = useState<ShiftMode>('day')
  const [cleanFeed, setCleanFeed] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [activeChannel, setActiveChannel] = useState(0)
  const [signalLevel, setSignalLevel] = useState(0.48)
  const [clock, setClock] = useState(new Date())
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 100)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0
      setSignalLevel(Math.max(0.18, Math.min(1, 0.26 + ratio)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeProject = monitorChannels[activeChannel]

  const timecode = useMemo(() => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    }).format(clock)
  }, [clock])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      setCopiedEmail(false)
    }
  }

  return (
    <div className={`control-room room-${shiftMode} ${cleanFeed ? 'clean-feed' : ''}`}>
      <div className="noise-layer" aria-hidden="true" />

      <header className="top-strip">
        <div className="brand-block">
          <span className="brand-tag">operator</span>
          <h1>{profile.name}</h1>
        </div>

        <div className="console-controls">
          <button type="button" className="shift-toggle" onClick={() => setShiftMode((value) => (value === 'day' ? 'night' : 'day'))}>
            {shiftMode === 'day' ? 'day shift' : 'night shift'}
          </button>
          <button type="button" className="feed-toggle" onClick={() => setCleanFeed((value) => !value)}>
            {cleanFeed ? 'control room' : 'clean feed'}
          </button>
        </div>
      </header>

      <main className="room-shell">
        <section className="monitor-wall" aria-label="Project monitor wall">
          <div className="main-monitor monitor-frame">
            <div className="monitor-header">
              <span>{activeProject.code}</span>
              <span className="monitor-dot">REC</span>
            </div>

            <div className="camera-screen">
              <div className="burn-in burn-name">{activeProject.name}</div>
              <div className="burn-in burn-time">{timecode}</div>

              <div className={`camera-feed camera-${activeProject.id}`}>
                {activeProject.id === 'deepfit' && (
                  <>
                    <div className="pose-stick">
                      <span className="bone bone-head" />
                      <span className="bone bone-neck" />
                      <span className="bone bone-body" />
                      <span className="bone bone-arm-left" />
                      <span className="bone bone-arm-right" />
                      <span className="bone bone-leg-left" />
                      <span className="bone bone-leg-right" />
                    </div>
                    <div className="feed-readout">knee angle 132° · rep 03</div>
                  </>
                )}

                {activeProject.id === 'crowdguard' && (
                  <>
                    <div className="crowd-grid">
                      {Array.from({ length: 12 * 8 }).map((_, index) => (
                        <span key={index} className="grid-cell" />
                      ))}
                    </div>
                    <div className="risk-lamp risk-lamp-warning">moderate</div>
                  </>
                )}

                {activeProject.id === 'sitelens' && (
                  <div className="audit-panel">
                    <div className="audit-row">
                      <span>URL</span>
                      <strong>portfolio.example</strong>
                    </div>
                    <div className="audit-grid">
                      <span>robots</span>
                      <span>meta</span>
                      <span>schema</span>
                      <span>alt</span>
                    </div>
                  </div>
                )}

                {activeProject.id === 'dark-pattern' && (
                  <div className="scan-overlay">
                    <div className="scan-line" />
                    <div className="highlight-box highlight-one" />
                    <div className="highlight-box highlight-two" />
                    <div className="highlight-box highlight-three" />
                  </div>
                )}
              </div>
            </div>

            <div className="monitor-lower">
              <div className="readout-card">
                <span>{activeProject.signal}</span>
                <strong>{activeProject.metric}</strong>
              </div>

              <div className="case-file">
                <h2>case file</h2>
                <p>{activeProject.summary}</p>
                <div className="chip-list">
                  {activeProject.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="side-monitors">
            {monitorChannels.map((channel, index) => (
              <button
                key={channel.id}
                type="button"
                className={`mini-monitor monitor-frame ${index === activeChannel ? 'active' : ''}`}
                onClick={() => setActiveChannel(index)}
              >
                <span>{channel.code}</span>
                <strong>{channel.name}</strong>
              </button>
            ))}
          </div>
        </section>

        <aside className="console-strip" aria-label="Console strip">
          <div className="console-chunk clock-block">
            <span>timecode</span>
            <strong>{timecode}</strong>
          </div>

          <div className="console-chunk status-block">
            <span className="status-lamp" />
            <span>on shift · open to 2027 roles</span>
          </div>

          <div className="console-chunk meter-block">
            <span>signal</span>
            <div className="meter">
              <span style={{ width: `${signalLevel * 100}%` }} />
            </div>
          </div>

          <div className="console-chunk switch-block">
            <button type="button" className="mini-toggle" onClick={() => setSoundOn((value) => !value)}>
              {soundOn ? 'sound on' : 'sound off'}
            </button>
            <button type="button" className="mini-toggle" onClick={() => setCleanFeed((value) => !value)}>
              {cleanFeed ? 'room' : 'clean'}
            </button>
          </div>

          <div className="console-chunk rec-block">
            <button type="button" className="rec-button" onClick={() => window.alert('REC still saved to the desk tray.')}>REC</button>
          </div>
        </aside>

        <div className="gaffer-strip">
          backend + computer vision · Hyderabad · B.E. IT, Vasavi College of Engineering, 2027
        </div>
      </main>

      <section className="panel-section channel-panel">
        <div className="section-header">
          <p>Channels</p>
          <h2>project feed</h2>
        </div>

        <div className="channel-list">
          {projects.map((project, index) => (
            <button
              key={project.name}
              type="button"
              className={`channel-item ${index === activeChannel ? 'selected' : ''}`}
              onClick={() => setActiveChannel(index)}
            >
              <span>{project.name}</span>
              <small>{project.type}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="panel-section archive-panel">
        <div className="section-header">
          <p>Archive</p>
          <h2>tapes & papers</h2>
        </div>

        <div className="archive-grid">
          {research.map((item) => (
            <article key={item.title} className="tape-card">
              <div className="tape-label">tape</div>
              <h3>{item.title}</h3>
              <p>{item.status}</p>
              <small>{item.summary}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel-section patch-panel">
        <div className="section-header">
          <p>Patch bay</p>
          <h2>skills matrix</h2>
        </div>

        <div className="patch-grid">
          {skills.map((group) => (
            <div key={group.label} className="patch-group">
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

      <section className="panel-section roster-panel">
        <div className="section-header">
          <p>Duty roster</p>
          <h2>education</h2>
        </div>

        <div className="roster-grid">
          {education.map((item) => (
            <div key={item.title} className="roster-item">
              <span>{item.years}</span>
              <strong>{item.title}</strong>
              <small>{item.place}</small>
              <em>{item.detail}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-section award-panel">
        <div className="section-header">
          <p>Commendations</p>
          <h2>wins</h2>
        </div>

        <div className="badge-grid">
          {achievements.map((item) => (
            <div key={`${item.year}-${item.title}`} className="badge-item">
              <span>{item.year}</span>
              <strong>{item.title}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-section about-panel">
        <div className="section-header">
          <p>Off duty</p>
          <h2>notes on the wall</h2>
        </div>

        <div className="note-box">
          <p>{profile.summary}</p>
          <ul>
            <li>NSS volunteer: social awareness programmes, blood donation drives, rural development.</li>
            <li>Languages: English (fluent), Telugu (native), Hindi (intermediate).</li>
            <li>Interests: backend engineering, cloud computing, competitive programming.</li>
          </ul>
        </div>
      </section>

      <section className="panel-section contact-panel">
        <div className="section-header">
          <p>End of shift</p>
          <h2>want to talk?</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-box primary-box">
            <span>Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button type="button" className="copy-button" onClick={handleCopyEmail}>
              {copiedEmail ? 'copied' : 'copy'}
            </button>
          </div>
          <div className="contact-box">
            <span>GitHub</span>
            <a href={profile.github} target="_blank" rel="noreferrer">github.com/SomeswararaoTellakula</a>
          </div>
          <div className="contact-box">
            <span>LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/someswara-rao-tellakula</a>
          </div>
          <div className="contact-box">
            <span>Résumé</span>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">download file</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        operated by {profile.name} · Hyderabad · 2026
      </footer>
    </div>
  )
}

export default App
