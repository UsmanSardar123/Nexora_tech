
import { Link } from 'react-router-dom'
import AnimatedEyebrow from '../../animations/AnimatedEyebrow.jsx'
import AnimatedHeading from '../../animations/AnimatedHeading.jsx'
import Pressable from '../../animations/Pressable.jsx'
import Reveal from '../../animations/Reveal.jsx'
import RevealGroup from '../../animations/RevealGroup.jsx'
import { scaleIn } from '../../animations/variants.js'
import { homeHeadings, projects } from '../../data/homeData.js'

function TaskPreview() {
  return (
    <div className="nx-project-ui nx-task-ui">
      <div className="nx-ui-topbar">
        <span className="nx-ui-brand"><i /> TaskFlow</span>
        <span className="nx-ui-avatar">U</span>
      </div>
      <div className="nx-task-layout">
        <aside className="nx-task-sidebar">
          <span className="active">▦ Overview</span>
          <span>□ My Tasks</span>
          <span>◷ Schedule</span>
          <span>⚙ Settings</span>
        </aside>
        <div className="nx-task-main">
          <div className="nx-ui-greeting">
            <strong>My Workspace</strong>
            <small>Stay on top of your work</small>
          </div>
          <div className="nx-task-summary">
            <div><small>Total Tasks</small><strong>24</strong></div>
            <div><small>Completed</small><strong>18</strong></div>
            <div><small>In Progress</small><strong>06</strong></div>
          </div>
          <div className="nx-ui-panel">
            <strong>Today's Tasks</strong>
            <div className="nx-task-row">
              <i className="done" /><span>Design homepage</span><small>Done</small>
            </div>
            <div className="nx-task-row">
              <i /><span>Build dashboard</span><small>Active</small>
            </div>
            <div className="nx-task-row">
              <i /><span>Review components</span><small>Pending</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ExpensePreview() {
  return (
    <div className="nx-project-ui nx-expense-ui">
      <div className="nx-ui-topbar">
        <span className="nx-ui-brand"><i /> FinTrack</span>
        <span className="nx-ui-avatar">U</span>
      </div>
      <div className="nx-expense-main">
        <div className="nx-ui-greeting">
          <strong>Financial Overview</strong>
          <small>Manage your money smarter</small>
        </div>
        <div className="nx-balance-card">
          <small>Total Balance</small>
          <strong>$8,450.00</strong>
          <span>↑ 12.8% this month</span>
        </div>
        <div className="nx-expense-stats">
          <div><small>Income</small><strong>+$4,200</strong></div>
          <div><small>Expenses</small><strong>-$1,750</strong></div>
        </div>
        <div className="nx-ui-panel nx-transactions">
          <strong>Recent Transactions</strong>
          <div><i className="food">●</i><span>Groceries</span><b>-$85</b></div>
          <div><i className="shopping">●</i><span>Shopping</span><b>-$120</b></div>
          <div><i className="income">●</i><span>Salary</span><b>+$2,400</b></div>
        </div>
      </div>
    </div>
  )
}

function EcommercePreview() {
  return (
    <div className="nx-project-ui nx-shop-ui">
      <div className="nx-shop-nav">
        <strong>nexa<span>.</span></strong>
        <div>Home&nbsp;&nbsp; Shop&nbsp;&nbsp; Collections</div>
        <span>⌕ &nbsp; ♡ &nbsp; ♧</span>
      </div>
      <div className="nx-shop-hero">
        <div className="nx-shop-copy">
          <small>NEW COLLECTION</small>
          <strong>Style that<br />speaks for you.</strong>
          <span>Discover the latest arrivals.</span>
          <b>SHOP NOW →</b>
        </div>
        <div className="nx-shop-product">
          <div className="nx-product-shape">
            <span />
          </div>
          <small>NEW ARRIVAL</small>
        </div>
      </div>
      <div className="nx-shop-bottom">
        <strong>Featured Products</strong>
        <div className="nx-product-grid">
          <div><i className="product-one" /><span>Classic Essentials</span><b>$49.00</b></div>
          <div><i className="product-two" /><span>Everyday Collection</span><b>$65.00</b></div>
          <div><i className="product-three" /><span>Modern Design</span><b>$39.00</b></div>
        </div>
      </div>
    </div>
  )
}

function PortfolioPreview() {
  return (
    <div className="nx-project-ui nx-portfolio-ui">
      <div className="nx-portfolio-nav">
        <strong>Alex Morgan<span>.</span></strong>
        <div>Home&nbsp;&nbsp; About&nbsp;&nbsp; Work&nbsp;&nbsp; Contact</div>
      </div>
      <div className="nx-portfolio-hero">
        <div>
          <small>CREATIVE DEVELOPER</small>
          <strong>Designing digital<br />experiences that<br /><span>make an impact.</span></strong>
          <p>Building thoughtful digital products<br />with creativity and technology.</p>
          <b>EXPLORE MY WORK ↗</b>
        </div>
        <div className="nx-portfolio-art">
          <div className="nx-art-circle" />
          <div className="nx-art-square">AM</div>
        </div>
      </div>
      <div className="nx-portfolio-bottom">
        <span>SELECTED PROJECTS</span>
        <strong>01 &nbsp; Digital Experiences</strong>
        <strong>02 &nbsp; Web & Interface Design</strong>
      </div>
    </div>
  )
}

const previewComponents = [
  TaskPreview,
  ExpensePreview,
  EcommercePreview,
  PortfolioPreview,
]

function ProjectPreview({ project, index }) {
  const Preview = previewComponents[index] || TaskPreview

  return (
    <div
      className={`nx-work-image nx-work-preview--${index + 1}`}
      role="img"
      aria-label={`Illustrative ${project.category} interface concept for ${project.title}`}
    >
      <Preview />
      <span aria-hidden="true" className="nx-preview-note">
        Illustrative UI concept
      </span>
    </div>
  )
}

function OurWork() {
  return (
    <section className="nx-work nx-section" id="nx-work">
      <div className="nx-section-top">
        <Reveal className="nx-section-heading">
          <AnimatedEyebrow>PORTFOLIO CONCEPTS</AnimatedEyebrow>
          <AnimatedHeading text={homeHeadings.work} tag="h2" />
          <p>Illustrative interface concepts for common digital products.</p>
        </Reveal>

        <Reveal direction="up">
          <Pressable>
            <Link className="nx-btn nx-btn-outline" to="/about">
              Learn About Nexora <span aria-hidden="true">&rarr;</span>
            </Link>
          </Pressable>
        </Reveal>
      </div>

      <RevealGroup
        className="nx-work-grid"
        delayChildren={0.08}
        stagger={0.13}
        childVariants={scaleIn}
        interactive
      >
        {projects.map((project, index) => (
          <article className="nx-work-card" key={project.id}>
            <ProjectPreview project={project} index={index} />
            <div className="nx-work-info">
              <h3>{project.title}</h3>
              <span>{project.category} · Concept</span>
            </div>
          </article>
        ))}
      </RevealGroup>
    </section>
  )
}

export default OurWork
