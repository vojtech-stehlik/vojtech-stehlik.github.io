import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Code2,
  Camera,
  ExternalLink
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from './data';
import './index.css';

function App() {
  const { header, about, experience, education, skills, services, projects, contact } = portfolioData;
  const [selectedImage, setSelectedImage] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="portfolio-wrapper">
      <div className="background-glow"></div>
      
      <div className="portfolio-container">
        {/* Left Sticky Sidebar */}
        <header className="sidebar">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="sidebar-content">
            <motion.img 
              variants={fadeIn} 
              src="/profile.jpg" 
              alt="Profil" 
              className="profile-img" 
              onClick={() => setSelectedImage('/profile.jpg')}
            />
            <motion.h1 variants={fadeIn} className="name">{header.name}</motion.h1>
            <motion.h2 variants={fadeIn} className="title">{header.title}</motion.h2>
            <motion.p variants={fadeIn} className="bio">{about.text}</motion.p>
            
            <motion.nav variants={fadeIn} className="page-nav">
              <a href="#education"><span className="nav-line"></span> Vzdělání</a>
              <a href="#experience"><span className="nav-line"></span> Zkušenosti</a>
              <a href="#projects"><span className="nav-line"></span> Projekty</a>
              <a href="#services"><span className="nav-line"></span> Služby</a>
            </motion.nav>

            <motion.div variants={fadeIn} className="social-links">
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin size={22} />
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} aria-label="E-mail">
                  <Mail size={22} />
                </a>
              )}
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub size={22} />
                </a>
              )}
            </motion.div>
          </motion.div>
        </header>

        {/* Right Scrollable Content */}
        <main className="content">
          
          {/* Vzdělání */}
          <motion.section 
            id="education"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="section-header">
              <h3 className="section-title">Vzdělání</h3>
            </motion.div>

            <div className="timeline">
              {education.map((edu) => (
                <motion.div variants={fadeIn} key={edu.id} className="timeline-item group">
                  <div className="timeline-date">{edu.period}</div>
                  <div className="timeline-content">
                    <h4 className="timeline-role">{edu.school}</h4>
                    <p className="timeline-company" style={{marginBottom: "0.5rem"}}>{edu.degree}</p>
                    <p className="timeline-desc">{edu.title}</p>
                    {edu.subjects && (
                      <div style={{marginTop: "1.5rem"}}>
                        <p style={{fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem", fontWeight: 500}}>Výběr z absolvovaných předmětů:</p>
                        <div className="skills-row">
                          {edu.subjects.map(s => (
                            <span key={s.abbr} className="mini-skill subject-skill" data-tooltip={`${s.name}\n\n${s.desc}`}>
                              {s.abbr}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Pracovní Zkušenosti */}
          <motion.section 
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="section-header">
              <h3 className="section-title">Pracovní zkušenosti</h3>
            </motion.div>

            <div className="timeline">
              {experience.map((job) => (
                <motion.div variants={fadeIn} key={job.id} className="timeline-item group">
                  <div className="timeline-date">{job.period}</div>
                  <div className="timeline-content">
                    <h4 className="timeline-role">
                      {job.role} <span className="timeline-company">· {job.company}</span>
                    </h4>
                    <p className="timeline-desc">{job.description}</p>
                    <div className="skills-row">
                      {skills.slice(0, 5).map(s => <span key={s} className="mini-skill">{s}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Projekty */}
          <motion.section 
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="section-header">
              <h3 className="section-title">Vybrané projekty</h3>
            </motion.div>

            <div className="projects-grid">
              {projects.map((project) => (
                <motion.div variants={fadeIn} key={project.id} className="project-card group">
                  <div className="project-image-wrapper" onClick={() => setSelectedImage(project.image)}>
                    <img src={project.image} alt={project.title} className="project-image" />
                  </div>
                  <div className="project-content">
                    <h4 className="project-title">
                      {project.link && project.link !== "#" ? (
                        <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                          {project.title} <ExternalLink size={16} />
                        </a>
                      ) : (
                        project.title
                      )}
                    </h4>
                    <p className="project-desc">{project.description}</p>
                    <div className="skills-row">
                      {project.technologies.map(tech => <span key={tech} className="mini-skill">{tech}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Služby */}
          <motion.section 
            id="services"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="section-header">
              <h3 className="section-title">Služby</h3>
            </motion.div>
            
            <div className="services-grid">
              {services.map((service, i) => (
                <motion.a 
                  href={`mailto:${contact.email}?subject=Zájem o službu: ${service.title}`} 
                  variants={fadeIn} 
                  key={service.id} 
                  className="service-card group"
                  style={{textDecoration: 'none'}}
                >
                  <div className="service-icon-wrapper">
                    {i === 0 ? <Code2 className="icon" size={28} /> : <Camera className="icon" size={28} />}
                  </div>
                  <h4 className="service-name">{service.title}</h4>
                  <p className="service-desc">{service.description}</p>
                </motion.a>
              ))}
            </div>
          </motion.section>

        </main>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage} alt="Zvětšený náhled" />
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
