# DevGroup Africa - Frontend

Frontend React/Vite de la plateforme DevGroup Africa.

## Démarrage

```bash
npm install
npm run dev
```

## Commandes

- `npm run dev` : serveur de développement
- `npm run build` : build de production
- `npm run lint` : vérification ESLint

## Architecture

```text
src/
  app/            # Routage principal
  components/     # Composants réutilisables
    common/       # Header, footer, logo, titres et CTA
    content/      # Grilles de contenu
    forms/        # Formulaires
  data/           # Contenus provisoires et navigation
  layouts/        # Layouts public et administration
  pages/          # Pages regroupées par domaine
  styles/         # Point d'entrée et styles du site
```

Les pages publiques et le squelette admin suivent l'arborescence définie dans `SITEMAP.md`.
