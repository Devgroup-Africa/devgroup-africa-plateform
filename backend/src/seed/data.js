export const homePage = {
  key: 'home',
  title: 'Accueil',
  status: 'published',
  sections: {
    hero: {
      eyebrow: 'Studio digital · Libreville',
      title: 'Le numérique qui fait avancer votre organisation.',
      highlight: 'avancer',
      text: 'Nous concevons des produits et services numériques simples, robustes et adaptés aux réalités de votre activité.',
      primaryCta: { label: 'Démarrer un projet', path: '/devis' },
      secondaryCta: { label: 'Voir nos réalisations', path: '/realisations' },
      trust: ['Stratégie', 'Design', 'Technologie', 'Accompagnement'],
      image: '/images/heroes/team.jpg',
    },
    expertise: {
      eyebrow: 'Notre expertise',
      title: 'Un partenaire pour chaque étape de votre projet.',
      text: 'De la réflexion au déploiement, nous réunissons les compétences nécessaires pour construire des solutions qui fonctionnent.',
      link: '/services',
    },
    method: {
      eyebrow: 'Notre méthode',
      title: 'Simple dans l’approche. Exigeante dans l’exécution.',
      steps: [
        { number: '01', title: 'Comprendre', text: 'Nous clarifions vos objectifs, vos utilisateurs et les contraintes du projet.' },
        { number: '02', title: 'Concevoir', text: 'Nous transformons les besoins en une expérience simple et une solution solide.' },
        { number: '03', title: 'Construire', text: 'Nous développons par étapes, avec des validations régulières et concrètes.' },
        { number: '04', title: 'Faire évoluer', text: 'Nous suivons le produit après son lancement et l’améliorons avec vous.' },
      ],
    },
    projects: {
      eyebrow: 'Réalisations',
      title: 'Des solutions pensées pour le terrain.',
      text: 'Quelques exemples de produits numériques conçus pour répondre à des enjeux concrets.',
      link: '/realisations',
    },
    values: {
      eyebrow: 'Pourquoi DevGroup',
      title: 'La technologie n’est utile que lorsqu’elle sert vraiment les personnes.',
      items: [
        'Une compréhension fine de vos enjeux',
        'Des choix techniques durables',
        'Une collaboration claire et transparente',
        'Un accompagnement au-delà du lancement',
      ],
    },
    blog: {
      eyebrow: 'Perspectives',
      title: 'Nos dernières réflexions.',
      link: '/blog',
      linkLabel: 'Voir le blog',
    },
  },
}

export const catalogItems = [
  { type: 'service', slug: 'transformation-digitale', title: 'Transformation digitale', icon: 'RefreshCw', description: 'Structurez votre transition numérique avec une feuille de route réaliste et mesurable.', order: 1 },
  { type: 'service', slug: 'developpement-web', title: 'Développement web', icon: 'Code2', description: 'Des plateformes web rapides, accessibles et conçues pour évoluer avec votre activité.', order: 2 },
  { type: 'service', slug: 'developpement-mobile', title: 'Développement mobile', icon: 'MonitorSmartphone', description: 'Des applications mobiles intuitives qui rapprochent vos services de vos utilisateurs.', order: 3 },
  { type: 'service', slug: 'plateformes-metiers', title: 'Plateformes métiers', icon: 'BriefcaseBusiness', description: 'Des outils sur mesure qui simplifient vos opérations et centralisent vos données.', order: 4 },
  { type: 'service', slug: 'ux-ui-design', title: 'UX / UI Design', icon: 'Palette', description: 'Des expériences claires et agréables, pensées autour des vrais besoins utilisateurs.', order: 5 },
  { type: 'service', slug: 'cloud-devops', title: 'Cloud & DevOps', icon: 'CloudCog', description: 'Une infrastructure fiable, automatisée et prête à accompagner votre croissance.', order: 6 },
  { type: 'service', slug: 'maintenance-support', title: 'Maintenance & support', icon: 'Headphones', description: 'Un suivi réactif pour garder vos produits performants, sécurisés et disponibles.', order: 7 },
  { type: 'service', slug: 'conseil-it', title: 'Conseil IT', icon: 'Compass', description: 'Des décisions technologiques éclairées, alignées avec vos objectifs stratégiques.', order: 8 },
  { type: 'solution', slug: 'portail-entreprise', title: 'Portail entreprise', icon: 'Blocks', description: 'Centralisez les ressources, les échanges et les outils de vos équipes.', order: 1 },
  { type: 'solution', slug: 'application-metier', title: 'Application métier', icon: 'BriefcaseBusiness', description: 'Digitalisez précisément les processus qui font la valeur de votre organisation.', order: 2 },
  { type: 'solution', slug: 'espace-client', title: 'Espace client', icon: 'MonitorSmartphone', description: 'Offrez à vos clients un accès simple, autonome et sécurisé à vos services.', order: 3 },
  { type: 'solution', slug: 'e-commerce', title: 'E-commerce', icon: 'ShoppingCart', description: 'Vendez en ligne grâce à une expérience fluide et adaptée à votre marché.', order: 4 },
  { type: 'solution', slug: 'automatisation-processus', title: 'Automatisation', icon: 'Bot', description: 'Réduisez les tâches répétitives et libérez du temps pour les activités essentielles.', order: 5 },
  { type: 'solution', slug: 'tableaux-de-bord', title: 'Tableaux de bord', icon: 'BarChart3', description: 'Transformez vos données en indicateurs utiles pour mieux décider.', order: 6 },
  { type: 'solution', slug: 'integrations-api', title: 'Intégrations API', icon: 'LayoutDashboard', description: 'Connectez vos logiciels et faites circuler les données sans friction.', order: 7 },
]

export const projects = [
  { slug: 'gestion-scolaire', title: 'Plateforme de gestion scolaire', type: 'EdTech', color: 'orange', description: 'Un espace unifié pour les élèves, parents et équipes pédagogiques.', order: 1 },
  { slug: 'suivi-logistique', title: 'Solution de suivi logistique', type: 'Logistique', color: 'blue', description: 'Une visibilité en temps réel sur les opérations et les livraisons.', order: 2 },
  { slug: 'portail-services', title: 'Portail de services citoyens', type: 'GovTech', color: 'green', description: 'Des démarches administratives plus simples et accessibles en ligne.', order: 3 },
]

export const posts = [
  {
    slug: 'reussir-transformation-digitale',
    category: 'Stratégie',
    title: 'Réussir sa transformation digitale en Afrique',
    publishedAt: new Date('2026-06-04T09:00:00.000Z'),
    description: 'Les principes pratiques pour construire une transformation adaptée à son marché.',
    body: 'Le contenu complet de cet article sera bientôt disponible. Cette page pose déjà la structure nécessaire pour publier les futurs contenus depuis l’espace d’administration.\n\nUne approche numérique efficace part toujours des objectifs réels, des utilisateurs et du contexte opérationnel.',
  },
  {
    slug: 'choisir-application-metier',
    category: 'Produit',
    title: 'Quand faut-il créer une application métier ?',
    publishedAt: new Date('2026-05-21T09:00:00.000Z'),
    description: 'Les signaux qui indiquent qu’un outil sur mesure devient un investissement pertinent.',
    body: 'Un outil métier devient pertinent lorsque les processus critiques ne peuvent plus être correctement servis par les solutions génériques.',
  },
  {
    slug: 'ux-services-numeriques',
    category: 'Design',
    title: 'L’UX au service de produits numériques adoptés',
    publishedAt: new Date('2026-05-08T09:00:00.000Z'),
    description: 'Pourquoi une bonne expérience utilisateur est d’abord une question de compréhension.',
    body: 'Une bonne expérience utilisateur commence par une compréhension nette des personnes, de leurs contraintes et de leurs objectifs.',
  },
]
