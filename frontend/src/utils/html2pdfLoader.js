let html2pdfPromise = null;

export function loadHtml2Pdf() {
  if (window.html2pdf) {
    return Promise.resolve(window.html2pdf);
  }

  if (html2pdfPromise) {
    return html2pdfPromise;
  }

  html2pdfPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-html2pdf]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.html2pdf), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load PDF exporter')), { once: true });
      return;
    }

    const script = document.createElement('script');
    const publicUrl = process.env.PUBLIC_URL || '';
    script.src = `${publicUrl}/vendor/html2pdf.bundle.min.js`;
    script.async = true;
    script.dataset.html2pdf = 'true';
    script.onload = () => {
      if (!window.html2pdf) {
        reject(new Error('PDF exporter is not available'));
        return;
      }
      resolve(window.html2pdf);
    };
    script.onerror = () => reject(new Error('Failed to load PDF exporter'));
    document.body.appendChild(script);
  });

  return html2pdfPromise;
}
