import {
  BarChart3, Blocks, Bot, BriefcaseBusiness, CloudCog, Code2, Compass,
  Headphones, LayoutDashboard, MonitorSmartphone, Palette, RefreshCw, ShoppingCart,
} from 'lucide-react'

export const services = [
  { slug: 'transformation-digitale', title: 'Transformation digitale', icon: RefreshCw, description: 'Structurez votre transition numérique avec une feuille de route réaliste et mesurable.' },
  { slug: 'developpement-web', title: 'Développement web', icon: Code2, description: 'Des plateformes web rapides, accessibles et conçues pour évoluer avec votre activité.' },
  { slug: 'developpement-mobile', title: 'Développement mobile', icon: MonitorSmartphone, description: 'Des applications mobiles intuitives qui rapprochent vos services de vos utilisateurs.' },
  { slug: 'plateformes-metiers', title: 'Plateformes métiers', icon: BriefcaseBusiness, description: 'Des outils sur mesure qui simplifient vos opérations et centralisent vos données.' },
  { slug: 'ux-ui-design', title: 'UX / UI Design', icon: Palette, description: 'Des expériences claires et agréables, pensées autour des vrais besoins utilisateurs.' },
  { slug: 'cloud-devops', title: 'Cloud & DevOps', icon: CloudCog, description: 'Une infrastructure fiable, automatisée et prête à accompagner votre croissance.' },
  { slug: 'maintenance-support', title: 'Maintenance & support', icon: Headphones, description: 'Un suivi réactif pour garder vos produits performants, sécurisés et disponibles.' },
  { slug: 'conseil-it', title: 'Conseil IT', icon: Compass, description: 'Des décisions technologiques éclairées, alignées avec vos objectifs stratégiques.' },
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
