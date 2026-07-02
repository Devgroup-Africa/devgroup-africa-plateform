# devgroup-africa-plateform

## Lancer avec Docker

Cette configuration lance 2 services simples :

- `frontend` : application React servie par Nginx
- `backend` : API Node/Express

La base MongoDB n'est pas lancee par Docker : le backend utilise le lien `MONGODB_URI` fourni dans le fichier `.env`.

### 1. Configurer le backend

Creer ou modifier le fichier `backend/.env` :

```env
PORT=7100
CLIENT_ORIGIN=http://localhost:7000
MONGODB_URI=mongodb+srv://user:password@cluster.example.mongodb.net/devgroup_africa
ADMIN_EMAIL=admin@devgroup.ga
ADMIN_PASSWORD=change-me
JWT_SECRET=change-me
```

Sur le serveur, remplace `CLIENT_ORIGIN` par l'URL publique du site, par exemple :

```env
CLIENT_ORIGIN=https://example.com
```

Change aussi `ADMIN_PASSWORD` et `JWT_SECRET` avant de mettre en ligne.

Le fichier `frontend/.env` sert au developpement local. Avec Docker, le frontend utilise `/api` et Nginx redirige automatiquement vers le backend.
Pour le SEO et le suivi, configurer aussi les variables frontend en production :

```env
VITE_SITE_URL=https://devgroup.ga
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

`VITE_GA_MEASUREMENT_ID` peut rester vide si Google Analytics n'est pas encore configure.

### 2. Demarrer le projet

```bash
docker compose up -d --build
```

Si le serveur ne reconnait pas `docker compose`, verifier :

```bash
docker compose version
docker-compose version
```

Si `docker-compose` existe, utiliser cette commande a la place :

```bash
docker-compose up -d --build
```

Le site sera disponible sur :

```txt
http://localhost:7000
```

### 3. Alimenter la base de donnees

Apres le premier demarrage :

```bash
docker compose exec backend npm run seed
```

### Commandes utiles

```bash
docker compose ps
docker compose logs -f backend
docker compose down
```

Les fichiers uploades sont conserves dans un volume Docker. Les donnees MongoDB restent dans ta base distante.
