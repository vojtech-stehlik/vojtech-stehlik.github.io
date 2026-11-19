import React, { forwardRef, useMemo } from 'react';
import { Mail, Globe, Code2 } from 'lucide-react';
import { CvBackgroundDesign } from './CvBackgroundDesign';

function formatLinkLabel(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    const cleanHost = parsed.hostname.replace(/^www\./, '');
    const cleanPath = decodeURIComponent(parsed.pathname).replace(/\/$/, '');
    if (!cleanPath) return cleanHost;
    return `${cleanHost}${cleanPath.length > 26 ? cleanPath.slice(0, 26) + '…' : cleanPath}`;
  } catch {
    return url.replace(/^https?:\/\//, '');
  }
}

function getPalette(theme) {
  switch (theme) {
    case 'midnight':
      return {
        isDarkMain: true,
        isDarkSidebar: true,
        sidebarText: '#f1f5f9',
        sidebarMuted: '#94a3b8',
        sidebarHeading: '#38bdf8',
        sidebarDivider: 'rgba(56, 189, 248, 0.2)',
        sidebarTagBg: 'rgba(56, 189, 248, 0.1)',
        sidebarTagBorder: 'rgba(56, 189, 248, 0.24)',
        sidebarTagText: '#e0f2fe',
        mainTitle: '#f8fafc',
        mainSubtitle: '#38bdf8',
        mainText: '#cbd5e1',
        mainMuted: '#94a3b8',
        mainHeading: '#38bdf8',
        mainHeadingRule: 'rgba(56, 189, 248, 0.22)',
        cardBg: 'rgba(17, 28, 51, 0.52)',
        cardBorder: 'rgba(148, 163, 184, 0.16)',
        accent: '#38bdf8',
        techText: '#7dd3fc',
        dateText: '#94a3b8',
        photoBorder: 'rgba(56, 189, 248, 0.45)',
      };
    case 'topo':
      return {
        isDarkMain: false,
        isDarkSidebar: true,
        sidebarText: '#f4f4f5',
        sidebarMuted: '#a1a1aa',
        sidebarHeading: '#38bdf8',
        sidebarDivider: 'rgba(255, 255, 255, 0.12)',
        sidebarTagBg: 'rgba(255, 255, 255, 0.06)',
        sidebarTagBorder: 'rgba(255, 255, 255, 0.14)',
        sidebarTagText: '#e4e4e7',
        mainTitle: '#18181b',
        mainSubtitle: '#0284c7',
        mainText: '#3f3f46',
        mainMuted: '#71717a',
        mainHeading: '#18181b',
        mainHeadingRule: 'rgba(24, 24, 27, 0.14)',
        cardBg: 'rgba(255, 255, 255, 0.72)',
        cardBorder: 'rgba(24, 24, 27, 0.1)',
        accent: '#0284c7',
        techText: '#0369a1',
        dateText: '#52525b',
        photoBorder: 'rgba(255, 255, 255, 0.22)',
      };
    case 'geometric':
      return {
        isDarkMain: false,
        isDarkSidebar: false,
        sidebarText: '#0f172a',
        sidebarMuted: '#475569',
        sidebarHeading: '#0369a1',
        sidebarDivider: 'rgba(15, 23, 42, 0.1)',
        sidebarTagBg: 'rgba(255, 255, 255, 0.85)',
        sidebarTagBorder: 'rgba(3, 105, 161, 0.2)',
        sidebarTagText: '#0f172a',
        mainTitle: '#0f172a',
        mainSubtitle: '#0369a1',
        mainText: '#334155',
        mainMuted: '#64748b',
        mainHeading: '#0f172a',
        mainHeadingRule: 'rgba(15, 23, 42, 0.12)',
        cardBg: 'rgba(255, 255, 255, 0.86)',
        cardBorder: 'rgba(15, 23, 42, 0.09)',
        accent: '#0369a1',
        techText: '#0369a1',
        dateText: '#475569',
        photoBorder: '#ffffff',
      };
    case 'blueprint':
    default:
      return {
        isDarkMain: false,
        isDarkSidebar: true,
        sidebarText: '#f1f5f9',
        sidebarMuted: '#94a3b8',
        sidebarHeading: '#38bdf8',
        sidebarDivider: 'rgba(56, 189, 248, 0.2)',
        sidebarTagBg: 'rgba(56, 189, 248, 0.1)',
        sidebarTagBorder: 'rgba(56, 189, 248, 0.22)',
        sidebarTagText: '#e0f2fe',
        mainTitle: '#0f172a',
        mainSubtitle: '#0284c7',
        mainText: '#334155',
        mainMuted: '#64748b',
        mainHeading: '#0f172a',
        mainHeadingRule: 'rgba(15, 23, 42, 0.12)',
        cardBg: 'rgba(255, 255, 255, 0.78)',
        cardBorder: 'rgba(15, 23, 42, 0.09)',
        accent: '#0284c7',
        techText: '#0369a1',
        dateText: '#475569',
        photoBorder: 'rgba(56, 189, 248, 0.45)',
      };
  }
}

export const CvDocument = forwardRef(function CvDocument(
  { data, theme = 'blueprint', showPhoto = true, showSubjects = true },
  ref
) {
  const { header, about, experience, education, skills, projects, contact } = data;
  const p = getPalette(theme);

  // Deduplicate additional technologies mentioned across experience & projects
  const ecosystemTools = useMemo(() => {
    const coreLower = new Set(skills.map((s) => s.toLowerCase()));
    const seen = new Set();
    const result = [];

    const candidates = [
      ...experience.flatMap((job) => job.technologies || []),
      ...projects.flatMap((proj) => proj.technologies || []),
    ];

    const normalizeLabel = (raw) => {
      const trimmed = raw.trim();
      const lower = trimmed.toLowerCase();
      if (lower === 'docker') return 'Docker';
      if (lower === 'git') return 'Git';
      if (lower === 'lxc') return 'LXC';
      if (lower === 'type script') return 'TypeScript';
      if (lower === 'ffmpeg') return 'FFmpeg';
      if (lower === 'pgvector') return 'pgvector';
      return trimmed;
    };

    for (const raw of candidates) {
      const label = normalizeLabel(raw);
      const key = label.toLowerCase();
      if (!coreLower.has(key) && !seen.has(key) && key !== 'content id') {
        seen.add(key);
        result.push(label);
      }
    }
    return result.slice(0, 14);
  }, [skills, experience, projects]);

  const linkedinShort = useMemo(() => {
    if (!contact?.linkedin) return '';
    return 'linkedin.com/in/vojtech-stehlik';
  }, [contact?.linkedin]);

  const githubShort = useMemo(() => {
    if (!contact?.github) return '';
    return formatLinkLabel(contact.github);
  }, [contact?.github]);

  return (
    <div
      ref={ref}
      className="cv-sheet"
      data-cv-theme={theme}
    >
      {/* Full-bleed custom SVG designed background */}
      <CvBackgroundDesign theme={theme} />

      {/* Foreground structured A4 two-column layout */}
      <div className="cv-sheet-grid">
        {/* LEFT COLUMN (252px) */}
        <aside
          className="cv-left-col"
          style={{
            color: p.sidebarText,
            paddingTop: theme === 'geometric' ? '56px' : '38px',
          }}
        >
          {showPhoto && (
            <div className="cv-photo-wrap">
              <img
                src="/profile.jpg"
                alt={header.name}
                className="cv-photo"
                crossOrigin="anonymous"
                style={{ borderColor: p.photoBorder }}
              />
            </div>
          )}

          {/* Kontakt */}
          <div className="cv-side-block">
            <h3
              className="cv-side-heading"
              style={{ color: p.sidebarHeading, borderBottomColor: p.sidebarDivider }}
            >
              Kontakt
            </h3>
            <div className="cv-contact-list">
              {contact.email && (
                <div className="cv-contact-row" style={{ color: p.sidebarText }}>
                  <Mail size={12} color={p.sidebarHeading} className="cv-contact-icon" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.github && (
                <div className="cv-contact-row" style={{ color: p.sidebarText }}>
                  <Code2 size={12} color={p.sidebarHeading} className="cv-contact-icon" />
                  <span>{githubShort}</span>
                </div>
              )}
              {contact.linkedin && (
                <div className="cv-contact-row" style={{ color: p.sidebarText }}>
                  <Globe size={12} color={p.sidebarHeading} className="cv-contact-icon" />
                  <span>{linkedinShort}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profil / O mně */}
          <div className="cv-side-block">
            <h3
              className="cv-side-heading"
              style={{ color: p.sidebarHeading, borderBottomColor: p.sidebarDivider }}
            >
              Profil
            </h3>
            <p className="cv-side-bio" style={{ color: p.sidebarMuted }}>
              {about.text}
            </p>
          </div>

          {/* Klíčové dovednosti */}
          <div className="cv-side-block">
            <h3
              className="cv-side-heading"
              style={{ color: p.sidebarHeading, borderBottomColor: p.sidebarDivider }}
            >
              Klíčové dovednosti
            </h3>
            <div className="cv-side-skills-grid">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="cv-side-chip"
                  style={{
                    backgroundColor: p.sidebarTagBg,
                    borderColor: p.sidebarTagBorder,
                    color: p.sidebarTagText,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Technologie & Nástroje */}
          <div className="cv-side-block">
            <h3
              className="cv-side-heading"
              style={{ color: p.sidebarHeading, borderBottomColor: p.sidebarDivider }}
            >
              Technologie & Nástroje
            </h3>
            <p className="cv-side-tools" style={{ color: p.sidebarMuted }}>
              {ecosystemTools.join(' · ')}
            </p>
          </div>
        </aside>

        {/* RIGHT MAIN COLUMN (542px) */}
        <main className="cv-right-col">
          {/* Masthead */}
          <header className="cv-masthead" style={{ borderBottomColor: p.mainHeadingRule }}>
            <h1 className="cv-name" style={{ color: p.mainTitle }}>
              {header.name}
            </h1>
            <p className="cv-role" style={{ color: p.mainSubtitle }}>
              {header.title}
            </p>
          </header>

          {/* Pracovní zkušenosti */}
          <section className="cv-section">
            <div className="cv-section-head">
              <h2 className="cv-section-title" style={{ color: p.mainHeading }}>
                Pracovní zkušenosti
              </h2>
              <div className="cv-section-rule" style={{ backgroundColor: p.mainHeadingRule }} />
            </div>

            <div className="cv-entries">
              {experience.map((job) => (
                <article
                  key={job.id}
                  className="cv-entry-card"
                  style={{
                    backgroundColor: p.cardBg,
                    borderColor: p.cardBorder,
                  }}
                >
                  <div className="cv-entry-top">
                    <div className="cv-entry-headline">
                      <span className="cv-entry-title" style={{ color: p.mainTitle }}>
                        {job.role}
                      </span>
                      <span className="cv-entry-sep" style={{ color: p.mainMuted }}>
                        ·
                      </span>
                      <span className="cv-entry-org" style={{ color: p.accent }}>
                        {job.company}
                      </span>
                    </div>
                    <span className="cv-entry-date" style={{ color: p.dateText }}>
                      {job.period}
                    </span>
                  </div>
                  <p className="cv-entry-desc" style={{ color: p.mainText }}>
                    {job.description}
                  </p>
                  {job.technologies && job.technologies.length > 0 && (
                    <div className="cv-entry-tech" style={{ color: p.techText }}>
                      {job.technologies.join(' · ')}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Vybrané projekty */}
          <section className="cv-section">
            <div className="cv-section-head">
              <h2 className="cv-section-title" style={{ color: p.mainHeading }}>
                Vybrané projekty
              </h2>
              <div className="cv-section-rule" style={{ backgroundColor: p.mainHeadingRule }} />
            </div>

            <div className="cv-entries">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="cv-entry-card"
                  style={{
                    backgroundColor: p.cardBg,
                    borderColor: p.cardBorder,
                  }}
                >
                  <div className="cv-entry-top">
                    <span className="cv-entry-title" style={{ color: p.mainTitle }}>
                      {project.title}
                    </span>
                    {project.link && project.link !== '#' && (
                      <span className="cv-entry-link" style={{ color: p.accent }}>
                        {formatLinkLabel(project.link)}
                      </span>
                    )}
                  </div>
                  <p className="cv-entry-desc" style={{ color: p.mainText }}>
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="cv-entry-tech" style={{ color: p.techText }}>
                      {project.technologies.join(' · ')}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Vzdělání */}
          <section className="cv-section">
            <div className="cv-section-head">
              <h2 className="cv-section-title" style={{ color: p.mainHeading }}>
                Vzdělání
              </h2>
              <div className="cv-section-rule" style={{ backgroundColor: p.mainHeadingRule }} />
            </div>

            <div className="cv-entries">
              {education.map((edu) => (
                <article
                  key={edu.id}
                  className="cv-entry-card"
                  style={{
                    backgroundColor: p.cardBg,
                    borderColor: p.cardBorder,
                  }}
                >
                  <div className="cv-entry-top">
                    <div className="cv-entry-headline">
                      <span className="cv-entry-title" style={{ color: p.mainTitle }}>
                        {edu.school}
                      </span>
                      <span className="cv-entry-sep" style={{ color: p.mainMuted }}>
                        ·
                      </span>
                      <span className="cv-entry-org" style={{ color: p.accent }}>
                        {edu.degree.replace(/^Obor:\s*/i, '')}
                      </span>
                    </div>
                    <span className="cv-entry-date" style={{ color: p.dateText }}>
                      {edu.period}
                    </span>
                  </div>
                  <p className="cv-entry-desc" style={{ color: p.mainText }}>
                    {edu.title}
                  </p>

                  {showSubjects && edu.subjects && edu.subjects.length > 0 && (
                    <div
                      className="cv-subjects-box"
                      style={{ borderTopColor: p.mainHeadingRule }}
                    >
                      <div className="cv-subjects-label" style={{ color: p.mainMuted }}>
                        Vybrané předměty:
                      </div>
                      <div className="cv-subjects-list" style={{ color: p.mainText }}>
                        {edu.subjects
                          .map((s) => `${s.name} (${s.abbr})`)
                          .join(' · ')}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
});
