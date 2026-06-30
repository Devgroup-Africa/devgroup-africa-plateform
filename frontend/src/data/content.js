import {
  AudioLines, BarChart3, Blocks, Bot, BrainCircuit, BriefcaseBusiness, CloudCog,
  Code2, Compass, Globe2, Headphones, LayoutDashboard, MonitorSmartphone, Palette,
  RefreshCw, ShoppingCart,
} from 'lucide-react'
import { serviceOffers } from './serviceOffers'

export const services = [
  {
    slug: 'developpement-solutions-numeriques',
    title: 'Développement de solutions numériques',
    icon: Code2,
    description: 'Conception et réalisation de plateformes et applications sur mesure adaptées à vos besoins.',
    details: {
      eyebrow: 'Services',
      title: 'Des solutions métiers construites autour de vos usages.',
      bullets: ['Applications web', 'Applications mobiles', 'Logiciels métiers', 'Plateformes SaaS', 'Portails clients', 'Outils de gestion interne', 'Modernisation d’applications', 'Applications de bureau'],
      offers: serviceOffers['developpement-solutions-numeriques'],
    },
  },
  {
    slug: 'creation-sites-web',
    title: 'Création de sites web',
    icon: Globe2,
    description: 'Conception de sites professionnels adaptés aux besoins des entreprises et organisations.',
    details: {
      eyebrow: 'Services',
      title: 'Une présence web claire, professionnelle et maintenable.',
      bullets: ['Sites vitrines', 'Sites institutionnels', 'Blogs professionnels', 'Portails d’information', 'Sites événementiels', 'Refonte de sites', 'Maintenance'],
      offers: serviceOffers['creation-sites-web'],
    },
  },
  {
    slug: 'digitalisation-entreprises',
    title: 'Digitalisation des entreprises',
    icon: RefreshCw,
    description: 'Remplacement des processus manuels par des solutions numériques simples et efficaces.',
    details: {
      eyebrow: 'Services',
      title: 'Des processus plus fluides, mieux suivis et moins dépendants du papier.',
      bullets: ['Analyse des processus métiers', 'Solutions de gestion', 'Formation des équipes', 'Gestion documentaire', 'Tableaux de bord'],
      offers: serviceOffers['digitalisation-entreprises'],
    },
  },
  {
    slug: 'conception-ui-ux',
    title: 'Conception UI/UX',
    icon: Palette,
    description: 'Création d’interfaces modernes, intuitives et centrées utilisateur.',
    details: {
      eyebrow: 'Services',
      title: 'Des interfaces utiles, lisibles et faciles à adopter.',
      bullets: ['Maquettes d’applications', 'Maquettes de sites web', 'Prototypage interactif', 'Design system', 'Optimisation UX', 'Visuels et affiches sur mesure', 'Formation des équipes'],
      offers: serviceOffers['conception-ui-ux'],
    },
  },
  {
    slug: 'hebergement-deploiement',
    title: 'Hébergement et déploiement',
    icon: CloudCog,
    description: 'Mise en production et gestion des infrastructures applicatives, avec hébergement local lorsque c’est pertinent.',
    details: {
      eyebrow: 'Services',
      title: 'Une mise en ligne maîtrisée et un socle technique fiable.',
      bullets: ['Déploiement de plateformes web', 'Gestion de serveurs', 'Configuration de domaines', 'Surveillance des services', 'Hébergement local des solutions développées'],
      offers: serviceOffers['hebergement-deploiement'],
    },
  },
  {
    slug: 'maintenance-support',
    title: 'Maintenance et support',
    icon: Headphones,
    description: 'Assistance technique après livraison pour garder vos projets stables et performants.',
    details: {
      eyebrow: 'Services',
      title: 'Un accompagnement technique après la mise en ligne.',
      bullets: ['Correction de bugs', 'Mises à jour', 'Assistance utilisateur', 'Optimisation des performances', 'Évolution fonctionnelle'],
      offers: serviceOffers['maintenance-support'],
    },
  },
  {
    slug: 'intelligence-artificielle',
    title: 'Intelligence artificielle',
    icon: BrainCircuit,
    description: 'Intégrez la puissance de l’IA dans vos processus métiers et vos outils internes.',
    details: {
      eyebrow: 'Services',
      title: 'Des usages IA concrets pour automatiser, analyser et assister vos équipes.',
      bullets: ['Chatbots et agents IA', 'Modèles d’aide à la décision', 'Analyse prédictive et business', 'Assistant IA WhatsApp', 'Automatisation intelligente des processus métier', 'Systèmes IA multimodaux intelligents'],
      offers: serviceOffers['intelligence-artificielle'],
    },
  },
  {
    slug: 'conseil-transformation-numerique',
    title: 'Conseil en transformation numérique',
    icon: Compass,
    description: 'Accompagnement stratégique des organisations dans leurs projets numériques.',
    details: {
      eyebrow: 'Services',
      title: 'Des décisions numériques cadrées, réalistes et alignées avec vos objectifs.',
      bullets: ['Audit numérique', 'Étude de faisabilité', 'Élaboration de cahiers des charges', 'Accompagnement de projets', 'Choix technologiques', 'Assistance à la maîtrise d’ouvrage'],
      offers: serviceOffers['conseil-transformation-numerique'],
    },
  },
  {
    slug: 'synthese-vocale-voix-ia',
    title: 'Synthèse vocale et voix IA',
    icon: AudioLines,
    description: 'Création de voix professionnelles pour spots radio, SVI, e-learning et applications. Bientôt disponible.',
    details: {
      eyebrow: 'Services bientôt disponible',
      title: 'Des expériences vocales professionnelles pour vos contenus et applications.',
      bullets: ['Synthèse vocale IA', 'Spots audio et publicités radio', 'Voix pour applications et chatbots', 'Clonage de voix professionnelles', 'Serveurs vocaux intelligents (SVI)', 'Contenu audio en langues locales'],
      offers: serviceOffers['synthese-vocale-voix-ia'],
    },
  },
]

export const solutions = [
  { slug: 'portail-entreprise', title: 'Portail entreprise', icon: Blocks, description: 'Centralisez les ressources, les échanges et les outils de vos équipes.' },
  { slug: 'application-metier', title: 'Application métier', icon: BriefcaseBusiness, description: 'Digitalisez précisément les processus qui font la valeur de votre organisation.' },
  { slug: 'espace-client', title: 'Espace client', icon: MonitorSmartphone, description: 'Offrez à vos clients un accès simple, autonome et sécurisé à vos services.' },
  { slug: 'e-commerce', title: 'E-commerce', icon: ShoppingCart, description: 'Vendez en ligne grâce à une expérience fluide et adaptée à votre marché.' },
  { slug: 'automatisation-processus', title: 'Automatisation', icon: Bot, description: 'Réduisez les tâches répétitives et libérez du temps pour les activités essentielles.' },
  { slug: 'tableaux-de-bord', title: 'Tableaux de bord', icon: BarChart3, description: 'Transformez vos données en indicateurs utiles pour mieux décider.' },
  { slug: 'integrations-api', title: 'Intégrations API', icon: LayoutDashboard, description: 'Connectez vos logiciels et faites circuler les données sans friction.' },
]

export const projects = [
  { slug: 'gestion-scolaire', title: 'Plateforme de gestion scolaire', type: 'EdTech', color: 'orange', description: 'Un espace unifié pour les élèves, parents et équipes pédagogiques.' },
  { slug: 'suivi-logistique', title: 'Solution de suivi logistique', type: 'Logistique', color: 'blue', description: 'Une visibilité en temps réel sur les opérations et les livraisons.' },
  { slug: 'portail-services', title: 'Portail de services citoyens', type: 'GovTech', color: 'green', description: 'Des démarches administratives plus simples et accessibles en ligne.' },
]

export const posts = [
  { slug: 'reussir-transformation-digitale', category: 'Stratégie', title: 'Réussir sa transformation digitale en Afrique', date: '4 juin 2026', description: 'Les principes pratiques pour construire une transformation adaptée à son marché.' },
  { slug: 'choisir-application-metier', category: 'Produit', title: 'Quand faut-il créer une application métier ?', date: '21 mai 2026', description: 'Les signaux qui indiquent qu’un outil sur mesure devient un investissement pertinent.' },
  { slug: 'ux-services-numeriques', category: 'Design', title: 'L’UX au service de produits numériques adoptés', date: '8 mai 2026', description: 'Pourquoi une bonne expérience utilisateur est d’abord une question de compréhension.' },
]

export const processSteps = [
  { number: '01', title: 'Comprendre', text: 'Nous clarifions vos objectifs, vos utilisateurs et les contraintes du projet.' },
  { number: '02', title: 'Concevoir', text: 'Nous transformons les besoins en une expérience simple et une solution solide.' },
  { number: '03', title: 'Construire', text: 'Nous développons par étapes, avec des validations régulières et concrètes.' },
  { number: '04', title: 'Faire évoluer', text: 'Nous suivons le produit après son lancement et l’améliorons avec vous.' },
]
