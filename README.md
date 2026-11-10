# ValidThèse

Site de [validthese.cebistats.com](https://validthese.cebistats.com), le service de CEBI Stats dédié aux thèses et mémoires en sciences de la santé.

Site statique [Astro](https://astro.build), une page, déployé sur Vercel (un push sur `main` part en production).

## Développer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
```

## Où modifier quoi

| Contenu | Fichier |
| --- | --- |
| Coordonnées, étapes « Où en êtes-vous ? », formules, FAQ, guides | `src/data/site.js` |
| Mise en page de l'accueil | `src/pages/index.astro` |
| Tableau commenté de l'accueil | `src/components/HeroTable.astro` |
| Comparaison avant / après | `src/components/BeforeAfter.astro` |
| Couleurs et typographie | `src/styles/global.css` |

Le logo (`public/logo-cb.svg`) est le même que celui de cebistats.com. Après l'avoir modifié, régénérer les PNG avec `node scripts/make-images.mjs` (nécessite `sharp`).

## Règles de contenu

- Aucun nom de personne sur le site : CEBI Stats signe en tant que cabinet.
- Pas de témoignage, de chiffre ou d'exemple de thèse sans source vérifiable.
- Pas d'appel à une API d'IA depuis le navigateur : une clé placée dans le code client est lisible par tous.
- Les tableaux d'exemple utilisent des données fictives et le disent.
