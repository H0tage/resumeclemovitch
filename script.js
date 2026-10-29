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
  const directStyle = (text) => text
    .replace('Cette synthèse restitue ses explications et ses interprétations à partir de la transcription, sans constituer une vérification indépendante de chaque événement ou disposition juridique évoquée.\n\n', '')
    .replace("Il insiste néanmoins sur une incertitude : à ce stade, les contenus précis et les motifs judiciaires n'étaient pas tous connus. Il ne prétend donc pas pouvoir établir que toutes ces procédures étaient injustifiées.\n\n", '')
    .replace("Il précise explicitement que cette dernière interprétation relève de la spéculation personnelle, et non d'une analyse scientifique établie.\n\n", '')
    .replace("Il insiste toutefois sur le fait que le droit n'est pas définitivement tranché et qu'il ne peut pas affirmer quelle interprétation prévaudra.\n\n", '')
    .replace("La distinction importante pour interpréter le stream est donc celle entre les faits qu'il rapporte, les conséquences juridiques qu'il en déduit et les intentions politiques qu'il attribue aux différents acteurs. Ces trois niveaux n'ont pas le même degré de certitude.\n\n", '')
    .replace(/Viktorovitch défend une thèse générale :/g, 'La thèse générale est la suivante :')
    .replace(/Viktorovitch examine deux questions\./g, "Deux questions structurent l'analyse.")
    .replace(/Viktorovitch (?:explique|estime|considère|souligne|rappelle|insiste|conclut) que /g, '')
    .replace(/Il (?:explique|estime|considère|souligne|rappelle|insiste|conclut) que /g, '')
    .replace(/Il appelle à la prudence\./g, 'La prudence s’impose.')
    .replace(/Il distingue cependant plusieurs situations :/g, 'Plusieurs situations doivent cependant être distinguées :')
    .replace(/Sa conclusion est qu'il n'existe pas de stratégie universelle :/g, "Il n'existe pas de stratégie universelle :")
    .replace(/Il évoque /g, '')
    .replace(/Il présente /g, '')
    .replace(/Il détaille /g, 'Le texte détaille ')
    .replace(/Il s'appuie notamment sur les critiques du Conseil national des barreaux,/g, 'Les critiques du Conseil national des barreaux')
    .replace(/Viktorovitch revient ensuite sur /g, 'Retour sur ')
    .replace(/Viktorovitch examine /g, 'Examen de ')
    .replace(/Viktorovitch critique /g, 'La critique porte sur ')
    .replace(/Viktorovitch juge /g, 'Le constat est le suivant : ')
    .replace(/Viktorovitch souhaite examiner /g, 'Examen de ')
    .replace(/Viktorovitch défend alors /g, 'La position défendue est la suivante : ');
  const subheadings = new Set([
    'Un projet de coupure des réseaux sociaux', 'Des créatrices de contenu interpellées',
    'La remise en cause du principe de responsabilité individuelle', 'Des restrictions supplémentaires aux libertés individuelles',
    "L'amendement sur le retrait des contenus en ligne", 'Sa conclusion sur le texte',
    'Son hypothèse sur la stratégie présidentielle', 'Les faits qu\'il présente',
    'Le lien entre les discours politiques et les violences racistes', 'La réponse de Sébastien Lecornu à l\'Assemblée nationale',
    'Les déclarations du Rassemblement national', 'Maud Bregeon et le refus de répondre aux accusations d\'amalgame',
    'Des journalistes plus offensifs', 'La stratégie de communication de Sarah Knafo', 'Les limites du traitement médiatique',
  ]);
  fetch('content/synthese_stream_28_octobre_2026.txt')
    .then((response) => response.ok ? response.text() : Promise.reject())
    .then((text) => {
      summary.replaceChildren();
      directStyle(text.replace(/\r/g, '')).split(/\n{2,}/).forEach((block) => {
        const value = block.trim();
        if (!value) return;
        const lines = value.split('\n');
        if (lines.every((line) => line.startsWith('- '))) {
          const list = document.createElement('ul');
          list.className = 'source-list';
          lines.forEach((line) => { const item = document.createElement('li'); item.textContent = line.slice(2); list.append(item); });
          summary.append(list);
          return;
        }
        if (lines.length > 1 && lines.every((line) => /^\d+\. /.test(line))) {
          const list = document.createElement('ol');
          list.className = 'source-list numbered';
          lines.forEach((line) => { const item = document.createElement('li'); item.textContent = line.replace(/^\d+\. /, ''); list.append(item); });
          summary.append(list);
          return;
        }
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
        if (subheadings.has(value)) {
          const heading = document.createElement('h3');
          heading.textContent = value;
          summary.append(heading);
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
