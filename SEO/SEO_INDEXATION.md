# Suivi et indexation

## Variables de production

Configurer le frontend avec:

```env
VITE_SITE_URL=https://devgroup.ga
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

`VITE_GA_MEASUREMENT_ID` est optionnel. Si la valeur est vide, aucun script Google Analytics n'est charge.

## Google Search Console

1. Ajouter la propriete de domaine `devgroup.ga` dans Google Search Console.
2. Valider la propriete via DNS.
3. Verifier que `https://devgroup.ga/robots.txt` est accessible.
4. Soumettre `https://devgroup.ga/sitemap.xml`.
5. Inspecter les pages prioritaires:
   - `https://devgroup.ga/`
   - `https://devgroup.ga/services`
   - `https://devgroup.ga/services/creation-sites-web`
   - `https://devgroup.ga/services/developpement-solutions-numeriques`
   - `https://devgroup.ga/contact`
   - `https://devgroup.ga/devis`

## Google Analytics 4

1. Creer une propriete GA4.
2. Copier l'identifiant de mesure, au format `G-XXXXXXXXXX`.
3. Le renseigner dans `VITE_GA_MEASUREMENT_ID`.
4. Redeployer le frontend.
5. Verifier les evenements `page_view` dans le rapport temps reel.

## Routine mensuelle

- Controler les pages indexees et les pages exclues dans Search Console.
- Verifier les requetes qui generent des impressions.
- Ameliorer les pages qui ont beaucoup d'impressions mais peu de clics.
- Corriger les erreurs 404 ou pages detectees mais non indexees.
- Ajouter ou mettre a jour au moins un contenu utile par mois.
