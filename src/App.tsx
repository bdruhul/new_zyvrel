/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, type ReactNode, type FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Globe, 
  ShoppingCart, 
  Layout, 
  PenTool, 
  BarChart3, 
  Target, 
  Search, 
  ArrowRight, 
  Check, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Star,
  ChevronDown,
  Monitor,
  Zap,
  Rocket
} from 'lucide-react';

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed w-3 h-3 bg-[#6C63FF] rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{ 
          left: mousePos.x, 
          top: mousePos.y, 
          transform: `translate(-50%, -50%) scale(${isHovered ? 2 : 1})` 
        }}
      />
      <motion.div 
        ref={ringRef}
        className="fixed w-9 h-9 border border-[#A78BFA] rounded-full pointer-events-none z-[9998] opacity-50"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.8 : 0.5
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150, mass: 0.5 }}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

// Moving Border Form Container
const RotatingBorderContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative p-[1px] overflow-hidden rounded-3xl group">
      {/* Animated Rotating Border */}
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#6C63FF_180deg,transparent_270deg,transparent_360deg)] animate-border-rotate opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Inner Content */}
      <div className="relative bg-[#080810]/95 backdrop-blur-3xl rounded-[23px] h-full">
        {children}
      </div>
    </div>
  );
};

// Trust Section Logos
const allLogos = [
  "CartCo.", "BloomStudio", "NexaShop", "VORTEX", "PeakGrowth", 
  "ZenFlow", "SparkScale", "LucidOps", "Velocity", "AtlasInc"
];

const LogoCarousel = () => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % allLogos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleIndex = (i: number) => (index + i) % allLogos.length;

  return (
    <div className="flex items-center justify-center gap-6 md:gap-16 lg:gap-24 h-24 px-4 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {Array.from({ length: 5 }).map((_, i) => {
          const actualIndex = getVisibleIndex(i);
          const logo = allLogos[actualIndex];
          const isMiddle = i === 2;
          return (
            <motion.div
              key={`${logo}-${actualIndex}`}
              layout
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ 
                opacity: isMiddle ? 1 : 0.15,
                scale: isMiddle ? 1.25 : 0.85,
                x: 0,
                filter: isMiddle ? 'grayscale(0%)' : 'grayscale(100%)',
              }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.32, 0.72, 0, 1] 
              }}
              className={`font-display text-lg md:text-3xl font-bold whitespace-nowrap tracking-tight ${
                isMiddle ? 'text-[#6C63FF] drop-shadow-[0_0_15px_rgba(108,99,255,0.3)]' : 'text-[#9090A8]'
              }`}
            >
              {logo}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Updated ProblemsPage Component
const ProblemsPage = ({ onHome, caseStudies, onOpenCase }: { 
  onHome: () => void, 
  caseStudies: any[], 
  onOpenCase: (id: string) => void,
  key?: string 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#080810] min-h-screen selection:bg-[#6C63FF]/30 relative flex flex-col"
    >
      {/* Dynamic Background Elements for this page */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#6C63FF]/10 to-transparent pointer-events-none" />
      <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-[#A78BFA]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative pt-32 md:pt-40 pb-24 px-6 md:px-16 container mx-auto flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Heading */}
          <div className="text-center mb-16 md:mb-32 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8"
            >
              <BarChart3 size={12} className="text-[#6C63FF] md:size-[14px]" />
              <span className="text-[#A78BFA] font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em]">Case Study Archive</span>
            </motion.div>
            
            <h2 className="font-display text-[clamp(1.5rem,8vw,4.5rem)] md:text-[clamp(2.5rem,10vw,6.5rem)] font-extrabold leading-[1.2] md:leading-[1.05] tracking-tight mb-6 md:mb-10 px-2 lg:px-0">
              <span className="block text-white opacity-90 mb-1 md:mb-2">Every problem we</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#A78BFA] to-[#6C63FF] bg-[length:200%_auto] animate-gradient-flow scale-100 drop-shadow-[0_0_20px_rgba(108,99,255,0.3)] md:drop-shadow-[0_0_30px_rgba(108,99,255,0.4)]">
                  have ever solved
                </span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-1 md:-bottom-4 left-0 right-0 h-0.5 md:h-2 bg-[#6C63FF]/20 rounded-full blur-[1px] md:blur-sm origin-left"
                />
              </span>
            </h2>
            
            <div className="max-w-2xl mx-auto px-4">
              <p className="text-[#9090A8] text-xs md:text-2xl leading-relaxed font-medium opacity-80 md:opacity-100 uppercase tracking-[0.05em] md:normal-case md:tracking-normal">
                We engineere revenue-generating assets. Below is a selection of business nightmares we've transformed into success stories.
              </p>
            </div>

            {/* Decorative background number */}
            <div className="absolute -top-10 md:-top-20 left-1/2 -translate-x-1/2 text-[20vw] md:text-[20vw] font-black text-white/[0.015] md:text-white/[0.02] select-none pointer-events-none z-0 hidden sm:block">
              SOLVED
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {caseStudies.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-[#6C63FF]/40 transition-all flex flex-col h-full"
                onClick={() => onOpenCase(item.id)}
              >
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[#6C63FF] text-[9px] font-black uppercase tracking-[0.2em] block">{item.category}</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {item.services?.slice(0, 2).map((s: string, idx: number) => (
                        <span key={idx} className="text-[7px] font-bold text-white/30 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase tracking-tighter">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-6 group-hover:text-white transition-colors line-clamp-1">{item.title}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-wider text-[#9090A8] mb-1.5 opacity-60">The Problem</div>
                      <p className="text-[#9090A8] text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">{item.problem}</p>
                    </div>
                    <div>
                      <div className="text-[8px] font-black uppercase tracking-wider text-[#6C63FF] mb-1.5 opacity-60">Our Solution</div>
                      <p className="text-white/80 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 italic">{item.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between group/btn">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9090A8] group-hover:text-white transition-colors">View Case Study</span>
                  <div className="w-10 h-10 rounded-full bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white transition-all shadow-lg shadow-[#6C63FF]/5">
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center pb-20">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-8">Ready to be our next success story?</h3>
            <button 
              onClick={() => {
                onHome();
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 600); // Increased timeout for mode="wait" transition
              }}
              className="px-10 py-5 bg-[#6C63FF] text-white rounded-full font-bold shadow-2xl shadow-[#6C63FF]/30 hover:scale-105 active:scale-95 transition-all outline-none"
            >
              Start Your Project Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

// Case Study Detail Component
const CaseStudyDetail = ({ caseId, onBack, caseStudies }: { 
  caseId: string, 
  onBack: () => void, 
  caseStudies: any[],
  key?: string
}) => {
  const study = caseStudies.find(s => s.id === caseId);

  if (!study) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#080810] min-h-screen pt-24 md:pt-40 pb-20"
    >
      <div className="container mx-auto px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-20 md:mb-24">
            <div>
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="text-[#6C63FF] font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">{study.category}</span>
                <div className="h-[1px] w-8 md:w-12 bg-[#6C63FF]/30" />
              </div>
              
              <h1 className="font-display text-[clamp(1.4rem,7vw,4.5rem)] md:text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.2] md:leading-[1.1] tracking-tight mb-8 md:mb-12">
                {study.title}
              </h1>

              <div className="space-y-12">
                <div>
                  <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#6C63FF] mb-3 md:mb-4">Client Problem</h3>
                  <p className="text-[#9090A8] text-sm md:text-lg leading-relaxed font-medium">
                    {study.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#6C63FF] mb-3 md:mb-4">Services Provided</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.services?.map((service: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-bold text-white whitespace-nowrap">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#6C63FF] mb-3 md:mb-4">The Result</h3>
                  <div className="p-6 md:p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl md:rounded-3xl">
                    <div className="text-3xl md:text-5xl font-display font-black text-white mb-2">{study.result.split('.')[0]}</div>
                    <div className="text-[#9090A8] text-[9px] md:text-sm font-bold uppercase tracking-widest leading-relaxed">
                      {study.result.split('.').slice(1).join('.')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative lg:sticky lg:top-32">
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#6C63FF] mb-4 md:mb-6">Our Solution & Proof</h3>
              <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-[#6C63FF]/10 group">
                <img 
                  src={study.image} 
                  alt="Solution Proof"
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/40 to-transparent pointer-events-none" />
                
                {/* Overlay Label */}
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 p-3 md:p-4 backdrop-blur-md bg-black/40 border border-white/10 rounded-xl md:rounded-2xl">
                  <div className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">Live Result Screenshot</div>
                  <div className="text-white text-[10px] md:text-xs font-bold truncate">{study.title} - Final Delivery</div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
                <div className="text-[#9090A8] text-sm md:text-lg leading-relaxed italic">
                  "{study.content}"
                </div>
                <div className="h-[1px] w-full bg-white/5" />
                <p className="text-[#9090A8] text-[10px] md:text-sm leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Archive at Bottom */}
        <div className="max-w-6xl mx-auto flex justify-center mt-20 pt-10 border-t border-white/5">
          <button 
            onClick={onBack}
            className="group relative flex items-center gap-3 px-10 py-5 overflow-hidden rounded-full bg-white/5 border border-white/10 text-[#9090A8] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-2xl hover:border-[#6C63FF]/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform text-[#6C63FF]" size={18} />
            <span className="relative z-10 font-black text-[10px] md:text-xs tracking-[0.4em] uppercase">Explore Archive</span>
          </button>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

// Extracted Footer Component
const Footer = () => (
  <footer className="bg-black/40 pt-24 pb-12 px-6 md:px-16 border-t border-white/5 w-full">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="font-display font-bold text-2xl mb-6">
            ZYVREL <span className="text-[#6C63FF]">DIGITAL</span>
          </div>
          <p className="text-[#9090A8] max-w-sm mb-8 leading-relaxed">
            We build high-performance digital experiences that drive growth. 
            From custom Shopify stores to advanced SaaS platforms, we've got you covered.
          </p>
          <div className="flex gap-4">
            {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-[#6C63FF] hover:bg-[#6C63FF]/10 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Expertise</h4>
          <ul className="space-y-4 text-[#9090A8] text-sm font-medium">
            <li className="hover:text-white transition-colors cursor-pointer">E-commerce Solutions</li>
            <li className="hover:text-white transition-colors cursor-pointer">SaaS Development</li>
            <li className="hover:text-white transition-colors cursor-pointer">UI/UX Strategy</li>
            <li className="hover:text-white transition-colors cursor-pointer">SEO Performance</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-[#9090A8] text-sm font-medium">
            <li className="hover:text-white transition-colors cursor-pointer">Our Work</li>
            <li className="hover:text-white transition-colors cursor-pointer">Case Studies</li>
            <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
            <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
        <div className="text-[#9090A8] text-xs font-medium">
          © {new Date().getFullYear()} Zyvrel Digital. All rights reserved.
        </div>
        <div className="flex gap-8 text-[#9090A8] text-xs font-medium">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [formState, setFormState] = useState<'idle' | 'success'>('idle');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'problems' | 'detail'>('home');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState(5);
  const { scrollYProgress } = useScroll();
  
  const videoTestimonials = [
    { 
      id: 1, 
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=600",
      name: "Alex Thompson",
      role: "CEO, NexaCorp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
    },
    { 
      id: 2, 
      videoUrl: "https://www.w3schools.com/html/movie.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=600",
      name: "Sarah Jenkins",
      role: "Marketing Director, Bloom",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
    },
    { 
      id: 3, 
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=600",
      name: "Michael Chen",
      role: "Founder, Zenith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
    },
    { 
      id: 4, 
      videoUrl: "https://www.w3schools.com/html/movie.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=600",
      name: "Elena Rodriguez",
      role: "Product Manager, Sphere",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
    },
    { 
      id: 5, 
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=600",
      name: "David Park",
      role: "E-com Strategist, Volt",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
    },
    { 
      id: 6, 
      videoUrl: "https://www.w3schools.com/html/movie.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400&h=600",
      name: "James Wilson",
      role: "COO, SkyLine",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=100&h=100"
    },
    { 
      id: 7, 
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=400&h=600",
      name: "Sophie Laurent",
      role: "Creative Lead, Paris",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=100&h=100"
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleVideos(1);
      else if (window.innerWidth < 1280) setVisibleVideos(2);
      else setVisibleVideos(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const autoPlayInterval = setInterval(() => {
      setCarouselIndex(prev => {
        const next = prev + 1;
        return next > videoTestimonials.length - visibleVideos ? 0 : next;
      });
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(autoPlayInterval);
    };
  }, [visibleVideos, videoTestimonials.length]);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentView, selectedCaseId]);

  const caseStudies = [
    {
      id: "shopify-pivot",
      category: "eCommerce",
      title: "The $0 to $1M Shopify Pivot",
      problem: "A fitness brand was stuck at $5k/mo with a 0.5% conversion rate and messy UX. Technical debt was piling up, and mobile customers were bouncing within 3 seconds.",
      solution: "We rebuilt their store with a performance-first architecture and high-converting upsell funnels. We implemented a custom headless Shopify frontend using Hydrogen for sub-second load times.",
      services: ["Shopify Development", "Headless Commerce", "Conversion Rate Optimization"],
      result: "Reached $1M in sales within 7 months. Conversion rate jumped to 3.8% and customer lifetime value increased by 45%.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
      content: "The primary challenge was a fragmented checkout process. By streamlining the 'Cart-to-Success' flow and implementing AI-driven product recommendations, we significantly reduced abandonment. We also executed a heavy branding overhaul to match the premium nature of their hardware products."
    },
    {
      id: "legal-lead-gen",
      category: "Service Industry",
      title: "Legal Firm Lead Generation",
      problem: "A law firm was paying $200 per lead on Google Ads with 0 organic presence. Their site was a 'digital business card' that didn't capture intent or provide value.",
      solution: "We optimized their landing pages and executed a local SEO blitz focused on high-intent keywords. We built custom intake forms that pre-qualified leads before they even called.",
      services: ["Local SEO", "PPC Management", "Custom Lead Intake Systems"],
      result: "Organic traffic increased by 450%. Cost per lead dropped to $45 while lead quality (case value) increased by 2x.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
      content: "We discovered that 70% of their mobile visitors were looking for immediate consultation. By adding a 'Case Evaluator' tool—a simple multi-step quiz—we doubled the engagement rate and collected more data for the attorneys to review before the first call."
    },
    {
      id: "saas-redesign",
      category: "SaaS",
      title: "The Product Redesign",
      problem: "A project management tool had high churn rate because users found the UI 'too complex'. Feature creep had turned a simple tool into a convoluted cockpit.",
      solution: "We streamlined the user journey, simplified the dashboard, and added interactive walkthroughs. We moved to a bento-grid layout to prioritize the most important data points.",
      services: ["UI/UX Redesign", "Product Strategy", "React Development"],
      result: "Churn reduced by 40% in the first quarter. User engagement time up by 65% and NPS score jumped from 42 to 78.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      content: "The redesign focused on 'Progressive Disclosure'. We hid advanced features until the user demonstrated a need for them. This reduced cognitive load for new users while keeping the power intact for veterans. We also implemented a dark mode that users had been requesting for years."
    },
    {
      id: "luxury-real-estate",
      category: "Real Estate",
      title: "Luxury Portal Transformation",
      problem: "A high-end realtor had a slow, mobile-broken site that didn't reflect their luxury brand. Their multimillion-dollar listings looked like average zillow entries.",
      solution: "We built a custom React portal with interactive maps, virtual tours, and a premium aesthetic. We used high-resolution video backgrounds and parallax scrolling for an immersive feel.",
      services: ["Custom React Development", "Brand Identity", "Interactive Maps (D3.js)"],
      result: "Inquiry volume for multimillion-dollar listings increased by 3.2x. Site speed improved from a 42 score to 98 on Lighthouse.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      content: "Luxury buyers expect a luxury experience. We implemented a 'Concierge API' that allowed agents to send personalized property portfolios to clients within a custom-branded portal. The interactive map uses D3.js to show neighborhood trends and amenities in real-time."
    }
  ];

  const handleOpenCase = (id: string) => {
    setSelectedCaseId(id);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const services = [
    { title: "Web Design & Dev", icon: <Globe size={16} /> },
    { title: "Shopify Store", icon: <ShoppingCart size={16} /> },
    { title: "UI/UX Design", icon: <Layout size={16} /> },
    { title: "Graphics Design", icon: <PenTool size={16} /> },
    { title: "SEO", icon: <BarChart3 size={16} /> },
    { title: "Digital Marketing", icon: <Target size={16} /> },
  ];

  const handleSelectService = (service: string) => {
    setSelectedService(prev => prev === service ? null : service);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState('success');
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#6C63FF]/30 overflow-x-hidden flex flex-col">
      <CustomCursor />
      
      {/* Shared Nav */}
      <nav className="fixed top-0 md:top-2 left-0 right-0 z-[500] transition-all duration-300">
        <div className="max-w-[98%] md:max-w-7xl mx-auto px-2 md:px-0">
          <div className="relative p-[1px] overflow-hidden rounded-xl md:rounded-2xl shadow-2xl shadow-[#6C63FF]/20">
            {/* Animated Rotating Border */}
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#6C63FF_180deg,transparent_270deg,transparent_360deg)] animate-border-rotate opacity-80" />
            
            {/* Inner Content */}
            <div className="relative bg-[#080810]/80 backdrop-blur-xl rounded-[11px] md:rounded-[15px] flex items-center justify-between px-3 py-2.5 md:px-6 lg:px-8 md:py-3 border border-white/5">
              <button 
                onClick={() => {
                  if (currentView !== 'home') {
                    setCurrentView('home');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-display font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight flex items-center gap-1.5 whitespace-nowrap"
              >
                ZYVREL <span className="text-[#6C63FF]">DIGITAL</span>
              </button>
              <ul className="hidden md:flex gap-4 lg:gap-9 text-sm lg:text-[15px] font-bold text-white/90">
                <li className="hover:text-white transition-colors cursor-none">
                  {currentView === 'home' ? <a href="#services">Services</a> : <button onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Services</button>}
                </li>
                <li className="hover:text-white transition-colors cursor-none">
                  {currentView === 'home' ? <a href="#results">Results</a> : <button onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Results</button>}
                </li>
                <li className="hover:text-white transition-colors cursor-none">
                  {currentView === 'home' ? <a href="#philosophy">Philosophy</a> : <button onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Philosophy</button>}
                </li>
                <li className="hover:text-white transition-colors cursor-none">
                  {currentView === 'home' ? <a href="#contact">Contact</a> : <button onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); }}>Contact</button>}
                </li>
              </ul>
              <button 
                onClick={() => {
                  if (currentView !== 'home') setCurrentView('home');
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50);
                }}
                className="relative bg-[#6C63FF] text-white px-3 py-1.5 md:px-4 lg:px-6 md:py-2.5 rounded-full text-[11px] sm:text-[12px] md:text-sm font-bold md:font-semibold transition-all active:scale-95 border border-white/20 shadow-[0_0_15px_rgba(108,99,255,0.3),inset_0_0_8px_rgba(255,255,255,0.1)]"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow flex flex-col"
          >
            {/* Progress Bar */}
            <motion.div 
              className="fixed top-0 left-0 right-0 h-1 bg-[#6C63FF] origin-left z-[1000]" 
              style={{ scaleX }} 
            />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-20 px-6 md:px-16 overflow-hidden">
        {/* Orbs background */}
        <div className="absolute top-0 left-[-100px] w-[500px] h-[500px] bg-[#6C63FF]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-[-50px] w-[400px] h-[400px] bg-[#A78BFA]/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#6C63FF 1px, transparent 1px), linear-gradient(90deg, #6C63FF 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} 
        />

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-1">
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="flex flex-col items-start gap-4 mb-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-[#9090A8] whitespace-nowrap">Current Status: <span className="text-white">Accepting New Projects</span></span>
              </motion.div>

              <div className="inline-flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/20 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold text-[#A78BFA] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-[#6C63FF] rounded-full animate-pulse" />
                Full-Service Digital Agency
              </div>
            </div>
            
            <h1 className="font-display text-[clamp(2.2rem,11vw,4.5rem)] md:text-[clamp(2.4rem,10vw,4.5rem)] font-extrabold leading-[1.1] md:leading-[1.05] tracking-tight mb-8">
              Is Your Website <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#A78BFA] to-[#6C63FF] bg-[length:200%_auto] animate-gradient-flow drop-shadow-[0_0_20px_rgba(108,99,255,0.3)]">
                  Losing Clients?
                </span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-[3px] md:h-1.5 bg-[#6C63FF]/30 rounded-full blur-[1px] origin-left"
                />
              </span>
            </h1>
            <p className="text-[#9090A8] text-base md:text-lg leading-relaxed max-w-xl mb-10">
              Most businesses lose customers every day because of slow, outdated, or poorly designed websites. We fix that — with stunning design, powerful development, and growth-driven marketing.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-[#9090A8] text-sm md:text-base">
                <span className="text-red-500 font-bold text-sm">✕</span> Website not showing up on Google?
              </div>
              <div className="flex items-center gap-3 text-[#9090A8] text-sm md:text-base">
                <span className="text-red-500 font-bold text-sm">✕</span> Visitors leaving without contacting you?
              </div>
              <div className="flex items-center gap-3 text-white font-medium text-sm md:text-base">
                <span className="text-green-500 font-bold text-sm">✓</span> <span className="text-glow">We solve all of this — guaranteed.</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:gap-12 pt-4">
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold">50<span className="text-[#6C63FF]">+</span></div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#9090A8] mt-1 font-bold whitespace-nowrap">Projects Done</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold">98<span className="text-[#6C63FF]">%</span></div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#9090A8] mt-1 font-bold whitespace-nowrap">Client Support</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold">3<span className="text-[#6C63FF]">x</span></div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#9090A8] mt-1 font-bold whitespace-nowrap">Conversion Ease</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-xl mx-auto lg:mx-0"
          >
            <RotatingBorderContainer>
              <div className="p-8 md:p-10 h-full flex flex-col">
                <AnimatePresence mode="wait">
                  {formState === 'idle' ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col"
                    >
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Get a Free Audit <Search className="inline-block ml-1 text-[#6C63FF]" size={20} /></h3>
                      <p className="text-[#9090A8] text-xs md:text-sm mb-6 md:mb-8">Tell us your problem — we'll tell you how to fix it.</p>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-[#9090A8]">Name *</label>
                            <input required type="text" placeholder="John" className="w-full bg-white/5 border border-[#6C63FF]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/50 transition-all" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-[#9090A8]">Email *</label>
                            <input required type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-[#6C63FF]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/50 transition-all" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-[#9090A8]">Website URL</label>
                            <input type="text" placeholder="yourwebsite.com" className="w-full bg-white/5 border border-[#6C63FF]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/50 transition-all" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-[#9090A8]">Phone Number *</label>
                            <input 
                              required 
                              type="tel" 
                              placeholder="+1 000 000 0000" 
                              onInput={(e) => {
                                e.currentTarget.value = e.currentTarget.value.replace(/[^\d+ ]/g, '');
                              }}
                              className="w-full bg-white/5 border border-[#6C63FF]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/50 transition-all" 
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider font-bold text-[#9090A8]">Main Problem *</label>
                          <div className="relative">
                            <select 
                              required 
                              defaultValue=""
                              className="w-full bg-white/5 border border-[#6C63FF]/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/50 transition-all z-20"
                            >
                              <option value="" disabled className="bg-[#080810]">Select your main challenge</option>
                              <option value="outdated" className="bg-[#080810]">My website looks outdated</option>
                              <option value="traffic" className="bg-[#080810]">Not getting traffic from Google</option>
                              <option value="conversion" className="bg-[#080810]">Visitors don't convert to customers</option>
                              <option value="shopify" className="bg-[#080810]">My Shopify store isn't selling</option>
                              <option value="brand-new" className="bg-[#080810]">I need a brand new website</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <label className="text-[10px] uppercase tracking-wider font-bold text-[#9090A8]">Services Needed</label>
                          <div className="grid grid-cols-2 gap-2">
                            {services.map((service) => (
                              <button
                                key={service.title}
                                type="button"
                                onClick={() => handleSelectService(service.title)}
                                className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg border text-[9px] sm:text-[11px] font-semibold transition-all ${
                                  selectedService === service.title
                                    ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/10'
                                    : 'bg-white/5 border-[#6C63FF]/10 text-[#9090A8] hover:border-[#6C63FF]/50'
                                }`}
                              >
                                <span className="flex-shrink-0">{service.icon}</span>
                                <span className="truncate">{service.title}</span>
                                {selectedService === service.title && <Check size={10} className="ml-auto flex-shrink-0" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button className="w-full bg-[#6C63FF] hover:bg-[#6C63FF]/90 text-white font-display font-bold py-3.5 md:py-4 rounded-xl shadow-xl shadow-[#6C63FF]/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 mt-4 group">
                          Receive My Free Audit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <p className="text-center text-[10px] text-[#9090A8] opacity-60">
                          🔒 100% free & confidential · No spam ever
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-[#6C63FF] rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-[#6C63FF]/50">
                        <Check size={32} className="text-white" strokeWidth={3} />
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Request Sent!</h3>
                      <p className="text-[#9090A8] text-sm leading-relaxed max-w-xs mx-auto">
                        Thank you for your trust. Our experts will audit your business and get back to you within 24 hours with a custom plan.
                      </p>
                      <button 
                        onClick={() => setFormState('idle')}
                        className="mt-8 text-[#6C63FF] text-xs md:text-sm font-bold hover:underline"
                      >
                        Send another request
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RotatingBorderContainer>
          </motion.div>
        </div>

        {/* More Modern Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#6C63FF] via-[#6C63FF]/50 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ 
                y: [-64, 64] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent opacity-80"
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-[#9090A8] ml-1">Explore</span>
        </motion.div>
      </section>

      {/* Trust section */}
      <section className="py-16 border-y border-[#6C63FF]/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9090A8] mb-12">
            Helping brands scale across the USA, UK & UAE
          </p>
          <LogoCarousel />
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 md:py-40 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6C63FF]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#6C63FF] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 block">Sound Familiar?</span>
            <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] font-extrabold mb-20 leading-[1.1]">
              Critical problems we <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#A78BFA]">solve every day</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                emoji: "😫", 
                title: "Outdated Presence", 
                desc: "Your website looks like it's from 2015. You're losing high-ticket clients before they even read your pitch.",
                fix: "Modern UI/UX Redesign"
              },
              { 
                emoji: "📉", 
                title: "Invisible on Search", 
                desc: "Competitors are stealing your traffic because your SEO is non-existent. You're missing out on 80% of potential leads.",
                fix: "Dominate Page 1 Rankings"
              },
              { 
                emoji: "🛒", 
                title: "The Conversion Gap", 
                desc: "Thousands of visitors, zero sales. Your checkout flow or landing page is leaking money every single minute.",
                fix: "Data-Driven Conversion Optimization"
              },
              { 
                emoji: "🤖", 
                title: "Manual Overhead", 
                desc: "Spending hours on tasks that could be automated. Your team is bogged down by processes rather than growth.",
                fix: "Workflow & AI Automation"
              },
              { 
                emoji: "🎭", 
                title: "Brand Inconsistency", 
                desc: "Your logo, site, and socials don't match. It looks unprofessional and kills the trust you've worked hard to build.",
                fix: "Premium Brand Identity"
              },
              { 
                emoji: "💸", 
                title: "Wasted Ad Spend", 
                desc: "Running ads that lead to broken links or poor landing pages. You're essentially burning your marketing budget.",
                fix: "High-ROI Performance Marketing"
              },
            ].map((p, i) => (
              <motion.div 
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-1" />
                <div className="bg-[#0A0A15] border border-white/5 rounded-3xl p-8 md:p-10 text-left hover:border-[#6C63FF]/40 transition-all h-full flex flex-col shadow-2xl">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-300">
                    {p.emoji}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-4 text-white group-hover:text-[#6C63FF] transition-colors">{p.title}</h3>
                  <p className="text-[#9090A8] text-sm md:text-base leading-relaxed mb-8 flex-1">
                    "{p.desc}"
                  </p>
                  <div 
                    onClick={() => handleOpenCase('saas-redesign')}
                    className="pt-6 border-t border-white/5 flex items-center justify-between group/fix cursor-pointer hover:bg-white/[0.02] -mx-2 px-2 rounded-xl transition-all"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#6C63FF]">{p.fix}</span>
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF] group-hover/fix:bg-[#6C63FF] group-hover/fix:text-white transition-all shadow-lg shadow-[#6C63FF]/10"
                    >
                      <ArrowRight size={16} className="md:size-[18px]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 md:mt-12"
          >
            <button 
              onClick={() => {
                setCurrentView('problems');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="group relative px-6 py-4 md:px-8 md:py-4 bg-white/5 border border-white/10 rounded-full font-bold text-[10px] md:text-sm tracking-widest uppercase hover:border-[#6C63FF] hover:bg-[#6C63FF]/5 transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 md:gap-3 whitespace-nowrap">
                Visit All Problems We Solve <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform shrink-0" />
              </span>
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 md:py-24 px-6 md:px-16 container mx-auto">
        <div className="mb-20 text-center md:text-left">
          <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">Our Expertise</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">Everything you need <br /> to win your market</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: "Web Design & Dev", 
              desc: "From WordPress to custom-coded React apps. We build fast, secure websites that look amazing.",
              icon: <Globe size={24} />,
              tag: "React · Next.js · WP"
            },
            { 
              title: "Shopify Mastery", 
              desc: "We build Shopify stores optimized for pure conversion. Every pixel is placed to make sales.",
              icon: <ShoppingCart size={24} />,
              tag: "D2C · eCommerce"
            },
            { 
              title: "UI/UX Design", 
              desc: "Research-driven design. We create interfaces that users love to click and interact with.",
              icon: <Layout size={24} />,
              tag: "Figma · Prototyping"
            },
            { 
              title: "Graphic Design", 
              desc: "High-impact visual identity. Logos, branding, and social assets that define your presence.",
              icon: <PenTool size={24} />,
              tag: "Branding · Assets"
            },
            { 
              title: "SEO Strategy", 
              desc: "Rank where it matters. We drive organic traffic that actually translates into ROI.",
              icon: <BarChart3 size={24} />,
              tag: "Rankings · Traffic"
            },
            { 
              title: "Digital Marketing", 
              desc: "Full-funnel marketing. We reach your customers exactly where they hang out online.",
              icon: <Target size={24} />,
              tag: "Ads · Social · LeadGen"
            },
          ].map((s, i) => (
            <motion.div 
              key={i}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-[#6C63FF]/40 transition-all hover:bg-white/[0.07] group relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-[#6C63FF]/10 rounded-2xl flex items-center justify-center text-[#6C63FF] mb-6 group-hover:bg-[#6C63FF] group-hover:text-white transition-all duration-300">
                {s.icon}
              </div>
              <h3 className="font-display text-xl font-bold mb-4 group-hover:text-white transition-colors">{s.title}</h3>
              <p className="text-[#9090A8] text-sm leading-relaxed mb-8">{s.desc}</p>
              <button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#6C63FF] group/btn transition-all hover:text-white"
              >
                Start Your Project 
                <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section id="results" className="py-24 px-6 md:px-16 container mx-auto overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">Client Reviews</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 leading-tight">Hear it from the source</h2>
          <p className="text-[#9090A8] mt-6 text-sm md:text-base max-w-xl mx-auto">
            Real stories from real founders. Click any video to see how Zyvrel transformed their business.
          </p>
        </div>

        <div className="relative group/carousel">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 z-20">
            <button 
              onClick={() => setCarouselIndex(prev => Math.max(0, prev - 1))}
              disabled={carouselIndex === 0}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#080810]/80 border border-white/10 flex items-center justify-center text-white backdrop-blur-xl hover:bg-[#6C63FF] hover:border-[#6C63FF] transition-all disabled:opacity-20 disabled:cursor-not-allowed group shadow-2xl"
            >
              <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2 z-20">
            <button 
              onClick={() => setCarouselIndex(prev => Math.min(videoTestimonials.length - visibleVideos, prev + 1))}
              disabled={carouselIndex >= videoTestimonials.length - visibleVideos}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#080810]/80 border border-white/10 flex items-center justify-center text-white backdrop-blur-xl hover:bg-[#6C63FF] hover:border-[#6C63FF] transition-all disabled:opacity-20 disabled:cursor-not-allowed group shadow-2xl"
            >
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>

          {/* Carousel Container */}
          <div className="overflow-visible">
            <motion.div 
              animate={{ x: `-${carouselIndex * (100 / visibleVideos)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {videoTestimonials.map((video, idx) => (
                <div 
                  key={video.id}
                  className={`flex-shrink-0 relative group px-2 md:px-4 ${
                    visibleVideos === 1 ? 'w-full' : 
                    visibleVideos === 2 ? 'w-1/2' : 
                    'w-1/3'
                  }`}
                >
                  <RotatingBorderContainer>
                    {/* Video Thumbnail/Card */}
                    <div 
                      className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[22px]"
                      onClick={() => setSelectedVideo(video.videoUrl)}
                    >
                      <img 
                        src={video.thumbnail} 
                        alt="Testimonial thumbnail" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100" />
                      
                      {/* Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center -translate-y-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#6C63FF] group-hover:scale-110 shadow-xl">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                        </div>
                      </div>
  
                      {/* Client Info INSIDE frame */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#6C63FF]/30 mb-2 transition-all">
                          <img src={video.avatar} alt={video.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-white font-bold text-xs tracking-tight">{video.name}</h4>
                        <p className="text-[#9090A8] text-[8px] font-black uppercase tracking-[0.2em] mt-1 opacity-70">{video.role}</p>
                      </div>
                    </div>
                  </RotatingBorderContainer>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <video 
                src={selectedVideo} 
                className="w-full h-full object-contain bg-black" 
                controls 
                autoPlay
              />
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/10"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goal / Evolution Section */}
      <section id="philosophy" className="py-24 md:py-32 px-6 md:px-16 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">Our Mission</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">Your growth is our <br /> only obsession</h2>
            <p className="text-[#9090A8] mt-6 text-sm md:text-base leading-relaxed">
              We don't measure success by how beautiful a website looks. We measure it by how much it grows your business.
            </p>
            
            <div className="mt-12 space-y-8">
              {[
                { icon: "🎯", title: "Results Over Aesthetics", desc: "Every design decision is driven by conversion. Beauty follows function." },
                { icon: "🤝", title: "Long-Term Partnership", desc: "We don't disappear after launch. We're your digital partner for the long run." },
                { icon: "⚡", title: "Speed & Transparency", desc: "Fast delivery, clear communication, and zero surprises through the process." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-xs md:text-sm text-[#9090A8] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative h-[300px] md:h-[500px] flex items-center justify-center">
            {/* Animated Circles Visual */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] border border-white/10 rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#6C63FF] rounded-full shadow-[0_0_20px_#6C63FF]" />
            </motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[180px] h-[180px] md:w-[240px] md:h-[240px] border border-white/10 rounded-full"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-[#A78BFA] rounded-full shadow-[0_0_15px_#A78BFA]" />
            </motion.div>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/50 flex items-center justify-center text-center font-display font-bold text-[10px] md:text-xs z-10 backdrop-blur-xl">
              ZYVREL<br />DIGITAL
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 container mx-auto text-center border-t border-white/5 bg-white/[0.01]">
        <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">Transparent Pricing</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-16">Simple, honest pricing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { 
              name: "Starter", 
              price: "$500", 
              features: ["5-page Website Design", "WP or Webflow Dev", "Mobile Responsive", "Basic SEO Setup", "7-Day Delivery"],
              popular: false
            },
            { 
              name: "Professional", 
              price: "$1,500", 
              features: ["Up to 10 Pages", "Custom Design + Dev", "Shopify Mastery", "Full SEO Package", "14-Day Delivery", "30-Day Support"],
              popular: true
            },
            { 
              name: "Premium", 
              price: "$3,000+", 
              features: ["Unlimited Pages", "Enterprise Dev", "Full eCommerce Suite", "Marketing Funnel", "Unlimited Revisions", "90-Day Support"],
              popular: false
            }
          ].map((tier, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[2.5rem] text-left relative flex flex-col h-full overflow-hidden ${
                tier.popular 
                  ? 'bg-[#6C63FF]/10 border-2 border-[#6C63FF] shadow-2xl shadow-[#6C63FF]/20 scale-105 z-10' 
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-4 right-8 bg-[#6C63FF] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Popular
                </div>
              )}
              <div className="text-sm font-bold uppercase tracking-widest text-[#9090A8] mb-4">{tier.name}</div>
              <div className="font-display text-5xl font-bold mb-2">{tier.price}</div>
              <div className="text-xs text-[#9090A8] mb-10">Starting from</div>
              
              <div className="h-[1px] w-full bg-white/10 mb-8" />
              
              <ul className="space-y-4 mb-12 flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[#E4E3E0]">
                    <Check size={14} className="text-[#6C63FF]" /> {f}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${
                tier.popular 
                  ? 'bg-[#6C63FF] text-white hover:bg-[#6C63FF]/90' 
                  : 'border border-white/10 hover:border-[#6C63FF] hover:bg-[#6C63FF]/10'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-16 container mx-auto">
        <h3 className="font-display text-3xl font-bold text-center mb-16">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { q: "How long does a project take?", a: "Starter projects take 7 days. Professional targets 14 days. Custom builds vary by complexity." },
            { q: "How do we communicate?", a: "We use Slack, WhatsApp, or Email—whichever you prefer. You'll get daily progress updates." },
            { q: "Do you offer revisions?", a: "Absolutly. Every package includes revisions. We iterate until you are 100% satisfied." },
            { q: "What's the payment process?", a: "Usually 50% upfront and 50% on delivery. We accept bank transfers, Stripe, and Wise." },
          ].map((faq, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl">
              <h4 className="font-bold text-sm md:text-base mb-3">{faq.q}</h4>
              <p className="text-xs md:text-sm text-[#9090A8] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 md:py-32 px-6 md:px-16 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="text-center md:text-left">
            <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">From Our Blog</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 leading-tight">Insights to grow <br /> your business</h2>
          </div>
          <button className="max-md:mx-auto border border-white/10 hover:border-[#6C63FF] hover:bg-[#6C63FF]/10 px-6 py-3 rounded-full text-xs font-bold transition-all whitespace-nowrap">
            View All Posts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { emoji: "🌐", tag: "Design", title: "10 Website Mistakes Costing You Customers", date: "April 10, 2025" },
            { emoji: "📈", tag: "SEO", title: "How to Rank Page 1 on Google in 2025", date: "April 5, 2025" },
            { emoji: "🛒", tag: "Shopify", title: "Why Your Shopify Hub Isn't Converting", date: "March 28, 2025" },
          ].map((post, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-[#6C63FF]/40 transition-all cursor-none"
            >
              <div className="h-48 bg-black/40 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                {post.emoji}
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#6C63FF]/10 text-[#6C63FF] text-[10px] font-bold px-3 py-1 rounded-full uppercase">{post.tag}</span>
                  <span className="text-[10px] text-[#9090A8] font-bold">{post.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-6 group-hover:text-[#6C63FF] transition-colors">{post.title}</h3>
                <a href="#" className="text-xs font-bold text-[#6C63FF] flex items-center gap-2 group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-16 container mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">Get In Touch</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">Let's build something <br /> remarkable together</h2>
          <p className="text-[#9090A8] mt-6 leading-relaxed">
            Tell us about your project and our team will get back to you with a roadmap within 24 hours.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Contact Form - similar to hero but maybe more fields */}
          <RotatingBorderContainer>
            <form className="p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Name *</label>
                  <input required type="text" placeholder="John Smith" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Email *</label>
                  <input required type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Website Link</label>
                  <input type="text" placeholder="yourwebsite.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Phone Number *</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+1 000 000 0000" 
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^\d+ ]/g, '');
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Service Required *</label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {services.map(s => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => handleSelectService(s.title)}
                      className={`flex items-center gap-3 p-4 border rounded-xl transition-all ${
                        selectedService === s.title 
                          ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-white' 
                          : 'bg-white/5 border-white/10 text-[#9090A8] hover:border-[#6C63FF]/40'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedService === s.title ? 'border-[#6C63FF] bg-[#6C63FF]' : 'border-white/20'
                      }`}>
                        {selectedService === s.title && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className="text-xs font-bold">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Project Details *</label>
                <textarea rows={6} placeholder="Describe your goals, challenges, and vision..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all resize-none" />
              </div>
              <button className="w-full bg-[#6C63FF] hover:bg-[#6C63FF]/90 text-white font-display font-bold py-5 rounded-xl shadow-2xl shadow-[#6C63FF]/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-3 group">
                Send My Project Details <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </RotatingBorderContainer>
        </div>
      </section>

      <Footer />
    </motion.div>
        ) : currentView === 'problems' ? (
          <ProblemsPage 
            key="problems" 
            onHome={() => { setCurrentView('home'); }} 
            caseStudies={caseStudies}
            onOpenCase={handleOpenCase}
          />
        ) : (
          <CaseStudyDetail 
            key="detail" 
            caseId={selectedCaseId || ''} 
            caseStudies={caseStudies}
            onBack={() => {
              setCurrentView('problems');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        )}
      </AnimatePresence>

      {/* Decorative Blur Orbs */}
      <div className="fixed top-1/2 left-0 w-[600px] h-[600px] bg-[#6C63FF]/5 blur-[150px] -translate-y-1/2 rounded-full pointer-events-none -z-1" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#A78BFA]/5 blur-[120px] rounded-full pointer-events-none -z-1" />
    </div>
  );
}
