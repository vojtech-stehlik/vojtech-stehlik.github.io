import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

/**
 * Waits for all images inside a DOM node to finish loading/decoding.
 */
async function waitForImages(container) {
  const images = Array.from(container.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        return typeof img.decode === 'function'
          ? img.decode().catch(() => {})
          : Promise.resolve();
      }
      return new Promise((resolve) => {
        const done = () => resolve();
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      });
    })
  );
}

/**
 * Captures an unscaled A4 CV DOM element and downloads a crisp full-bleed PDF.
 *
 * @param {HTMLElement} element - The exact 794x1123 CV sheet node to capture
 * @param {object} [options]
 * @param {string} [options.filename] - Output PDF filename
 * @param {string} [options.backgroundColor] - Canvas fallback background hex
 */
export async function exportCvToPdf(element, options = {}) {
  if (!element) {
    throw new Error('Nebyl nalezen prvek životopisu pro export.');
  }

  const {
    filename = 'Vojtech_Stehlik_CV.pdf',
    backgroundColor = '#f8fafc',
  } = options;

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  await waitForImages(element);

  // Brief animation-frame settle so fonts & SVG vectors paint cleanly
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  const canvas = await html2canvas(element, {
    scale: 2.5,
    useCORS: true,
    allowTaint: false,
    backgroundColor,
    width: A4_WIDTH_PX,
    height: A4_HEIGHT_PX,
    windowWidth: A4_WIDTH_PX,
    windowHeight: A4_HEIGHT_PX,
    scrollX: 0,
    scrollY: 0,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, undefined, 'FAST');
  pdf.save(filename);
}
