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
