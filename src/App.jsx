import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  BarChart2, 
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
  Plus,
  Minus,
  HelpCircle,
  Facebook,
  MessageSquare,
  Send,
  Sparkles,
  Loader2,
  MessageCircle,
  BrainCircuit,
  FilePenLine,
  Lightbulb,
  GraduationCap, 
  BookOpen,      
  Scroll,        
  School,        
  FileCheck,
  Clock,
  Zap
} from 'lucide-react';

// --- FONCTION DE NAVIGATION UNIVERSELLE ---
const smoothScrollTo = (e, targetId) => {
  e.preventDefault();
  const element = document.getElementById(targetId.replace('#', ''));
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// --- STYLES GLOBAUX & ANIMATIONS ---
const GlobalStyles = () => (
  <style>{`
    html {
      scroll-behavior: smooth;
      scroll-padding-top: 80px;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f0fdf4;
    }
    ::-webkit-scrollbar-thumb {
      background: #15803d;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #166534;
    }
    
    .animate-float {
      animation: float 8s ease-in-out infinite;
    }
    @keyframes float {
      0% { transform: translate(0px, 0px); }
      50% { transform: translate(10px, -20px); }
      100% { transform: translate(0px, 0px); }
    }
  `}</style>
);

// --- COMPOSANT DE RÉVÉLATION AU SCROLL ---
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.1 } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- NAVIGATION (RÉINTÉGRÉ) ---
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Le Parcours', href: '#services' },
    { name: 'Tarifs', href: '#tarifs' },
    { name: 'Thèses Validées', href: '#portfolio' },
    { name: 'Outils IA', href: '#ai-tools' },
  ];

  const handleNavClick = (e, href) => {
    setIsOpen(false);
    smoothScrollTo(e, href);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            {/* LOGO SIMPLIFIÉ THÈSE */}
            <div className="bg-green-700 p-2 rounded-lg mr-3 shadow-md">
               <GraduationCap size={28} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tighter leading-none text-slate-900">
                Valid'<span className="text-green-600">Thèse</span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">par CEBI Stats</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-green-600 transition-colors cursor-pointer">
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={(e) => smoothScrollTo(e, '#contact')} className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-700 hover:bg-green-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Contact Rapide
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-green-700 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full top-full left-0 animate-fade-in-down">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="block w-full text-center mt-4 px-5 py-3 rounded-xl bg-green-700 text-white font-bold shadow-lg">
              Me faire aider
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- NOUVEAU COMPOSANT : PROFIL EXPERT (CRÉDIBILITÉ) ---
const ExpertProfile = () => (
  <section className="py-16 bg-slate-50 border-y border-slate-200">
    <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      <div className="w-48 h-48 rounded-full bg-green-200 flex-shrink-0 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center text-4xl">
        {/* Placeholder avatar */}
        👨🏾‍💻
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Supervisé par Christophe KOUAKOU</h3>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">Ingénieur Statisticien</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">Ministère de la Santé (DIS)</span>
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">Infographe</span>
        </div>
        <p className="text-gray-600 mb-4 italic text-lg">
          "Je connais les exigences académiques et les réalités du terrain sanitaire. Mon objectif est de transformer vos mois de collecte de données en une soutenance brillante et sans stress."
        </p>
        <div className="flex items-center justify-center md:justify-start text-sm text-gray-500 font-medium">
          <CheckCircle size={16} className="text-green-600 mr-2" />
          <span>Plus de 5 ans d'expérience</span>
        </div>
      </div>
    </div>
  </section>
);

// --- NOUVEAU COMPOSANT : COMPARISON SLIDER (AVANT/APRÈS) ---
const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition(Math.max(0, Math.min((x / rect.width) * 100, 100)));
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Infographie & Design</h2>
            <h3 className="text-3xl font-bold text-slate-900">La "Touche CEBI" : De l'Excel brut au Slide parfait</h3>
            <p className="text-gray-500 mt-2">Glissez le curseur pour voir la différence sur une présentation de soutenance.</p>
          </div>
          
          <div 
            ref={containerRef} 
            className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden cursor-ew-resize shadow-2xl border-4 border-slate-100 select-none group"
            onMouseDown={() => isDragging.current = true} 
            onMouseUp={() => isDragging.current = false} 
            onMouseLeave={() => isDragging.current = false} 
            onMouseMove={handleMove} 
            onTouchStart={() => isDragging.current = true} 
            onTouchEnd={() => isDragging.current = false} 
            onTouchMove={handleMove}
          >
            {/* Image APRES (Fond) */}
            <div className="absolute inset-0 w-full h-full bg-green-50">
              <img 
                src="/slide-apres.png" 
                alt="Présentation Après Design" 
                className="object-cover w-full h-full" 
                draggable="false" 
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<div class="flex items-center justify-center h-full text-green-800 font-bold">Image Après (Ajouter slide-apres.png)</div>';
                }}
              />
              <div className="absolute bottom-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                APRÈS (CEBI Stats)
              </div>
            </div>

            {/* Image AVANT (Overlay avec clip-path/width) */}
            <div 
              className="absolute inset-0 border-r-4 border-white overflow-hidden bg-slate-100" 
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full">
                <img 
                  src="/excel-avant.png" 
                  alt="Tableau Excel Avant" 
                  className="object-cover w-full h-full max-w-none" 
                  style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }} 
                  draggable="false" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="flex items-center justify-center h-full text-slate-500 font-bold">Image Avant (Ajouter excel-avant.png)</div>';
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-slate-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  AVANT (EXCEL)
                </div>
              </div>
            </div>

            {/* Curseur central */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20" 
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform">
                <Layers size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// --- NOUVEAU COMPOSANT : PRICING (TARIFS) ---
const PricingCard = ({ title, price, features, highlighted = false, icon: Icon }) => (
  <div className={`relative p-8 rounded-2xl flex flex-col h-full transition-transform hover:-translate-y-2 duration-300 ${highlighted ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10' : 'bg-white border border-slate-200 text-slate-900 shadow-lg'}`}>
    {highlighted && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 text-xs font-bold px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
        Le plus choisi
      </div>
    )}
    <div className="mb-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${highlighted ? 'bg-white/10' : 'bg-green-50'}`}>
        <Icon size={24} className={highlighted ? 'text-yellow-400' : 'text-green-600'} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="flex items-baseline">
        <span className={`text-3xl font-extrabold ${highlighted ? 'text-white' : 'text-slate-900'}`}>{price}</span>
      </div>
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start text-sm">
          <CheckCircle size={16} className={`mr-3 mt-1 flex-shrink-0 ${highlighted ? 'text-green-400' : 'text-green-600'}`} />
          <span className={highlighted ? 'text-slate-300' : 'text-gray-600'}>{feature}</span>
        </li>
      ))}
    </ul>
    <a 
      href="#contact" 
      onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); }}
      className={`block w-full text-center py-3 rounded-xl font-bold transition-colors ${highlighted ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'}`}
    >
      Demander ce pack
    </a>
  </div>
);

const Pricing = () => {
  return (
    <section id="tarifs" className="py-24 bg-slate-50 relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Investissement</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Des tarifs adaptés aux étudiants</h3>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Nous savons que le budget étudiant est serré. Nos offres sont conçues pour valider votre thèse sans vous ruiner.
            </p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          <Reveal delay={100}>
            <PricingCard 
              title="Pack Essentiel" 
              price="Sur devis" 
              icon={BarChart2}
              features={[
                "Nettoyage de base de données",
                "Analyses descriptives simples",
                "Tableaux & Graphiques (Excel)",
                "Support par email",
                "Délai standard (5-7 jours)"
              ]} 
            />
          </Reveal>
          
          <Reveal delay={200}>
            <PricingCard 
              title="Pack Soutenance" 
              price="Recommandé" 
              highlighted={true}
              icon={Award}
              features={[
                "Tout du Pack Essentiel",
                "Tests statistiques avancés (P-value)",
                "Rédaction partie Résultats & Discussion",
                "Mise en forme Word + PPT Soutenance",
                "Coaching préparation questions jury",
                "Corrections illimitées"
              ]} 
            />
          </Reveal>
          
          <Reveal delay={300}>
            <PricingCard 
              title="Urgence 72H" 
              price="+ Majoration" 
              icon={Zap}
              features={[
                "Traitement prioritaire (Nuit & Week-end)",
                "Livraison des résultats en 72h chrono",
                "Contact WhatsApp direct permanent",
                "Idéal pour les délais dépassés",
                "Analyse ciblée sur l'essentiel"
              ]} 
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// --- NOUVEAU COMPOSANT : COACH THÈSE IA ---
const ThesisAI = () => {
  const [activeTab, setActiveTab] = useState('discussion'); 
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 1. SÉCURITÉ API - MODIFIÉ POUR LA COMPATIBILITÉ
  // Note: Dans un vrai projet Vite avec fichier .env, utilisez : const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  // Ici, nous utilisons une chaîne vide car l'environnement injecte la clé automatiquement.
  const apiKey = ""; 

  const handleAISubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setResult('');

    let systemPrompt = "";
    if (activeTab === 'discussion') {
      systemPrompt = "Tu es un expert académique et membre de jury de thèse en médecine. L'étudiant te donne ses résultats statistiques principaux (ex: p < 0.05 pour telle variable). Tu dois rédiger une ébauche de la section 'Discussion' en comparant ces résultats à la littérature générale (sans citer de fausses sources, mais en utilisant des tournures comme 'Ces résultats corroborent les données de la littérature...'). Sois formel, scientifique et critique.";
    } else {
      systemPrompt = "Tu es un coach méthodologique pour thèse. L'étudiant te donne son thème ou son hypothèse. Tu dois lui suggérer un plan de rédaction structuré (IMRAD) et les variables clés qu'il devrait probablement collecter pour ce sujet précis.";
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur lors de l'analyse.";
      setResult(text);
    } catch (error) {
      setResult("Erreur de connexion à l'IA ou clé API manquante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-tools" className="py-24 bg-green-900 relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-800 border border-green-700 text-green-200 text-xs font-bold mb-6">
              <Sparkles size={14} className="mr-2" /> Assistant Virtuel de Rédaction
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Bloqué sur votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Rédaction ?</span>
            </h2>
            <p className="text-green-100 max-w-2xl mx-auto">
              Utilisez notre IA spécialisée pour débloquer votre inspiration, structurer votre discussion ou vérifier votre méthodologie.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="bg-green-800/50 rounded-2xl shadow-2xl border border-green-700 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row min-h-[500px]">
            <div className="md:w-1/3 bg-green-950/30 border-r border-green-700 p-6 flex flex-col gap-4">
              <button
                onClick={() => { setActiveTab('discussion'); setResult(''); setInput(''); }}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 ${activeTab === 'discussion' ? 'bg-white text-green-900 shadow-lg' : 'bg-green-900/50 text-green-300 hover:bg-green-800'}`}
              >
                <FilePenLine size={24} className="mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold">Aide à la Discussion</div>
                  <div className="text-xs opacity-70">Interpréter vos résultats</div>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('plan'); setResult(''); setInput(''); }}
                className={`flex items-center p-4 rounded-xl transition-all duration-300 ${activeTab === 'plan' ? 'bg-white text-green-900 shadow-lg' : 'bg-green-900/50 text-green-300 hover:bg-green-800'}`}
              >
                <BrainCircuit size={24} className="mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-bold">Structurer le Plan</div>
                  <div className="text-xs opacity-70">Idées de variables</div>
                </div>
              </button>
            </div>

            <div className="md:w-2/3 p-6 md:p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  {activeTab === 'discussion' ? '📊 Interpréter mes résultats' : '🗺️ Structurer ma thèse'}
                </h3>
                <p className="text-green-200 text-sm">
                  {activeTab === 'discussion' 
                    ? "Collez ici vos résultats principaux (ex: 'On a trouvé 60% d'hommes, et une corrélation significative entre tabac et cancer p=0.02')." 
                    : "Entrez votre sujet de thèse (ex: 'Prévalence de l'hypertension chez les femmes enceintes à Abidjan')."}
                </p>
              </div>

              <form onSubmit={handleAISubmit} className="flex-1 flex flex-col">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Écrivez ici..."
                  className="w-full bg-green-900/50 border border-green-600 rounded-xl p-4 text-white placeholder-green-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none resize-none h-32 transition-all"
                />
                
                <div className="mt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={loading || !input.trim()}
                    className="px-6 py-3 rounded-xl font-bold text-green-900 bg-yellow-400 hover:bg-yellow-300 transition-all flex items-center disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                    {loading ? "Réflexion..." : "Générer"}
                  </button>
                </div>
              </form>

              <div className={`mt-6 p-4 rounded-xl border border-green-700 bg-green-950/50 min-h-[120px] transition-all duration-500 ${result ? 'opacity-100' : 'opacity-50'}`}>
                {result ? (
                  <div className="text-green-100 leading-relaxed whitespace-pre-wrap text-sm">{result}</div>
                ) : (
                  <div className="h-full flex items-center justify-center text-green-500/50 italic text-sm">
                    Le conseil de l'IA s'affichera ici...
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// --- COMPOSANT ASSISTANT CHAT ---
const GeminiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Bonjour Futur Docteur ! Besoin d'aide pour vos statistiques de thèse ? Je suis là." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  // MODIFIÉ POUR COMPATIBILITÉ
  const apiKey = ""; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsLoading(true);

    try {
      const systemPrompt = `Tu es l'assistant de 'Valid'Thèse', le service de CEBI Stats dédié aux étudiants en médecine.
      Ton but est de rassurer l'étudiant stressé par ses délais.
      Propose de l'aide pour : le calcul de la taille de l'échantillon, la saisie, l'analyse, ou la discussion.
      Sois encourageant.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        }
      );

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erreur réseau.";
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Erreur de connexion." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:animate-bounce" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up max-h-[450px]">
          <div className="bg-green-700 p-4 text-white flex justify-between items-center">
            <span className="font-bold flex items-center"><GraduationCap size={18} className="mr-2" /> Chat Thèse</span>
            <button onClick={() => setIsOpen(false)}><X size={18}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-700'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs text-gray-400 ml-2">Écrit...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-2 border-t flex">
            <input 
              className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none"
              placeholder="Question..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
            <button type="submit" className="ml-2 text-green-700"><Send size={20}/></button>
          </form>
        </div>
      )}
    </>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden scroll-mt-28">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-green-100 opacity-50 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-100 opacity-50 blur-3xl animate-float"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left mb-12 lg:mb-0">
            <Reveal>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-bold mb-6 shadow-sm">
                <School size={14} className="mr-2 text-green-600" />
                Spécial Étudiants en Médecine & Pharmacie
              </div>
            </Reveal>
            <Reveal delay={200}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Ne laissez pas les statistiques <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  bloquer votre soutenance
                </span>
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                De la conception du protocole à l'analyse des résultats sur SPSS / R / Epi Info.
                Nous vous accompagnons jusqu'à la validation par votre jury. 
                <span className="font-bold text-green-700 block mt-2">Plus de 50 thèses et mémoires accompagnées.</span>
              </p>
            </Reveal>
            <Reveal delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#services" onClick={(e) => smoothScrollTo(e, '#services')} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-green-700 hover:bg-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  Je suis bloqué(e) <ChevronRight size={20} className="ml-2" />
                </a>
                <a href="#portfolio" onClick={(e) => smoothScrollTo(e, '#portfolio')} className="inline-flex items-center justify-center px-6 py-3 border border-green-200 text-base font-medium rounded-xl text-green-800 bg-white hover:bg-green-50 focus:ring-green-500 transform hover:-translate-y-1 transition-all">
                  Voir des exemples
                </a>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:block">
            <Reveal delay={800} className="relative rounded-2xl bg-white p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl opacity-10"></div>
               <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 h-96 flex flex-col justify-center items-center text-center">
                  <div className="bg-white p-4 rounded-full shadow-lg mb-6">
                    <FileCheck size={48} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Objectif : Mention Très Honorable</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 max-w-[200px]">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{width: '98%'}}></div>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    "Des résultats statistiques clairs sont la clé d'une discussion solide et d'une soutenance réussie."
                  </p>
                  <p className="text-xs font-bold text-slate-400 mt-4">- Christophe K., Votre Statisticien</p>
               </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, color, onClick }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden flex flex-col h-full cursor-pointer">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`}></div>
    <div className={`w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-green-50 transition-colors`}>
      <Icon size={28} className="text-slate-700 group-hover:text-green-600 transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm flex-1">{description}</p>
    <button onClick={onClick} className="mt-6 flex items-center text-green-700 font-semibold text-sm hover:text-green-900 transition-colors">
      En savoir plus <ChevronRight size={16} className="ml-1" />
    </button>
  </div>
);

// --- COMPOSANT MODAL SERVICES (MANQUANT AJOUTÉ) ---
const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  const handleDevisClick = (e) => {
    onClose(); 
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900 bg-opacity-80 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl w-full relative animate-fade-in-up">
          
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
          
          <div className="px-6 py-6">
            <p className="text-gray-500 italic mb-6 text-sm border-l-4 border-blue-100 pl-4">
              "{service.intro}"
            </p>
            
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center">
                <Activity size={16} className="mr-2 text-green-500" /> 
                Notre Offre
              </h4>
              <ul className="space-y-3">
                {service.details.map((point, idx) => (
                  <li key={idx} className="flex items-start text-gray-600 text-sm leading-relaxed">
                    <CheckSquare size={16} className="mr-3 mt-1 text-green-500 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-4 py-2 bg-green-900 text-base font-medium text-white hover:bg-green-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleDevisClick}
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

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: BookOpen,
      title: "1. Protocole & Échantillonnage",
      description: "Avant de commencer : Calcul de la taille de l'échantillon et validation de la fiche d'enquête.",
      color: "from-blue-400 to-blue-600",
      intro: "Une bonne thèse commence par un bon protocole. Ne collectez pas de données inutiles.",
      details: [
        "Calcul précis de la taille de l'échantillon (N) selon votre population.",
        "Revue critique de votre fiche d'enquête ou questionnaire.",
        "Digitalisation du questionnaire sur smartphone (ODKCollect/KoboCollect) pour gagner du temps.",
        "Conseils méthodologiques pour éviter les biais."
      ]
    },
    {
      icon: Database,
      title: "2. Saisie & Nettoyage",
      description: "Transformation de vos fiches papier ou Excel en une base de données propre et exploitable.",
      color: "from-orange-400 to-orange-600",
      intro: "Le jury déteste les incohérences. Nous nettoyons vos données ligne par ligne.",
      details: [
        "Saisie rapide de vos fiches physiques si nécessaire.",
        "Fusion de plusieurs fichiers Excel.",
        "Détection et correction des erreurs de saisie et valeurs aberrantes.",
        "Codage des variables (ex: transformer l'âge en tranches d'âge)."
      ]
    },
    {
      icon: BarChart2,
      title: "3. Analyse Statistique",
      description: "Le cœur de votre thèse : Tableaux, Graphiques et Tests statistiques (P-value).",
      color: "from-green-400 to-green-600",
      intro: "Nous faisons parler vos chiffres pour valider vos hypothèses scientifiques.",
      details: [
        "Statistiques descriptives (Moyennes, Fréquences) présentées en tableaux normes APA.",
        "Graphiques professionnels et lisibles.",
        "Tests comparatifs (Chi-2, Student, ANOVA) pour prouver vos résultats.",
        "Analyses avancées (Régression logistique, Survie Kaplan-Meier) pour les thèses complexes."
      ]
    },
    {
      icon: Scroll,
      title: "4. Résultats & Discussion",
      description: "Aide à la rédaction et à l'interprétation des résultats pour la soutenance.",
      color: "from-purple-400 to-purple-600",
      intro: "Avoir des chiffres ne suffit pas, il faut savoir les commenter devant le jury.",
      details: [
        "Rédaction de la partie 'Résultats' (commentaires des tableaux).",
        "Aide à l'interprétation pour la 'Discussion' : comparaison avec la littérature.",
        "Mise en forme du document Word (Table des matières, Bibliographie automatique).",
        "Conception des diapositives PowerPoint pour la soutenance."
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-3">Notre Méthode</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Le Parcours du Thésard</h3>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Nous intervenons à n'importe quelle étape, que vous ayez juste votre sujet ou déjà toutes vos données.
            </p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 150}>
              <ServiceCard {...service} onClick={() => setSelectedService(service)} />
            </Reveal>
          ))}
        </div>
      </div>
      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
    </section>
  );
};

const ProjectCard = ({ title, category, description, tools }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full hover:scale-[1.02] transform transition-transform">
    <div className="h-2 bg-gradient-to-r from-green-700 to-emerald-400"></div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded">{category}</span>
        <CheckCircle size={16} className="text-green-500" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-3 leading-tight uppercase">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 flex-1">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tools.map((tool, index) => (
          <span key={index} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">{tool}</span>
        ))}
      </div>
    </div>
  </div>
);

const Portfolio = () => {
  const projects = [
    { category: "Thèse Médecine", title: "Analyse de survie", description: "Facteurs pronostiques et survie à 5 ans au cancer du sein (CNRAO).", tools: ["Kaplan-Meier", "Cox"] },
    { category: "Thèse Pharmacie", title: "Automédication", description: "Prévalence de l'automédication par antibiotiques dans la commune de Yopougon.", tools: ["Descriptif", "Chi-2"] },
    { category: "DES Pédiatrie", title: "Urgences Chirurgicales", description: "Profil épidémio-clinique des urgences chirurgicales néonatales.", tools: ["Comparaison", "Tableaux"] },
    { category: "Santé Publique", title: "Vaccination COVID-19", description: "Déterminants du refus vaccinal chez le personnel de santé.", tools: ["Régression Logistique"] },
    { category: "Thèse Odonto", title: "Caries Dentaires", description: "Habitudes alimentaires et incidence des caries en milieu scolaire.", tools: ["Corrélation", "Anova"] },
    { category: "Thèse Médecine", title: "Diabète & Grossesse", description: "Issue de la grossesse chez les femmes diabétiques suivies au CHU.", tools: ["Étude Cas-Témoins"] },
    { category: "Thèse Doctorat", title: "Nuisances Sonores", description: "Impact sur l'audition des travailleurs en zone industrielle.", tools: ["Audiométrie", "Tests T"] },
    { category: "Mémoire Infirmier", title: "Hygiène des Mains", description: "Observance de l'hygiène des mains au bloc opératoire.", tools: ["Observation", "Descriptif"] }
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-50 border-t border-slate-200 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">Ils ont validé</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Exemples de Thèses et Mémoires Accompagnés</h3>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 100}><ProjectCard {...project} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer, isOpen, toggle }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button className="w-full py-6 text-left focus:outline-none flex justify-between items-start group" onClick={toggle}>
      <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? 'text-green-700' : 'text-slate-800 group-hover:text-green-600'}`}>{question}</span>
      <div className={`flex-shrink-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full border transition-all ${isOpen ? 'bg-green-700 border-green-700 text-white' : 'border-gray-300 text-gray-400'}`}>{isOpen ? <Minus size={14} /> : <Plus size={14} />}</div>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
      <div className="text-gray-600 leading-relaxed pr-8">{Array.isArray(answer) ? <ul className="space-y-2">{answer.map((item, i) => <li key={i} className="flex items-start"><span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span><span>{item}</span></li>)}</ul> : <p>{answer}</p>}</div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { question: "Je suis nul(le) en statistiques, est-ce grave ?", answer: "Pas du tout ! C'est notre métier. Nous nous occupons de toute la partie technique (calculs, logiciels R/SPSS). Votre rôle sera simplement de comprendre les résultats que nous vous expliquerons clairement pour votre soutenance." },
    { question: "Combien de temps cela prend-il ?", answer: "Pour une analyse standard (déjà saisie), comptez 5 à 7 jours. Si nous devons créer le masque de saisie ou faire la saisie nous-mêmes, cela dépend du nombre de fiches. Nous savons gérer les urgences de dernière minute !" },
    { question: "Que se passe-t-il si le jury demande des corrections ?", answer: "L'accompagnement inclut le service après-vente. Si votre maître de thèse ou le jury demande un tableau supplémentaire ou une correction statistique, nous le faisons sans frais additionnels jusqu'à la validation finale." },
    { question: "Mes données sont-elles confidentielles ?", answer: "Absolument. Vos bases de données ne sont jamais partagées. Une fois la thèse soutenue, nous archivons ou supprimons les données selon votre souhait." }
  ];

  return (
    <section id="faq" className="py-24 bg-white border-t border-gray-200 scroll-mt-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal><div className="text-center mb-12"><h2 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-2">FAQ</h2><h3 className="text-3xl font-extrabold text-slate-900">Questions d'Étudiants</h3></div></Reveal>
        <Reveal delay={200}><div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">{faqs.map((faq, index) => <FAQItem key={index} question={faq.question} answer={faq.answer} isOpen={openIndex === index} toggle={() => setOpenIndex(openIndex === index ? -1 : index)} />)}</div></Reveal>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', type: 'Thèse de Médecine', message: '' });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.message) { alert("⚠️ Merci de remplir votre Nom, Email et Message."); return; }
    const subject = encodeURIComponent(`Aide Thèse - ${formData.type} - ${formData.nom}`);
    const body = encodeURIComponent(`Nom: ${formData.nom} ${formData.prenom}\nEmail: ${formData.email}\nDiplôme visé: ${formData.type}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:cebi.stat@yahoo.com?subject=${subject}&body=${body}`;
    try {
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.target = '_self';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => alert("✅ Action envoyée !\nVotre logiciel mail devrait s'ouvrir."), 500);
    } catch (err) { alert("Erreur. Écrivez à : cebi.stat@yahoo.com"); }
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.message) { alert("⚠️ Merci de remplir votre Nom et Message."); return; }
    const message = encodeURIComponent(`*SOS Thèse - Valid'Thèse*\n👤 Étudiant: ${formData.nom} ${formData.prenom}\n🎓 Diplôme: ${formData.type}\n----------------\n📝 Besoin:\n${formData.message}`);
    // 5. CORRECTION WHATSAPP : Utilisation du format wa.me
    window.open(`https://wa.me/2250141974132?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h2 className="text-3xl font-extrabold mb-6">On valide cette thèse ?</h2>
              <p className="text-slate-400 mb-10 text-lg">Discutons de votre sujet. L'évaluation est gratuite et sans engagement.</p>
              <div className="space-y-6">
                <div className="flex items-center"><div className="bg-green-800 p-3 rounded-lg mr-4"><Phone className="text-green-300" /></div><div><p className="font-bold">WhatsApp Direct</p><p className="text-slate-400">(+225) 01 41 97 41 32</p></div></div>
                <div className="flex items-center"><div className="bg-green-800 p-3 rounded-lg mr-4"><Mail className="text-green-300" /></div><div><p className="font-bold">Envoi de protocole</p><p className="text-slate-400">cebi.stat@yahoo.com</p></div></div>
                <div className="flex items-center"><div className="bg-green-800 p-3 rounded-lg mr-4"><MapPin className="text-green-300" /></div><div><p className="font-bold">Bureau</p><p className="text-slate-400">Abidjan, Riviéra / Cocody</p></div></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-800">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Décrivez votre besoin</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-gray-500 uppercase">Nom</label><input type="text" name="nom" required className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} /></div>
                  <div><label className="text-xs font-bold text-gray-500 uppercase">Prénom</label><input type="text" name="prenom" className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} /></div>
                </div>
                <div><label className="text-xs font-bold text-gray-500 uppercase">Email</label><input type="email" name="email" required className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} /></div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Type de Diplôme</label>
                  <select name="type" className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange}>
                    <option>Thèse de Médecine</option>
                    <option>Thèse de Pharmacie</option>
                    <option>Thèse d'Odontostomatologie</option>
                    <option>DES / Mémoire de Spécialité</option>
                    <option>Thèse de Doctorat (PhD)</option>
                    <option>Mémoire Master / Licence</option>
                  </select>
                </div>
                <div><label className="text-xs font-bold text-gray-500 uppercase">Votre Sujet / Besoin</label><textarea name="message" rows="3" required className="w-full p-3 bg-gray-50 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" placeholder="Ex: J'ai besoin d'aide pour le calcul de l'échantillon..." onChange={handleChange}></textarea></div>
                <div className="flex flex-col sm:flex-row gap-3">
                   <button type="button" onClick={handleWhatsAppSubmit} className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 shadow-lg flex items-center justify-center"><MessageCircle size={18} className="mr-2" /> WhatsApp</button>
                   <button type="button" onClick={handleEmailSubmit} className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-900 shadow-lg flex items-center justify-center"><Mail size={18} className="mr-2" /> Email</button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-white text-lg">Valid'<span className="text-green-600">Thèse</span></span>
          <p className="text-xs mt-1">Une initiative de CEBI Stats - Cabinet d'Études Biostatistique.</p>
        </div>
        <p className="text-xs">&copy; {new Date().getFullYear()} CEBI Stats Abidjan. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

// --- ASSEMBLAGE FINAL DE L'APP ---
const App = () => {
  useEffect(() => {
    document.title = "Valid'Thèse | Expert Analyse de Données Médicales";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = "/logo_cebistats.png?v=3"; 
  }, []);

  return (
    <div className="font-sans text-slate-900 antialiased bg-white selection:bg-green-100 selection:text-green-900">
      <GlobalStyles />
      <Navigation />
      <main>
        {/* 6. ASSEMBLAGE FINAL SELON ORDRE DEMANDÉ */}
        <Hero />
        <ExpertProfile />
        <ComparisonSlider />
        <Services />
        <Pricing />
        <Portfolio />
        <ThesisAI />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <GeminiAssistant />
    </div>
  );
};

export default App;
