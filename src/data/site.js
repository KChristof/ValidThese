// Source unique des contenus de ValidThèse : modifier ici, la page suit.

export const contact = {
  email: 'contact@cebistats.com',
  phoneDisplay: '+225 01 52 71 48 98',
  phoneIntl: '2250152714898',
  city: 'Abidjan, Côte d’Ivoire',
  cebistats: 'https://cebistats.com',
};

export const whatsapp = (text = 'Bonjour ValidThèse, je voudrais de l’aide pour ma thèse.') =>
  `https://wa.me/${contact.phoneIntl}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: '#parcours', label: 'Où en êtes-vous ?' },
  { href: '#avant-apres', label: 'Avant / après' },
  { href: '#offres', label: 'Formules' },
  { href: '#questions', label: 'Questions' },
];

// « Où en êtes-vous ? » : chaque étape a son propre message WhatsApp pré-rempli.
export const stages = [
  {
    id: 'sujet',
    label: 'J’ai mon sujet',
    title: 'Partir sur un protocole solide',
    text: 'Le meilleur moment pour nous consulter. Un échantillon trop petit ou une variable oubliée ne se rattrapent pas après la collecte.',
    do: [
      'Calcul de la taille d’échantillon adapté à votre type d’étude',
      'Relecture de la fiche d’enquête : variables utiles, codage, biais à éviter',
      'Plan d’analyse statistique, à joindre au protocole',
      'Fiche numérique sur smartphone (KoboToolbox, ODK) si vous le souhaitez',
    ],
    get: 'Une note méthodologique et une fiche d’enquête prête pour le terrain.',
    msg: 'Bonjour ValidThèse, j’ai mon sujet de thèse et je voudrais de l’aide pour le protocole (échantillon, fiche d’enquête).',
  },
  {
    id: 'fiches',
    label: 'J’ai mes fiches papier',
    title: 'Transformer les fiches en base exploitable',
    text: 'Vos fiches sont remplies mais rien n’est encore saisi. Nous préparons un masque de saisie qui bloque les erreurs, ou nous saisissons pour vous.',
    do: [
      'Masque de saisie avec contrôles (plages de valeurs, champs obligatoires)',
      'Saisie de vos fiches si vous manquez de temps',
      'Double vérification sur un échantillon de fiches',
      'Dictionnaire des variables',
    ],
    get: 'Une base propre au format Excel, SPSS ou Stata, prête pour l’analyse.',
    msg: 'Bonjour ValidThèse, mes fiches de thèse sont remplies et je voudrais de l’aide pour la saisie.',
  },
  {
    id: 'base',
    label: 'J’ai une base Excel',
    title: 'Nettoyer, analyser, interpréter',
    text: 'Le cas le plus fréquent. Nous vérifions votre base, nous menons les analyses prévues et nous vous expliquons chaque résultat.',
    do: [
      'Nettoyage : doublons, valeurs impossibles, codages incohérents',
      'Tableaux descriptifs et graphiques aux normes',
      'Tests (Chi-2, Student, ANOVA…), régression logistique, survie',
      'Séance d’explication des résultats, en visio ou en présentiel',
    ],
    get: 'Les tableaux et figures de votre partie Résultats, avec une note qui les explique.',
    msg: 'Bonjour ValidThèse, j’ai ma base de données de thèse sur Excel et je voudrais faire les analyses statistiques.',
  },
  {
    id: 'soutenance',
    label: 'Ma soutenance approche',
    title: 'Arriver serein devant le jury',
    text: 'Vos analyses sont faites, ou presque. Nous vérifions qu’elles tiennent et nous vous préparons aux questions de statistique.',
    do: [
      'Vérification des tests utilisés et des tableaux du manuscrit',
      'Corrections statistiques demandées par le directeur de thèse',
      'Diaporama de soutenance : tableaux et graphiques lisibles à l’écran',
      'Entraînement aux questions du jury sur la méthode et les résultats',
    ],
    get: 'Un manuscrit cohérent, un diaporama clair et des réponses prêtes.',
    msg: 'Bonjour ValidThèse, ma soutenance approche et je voudrais faire vérifier mes analyses et préparer ma présentation.',
  },
];

export const offers = [
  {
    name: 'Analyse',
    price: 'Sur devis',
    for: 'Vous avez une base et vous voulez des résultats fiables.',
    items: [
      'Nettoyage de la base de données',
      'Statistiques descriptives',
      'Tests statistiques adaptés à vos objectifs',
      'Tableaux et graphiques aux normes',
      'Note d’interprétation des résultats',
    ],
  },
  {
    name: 'Soutenance',
    price: 'Sur devis',
    featured: true,
    for: 'L’accompagnement complet, de la base au jour J.',
    items: [
      'Tout le contenu de la formule Analyse',
      'Analyses avancées si nécessaire (régression, survie)',
      'Aide à la rédaction de la partie Résultats',
      'Relecture méthodologique de votre discussion',
      'Diaporama de soutenance',
      'Préparation aux questions du jury',
      'Corrections statistiques demandées jusqu’à la soutenance',
    ],
  },
  {
    name: 'Délai court',
    price: 'Majoration',
    for: 'Votre date de dépôt est proche.',
    items: [
      'Traitement prioritaire de votre dossier',
      'Délai fixé ensemble avant de commencer, selon le volume de données',
      'Analyses ciblées sur ce que le manuscrit exige',
      'Échanges rapprochés sur WhatsApp',
    ],
  },
];

export const faq = [
  {
    q: 'Je ne suis pas à l’aise avec les statistiques. Est-ce un problème ?',
    a: 'Non. Nous prenons en charge la partie technique (logiciels, calculs, choix des tests) et nous vous expliquons chaque résultat en langage clair, pour que vous puissiez le présenter et le défendre vous-même.',
  },
  {
    q: 'Combien de temps faut-il ?',
    a: 'Pour une base déjà saisie, comptez en général 3 à 5 jours ouvrés. Si la saisie ou le masque de saisie sont à faire, le délai dépend du nombre de fiches. Le délai est toujours fixé avec vous avant de commencer.',
  },
  {
    q: 'Et si mon directeur ou le jury demande des corrections ?',
    a: 'Les corrections statistiques demandées sur le travail que nous avons réalisé (un tableau à ajouter, un test à refaire) sont incluses jusqu’à la soutenance.',
  },
  {
    q: 'Rédigez-vous la thèse à ma place ?',
    a: 'Non. Vous restez l’auteur de votre thèse. Nous réalisons les analyses, nous vous aidons à décrire les résultats et nous relisons votre discussion sous l’angle méthodologique, mais l’interprétation et l’argumentation restent les vôtres. C’est aussi ce qui vous permet de répondre au jury.',
  },
  {
    q: 'Quels logiciels utilisez-vous ?',
    a: 'R, SPSS, Stata et Epi Info pour l’analyse, KoboToolbox et ODK pour la collecte sur smartphone. Si votre faculté exige un logiciel précis, nous l’utilisons et nous pouvons vous remettre les fichiers de sortie.',
  },
  {
    q: 'Mes données restent-elles confidentielles ?',
    a: 'Oui. Vos données ne sont jamais partagées ni réutilisées. Après la soutenance, nous les supprimons ou les archivons selon votre choix.',
  },
  {
    q: 'Combien cela coûte-t-il ?',
    a: 'Le tarif dépend du volume de données et des analyses demandées. Le premier échange est gratuit : décrivez votre sujet et l’état de vos données, nous vous envoyons un devis adapté au budget étudiant.',
  },
];

export const degrees = [
  'Thèse de médecine',
  'Thèse de pharmacie',
  'Thèse d’odontostomatologie',
  'DES / mémoire de spécialité',
  'Doctorat (PhD)',
  'Master ou licence',
];

// Guides publiés sur le blog de CEBI Stats
export const guides = [
  { href: 'https://cebistats.com/blog/taille-echantillon-these', t: 'Calculer la taille d’échantillon de sa thèse' },
  { href: 'https://cebistats.com/blog/rediger-resultats-these', t: 'Rédiger la partie Résultats d’une thèse' },
  { href: 'https://cebistats.com/blog/odds-ratio-risque-relatif-hazard-ratio', t: 'Odds ratio, risque relatif, hazard ratio : lequel choisir ?' },
  { href: 'https://cebistats.com/outils', t: 'Outils gratuits : choix du test, taille d’échantillon' },
];
