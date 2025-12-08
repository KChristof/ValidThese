import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  BarChart2, 
  FileText, 
  Menu, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Database, 
  PieChart,
  CheckCircle,
  Award,
  Layers,
  ExternalLink,
  XCircle,
  CheckSquare,
  Monitor,
  Cpu
} from 'lucide-react';

// --- Composants UI ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "border-transparent text-white bg-blue-900 hover:bg-blue-800 focus:ring-blue-900 shadow-lg hover:shadow-xl",
    secondary: "border-transparent text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 shadow-md",
    outline: "border-blue-100 text-blue-900 bg-white hover:bg-blue-50 focus:ring-blue-500"
  };

  return (
    <a className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
};

// --- Composant Modale (Popup Détails) ---
const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        {/* Fond sombre */}
        <div 
          className="fixed inset-0 bg-slate-900 bg-opacity-80 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Contenu de la modale */}
        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl w-full relative">
          
          {/* En-tête Modale */}
          <div className={`bg-gradient-to-r ${service.color} p-6 flex justify-between items-start`}>
            <div className="flex items-center text-white">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <service.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold leading-6" id="modal-title">
                {service.title}
              </h3>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
              <XCircle size={28} />
            </button>
          </div>
          
          {/* Corps Modale */}
          <div className="px-6 py-6">
            <p className="text-gray-500 italic mb-6 text-sm border-l-4 border-blue-100 pl-4">
              "{service.intro}"
            </p>
            
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center">
                <Activity size={16} className="mr-2 text-cyan-500" /> 
                Notre Offre
              </h4>
              <ul className="space-y-3">
                {service.details.map((point, idx) => (
                  <li key={idx} className="flex items-start text-gray-600 text-sm leading-relaxed">
                    <CheckSquare size={16} className="mr-3 mt-1 text-cyan-500 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3">
                Outils & Logiciels
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold border border-slate-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Pied de Modale */}
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => window.location.href = '#contact'}
            >
              Demander un devis
            </button>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sections du Site ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'Expertises', href: '#services' },
    { name: 'Réalisations', href: '#portfolio' },
    { name: 'À Propos', href: '#about' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            {/* LOGO - Assurez-vous que logo-cebistats.jpg est dans le dossier public */}
            <img 
              src="/logo-cebistats.jpg" 
              alt="Logo CEBI Stats" 
              className="h-12 w-auto mr-3 rounded-lg shadow-sm bg-white" 
              onError={(e) => {
                // Fallback si l'image n'est pas trouvée : on affiche une icône
                e.target.style.display='none';
                e.target.nextSibling.style.display='flex'; 
              }} 
            />
            {/* Fallback Icon (caché par défaut si image ok) */}
            <div className="hidden bg-blue-900 p-2 rounded-lg mr-2 items-center justify-center">
               <BarChart2 size={24} className="text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tighter leading-none text-slate-900">
                CEBI <span className="text-cyan-500">Stats</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Côte d'Ivoire</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${scrolled ? 'text-gray-600 hover:text-cyan-600' : 'text-gray-700 hover:text-cyan-600'}`}
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" href="#contact" className="!px-5 !py-2 !text-sm !rounded-lg">
              Devis Gratuit
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 hover:text-blue-900 focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full top-full left-0 animate-fade-in-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-blue-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-5 py-3 rounded-xl bg-blue-900 text-white font-bold shadow-lg"
            >
              Démarrer un projet
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-100 opacity-40 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100 opacity-40 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-bold mb-6 shadow-sm">
              <Award size={14} className="mr-2 text-cyan-500" />
              Cabinet d'Études Biostatistique & Informatique
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Transformez vos données de santé en <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                décisions éclairées
              </span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Nous combinons expertise statistique et solutions informatiques. Du nettoyage de vos données à la formation sur vos logiciels professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button href="#services" variant="primary">
                Nos Services <ChevronRight size={20} className="ml-2" />
              </Button>
              <Button href="#portfolio" variant="outline">
                Nos Réalisations
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-2xl bg-white p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl opacity-10"></div>
               <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 h-96 flex flex-col justify-center items-center text-center">
                  <div className="bg-white p-4 rounded-full shadow-lg mb-6">
                    <Activity size={48} className="text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Double Compétence</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 max-w-[200px]">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-500 w-full max-w-[220px]">
                    <div className="flex justify-between"><span>Biostatistique</span> <span>Expert</span></div>
                    <div className="flex justify-between"><span>Informatique</span> <span>Expert</span></div>
                    <div className="flex justify-between"><span>Infographie</span> <span>Expert</span></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, color, onClick }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden flex flex-col h-full">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`}></div>
    <div className={`w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors`}>
      <Icon size={28} className="text-slate-700 group-hover:text-blue-600 transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm flex-1">{description}</p>
    <button 
      onClick={onClick}
      className="mt-6 flex items-center text-cyan-600 font-semibold text-sm hover:text-cyan-800 transition-colors group-hover:translate-x-1"
    >
      En savoir plus <ChevronRight size={16} className="ml-1" />
    </button>
  </div>
);

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: Database,
      title: "Gestion de Données & Formulaires",
      description: "Création de formulaires de collecte automatisés (ODK) et nettoyage de vos bases de données.",
      color: "from-blue-400 to-blue-600",
      intro: "Une bonne analyse commence par une collecte de données fiable et structurée.",
      details: [
        "Création de formulaires de saisie automatisés (ODK, KoboCollect) pour smartphones et tablettes.",
        "Facilitation de la collecte terrain et réduction des erreurs de saisie.",
        "Apurement et structuration des bases de données pour les rendre exploitables.",
        "Gestion et traitement de données massives."
      ],
      tools: ["ODK Collect", "KoboToolbox", "Excel Avancé", "Access", "SQL"]
    },
    {
      icon: Activity,
      title: "Biostatistique Avancée",
      description: "Modélisation complexe : Analyse de survie (Kaplan-Meier, Cox), Régression et Tests.",
      color: "from-cyan-400 to-cyan-600",
      intro: "Nous transformons vos chiffres en preuves scientifiques robustes pour la prise de décision.",
      details: [
        "Analyses bivariées et multivariées pour éliminer les facteurs de confusion.",
        "Calcul des mesures d'association (OR, RR) et modélisation prédictive.",
        "Analyse de survie (Courbes de Kaplan-Meier, Modèles de Cox).",
        "Interprétation rigoureuse des résultats pour thèses et rapports."
      ],
      tools: ["R Studio", "Epi Info", "SPSS", "Stata", "Analyse de Survie", "Python"]
    },
    {
      icon: Monitor,
      title: "Informatique & Formation",
      description: "Vente/Installation de logiciels, maintenance et formation personnalisée (Office, Bureautique).",
      color: "from-slate-500 to-slate-700",
      intro: "Nous vous équipons et vous formons pour optimiser votre productivité au quotidien.",
      details: [
        "Vente et installation de logiciels professionnels (Suite Office, Adobe Creative Cloud).",
        "Installation de logiciels ludiques et jeux (PC & PlayStation) pour particuliers.",
        "Formation personnalisée à la suite Office (Word, Excel, PowerPoint) : du niveau débutant à expert.",
        "Conseil en équipement informatique et maintenance logicielle."
      ],
      tools: ["Microsoft Office 365", "Suite Adobe", "Windows", "Maintenance PC"]
    },
    {
      icon: PieChart,
      title: "Infographie & Édition",
      description: "Mise en forme professionnelle de documents et création de visuels impactants.",
      color: "from-indigo-400 to-indigo-600",
      intro: "La forme valorise le fond. Nous rendons vos rapports et supports lisibles et professionnels.",
      details: [
        "Mise en forme professionnelle de rapports d'études, thèses et mémoires.",
        "Conception de supports de formation clairs et pédagogiques.",
        "Création d'infographies récapitulatives pour valoriser vos résultats statistiques.",
        "Design de présentations PowerPoint institutionnelles."
      ],
      tools: ["PowerPoint Pro", "InDesign", "Illustrator", "Canva Pro", "Word Avancé"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-3">Nos Domaines d'Intervention</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Expertise Globale</h3>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            La complémentarité entre l'analyse de données et la maîtrise des outils informatiques.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* MODALE DYNAMIQUE */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
};

const ProjectCard = ({ title, category, description, tools }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
    <div className="h-3 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500"></div>
    
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
          {category}
        </span>
        <Layers size={16} className="text-gray-300" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-6 flex-1">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tools.map((tool, index) => (
          <span key={index} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">
            {tool}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Portfolio = () => {
  const projects = [
    {
      category: "Santé Publique",
      title: "Rapport Annuel Statistique",
      description: "Conception graphique et validation des indicateurs du rapport annuel (Ministère de la Santé). Transformation des tableaux DHIS2 en visuels infographiques.",
      tools: ["DHIS2", "Excel Avancé", "Illustrator"]
    },
    {
      category: "Formation",
      title: "Renforcement Capacités",
      description: "Formation d'une équipe de 10 agents à l'utilisation avancée d'Excel et PowerPoint pour le reporting mensuel.",
      tools: ["Excel Expert", "Pédagogie", "Support de cours"]
    },
    {
      category: "Collecte Digitale",
      title: "Digitalisation d'Enquête",
      description: "Configuration de masques de saisie sur tablettes (ODK) pour une collecte de données terrain en zone rurale.",
      tools: ["ODK Collect", "KoboToolbox", "GPS"]
    },
    {
      category: "Informatique",
      title: "Déploiement Logiciel",
      description: "Installation et configuration de la suite Adobe Creative Cloud pour un cabinet de communication partenaire.",
      tools: ["Adobe CC", "Installation", "Configuration"]
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Portfolio</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Travaux Réalisés</h3>
            <p className="mt-4 text-gray-500">
              Quelques exemples concrets de notre apport en biostatistique, informatique et infographie.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a href="#contact" className="inline-flex items-center font-bold text-blue-900 hover:text-cyan-600 transition-colors">
              Voir plus de projets <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="relative mb-12 lg:mb-0">
            <div className="relative rounded-2xl shadow-2xl bg-blue-900 text-white overflow-hidden p-10 z-10">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20 blur-2xl"></div>
              
              <BarChart2 size={64} className="mb-6 text-cyan-400" />
              <h3 className="text-3xl font-bold mb-2">Christophe KOUAKOU</h3>
              <p className="text-blue-200 font-medium mb-6">Statisticien & Infographe</p>
              
              <div className="space-y-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-3 text-cyan-400" />
                  Direction de l'Information Sanitaire (MSHPCMU)
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-3 text-cyan-400" />
                  Expert Logiciels & Bureautique
                </div>
                <div className="flex items-center">
                  <CheckCircle size={18} className="mr-3 text-cyan-400" />
                  Double compétence Technique & Visuelle
                </div>
              </div>
            </div>
            <div className="absolute top-4 -right-4 w-full h-full border-2 border-cyan-200 rounded-2xl z-0"></div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Plus qu'un statisticien, <br/>
              <span className="text-blue-700">un partenaire de décision.</span>
            </h2>
            <div className="prose prose-lg text-gray-600 space-y-6 text-justify">
              <p>
                <strong>CEBI Stats</strong> est né d'un constat simple : la statistique moderne ne peut se passer de l'outil informatique. 
                Notre rôle est de faire le pont entre ces deux mondes.
              </p>
              <p>
                Fort de notre expérience au sein du <strong>Ministère de la Santé</strong>, nous maîtrise toute la chaîne de production des données : 
                de la conception du formulaire de collecte sur tablette (ODK) jusqu'à la mise en page finale du rapport, en passant par l'analyse statistique rigoureuse.
              </p>
              <p>
                Nous proposons également des <strong>formations personnalisées</strong> et l'installation de vos outils de travail, car nous croyons que l'autonomie de nos clients est la clé de leur succès.
              </p>
              
              <div className="pt-4">
                <a href="#contact" className="text-cyan-600 font-bold hover:text-cyan-700 flex items-center">
                  Discutons de votre projet <ChevronRight size={20} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Merci ! Votre message a été simulé. Pour le moment, utilisez l'email direct ou le téléphone.");
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-extrabold mb-6">Contactez CEBI Stats</h2>
            <p className="text-slate-400 mb-10 text-lg">
              Une thèse à finaliser ? Un logiciel à installer ? Une formation à organiser ? 
              Nous sommes basés à Abidjan et disponible pour échanger.
            </p>

            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="flex-shrink-0 bg-blue-800 p-4 rounded-xl group-hover:bg-cyan-600 transition-colors">
                  <Mail className="w-6 h-6 text-cyan-200 group-hover:text-white" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium">Email</h3>
                  <a href="mailto:contact@cebistats.ci" className="mt-1 text-slate-400 block hover:text-white transition-colors">
                    christofkouakou@cebistats.ci
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 bg-blue-800 p-4 rounded-xl group-hover:bg-cyan-600 transition-colors">
                  <Phone className="w-6 h-6 text-cyan-200 group-hover:text-white" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium">Téléphone & WhatsApp</h3>
                  <p className="mt-1 text-slate-400">(+225) 07 41 97 41 32</p>
                  <p className="text-xs text-slate-500">Disponible 8h - 18h</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0 bg-blue-800 p-4 rounded-xl group-hover:bg-cyan-600 transition-colors">
                  <MapPin className="w-6 h-6 text-cyan-200 group-hover:text-white" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium">Localisation</h3>
                  <p className="mt-1 text-slate-400">Cocody, Abidjan, Côte d'Ivoire</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nom</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Prénom</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" placeholder="Votre prénom" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Type de projet</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition">
                  <option>Analyse Statistique (Thèse/Mémoire)</option>
                  <option>Formation & Logiciels</option>
                  <option>Nettoyage de Données</option>
                  <option>Infographie & Rapport</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea rows="4" required className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition" placeholder="Décrivez votre besoin..."></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 hover:shadow-lg transition duration-300 transform active:scale-95">
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2">
          <div className="flex items-center text-white mb-4">
            <BarChart2 size={24} className="mr-2 text-cyan-500" />
            <span className="font-bold text-xl">CEBI Stats</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Cabinet d'Études Biostatistique et Informatique.
            La référence ivoirienne pour l'analyse de données de santé, la formation et les solutions informatiques.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Liens Rapides</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition">Accueil</a></li>
            <li><a href="#services" className="hover:text-cyan-400 transition">Nos Services</a></li>
            <li><a href="#about" className="hover:text-cyan-400 transition">À Propos</a></li>
            <li><a href="#contact" className="hover:text-cyan-400 transition">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Légal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-cyan-400 transition">Mentions Légales</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition">Politique de Confidentialité</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} CEBI Stats Abidjan. Tous droits réservés.</p>
        <div className="mt-4 md:mt-0 flex items-center">
           <span className="mr-2">Design par</span>
           <span className="text-cyan-500 font-bold">Kouadio Christophe K.</span>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="font-sans text-slate-900 antialiased bg-white selection:bg-cyan-100 selection:text-cyan-900">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;