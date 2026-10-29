const root = document.documentElement;
const button = document.querySelector('.theme-toggle');
const summary = document.querySelector('#summary-content');
const toc = document.querySelector('#toc-links');

function setTheme(theme) {
  root.dataset.theme = theme;
  button.setAttribute('aria-pressed', String(theme === 'dark'));
  button.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre');
}

setTheme(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
button.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  localStorage.setItem('theme', next);
});

function slug(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function inline(element, value) {
  const timestamp = value.match(/^\*\[([^\]]+)\]\(([^)]+)\)\*$/);
  if (timestamp) {
    const link = document.createElement('a');
    link.href = timestamp[2];
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = `Voir la vidéo : ${timestamp[1]} ↗`;
    element.className = 'video-timecode';
    element.append(link);
    return;
  }
  element.textContent = value;
}

function renderArticle(markdown) {
  summary.replaceChildren();
  toc.replaceChildren();
  const headings = [];
  markdown.trim().split(/\n{2,}/).forEach((block) => {
    const value = block.trim();
    if (!value || value.startsWith('# ')) return;
    const match = value.match(/^(#{2,3})\s+(.+)$/);
    const element = document.createElement(match ? (match[1].length === 2 ? 'h2' : 'h3') : 'p');
    const text = match ? match[2] : value;
    if (match && element.tagName === 'H2') {
      element.id = slug(text);
      headings.push({ id: element.id, text });
    }
    inline(element, text);
    summary.append(element);
  });
  headings.forEach(({ id, text }) => {
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = text;
    toc.append(link);
  });
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    toc.querySelectorAll('a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-20% 0px -70% 0px' });
  summary.querySelectorAll('h2').forEach((heading) => observer.observe(heading));
}

fetch('content/article-trappes-28-octobre-2026.md')
  .then((response) => response.ok ? response.text() : Promise.reject())
  .then(renderArticle)
  .catch(() => { summary.textContent = 'L’article n’a pas pu être chargé.'; });
