import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Printer, Check, Loader2, Palette } from 'lucide-react';
import { CvDocument } from './CvDocument';
import { CV_THEMES } from '../utils/cvThemes';
import { exportCvToPdf } from '../utils/cvPdfExport';

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export function CvPreviewModal({ isOpen, onClose, data }) {
  const [theme, setTheme] = useState('blueprint');
  const [showPhoto, setShowPhoto] = useState(true);
  const [showSubjects, setShowSubjects] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportError, setExportError] = useState('');
  const [scale, setScale] = useState(0.72);

  const stageRef = useRef(null);
  const exportNodeRef = useRef(null);

  // Close on Escape and prevent background scrolling while open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  // Responsive A4 preview scaling
  useEffect(() => {
    if (!isOpen || !stageRef.current) return;

    const updateScale = () => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const availW = Math.max(rect.width - 48, 280);
      const availH = Math.max(rect.height - 48, 360);
      const fitByWidth = availW / A4_WIDTH_PX;
      const fitByHeight = availH / A4_HEIGHT_PX;
      // Fit cleanly in viewport on desktop while keeping text readable on smaller screens
      const computed =
        rect.width < 768
          ? Math.min(fitByWidth, 1)
          : Math.min(fitByWidth, Math.max(fitByHeight, 0.62), 0.92);
      setScale(Math.max(0.32, computed));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  if (!isOpen) return null;

  const activeThemeMeta = CV_THEMES.find((t) => t.id === theme) || CV_THEMES[0];

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportError('');
    setExportSuccess(false);

    try {
      await exportCvToPdf(exportNodeRef.current, {
        filename: 'Vojtech_Stehlik_CV.pdf',
        backgroundColor: activeThemeMeta.bgHex,
      });
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2600);
    } catch (err) {
      console.error('PDF export failed:', err);
      setExportError('Export do PDF se nezdařil. Zkuste prosím tlačítko Tisknout.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div
        className="cv-modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        <div className="cv-modal-shell" onClick={(e) => e.stopPropagation()}>
          {/* Top Modal Header */}
          <div className="cv-modal-header">
            <div className="cv-modal-heading">
              <h2 id="cv-modal-title" className="cv-modal-title">
                Export životopisu do PDF
              </h2>
              <span className="cv-modal-meta">Formát A4 · 210 × 297 mm</span>
            </div>

            <div className="cv-modal-actions">
              <button
                type="button"
                className="cv-btn cv-btn-secondary"
                onClick={handlePrint}
              >
                <Printer size={15} />
                <span>Tisknout</span>
              </button>

              <button
                type="button"
                className="cv-btn cv-btn-primary"
                onClick={handleDownloadPdf}
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <Loader2 size={15} className="cv-spin" />
                    <span>Generuji PDF…</span>
                  </>
                ) : exportSuccess ? (
                  <>
                    <Check size={15} />
                    <span>Staženo</span>
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    <span>Stáhnout PDF</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="cv-modal-close"
                onClick={onClose}
                aria-label="Zavřít náhled"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {exportError && <div className="cv-modal-error">{exportError}</div>}

          {/* Modal Body: Left Controls + Right A4 Live Preview */}
          <div className="cv-modal-body">
            <aside className="cv-controls-panel">
              <div className="cv-control-group">
                <div className="cv-control-label">
                  <Palette size={14} />
                  <span>Design pozadí</span>
                </div>
                <div className="cv-theme-list">
                  {CV_THEMES.map((item) => {
                    const isActive = item.id === theme;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`cv-theme-option ${isActive ? 'active' : ''}`}
                        onClick={() => setTheme(item.id)}
                      >
                        <span
                          className="cv-theme-swatch"
                          aria-hidden="true"
                          style={{ backgroundColor: item.preview.right }}
                        >
                          <span
                            className="cv-swatch-left"
                            style={{ backgroundColor: item.preview.left }}
                          />
                          <span
                            className="cv-swatch-accent"
                            style={{ backgroundColor: item.preview.accent }}
                          />
                          <span
                            className="cv-swatch-lines"
                            style={{ borderColor: item.preview.line }}
                          />
                        </span>
                        <span className="cv-theme-text">
                          <span className="cv-theme-name">{item.name}</span>
                          <span className="cv-theme-sub">{item.subtitle}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="cv-control-group">
                <div className="cv-control-label">
                  <span>Obsah dokumentu</span>
                </div>
                <label className="cv-toggle-row">
                  <input
                    type="checkbox"
                    checked={showPhoto}
                    onChange={(e) => setShowPhoto(e.target.checked)}
                  />
                  <span>Zobrazit profilovou fotku</span>
                </label>
                <label className="cv-toggle-row">
                  <input
                    type="checkbox"
                    checked={showSubjects}
                    onChange={(e) => setShowSubjects(e.target.checked)}
                  />
                  <span>Zobrazit předměty FIT ČVUT</span>
                </label>
              </div>
            </aside>

            <div className="cv-preview-stage" ref={stageRef}>
              <div
                className="cv-preview-scaler"
                style={{
                  width: `${Math.round(A4_WIDTH_PX * scale)}px`,
                  height: `${Math.round(A4_HEIGHT_PX * scale)}px`,
                }}
              >
                <div
                  className="cv-preview-transform"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  }}
                >
                  <CvDocument
                    data={data}
                    theme={theme}
                    showPhoto={showPhoto}
                    showSubjects={showSubjects}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated unscaled 1:1 A4 node for pixel-accurate PDF capture and native browser print */}
      <div className="cv-export-stage" aria-hidden="true">
        <CvDocument
          ref={exportNodeRef}
          data={data}
          theme={theme}
          showPhoto={showPhoto}
          showSubjects={showSubjects}
        />
      </div>
    </>
  );
}
