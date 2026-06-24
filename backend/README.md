# DevGroup Africa API

## Configuration

Copier `.env.example` vers `.env`, puis renseigner :

```env
PORT=7100
CLIENT_ORIGIN=http://localhost:7000
MONGODB_URI=mongodb+srv://...
ADMIN_EMAIL=admin@devgroup.ga
ADMIN_PASSWORD=change-me
JWT_SECRET=change-me
```

## Commandes

```bash
npm install
npm run dev
npm run seed
```

Le seed alimente MongoDB avec les contenus actuellement présents dans la SPA :

- page d'accueil éditable,
- services,
- solutions,
- réalisations,
- articles du blog.

## Routes principales

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/public/home`
- `GET /api/public/catalog/services`
- `GET /api/public/catalog/solutions`
- `GET /api/public/projects`
- `GET /api/public/posts`
- `POST /api/public/contact-messages`
- `GET|POST|PUT|DELETE /api/admin/:resource` avec token admin
