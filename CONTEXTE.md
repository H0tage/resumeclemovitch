# Contexte éditorial — Résumés textuels des vidéos de Victorovitch

Ce dépôt publie des notes de lecture issues de streams et de vidéos de Clément Viktorovitch. L'objectif n'est pas de retranscrire la vidéo ni de produire un compte-rendu de visionnage : chaque texte doit devenir un article autonome, fidèle à l'argumentation développée dans la vidéo et agréable à lire.

## Sources de travail

Pour chaque nouvelle vidéo, l'utilisateur peut fournir :

- une transcription au format `.vtt` ;
- une synthèse ou des notes complémentaires ;
- le titre, la date, la durée et l'URL YouTube.

La transcription est la source principale. La synthèse sert à repérer les sujets, les articulations et les éléments qui demandent un développement particulier.

Conserver la transcription ou les documents source dans `content/`. Le texte affiché peut être réécrit ; les sources originales ne doivent pas être modifiées.

## Style attendu

- Écrire une note analytique accessible, proche d'un article de sciences sociales ou d'information approfondie.
- Employer des phrases simples et précises ; expliquer les notions juridiques, politiques ou techniques au moment où elles apparaissent.
- Ne pas raconter la vidéo avec des formules répétitives comme « Viktorovitch dit », « il pense » ou « il revient sur ».
- Présenter directement les faits, les mécanismes et les raisonnements, tout en conservant les distinctions utiles au raisonnement.
- Éviter les envolées journalistiques, les effets de style et les formulations inutilement techniciennes.
- Ne pas ajouter d'avertissement méta sur la fiabilité des sources, la subjectivité de l'intervenant, les sous-titres ou le degré de certitude du texte.

## Structure recommandée

1. **Titre** : reprendre ou adapter sobrement le titre de la vidéo.
2. **Introduction courte** : indiquer qu'il s'agit d'une note tirée d'un stream de Clément Viktorovitch, avec sa date et son titre ; annoncer les principaux mécanismes ou thèmes abordés.
3. **Sections principales** : organiser le texte par problème ou mécanisme, non par ordre de prise de parole.
4. **Sous-sections** : les utiliser quand un ensemble de mesures, d'arguments ou d'exemples mérite d'être distingué.
5. **Conclusion** : rappeler le fil directeur de manière brève, sans répéter l'intégralité de l'article.

## Horodatages et liens

Sous chaque grande section, ajouter la plage horaire correspondante sous forme de lien vers YouTube, par exemple :

```md
*[00:52 – 01:55](https://www.youtube.com/watch?v=VIDEO_ID&t=3120s)*
```

Les horodatages du document source sont exprimés en heures et minutes. Calculer le paramètre `t` en secondes. Pour un début à `02:47`, utiliser `2 × 3600 + 47 × 60 = 10020`, soit `&t=10020s`.

## Mise en page du site

- Colonne gauche : liste chronologique des vidéos.
- Colonne centrale : article.
- Colonne droite : table des matières des sections de l'article, avec liens d'ancrage et indication de la section en cours de lecture.
- Sur mobile, la table des matières devient un menu compact en haut de l'article.
- Conserver les modes clair et sombre.

## Exemple de référence

Le fichier `content/article-trappes-28-octobre-2026.md` est la référence actuelle pour le ton, la structure et le niveau de détail attendu.
