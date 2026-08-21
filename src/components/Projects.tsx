import Section from './Section'
import Reveal from './Reveal'
import { projects } from '../data/profile'

export default function Projects() {
  return (
    <Section id="projects" index="03" title="Selected Work">
      <div className="projects">
        {projects.map((project, i) => (
          <Reveal key={project.title} from={i % 2 === 0 ? 'left' : 'right'} amount={0.15}>
            <article className="project-card">
              <span className="project-index">{String(i + 1).padStart(2, '0')}</span>

              <header className="project-head">
                <h3>{project.title}</h3>
                <span className="project-context">{project.context}</span>
              </header>

              <div className="project-body">
                <div className="project-block">
                  <h4>The problem</h4>
                  <p>{project.problem}</p>
                </div>
                <div className="project-block">
                  <h4>What I built</h4>
                  <p>{project.approach}</p>
                </div>
              </div>

              <div className="project-metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="project-metric">
                    <span className="project-metric-value">{metric.value}</span>
                    <span className="project-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="project-tech">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
