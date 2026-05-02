import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  BarChart3, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X, 
  ChevronRight,
  Sparkles,
  Globe,
  Cpu,
  CheckCircle2,
  Lock,
  Send,
  TrendingUp,
  Activity,
  Layers,
  MousePointerClick
} from "lucide-react";
import { useState, useEffect, type FormEvent, type MouseEvent } from "react";

// --- Custom Internal Components ---

const Toast = ({ message, isVisible, onClose }: { message: string, isVisible: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-gold rounded-2xl shadow-[0_20px_50px_rgba(212,175,55,0.4)] flex items-center gap-3 text-charcoal font-bold font-display"
      >
        <CheckCircle2 className="w-6 h-6 text-charcoal-dark" />
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 opacity-50 hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
      </motion.div>
    )}
  </AnimatePresence>
);

const DemoModal = ({ isOpen, onClose, onShowToast }: { isOpen: boolean, onClose: () => void, onShowToast: (msg: string) => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      onShowToast("Intelligence briefing scheduled. Access codes sent.");
    }, 1800);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/95 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-xl glass-card p-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
            
            <button onClick={onClose} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"><X /></button>
            
            <div className="mb-10 text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-3 tracking-tight">Deploy <span className="text-gold">Neural Node</span></h2>
              <p className="text-white/40 text-sm">Secure a live demonstration of our autonomous intelligence grid.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-display">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Full Name</label>
                  <input required placeholder="Julian Thorne" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-gold/50 transition-all text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Corporate Email</label>
                  <input required type="email" placeholder="julian@veloce.ai" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-gold/50 transition-all text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Company Website</label>
                <input required placeholder="https://veloce.ai" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 outline-none focus:border-gold/50 transition-all text-sm" />
              </div>
              <button 
                disabled={isSubmitting}
                className="w-full py-4.5 bg-gold text-charcoal font-bold rounded-2xl gold-button-shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Initialize Briefing</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] text-white/20 uppercase tracking-[0.2em] pt-4">
                <Lock className="w-3 h-3" />
                <span>Encrypted 256-bit Connection</span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Page Sections ---

const Navbar = ({ onOpenDemo, onOpenToast }: { onOpenDemo: () => void, onOpenToast: (msg: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? "py-4" : "py-10"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass-header rounded-full px-8 py-3.5 flex items-center justify-between transition-all duration-500 ${isScrolled ? "px-10 shadow-2xl border-white/10" : ""}`}>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gold rounded-xl gold-glow-hover flex items-center justify-center font-bold text-charcoal text-2xl shadow-lg transform group-hover:rotate-12 transition-all">A</div>
            <span className="font-display font-black text-2xl tracking-tighter uppercase hidden sm:block">AURA <span className="text-gold">AI</span></span>
          </div>

          <div className="hidden md:flex items-center gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            {["Technology", "Features", "Pricing"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="hover:text-gold transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onOpenToast("Systems authenticating. Accessing secure documentation...")}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors hidden lg:block"
            >
              Docs
            </button>
            <button 
              onClick={onOpenDemo}
              className="bg-gold text-charcoal font-bold px-7 py-3 rounded-full text-xs gold-button-shadow hover:scale-105 active:scale-95 transition-all cursor-pointer gold-gradient-text"
              style={{ WebkitTextFillColor: 'unset' }}
            >
              Get Started
            </button>
            <button className="md:hidden text-white ml-2 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-24 left-6 right-6 glass-card p-10 flex flex-col gap-6 shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-50 font-display"
          >
            {["Technology", "Features", "Pricing"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-2xl font-bold text-white hover:text-gold transition-colors"
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
              >
                {item}
              </a>
            ))}
            <hr className="border-white/5" />
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
              className="bg-gold text-charcoal font-bold py-5 rounded-[20px] text-lg gold-button-shadow mt-4"
            >
              Deploy Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenDemo, onOpenToast }: { onOpenDemo: () => void, onOpenToast: (msg: string) => void }) => {
  return (
    <section className="relative pt-56 pb-32 md:pt-72 md:pb-52 overflow-hidden bg-charcoal">
      <div className="hero-glow top-[10%] left-[5%]" />
      <div className="hero-glow bottom-[10%] right-[5%]" />
      
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full text-[11px] uppercase tracking-[0.25em] font-black text-gold">
            <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse shadow-[0_0_15px_rgba(212,175,55,1)]"></span>
            NEURAL ENGINE ACTIVATED
          </div>
          
          <h1 className="font-display text-7xl md:text-9xl font-black leading-[0.9] tracking-[-0.04em] uppercase">
            Future-Proof <br />
            Your <span className="text-outline-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">Market share.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/40 max-w-lg leading-[1.6] font-medium tracking-tight">
            Our autonomous intelligence layer predicts hyper-trends before they manifest in reality. Scaling at 99.8% accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button 
              onClick={() => onOpenToast("Analyzing market clusters... Dashboard initialization in progress.")}
              className="px-12 py-5.5 bg-gold text-charcoal font-black rounded-full gold-button-shadow hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm uppercase tracking-[0.1em]"
            >
              Start Scaling Now
            </button>
            <button 
              onClick={onOpenDemo}
              className="px-12 py-5.5 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/10 transition-all cursor-pointer text-sm uppercase tracking-[0.1em] backdrop-blur-md"
            >
              Watch Intelligence
            </button>
          </div>

          <div className="flex items-center gap-8 pt-10 border-t border-white/5">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-charcoal bg-charcoal-muted overflow-hidden flex items-center justify-center">
                   <div className="w-full h-full bg-gradient-to-br from-gold/40 to-transparent" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-charcoal bg-gold/10 flex items-center justify-center text-[10px] font-bold text-gold">+2k</div>
            </div>
            <p className="text-sm text-white/30 font-medium leading-tight">
              Powering <span className="text-white">2,400+</span> elite <br /> enterprise marketing stacks.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative group pr-4"
        >
          <div className="w-full aspect-square glass-card rounded-[60px] p-1.5 shadow-[0_80px_160px_rgba(0,0,0,0.6)] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative w-full h-full glass-card border-none rounded-[58px] p-10 flex flex-col items-center justify-center">
               {/* 3D Neural Center */}
               <div className="relative w-64 h-64 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[3px] border-dashed border-gold/20 rounded-full" 
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-6 border border-gold/30 rounded-full" 
                  />
                  <div className="absolute inset-16 bg-gold/5 blur-3xl animate-pulse" />
                  
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="relative w-32 h-32 bg-gold rounded-[40px] gold-glow flex items-center justify-center shadow-[0_20px_60px_rgba(212,175,55,0.5)] transform rotate-12 transition-all cursor-crosshair group/chip"
                  >
                     <Cpu size={48} className="text-charcoal -rotate-12 group-hover/chip:animate-pulse" />
                  </motion.div>

                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.7 }}
                      className="absolute w-4 h-4 bg-gold rounded-full gold-glow"
                      style={{ 
                        top: `${Math.random() * 80 + i}%`, 
                        left: `${Math.random() * 80 + i}%` 
                      }}
                    />
                  ))}
               </div>

               {/* Stats Panel */}
               <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-10 left-10 p-7 glass-card border-gold/20 w-64 shadow-2xl flex flex-col gap-4"
               >
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Growth Velocity</span>
                    <Activity size={14} className="text-gold animate-pulse" />
                 </div>
                 <div className="flex items-end gap-3">
                    <span className="text-4xl font-black font-display">+142.8%</span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 pb-1.5">
                       <TrendingUp size={12} />
                       <span>LIVE</span>
                    </div>
                 </div>
                 <div className="w-full h-10 flex items-end gap-1 px-1">
                    {[3, 7, 5, 9, 6, 10, 8, 12, 11, 14].map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [`${h*4}px`, `${(h+Math.random()*4)*4}px`, `${h*4}px`] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        className="flex-1 bg-gold/30 rounded-t-sm"
                      />
                    ))}
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialMarquee = () => {
  const logos = ["FORBES", "TECHCRUNCH", "VERGE", "WIRED", "FASTCO", "BUSINESS INSIDER", "WSJ", "THE TIMES"];
  return (
    <section className="py-20 bg-charcoal border-white/5 border-y relative overflow-hidden group">
      <div className="flex overflow-hidden">
        <div className="flex space-x-24 animate-marquee py-6 items-center whitespace-nowrap px-12">
          {Array(4).fill(logos).flat().map((logo, i) => (
            <span key={logo+i} className="text-4xl md:text-5xl font-display font-black text-white/10 hover:text-gold transition-all duration-700 cursor-default tracking-tighter">
              {logo}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-charcoal to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-charcoal to-transparent z-10" />
    </section>
  );
};

const TheNeuralStack = () => {
  const features = [
    {
      icon: <Layers className="size-8" />,
      title: "Cluster Analysis",
      desc: "Aggregates billions of data points into behavioral clusters using unsupervised learning."
    },
    {
      icon: <Cpu className="size-8" />,
      title: "Predictive Nodes",
      desc: "Distributed server-less execution nodes that process market signals at the edge."
    },
    {
      icon: <Globe className="size-8" />,
      title: "Universal Sync",
      desc: "Instant synchronization of insights across 140+ countries and global stock exchanges."
    },
    {
      icon: <TrendingUp className="size-8" />,
      title: "Revenue Multiplier",
      desc: "Automated attribution modeling that identifies and exploits high-velocity sales growth."
    }
  ];

  return (
    <section id="technology" className="py-40 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-28">
           <div className="space-y-6">
              <span className="text-gold text-[12px] font-black uppercase tracking-[0.4em]">Proprietary Technology</span>
              <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9]">The Neural <br /> <span className="text-outline-gold">Stack.</span></h2>
           </div>
           <p className="text-xl md:text-2xl text-white/30 max-w-lg leading-relaxed font-medium">
             Engineered for aggressive market dominance, our tech enables enterprise leaders to move with absolute certainty.
           </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="premium-card p-10 group cursor-pointer"
            >
              <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center text-gold mb-10 group-hover:bg-gold group-hover:text-charcoal transition-all duration-500 shadow-xl border border-gold/10">
                {feat.icon}
              </div>
              <h3 className="text-2xl font-display font-black uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">{feat.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-medium">
                {feat.desc}
              </p>
              <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-widest">
                    <span>Explore Layer</span>
                    <ArrowRight size={12} />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const highlights = [
    {
      title: "Real-time Intelligence",
      value: "99.8%",
      metric: "Model Accuracy",
      desc: "Our neural engine processes live market data at the speed of thought."
    },
    {
      title: "Market Velocity",
      value: "4.2x",
      metric: "Conversion Lift",
      desc: "Clients report massive spikes in engagement through autonomous trend syncing."
    }
  ];

  return (
    <section id="features" className="py-40 bg-charcoal-muted/30">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-16">
          {highlights.map((h, i) => (
            <motion.div 
              key={h.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-10 items-start"
            >
              <div className="text-6xl md:text-8xl font-display font-black text-gold tracking-tighter w-48 shrink-0">{h.value}</div>
              <div className="space-y-4">
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">{h.metric}</span>
                    <h3 className="text-3xl font-display font-bold">{h.title}</h3>
                 </div>
                 <p className="text-white/40 text-lg leading-relaxed max-w-sm">{h.desc}</p>
              </div>
            </motion.div>
          ))}
          <div className="pt-10">
             <button className="flex items-center gap-4 text-gold font-bold uppercase tracking-[0.2em] text-sm group">
                <span className="border-b-2 border-gold pb-1">View Full Capabilities</span>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-card rounded-[60px] p-12 aspect-[4/5] md:aspect-square flex items-center justify-center overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="relative w-full h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                 <div className="space-y-1">
                    <h4 className="text-2xl font-bold font-display uppercase tracking-tight">Active Nodes</h4>
                    <p className="text-white/30 text-sm font-medium">Neural distribution matrix</p>
                 </div>
                 <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Activity className="text-gold" />
                 </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center py-10">
                 <div className="grid grid-cols-6 gap-3 w-full">
                    {[...Array(24)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.1, 0.4, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                        className="aspect-square bg-gold/40 rounded-sm"
                      />
                    ))}
                 </div>
              </div>

              <div className="p-8 glass-card border-none bg-gold/5 space-y-4">
                 <p className="text-[10px] font-black uppercase text-gold tracking-widest">Synthetic Intelligence</p>
                 <p className="text-white/60 text-sm leading-relaxed italic">"Predictive clustering suggests 14% increase in Q3 consumer demand for tech commodities."</p>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const Pricing = ({ onOpenToast }: { onOpenToast: (msg: string) => void }) => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      desc: "For growing marketing agencies moving into AI.",
      features: ["10k neural lookups", "Sentiment dashboard", "Standard API keys", "Support via Discord"],
      isPro: false
    },
    {
      name: "Autonomous",
      price: "$399",
      desc: "Full automated orchestration for global brands.",
      features: ["Unlimited neural lookups", "Real-time edge nodes", "Enterprise neural stack", "24/7 Dedicated Ops"],
      isPro: true
    },
    {
      name: "Custom Matrix",
      price: "Enquire",
      desc: "Deep integration for Fortune 500 infrastructure.",
      features: ["Private model training", "White-label deployment", "On-premise solutions", "Executive management"],
      isPro: false
    }
  ];

  return (
    <section id="pricing" className="py-40 bg-charcoal">
       <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-32 space-y-8">
             <span className="text-gold text-[12px] font-black uppercase tracking-[0.4em]">Investment Roadmap</span>
             <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9]">Select Your <br /> <span className="text-outline-gold">Velocity.</span></h2>
             <p className="text-xl text-white/30 font-medium">Elite intelligence shouldn't be complicated. Simple pricing for aggressive growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {plans.map((plan, i) => (
               <motion.div
                 key={plan.name}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className={`p-14 rounded-[48px] border transition-all duration-700 flex flex-col justify-between group ${plan.isPro ? "bg-charcoal-muted border-gold shadow-[0_40px_100px_rgba(212,175,55,0.15)] scale-105 z-10" : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"}`}
               >
                 <div className="space-y-12">
                   <div className="space-y-4">
                      <h3 className="text-2xl font-display font-black uppercase tracking-tight">{plan.name}</h3>
                      <p className="text-sm text-white/30 h-10 leading-relaxed">{plan.desc}</p>
                   </div>
                   
                   <div className="space-y-1">
                      <div className="text-6xl font-display font-black tracking-tighter">{plan.price}</div>
                      {plan.price.startsWith('$') && <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest pl-1">Billed annually</p>}
                   </div>

                   <ul className="space-y-6">
                      {plan.features.map(feat => (
                        <li key={feat} className="flex items-center gap-4 text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">
                           <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.isPro ? "bg-gold text-charcoal" : "bg-white/10"}`}>
                              <CheckCircle2 size={12} strokeWidth={4} />
                           </div>
                           {feat}
                        </li>
                      ))}
                   </ul>
                 </div>

                 <button 
                   onClick={() => onOpenToast(`Initializing secure contract grid for ${plan.name} plan...`)}
                   className={`w-full py-5.5 rounded-[24px] font-black uppercase tracking-[0.2em] text-sm mt-16 transition-all duration-500 cursor-pointer active:scale-95 ${plan.isPro ? "bg-gold text-charcoal gold-button-shadow hover:scale-105" : "bg-white/5 text-white hover:bg-white/15 border border-white/5"}`}
                 >
                   Get Started
                 </button>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 bg-charcoal border-t border-white/5">
       <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gold border border-white/10 font-black text-2xl">A</div>
              <span className="font-display font-black text-2xl tracking-tighter uppercase">AURA <span className="text-gold">AI</span></span>
            </div>
            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.25em]">© 2026 Aura Intelligence Systems Int.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[11px] font-black uppercase tracking-[0.3em] text-white/30">
             {["Privacy", "Security", "Terms", "Documentation", "Twitter", "LinkedIn"].map(link => (
               <a key={link} href="#" className="hover:text-gold transition-colors">{link}</a>
             ))}
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-16 h-16 rounded-full glass-card border-white/10 flex items-center justify-center text-gold hover:text-white transition-all group"
          >
             <ArrowRight className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
          </button>
       </div>
    </footer>
  );
};

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 5000);
  };

  return (
    <div className="min-h-screen bg-charcoal text-white selection:bg-gold selection:text-charcoal relative overflow-x-hidden">
      <div className="noise" />
      
      <Navbar onOpenDemo={() => setIsDemoModalOpen(true)} onOpenToast={showToast} />
      
      <main>
        <Hero onOpenDemo={() => setIsDemoModalOpen(true)} onOpenToast={showToast} />
        <SocialMarquee />
        <TheNeuralStack />
        <Features />
        
        {/* Mid-page CTA */}
        <section className="py-40 bg-charcoal">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-8"
           >
             <div className="glass-card p-24 text-center space-y-12 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-gold/[0.02]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-tight">Ready to initiate <br /> <span className="text-gold">Autonomous growth?</span></h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                   <button 
                    onClick={() => setIsDemoModalOpen(true)}
                    className="px-14 py-6 bg-gold text-charcoal font-black rounded-full gold-button-shadow hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
                   >
                     Deploy Node v4.2
                   </button>
                   <button 
                    onClick={() => showToast("Downloading Intelligence whitepaper...")}
                    className="px-14 py-6 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
                   >
                     Read Whitepaper
                   </button>
                </div>
             </div>
           </motion.div>
        </section>

        <Pricing onOpenToast={showToast} />
      </main>

      <Footer />

      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
        onShowToast={showToast} 
      />
      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        onClose={() => setIsToastVisible(false)} 
      />
    </div>
  );
}
