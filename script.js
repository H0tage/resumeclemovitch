const root = document.documentElement;
const button = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  root.dataset.theme = theme;
  button.setAttribute('aria-pressed', String(theme === 'dark'));
  button.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre');
}

setTheme(savedTheme || (systemDark ? 'dark' : 'light'));
button.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem('theme', next);
});

document.querySelectorAll('.video-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.video-link.active')?.classList.remove('active');
    document.querySelector('.video-link.active')?.removeAttribute('aria-current');
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  });
});

const summary = document.querySelector('#summary-content');
if (summary) {
  fetch('content/synthese_stream_28_octobre_2026.txt')
    .then((response) => response.ok ? response.text() : Promise.reject())
    .then((text) => {
      summary.replaceChildren();
      text.replace(/\r/g, '').split(/\n{2,}/).forEach((block) => {
        const value = block.trim();
        if (!value) return;
        const timedHeading = value.match(/^(.+?)\n(Environ .+)$/s);
        if (timedHeading && /^(\d+\. |Un détour important)/.test(timedHeading[1])) {
          const heading = document.createElement('h2');
          heading.textContent = timedHeading[1];
          const timestamp = document.createElement('p');
          timestamp.className = 'timestamp';
          timestamp.textContent = timedHeading[2];
          summary.append(heading, timestamp);
          return;
        }
        const element = /^(SYNTHÈSE GÉNÉRALE|CONCLUSION)/.test(value) ? document.createElement('h2') : document.createElement('p');
        element.textContent = value;
        if (element.tagName === 'P') element.classList.add('verbatim-paragraph');
        if (/^SYNTHÈSE COMPLÈTE/.test(value)) element.classList.add('document-kicker');
        summary.append(element);
      });
    })
    .catch(() => { summary.textContent = 'La synthèse n’a pas pu être chargée.'; });
}
