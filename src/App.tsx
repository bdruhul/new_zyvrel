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
  ArrowLeft,
  Calendar,
  Clock,
  User,
  X,
  ArrowRight,   Check, 
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

const RotatingBorderButton = ({ children, onClick, className = "", disabled = false, type = "button" }: { children: ReactNode, onClick?: () => void, className?: string, disabled?: boolean, type?: "button" | "submit" }) => {
  return (
    <button 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
      className={`relative p-[1px] overflow-hidden rounded-xl group/btn-rotate shadow-[0_0_20px_rgba(108,99,255,0.15)] hover:shadow-[0_0_35px_rgba(108,99,255,0.35)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {/* Animated Rotating Border */}
      <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#6C63FF_180deg,transparent_270deg,transparent_360deg)] animate-border-rotate opacity-100 group-hover/btn-rotate:opacity-100 transition-opacity duration-500" />
      
      {/* Inner Content */}
      <div className="relative bg-[#080810]/90 backdrop-blur-xl rounded-[11px] px-5 py-2.5 flex items-center justify-center gap-2 group-hover/btn-rotate:bg-[#6C63FF]/20 transition-all whitespace-nowrap text-white">
        {children}
      </div>
    </button>
  );
};

// Blog Page Component
const ContactForm = () => {
  const [state, setState] = useState<'idle' | 'submitting' | 'success'>('idle');

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 text-center flex flex-col items-center justify-center min-h-[500px]"
          >
            <div className="w-20 h-20 bg-[#6C63FF] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#6C63FF]/40">
              <Check size={40} className="text-white" strokeWidth={3} />
            </div>
            <h3 className="font-display text-3xl font-bold mb-4">Message Received!</h3>
            <p className="text-[#9090A8] max-w-sm leading-relaxed mb-8">
              Our agent will contact you as soon as possible.
            </p>
            <button 
              onClick={() => setState('idle')}
              className="text-white font-bold hover:text-[#6C63FF] transition-colors underline py-2"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 md:p-12 space-y-6" 
            onSubmit={(e) => {
              e.preventDefault();
              setState('submitting');
              setTimeout(() => setState('success'), 1500);
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">First Name *</label>
                <input required type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Last Name *</label>
                <input required type="text" placeholder="Smith" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Email *</label>
                <input required type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all text-white" />
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all text-white" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider font-bold text-[#9090A8]">Project Details *</label>
              <textarea required rows={6} placeholder="Describe your goals, challenges, and vision..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm md:text-base outline-none focus:border-[#6C63FF] transition-all resize-none text-white" />
            </div>
            <RotatingBorderButton className="w-full" disabled={state === 'submitting'} type="submit">
              {state === 'submitting' ? (
                <div className="flex items-center justify-center gap-2 py-1">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="font-display font-bold">Sending...</span>
                </div>
              ) : (
                <>
                  <span className="font-display font-bold py-1">Send My Project Details</span>
                  <ArrowRight className="group-hover/btn-rotate:translate-x-1 transition-transform" />
                </>
              )}
            </RotatingBorderButton>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

const PrivacyPolicyPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#05050A] pt-32 pb-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-[#9090A8] hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Studio</span>
        </button>

        <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tight">
          Privacy <span className="text-[#6C63FF]">Policy</span>
        </h1>
        
        <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              At Zyvrel Digital, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>To provide you with information or services that you request from us.</li>
              <li>To improve our website and customer service.</li>
              <li>To contact you regarding projects or inquiries.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of processing.
            </p>
          </section>

          <div className="pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold opacity-50">
            Last Updated: May 2024
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TermsPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#05050A] pt-32 pb-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-[#9090A8] hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Studio</span>
        </button>

        <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tight">
          Terms of <span className="text-[#6C63FF]">Service</span>
        </h1>
        
        <div className="prose prose-invert prose-sm md:prose-base max-w-none space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Intellectual Property</h2>
            <p>
              The content, features, and functionality of Zyvrel Digital are owned by us and are protected by international copyright, trademark, patent, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. Project Engagement</h2>
            <p>
              All project engagements are subject to a separate written agreement. The information provided on this website does not constitute a binding offer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p>
              Zyvrel Digital shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of clinical applications or services.
            </p>
          </section>

          <div className="pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest font-bold opacity-50">
            Last Updated: May 2024
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExpertiseDetailPage = ({ type, onBack, onContactClick }: { type: 'ecommerce' | 'webdesign' | 'uiux' | 'seo', onBack: () => void, onContactClick: () => void }) => {
  const content = {
    'ecommerce': {
      title: 'E-commerce Solutions',
      icon: <ShoppingCart size={40} className="text-[#6C63FF]" />,
      desc: 'We engineer high-converting digital storefronts that turn browsers into lifelong customers.',
      full: 'From Shopify optimization to custom headless commerce builds, we focus on the metrics that matter: site speed, conversion rate, and average order value. Our solutions are built to scale with your growth.',
      metrics: ['+45% Conversion Rate', '0.8s Load Times', 'Seamless Scale']
    },
    'webdesign': {
      title: 'Custom Web Design',
      icon: <Monitor size={40} className="text-[#6C63FF]" />,
      desc: 'Bespoke web experiences that blend aesthetic elegance with technical precision.',
      full: 'We don\'t use templates. Every site is a unique architectural masterpiece designed to reflect your brand\'s DNA. We prioritize accessibility, performance, and distinctive visual storytelling.',
      metrics: ['Unique Branding', 'Mobile Focused', 'WCAG Compliant']
    },
    'uiux': {
      title: 'UI/UX Strategy',
      icon: <PenTool size={40} className="text-[#6C63FF]" />,
      desc: 'User-centric design systems and strategic interfaces that drive deep engagement.',
      full: 'Great design is invisible. We map user journeys and build design systems that make complex interactions feel effortless. Our approach is data-informed and human-centric.',
      metrics: ['Intuitive Flow', 'Design Systems', 'User Research']
    },
    'seo': {
      title: 'SEO Performance',
      icon: <BarChart3 size={40} className="text-[#6C63FF]" />,
      desc: 'Technical SEO and content strategy to dominate search rankings and sustainable growth.',
      full: 'Visibility is oxygen for business. We go beyond keywords to build technical authority and content ecosystems that rank. We focus on long-term organic growth that reduces your dependence on paid ads.',
      metrics: ['Page 1 Rankings', 'Traffic Velocity', 'Technical Edge']
    }
  }[type];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#05050A] pt-32 pb-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-[#9090A8] hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Studio</span>
        </button>

        <div className="mb-12">
          <div className="mb-6">{content.icon}</div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight">
            {content.title.split(' ')[0]} <span className="text-[#6C63FF]">{content.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-medium">
            {content.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="text-white/70 leading-relaxed space-y-6">
            <p>{content.full}</p>
            <p>Our approach combines market psychology with cutting-edge technology to ensure your digital presence isn't just a website, but a business asset.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-black text-[#6C63FF] mb-6">Key Results</h3>
            {content.metrics.map((m, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="font-bold text-white uppercase tracking-wider text-xs md:text-sm">{m}</span>
              </div>
            ))}
          </div>
        </div>

        <RotatingBorderButton 
          onClick={onContactClick}
          className="w-full md:w-auto"
        >
          <span className="px-8 font-black uppercase tracking-widest text-xs">Start a Project</span>
        </RotatingBorderButton>
      </div>
    </motion.div>
  );
};

const BlogPage = ({ onBack, onOpenPost }: { onBack: () => void; onOpenPost: (post: any) => void }) => {
  const blogs = [
    { title: "The Future of Shopify in 2026", tag: "E-commerce", date: "Mar 12, 2026", emoji: "🛒", excerpt: "Optimize your Shopify store for better sales by understanding user psychology and data trends." },
    { title: "Why Minimal Design Wins More Clients", tag: "Design", date: "Feb 28, 2026", emoji: "🎨", excerpt: "Increase conversions by fixing common UI/UX mistakes that drive customers away from your site." },
    { title: "SEO Secrets: How to Outrank Your Competitors", tag: "Marketing", date: "Jan 15, 2026", emoji: "📈", excerpt: "Master the latest SEO techniques to dominate the first page of Google searches this year." },
    { title: "Scaling Your Digital Agency to $1M ARR", tag: "Business", date: "Jan 05, 2026", emoji: "💼", excerpt: "Building the infrastructure for sustainable growth in a competitive digital market." },
    { title: "Mastering React Animations with Framer Motion", tag: "Development", date: "Dec 18, 2025", emoji: "⚡", excerpt: "Take your user interfaces to the next level with fluid, physics-based motion." },
    { title: "UX Psychology: Creating Emotional Connections", tag: "UX Design", date: "Nov 30, 2025", emoji: "🧠", excerpt: "Designing for human behavior and emotional impact in every interaction." },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#080810] pt-32 pb-24 px-6 md:px-16"
    >
      <div className="container mx-auto">
        <div className="mb-20">
          <span className="text-[#6C63FF] font-black text-xs uppercase tracking-[0.4em] mb-4 block">Knowledge Hub</span>
          <h1 className="font-display text-4xl md:text-7xl font-bold max-w-4xl leading-[1.1]">
            Insights to accelerate your <span className="text-white/40">digital legacy.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onOpenPost(blog)}
              className="group cursor-pointer bg-white/5 border border-white/10 rounded-[2.5rem] p-6 hover:bg-white/[0.08] hover:border-[#6C63FF]/30 transition-all duration-500 shadow-2xl shadow-black/40 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] mb-6 shadow-xl shadow-black/20 bg-black/40 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-700">
                {blog.emoji}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/40 to-transparent opacity-60" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-[#080810] shadow-lg">
                  {blog.tag}
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold text-[#9090A8] uppercase tracking-widest mb-3">
                <span>{blog.date}</span>
                <div className="w-1 h-1 rounded-full bg-[#6C63FF]" />
                <span>5 min read</span>
              </div>
              <h3 className="font-display text-xl font-bold group-hover:text-[#6C63FF] transition-colors duration-300 mb-4">{blog.title}</h3>
              <p className="text-[#9090A8] text-xs leading-relaxed opacity-70 flex-grow">{blog.excerpt}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <RotatingBorderButton 
            onClick={onBack}
          >
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white py-1">
              <ArrowRight size={12} className="rotate-180 group-hover/btn-rotate:-translate-x-1 transition-transform" /> 
              Back to Innovation
            </div>
          </RotatingBorderButton>
        </div>
      </div>
    </motion.div>
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
  onOpenCase: (id: string) => void
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
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover:opacity-80 transition-all">View Case Study</span>
                  <div className="w-10 h-10 rounded-full bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF] group-hover:bg-[#6C63FF] group-hover:text-white transition-all shadow-lg shadow-[#6C63FF]/5">
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center pb-20">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-8">Ready to be our next success story?</h3>
            <RotatingBorderButton 
              onClick={() => {
                onHome();
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 600);
              }}
            >
              <span className="px-6 py-1 text-sm font-bold uppercase tracking-widest">Start Your Project Now</span>
            </RotatingBorderButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const pricingData: Record<string, { title: string; plans: any[] }> = {
  "Web Design & Dev": {
    title: "Web Design & Development",
    plans: [
      { name: "Starter", price: "$500", desc: "Basic brand site", features: ["5-page Design", "WP or Webflow", "Responsive", "7-Day Delivery"], popular: false },
      { name: "Pro", price: "$1,500", desc: "For growing brands", features: ["12-page Design", "Custom CMS", "SEO Optimized", "14-Day Delivery"], popular: true },
      { name: "Enterprise", price: "$3,500+", desc: "Full custom logic", features: ["Unlimited Pages", "Custom React/Next.js", "Advanced Integrations", "30-Day Support"], popular: false },
    ]
  },
  "Shopify Mastery": {
    title: "Shopify Solutions",
    plans: [
      { name: "Launch", price: "$800", desc: "Start your journey", features: ["Theme Setup", "Upsell Funnels", "Product Imports", "7-Day Delivery"], popular: false },
      { name: "Growth", price: "$2,200", desc: "Most popular choice", features: ["Custom Theme Design", "Advanced Apps Integration", "Speed Optimization", "14-Day Delivery"], popular: true },
      { name: "Prestige", price: "$5,000+", desc: "Headless commerce", features: ["Hydrogen/Next.js", "Global Multi-store", "Custom Logic", "Unlimited Support"], popular: false },
    ]
  },
  "UI/UX Design": {
    title: "Experience Design",
    plans: [
      { name: "Audit", price: "$400", desc: "Quick fix", features: ["Full Page Review", "UX Audit Report", "Quick Fix List", "3-Day Delivery"], popular: false },
      { name: "Pro", price: "$1,200", desc: "Complete overhaul", features: ["Full Prototype", "Design System", "User Testing", "10-Day Delivery"], popular: true },
      { name: "Product", price: "$2,500+", desc: "New app build", features: ["Full App Design", "Developer Handoff", "Unlimited Assets", "30-Day Support"], popular: false },
    ]
  },
  "Graphic Design": {
    title: "Visual Identity",
    plans: [
      { name: "Assets", price: "$300", desc: "Quick bits", features: ["Social Media Kit", "Ad Creative Pack", "Iconography", "3-Day Delivery"], popular: false },
      { name: "Identity", price: "$900", desc: "Complete brand", features: ["Premium Logo", "Brand Guide", "Stationary Set", "7-Day Delivery"], popular: true },
      { name: "Corporate", price: "$2,000+", desc: "Full redefine", features: ["Total Brand Overhaul", "All Digital Assets", "Brand Language", "14-Day Delivery"], popular: false },
    ]
  },
  "SEO Strategy": {
    title: "Search Dominance",
    plans: [
      { name: "Audit", price: "$350", desc: "Know the status", features: ["Keyword Research", "Tech SEO Audit", "Strategy Deck", "5-Day Delivery"], popular: false },
      { name: "Domination", price: "$1,200/mo", desc: "Monthly growth", features: ["Page 1 Focus", "Backlink Building", "Content Strategy", "Monthly Updates"], popular: true },
      { name: "Authority", price: "$3,000/mo", desc: "Global reach", features: ["Global Market Focus", "PR & Outreach", "Daily Monitoring", "Direct Access"], popular: false },
    ]
  },
  "Digital Marketing": {
    title: "Growth Funnels",
    plans: [
      { name: "Social", price: "$600/mo", desc: "Basic awareness", features: ["Content Creation", "Basic Ad Mgmt", "Engagement", "Monthly Report"], popular: false },
      { name: "Funnel", price: "$1,800/mo", desc: "Pure ROI focus", features: ["Full Funnel Strategy", "High-ROI Ads", "Lead Generation", "Bi-Weekly Calls"], popular: true },
      { name: "Scale", price: "$4,000/mo+", desc: "Aggressive growth", features: ["Multi-channel Omni", "CMO Level Access", "Custom Dashboard", "Weekly Strategy"], popular: false },
    ]
  }
};

const BlogPostView = ({ post, onBack, onHome }: { post: any; onBack: () => void; onHome: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#080810] pt-32 md:pt-40 pb-24 px-6 md:px-16"
    >
      <div className="max-w-4xl mx-auto">
        {/* Post Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-[#6C63FF]/20 text-[#A78BFA] text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#6C63FF]/30">
              {post.tag}
            </span>
            <div className="flex items-center gap-2 text-[#9090A8] text-xs font-medium">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2 text-[#9090A8] text-xs font-medium">
              <Clock size={14} />
              <span>5 min read</span>
            </div>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-black leading-[1.1] mb-8 text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-[#6C63FF] flex items-center justify-center text-xl">
              👨‍💻
            </div>
            <div>
              <div className="text-white font-bold text-sm">Zyvrel Editorial Team</div>
              <div className="text-[#9090A8] text-xs">Strategy & Insights</div>
            </div>
          </div>
        </div>

        {/* Featured Card */}
        <div className="aspect-video bg-gradient-to-br from-[#12121A] to-[#1E1E2E] rounded-[2rem] border border-white/10 flex items-center justify-center text-[10vw] mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[#6C63FF]/5 blur-3xl rounded-full translate-y-1/2" />
          <span className="relative z-10">{post.emoji}</span>
        </div>

        {/* Post Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-p:text-[#9090A8] prose-p:leading-relaxed prose-li:text-[#9090A8] prose-strong:text-white">
          <p className="text-xl md:text-2xl text-[#A78BFA] font-medium leading-relaxed mb-12">
            {post.excerpt}
          </p>
          
          <h2 className="text-2xl md:text-3xl text-white mb-6 mt-12">The Digital Landscape in 2026</h2>
          <p>
            In the rapidly evolving world of digital enterprise, the boundaries between physical and digital are blurring more than ever. 
            Success is no longer just about having a presence; it's about creating a resonance. As we navigate the complexities of user experience 
            and data-driven strategy, we find that the most impactful solutions are those that speak to human needs with technological precision.
          </p>

          <div className="my-12 p-8 bg-[#6C63FF]/10 border-l-4 border-[#6C63FF] rounded-r-2xl italic text-white/90 text-lg">
            "Design is not just what it looks like and feels like. Design is how it works." 
            <span className="block not-italic text-sm font-bold text-[#6C63FF] mt-4 uppercase tracking-widest">— Digital Axiom</span>
          </div>

          <h2 className="text-2xl md:text-3xl text-white mb-6 mt-12">Why Most Businesses Fail to Adapt</h2>
          <p>
            The primary reason for digital stagnation is the reliance on legacy patterns in a world of fluid expectations. 
            Users today don't compare you to your direct competitors; they compare you to the best digital experience they had that day. 
            If your interface isn't intuitive and your strategy isn't proactive, you aren't just standing still—you're falling behind.
          </p>

          <ul className="space-y-4 my-8">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] flex-shrink-0 mt-1">✓</div>
              <span>Poor conversion pathway optimization leading to drop-offs.</span>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] flex-shrink-0 mt-1">✓</div>
              <span>Lack of personalized engagement based on user intent data.</span>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] flex-shrink-0 mt-1">✓</div>
              <span>Static content that fails to provide dynamic value over time.</span>
            </li>
          </ul>

          <h2 className="text-2xl md:text-3xl text-white mb-6 mt-12">Looking Ahead</h2>
          <p>
            The future belongs to the agile, the data-informed, and the bold. By implementing the strategies discussed in this article, 
            you aren't just optimizing for today; you're building the infrastructure for tomorrow's success. 
            Let's move beyond the ordinary and create digital legacy that lasts.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-24 p-12 bg-gradient-to-br from-[#6C63FF] to-[#A78BFA] rounded-[2.5rem] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-8 relative z-10">
            Ready to apply these <br /> insights to your project?
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 relative z-10">
            <RotatingBorderButton 
              onClick={() => {
                onHome();
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 600);
              }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest py-0.5 px-8 whitespace-nowrap">Work With Us</span>
            </RotatingBorderButton>

            <RotatingBorderButton onClick={onBack}>
              <div className="flex items-center gap-2 py-0.5 px-6">
                <ArrowLeft size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Return to Hub</span>
              </div>
            </RotatingBorderButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PricingModal = ({ serviceTitle, onClose }: { serviceTitle: string; onClose: () => void }) => {
  const data = pricingData[serviceTitle as keyof typeof pricingData];

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#080810]/95 backdrop-blur-3xl"
        onClick={onClose}
      />
      
      {/* Fixed Mobile Close Button (Always Visible) */}
      <div className="fixed top-20 right-6 z-[1050] md:hidden">
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-[#6C63FF] flex items-center justify-center text-white shadow-[0_0_30px_rgba(108,99,255,0.5)] active:scale-95 transition-all"
        >
          <span className="text-xl font-bold">✕</span>
        </button>
      </div>

      {/* Scrollable Layer */}
      <div className="absolute inset-0 overflow-y-auto p-4 md:p-8" onClick={onClose}>
        <div className="min-h-full flex items-center justify-center py-8 md:py-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Desktop Close button - hidden on mobile */}
            <div className="hidden md:block absolute md:-top-16 md:right-0">
              <button 
                onClick={onClose}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-[#6C63FF] flex items-center justify-center text-white transition-all border border-white/10"
              >
                ✕
              </button>
            </div>

            <div className="text-center mb-12">
              <span className="text-[#6C63FF] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 block">Tailored Pricing</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold">{data.title} Plans</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 md:p-10 rounded-[2.5rem] text-left relative flex flex-col h-full ${
                plan.popular 
                  ? 'bg-[#6C63FF]/10 border-2 border-[#6C63FF] shadow-2xl shadow-[#6C63FF]/20 scale-105 z-10' 
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-6 right-8 bg-[#6C63FF] text-white text-[9px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Best Value
                </div>
              )}
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#9090A8] mb-4">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-2">
                <div className="font-display text-4xl md:text-5xl font-black">{plan.price}</div>
              </div>
              <div className="text-[10px] md:text-[11px] text-[#9090A8] mb-10 font-medium italic opacity-70">
                {plan.desc}
              </div>
              
              <div className="h-[1px] w-full bg-white/10 mb-8" />
              
              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((f: string, j: number) => (
                  <li key={j} className="flex items-center gap-3 text-[11px] md:text-xs text-[#E4E3E0] font-medium leading-relaxed">
                    <div className="w-4 h-4 rounded-full bg-[#6C63FF]/20 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-[#6C63FF]" strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              
              <RotatingBorderButton 
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="w-full mt-auto"
              >
                <span className="font-bold text-xs tracking-widest uppercase py-1">Select {plan.name}</span>
              </RotatingBorderButton>
            </motion.div>
          ))}
        </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Case Study Detail Component
const CaseStudyDetail = ({ caseId, onBack, caseStudies }: { 
  caseId: string, 
  onBack: () => void, 
  caseStudies: any[]
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
          <RotatingBorderButton 
            onClick={onBack}
            className="hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-1 text-white">
              <ArrowRight className="rotate-180 group-hover/btn-rotate:-translate-x-1 transition-transform text-[#6C63FF]" size={18} />
              <span className="font-black text-[10px] md:text-xs tracking-[0.4em] uppercase">Explore Archive</span>
            </div>
          </RotatingBorderButton>
        </div>
      </div>
    </motion.div>
  );
};

// Extracted Footer Component
const Footer = ({ onPageClick }: { onPageClick: (view: any) => void }) => (
  <footer className="bg-black/40 pt-12 pb-8 px-6 md:px-16 border-t border-white/5 w-full">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-12">
        <div className="col-span-2 md:col-span-2">
          <div className="font-display font-medium text-xl mb-4">
            ZYVREL <span className="text-[#6C63FF]">DIGITAL</span>
          </div>
          <p className="text-white/50 text-xs max-w-[280px] mb-6 leading-relaxed">
            Crafting high-end digital experiences that convert. 
            E-commerce & Custom Development Experts.
          </p>
          <div className="flex gap-3">
            {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-[#6C63FF] hover:bg-[#6C63FF]/10 transition-all text-white/70 hover:text-white"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-widest font-black text-white/90 mb-4">Expertise</h4>
          <ul className="space-y-3 text-white/50 text-[11px] font-medium">
            <li onClick={() => onPageClick('ecommerce')} className="hover:text-white transition-colors cursor-pointer">E-commerce Solutions</li>
            <li onClick={() => onPageClick('webdesign')} className="hover:text-white transition-colors cursor-pointer">Custom Web Design</li>
            <li onClick={() => onPageClick('uiux')} className="hover:text-white transition-colors cursor-pointer">UI/UX Strategy</li>
            <li onClick={() => onPageClick('seo')} className="hover:text-white transition-colors cursor-pointer">SEO Performance</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-widest font-black text-white/90 mb-4">Company</h4>
          <ul className="space-y-3 text-white/50 text-[11px] font-medium">
            <li onClick={() => onPageClick('problems')} className="hover:text-white transition-colors cursor-pointer">Our Work</li>
            <li onClick={() => onPageClick('problems')} className="hover:text-white transition-colors cursor-pointer">Case Studies</li>
            <li onClick={() => onPageClick('contact')} className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
            <li 
              onClick={() => onPageClick('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5 gap-4">
        <div className="text-white/40 text-[10px] font-medium tracking-tight">
          © {new Date().getFullYear()} Zyvrel Digital. Crafting with precision.
        </div>
        <div className="flex gap-6 text-white/40 text-[10px] font-medium">
          <button onClick={() => onPageClick('terms')} className="hover:text-white transition-all underline decoration-white/0 hover:decoration-white/20">Terms</button>
          <button 
            onClick={() => onPageClick('privacy')}
            className="hover:text-white transition-all underline decoration-white/0 hover:decoration-white/20"
          >
            Privacy
          </button>
        </div>
      </div>
    </div>
  </footer>
);

// Consultation Modal Component
const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour.toString().padStart(2, '0')}:${minute} ${ampm}`;
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setStep('form');
        setSelectedTime(null);
      }, 300);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#080810]/95 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg mx-4 z-10"
        onClick={e => e.stopPropagation()}
      >
        <RotatingBorderContainer>
          <div className="p-5 md:p-8 relative overflow-hidden">
            {/* Background Gradient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C63FF]/10 blur-[80px] rounded-full pointer-events-none -z-1" />
            
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#6C63FF] transition-all z-20 group"
            >
              <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <AnimatePresence mode="wait">
              {step === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="inline-flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/20 px-3 py-1 rounded-full mb-3 text-[#A78BFA] text-[9px] font-bold tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 bg-[#6C63FF] rounded-full animate-pulse" />
                    ✦ Discovery Call · 30 MIN
                  </div>
                  
                  <h2 className="font-sans text-xl md:text-3xl font-black mb-1 md:mb-1.5 tracking-tight text-white leading-tight">Book a Consultation</h2>
                  <p className="text-[#9090A8] text-[10px] md:text-sm leading-relaxed mb-3 md:mb-4 font-sans">Choose a slot to discuss your goals.</p>

                  <form onSubmit={(e) => { e.preventDefault(); setStep('success'); }} className="space-y-2.5 md:space-y-3.5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] md:text-[9px] uppercase tracking-wider font-extrabold text-[#9090A8] font-sans">First Name *</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="John" 
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-[11px] md:text-xs text-white outline-none focus:border-[#6C63FF] transition-all placeholder:text-[#4a4a68] font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] md:text-[9px] uppercase tracking-wider font-extrabold text-[#9090A8] font-sans">Last Name *</label>
                        <input 
                          required 
                          type="text" 
                          placeholder="Smith" 
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-[11px] md:text-xs text-white outline-none focus:border-[#6C63FF] transition-all placeholder:text-[#4a4a68] font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] md:text-[9px] uppercase tracking-wider font-extrabold text-[#9090A8] font-sans">Email Address *</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="you@company.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-[11px] md:text-xs text-white outline-none focus:border-[#6C63FF] transition-all placeholder:text-[#4a4a68] font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] md:text-[9px] uppercase tracking-wider font-extrabold text-[#9090A8] font-sans">Preferred Date *</label>
                        <div className="relative">
                          <input 
                            required 
                            type="date" 
                            onClick={(e) => (e.currentTarget as any).showPicker?.()}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-[11px] md:text-xs text-white outline-none focus:border-[#6C63FF] transition-all appearance-none font-sans cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                          />
                          <Calendar size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9090A8] pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8px] md:text-[9px] uppercase tracking-wider font-extrabold text-[#9090A8] font-sans">Time Slot *</label>
                        <div className="relative group">
                          <select 
                            required
                            value={selectedTime || ""}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 md:px-4 md:py-2.5 text-[11px] md:text-xs text-white outline-none focus:border-[#6C63FF] transition-all appearance-none cursor-pointer font-sans"
                          >
                            <option value="" disabled className="bg-[#0A0E2A]">Select a time</option>
                            {timeSlots.map(time => (
                              <option key={time} value={time} className="bg-[#0A0E2A] text-white py-2">{time}</option>
                            ))}
                          </select>
                          <Clock size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9090A8] pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 md:pt-3 flex justify-center">
                      <button 
                        type="submit"
                        disabled={!selectedTime}
                        className={`group relative inline-flex items-center justify-center gap-3 font-sans font-bold py-2 md:py-2.5 px-6 md:px-8 rounded-lg transition-all duration-300 active:scale-[0.98] overflow-hidden ${
                          !selectedTime 
                            ? 'bg-[#6C63FF]/40 text-white' 
                            : 'bg-[#6C63FF] text-white hover:bg-[#5b52ff] hover:shadow-[0_8px_25px_-10px_rgba(108,99,255,0.6)]'
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-2 text-[11px] md:text-sm font-bold">
                          Confirm Booking 
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shimmer" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 relative z-10"
                >
                  <div className="w-24 h-24 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#10B981] border border-[#10B981]/20">
                    <Check size={48} strokeWidth={3} />
                  </div>
                  <h2 className="font-sans text-4xl font-black mb-4 tracking-tight text-white">Booking Confirmed!</h2>
                  <p className="text-[#9090A8] text-lg leading-relaxed mb-10 max-w-sm mx-auto font-sans">
                    We've scheduled your session for <span className="text-white font-bold">{selectedTime}</span> and sent a calendar invite to your email.
                  </p>
                  <button 
                    onClick={onClose}
                    className="w-full bg-white/5 border border-white/10 py-5 rounded-xl text-base font-bold text-white hover:bg-white/10 transition-all active:scale-[0.98] font-sans"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RotatingBorderContainer>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [formState, setFormState] = useState<'idle' | 'success'>('idle');
  const [contactFormState, setContactFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'problems' | 'detail' | 'blog' | 'single-blog' | 'privacy' | 'terms' | 'ecommerce' | 'webdesign' | 'uiux' | 'seo'>('home');
  const [selectedBlogPost, setSelectedBlogPost] = useState<any>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeServicePricing, setActiveServicePricing] = useState<string | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [visibleVideos, setVisibleVideos] = useState(5);
  const { scrollYProgress } = useScroll();

  // Scroll lock for modals and full-screen overlays
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);
  
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
      id: "web-app-redesign",
      category: "Web Apps",
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
    { title: "Shopify Mastery", icon: <ShoppingCart size={16} /> },
    { title: "UI/UX Design", icon: <Layout size={16} /> },
    { title: "Graphic Design", icon: <PenTool size={16} /> },
    { title: "SEO Strategy", icon: <BarChart3 size={16} /> },
    { title: "Digital Marketing", icon: <Target size={16} /> },
  ];

  const [mainProblem, setMainProblem] = useState<string>("");

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
            <div className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,#6C63FF_180deg,transparent_270deg,transparent_360deg)] animate-border-rotate" />
            
            {/* Inner Content */}
            <div 
              style={{ background: 'linear-gradient(90deg, #0a0e2a 0%, #0d1340 100%)' }}
              className="relative backdrop-blur-xl rounded-[11px] md:rounded-[15px] flex items-center justify-between px-3 py-2.5 md:px-6 lg:px-8 md:py-3"
            >
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
              <ul className="hidden md:flex gap-4 lg:gap-9 text-sm lg:text-[15px] font-bold text-white">
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
              <RotatingBorderButton 
                onClick={() => setIsConsultationModalOpen(true)}
              >
                <span className="text-[10px] sm:text-[11px] md:text-xs font-bold whitespace-nowrap text-white">Book Consultation</span>
              </RotatingBorderButton>
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
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 md:pt-32 pb-12 px-6 md:px-16 overflow-hidden">
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
            
            <h1 className="font-display text-[clamp(2.2rem,9.5vw,4.5rem)] md:text-[clamp(3.5rem,7vw,5.5rem)] font-black leading-[1.1] md:leading-[1.0] tracking-tight mb-6 md:mb-8 text-white">
              <span className="whitespace-nowrap">Transform Your</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#A78BFA] to-white bg-[length:200%_auto] animate-gradient-flow">
                Digital Future.
              </span>
            </h1>
            <p className="text-[#9090A8] text-base md:text-xl leading-relaxed max-w-2xl mb-8 md:mb-12">
              Whether it's a high-converting <span className="text-white font-semibold">Shopify store</span>, a <span className="text-white font-semibold">Custom-coded portal</span>, or any CMS like <span className="text-white font-semibold">WordPress, Framer, or Webflow</span>—we empower any online business with world-class engineering and iconic architecture.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                "Custom Code & Full-stack Architecture",
                "Any CMS (WordPress, Wix, Squarespace, Kajabi)",
                "Shopify Design & Automation",
                "Framer & Webflow Visual Engineering"
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
                  {text}
                </motion.div>
              ))}
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
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-2">Is Your Website Losing Clients?</h3>
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
                              value={mainProblem}
                              onChange={(e) => setMainProblem(e.target.value)}
                              className="w-full bg-white/5 border border-[#6C63FF]/20 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/50 transition-all z-20"
                            >
                              <option value="" disabled className="bg-[#080810] text-[#9090A8]">Select your main challenge</option>
                              <option value="outdated" className="bg-[#080810] text-white">My website looks outdated</option>
                              <option value="traffic" className="bg-[#080810] text-white">Not getting traffic from Google</option>
                              <option value="conversion" className="bg-[#080810] text-white">Visitors don't convert to customers</option>
                              <option value="shopify" className="bg-[#080810] text-white">My Shopify store isn't selling</option>
                              <option value="brand-new" className="bg-[#080810] text-white">I need a brand new website</option>
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
                                className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg border text-[9px] sm:text-[11px] font-semibold transition-all whitespace-nowrap ${
                                  selectedService === service.title
                                    ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/10'
                                    : 'bg-white/5 border-[#6C63FF]/10 text-white hover:border-[#6C63FF]/50'
                                }`}
                              >
                                <span className="flex-shrink-0">{service.icon}</span>
                                <span className="truncate">{service.title}</span>
                                {selectedService === service.title && <Check size={10} className="ml-auto flex-shrink-0" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        <RotatingBorderButton className="w-full mt-4" type="submit">
                          <span className="font-display font-bold py-1 text-white">Receive My Free Audit</span>
                          <ArrowRight size={18} className="group-hover/btn-rotate:translate-x-1 transition-transform text-white" />
                        </RotatingBorderButton>
                        
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
                        className="mt-8 text-white text-xs md:text-sm font-bold hover:text-[#6C63FF] transition-colors underline"
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

      {/* Pain Points Section */}
      <section className="py-24 md:py-40 px-6 md:px-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6C63FF]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-1">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
                <div className="bg-[#0A0A15] border border-white/5 rounded-2xl p-5 md:p-6 text-left hover:border-[#6C63FF]/40 transition-all h-full flex flex-col shadow-xl">
                  <h3 className="font-display text-base md:text-lg font-bold mb-2 text-white group-hover:text-[#6C63FF] transition-colors">{p.title}</h3>
                  <p className="text-[#9090A8] text-[11px] md:text-xs leading-relaxed mb-4 flex-1 italic opacity-70">
                    "{p.desc}"
                  </p>
                  <div 
                    onClick={() => handleOpenCase('web-app-redesign')}
                    className="pt-4 border-t border-white/5 flex items-center justify-between group/fix cursor-pointer hover:bg-white/[0.02] rounded-xl transition-all"
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#6C63FF]">{p.fix}</span>
                    <div 
                      className="w-8 h-8 rounded-full bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF] group-hover/fix:bg-[#6C63FF] group-hover/fix:text-white transition-all shadow-lg shadow-[#6C63FF]/10"
                    >
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

            <RotatingBorderButton 
              onClick={() => {
                setCurrentView('problems');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="mt-10 md:mt-12"
            >
              <span className="relative z-10 flex items-center gap-2 md:gap-3 whitespace-nowrap text-[10px] md:text-sm font-bold tracking-widest uppercase py-1">
                Visit All Problems We Solve <ArrowRight size={16} className="group-hover/btn-rotate:translate-x-1 transition-transform shrink-0" />
              </span>
            </RotatingBorderButton>
        </div>
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

      {/* Services Grid */}
      <section id="services" className="py-10 md:py-24 px-6 md:px-16 container mx-auto">
        <div className="mb-6 md:mb-20 text-center md:text-left">
          <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">Our Expertise</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">Everything you need <br className="hidden md:block" /> to win your market</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
                <RotatingBorderButton 
                  onClick={() => {
                    setActiveServicePricing(s.title);
                  }}
                  className="w-full sm:w-auto"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">View Plans</span>
                  <ArrowRight size={12} className="text-white group-hover/btn-rotate:translate-x-1 transition-transform" />
                </RotatingBorderButton>
                <RotatingBorderButton 
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover/btn-rotate:opacity-80 transition-all py-1">
                    Ask Question
                  </span>
                </RotatingBorderButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section id="results" className="py-10 md:py-24 px-6 md:px-16 container mx-auto overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
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
                className="fixed md:absolute top-20 right-6 md:top-6 md:right-6 w-12 h-12 md:w-10 md:h-10 rounded-full bg-[#6C63FF] md:bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/10 z-[110]"
              >
                <span className="font-bold">✕</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {activeServicePricing && (
          <PricingModal 
            serviceTitle={activeServicePricing} 
            onClose={() => setActiveServicePricing(null)} 
          />
        )}
      </AnimatePresence>

      {/* Goal / Evolution Section */}
      <section id="philosophy" className="pt-10 pb-6 md:pt-56 md:pb-32 px-6 md:px-16 container mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] font-bold text-[10px] uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
              Complete Digital Partner
            </div>
            <h2 className="font-display text-[clamp(2.2rem,8vw,3.5rem)] md:text-[clamp(3.5rem,9vw,6rem)] lg:text-7xl font-black leading-[1.0] tracking-tighter">
              <span className="whitespace-nowrap">Growth systems for</span> <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] via-[#A78BFA] to-white">Any Tech Stack</span>
            </h2>
            <p className="text-[#9090A8] mt-10 text-lg md:text-2xl leading-relaxed max-w-2xl">
              From hand-coded React applications to seamless CMS migrations. We handle the tech so you can focus on the business.
            </p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Web Design & Dev", desc: "From WordPress to custom-coded React apps. We build fast, secure websites." },
                { title: "Shopify Mastery", desc: "High-converting Shopify stores designed for maximum sales and automation." },
                { title: "UI/UX Design", desc: "Research-driven interfaces that users love to click and interact with." },
                { title: "Graphic Design", desc: "High-impact visual identity. Logos, branding, and social assets that define you." },
                { title: "SEO Strategy", desc: "Rank where it matters. We drive organic traffic that actually translates into ROI." },
                { title: "Digital Marketing", desc: "Full-funnel marketing. We reach your customers exactly where they are online." },
              ].map((item, i) => (
                <div key={i} className="group p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#6C63FF]/30 transition-all">
                  <h4 className="font-bold mb-2 text-sm group-hover:text-[#6C63FF] transition-colors">{item.title}</h4>
                  <p className="text-[11px] md:text-xs text-[#9090A8] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="relative h-[450px] md:h-[750px] mt-10 md:mt-12 flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute w-[400px] h-[400px] bg-[#6C63FF]/10 rounded-full blur-[100px]" />
            
            {/* Orbit 6 (Outer) - Graphic Design */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute w-[280px] h-[280px] md:w-[620px] md:h-[620px] border border-white/[0.02] rounded-full"
            >
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                <div className="w-2.5 md:w-5 h-2.5 md:h-5 bg-rose-500 rounded-full shadow-[0_0_25px_#F43F5E] mb-2 mx-auto" />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap bg-black/40 backdrop-blur-md px-1.5 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/10 text-[7px] md:text-[10px] uppercase font-bold tracking-widest text-rose-500 shadow-2xl"
                >
                  Graphic Design
                </motion.div>
              </div>
            </motion.div>

            {/* Orbit 5 - SEO Strategy */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] h-[240px] md:w-[540px] md:h-[540px] border border-white/[0.03] rounded-full"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 md:w-4.5 h-2 md:h-4.5 bg-emerald-500 rounded-full shadow-[0_0_20px_#10B981] mb-2 mx-auto" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap bg-black/40 backdrop-blur-md px-1.5 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/10 text-[7px] md:text-[10px] uppercase font-bold tracking-widest text-emerald-500 shadow-2xl"
                >
                  SEO Strategy
                </motion.div>
              </div>
            </motion.div>

            {/* Orbit 4 - Shopify Mastery */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200px] h-[200px] md:w-[460px] md:h-[460px] border border-white/[0.04] rounded-full"
            >
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                <div className="w-2 md:w-4 h-2 md:h-4 bg-[#6C63FF] rounded-full shadow-[0_0_20px_#6C63FF] mb-2 mx-auto" />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap bg-black/40 backdrop-blur-md px-1.5 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/10 text-[7px] md:text-[10px] uppercase font-bold tracking-widest text-[#6C63FF] shadow-2xl"
                >
                  Shopify Mastery
                </motion.div>
              </div>
            </motion.div>

            {/* Orbit 3 - Web Design & Dev */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[160px] h-[160px] md:w-[380px] md:h-[380px] border border-white/[0.05] rounded-full"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap bg-black/40 backdrop-blur-md px-1.5 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/10 text-[7px] md:text-[10px] uppercase font-bold tracking-widest text-[#A78BFA] shadow-2xl mb-2"
                >
                  Web Design & Dev
                </motion.div>
                <div className="w-2 md:w-3.5 h-2 md:h-3.5 bg-[#A78BFA] rounded-full shadow-[0_0_18px_#A78BFA] mx-auto" />
              </div>
            </motion.div>

            {/* Orbit 2 - UI/UX Design */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute w-[120px] h-[120px] md:w-[300px] md:h-[300px] border border-white/[0.08] rounded-full"
            >
              <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 md:gap-3">
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                   className="whitespace-nowrap bg-black/40 backdrop-blur-md px-1.5 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/10 text-[7px] md:text-[10px] uppercase font-bold tracking-widest text-blue-400 shadow-2xl"
                >
                  UI/UX Design
                </motion.div>
                <div className="w-1.5 md:w-3 h-1.5 md:h-3 bg-blue-400 rounded-full shadow-[0_0_15px_#60A5FA]" />
              </div>
            </motion.div>

            {/* Orbit 1 - Digital Marketing */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-[80px] h-[80px] md:w-[220px] md:h-[220px] border border-white/[0.12] rounded-full"
            >
              <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 md:gap-3">
                <div className="w-1 md:w-2.5 h-1 md:h-2.5 bg-white rounded-full shadow-[0_0_12px_white]" />
                <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                   className="whitespace-nowrap bg-black/40 backdrop-blur-md px-1.5 md:px-3 py-1 md:py-1.5 rounded-lg border border-white/10 text-[7px] md:text-[10px] uppercase font-bold tracking-widest text-white shadow-2xl"
                >
                  Digital Marketing
                </motion.div>
              </div>
            </motion.div>

            {/* Center Core */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-[#12121A] to-[#1E1E2E] border-2 border-[#6C63FF]/30 flex items-center justify-center text-center font-display font-black text-xs md:text-sm z-10 backdrop-blur-3xl shadow-2xl shadow-[#6C63FF]/20"
            >
              <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20" />
              <div className="relative">
                <span className="tracking-[0.3em] uppercase">ZYVREL</span><br />
                <span className="text-[#6C63FF] tracking-[0.2em] uppercase">DIGITAL</span>
              </div>
            </motion.div>

            {/* Orbit Labels - Decorative */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-full h-full max-w-[550px] max-h-[550px] border border-dashed border-white/5 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-8 md:py-32 px-6 md:px-16 container mx-auto">
        <div className="text-center md:text-left mb-8 md:mb-16">
          <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">From Our Blog</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 leading-tight">Insights to grow <br className="hidden md:block" /> your business</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { 
              emoji: "🌐", 
              tag: "Design", 
              title: "10 Website Mistakes Costing You Customers", 
              excerpt: "Increase conversions by fixing common UI/UX mistakes that drive customers away from your site.",
              date: "April 10, 2025" 
            },
            { 
              emoji: "📈", 
              tag: "SEO", 
              title: "How to Rank Page 1 on Google in 2025", 
              excerpt: "Master the latest SEO techniques to dominate the first page of Google searches this year.",
              date: "April 5, 2025" 
            },
            { 
              emoji: "🛒", 
              tag: "Shopify", 
              title: "Why Your Shopify Hub Isn't Converting", 
              excerpt: "Optimize your Shopify store for better sales by understanding user psychology and data trends.",
              date: "March 28, 2025" 
            },
            { 
              emoji: "⚡", 
              tag: "Performance", 
              title: "The Speed Advantage: Why Milliseconds Matter", 
              excerpt: "Learn how optimizing your site speed can lead to a 20% increase in revenue and user engagement.",
              date: "March 15, 2025" 
            },
          ].map((post, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              onClick={() => {
                setSelectedBlogPost(post);
                setCurrentView('single-blog');
              }}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:border-[#6C63FF]/40 transition-all cursor-pointer shadow-2xl shadow-black/40 flex flex-col"
            >
              <div className="h-48 bg-black/40 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                {post.emoji}
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#6C63FF]/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">{post.tag}</span>
                  <span className="text-[10px] text-[#9090A8] font-bold">{post.date}</span>
                </div>
                <h3 className="font-display text-lg font-bold mb-3 group-hover:text-[#6C63FF] transition-colors">{post.title}</h3>
                <p className="text-[#9090A8] text-xs leading-relaxed mb-8 flex-grow opacity-70">
                  {post.excerpt}
                </p>
                <div className="w-fit">
                  <RotatingBorderButton className="!rounded-lg">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white py-0.5">Read More</span>
                    <ArrowRight size={12} className="text-white group-hover/btn-rotate:translate-x-1 transition-transform" />
                  </RotatingBorderButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex justify-center">
          <RotatingBorderButton 
            onClick={() => {
              setCurrentView('blog');
              window.scrollTo(0, 0);
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest py-0.5 px-6">View All Posts</span>
          </RotatingBorderButton>
        </div>
      </section>

      {/* FAQ & Contact Combined Section */}
      <section id="contact" className="py-24 md:py-40 px-6 md:px-16 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: FAQ */}
          <div className="lg:col-span-5 space-y-8">
            <div className="text-center lg:text-left">
              <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">Support</span>
              <h3 className="font-display text-3xl md:text-4xl font-bold mt-4">Frequently <br className="hidden lg:block" /> Asked Questions</h3>
              <p className="text-[#9090A8] leading-relaxed max-w-sm mx-auto lg:mx-0 text-sm mt-6">
                Everything you need to know about working with us. Can't find the answer? Reach out directly.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "How long does a project take?", a: "Starter projects take 7 days. Professional targets 14 days. Custom builds vary by complexity." },
                { q: "How do we communicate?", a: "We use Slack, WhatsApp, or Email—whichever you prefer. You'll get daily progress updates." },
                { q: "Do you offer revisions?", a: "Absolutly. Every package includes revisions. We iterate until you are 100% satisfied." },
                { q: "What's the payment process?", a: "Usually 50% upfront and 50% on delivery. We accept bank transfers, Stripe, and Wise." },
                { q: "Do you sign NDAs?", a: "Yes, we prioritize your IP. We sign standard NDAs before any project details are shared to ensure total confidentiality." },
                { q: "What technologies do you use?", a: "We specialize in modern stacks: React, Next.js, Framer, and Shopify for e-commerce, ensuring high performance and SEO." },
                { q: "Can we start immediately?", a: "We typically have a 1-week lead time to ensure your dedicated team is fully ready to hit the ground running for your project." },
              ].map((faq, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${openFaqIndex === i ? 'bg-white/10 border-white/20' : 'bg-white/5 hover:bg-white/10'}`}
                >
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between group"
                  >
                    <h4 className="font-bold text-sm transition-colors text-white">{faq.q}</h4>
                    <motion.div
                      animate={{ rotate: openFaqIndex === i ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="text-[#6C63FF]"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-xs md:text-sm text-[#9090A8] leading-relaxed border-t border-white/5 pt-4">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="text-center lg:text-left">
              <span className="text-[#6C63FF] font-bold text-xs uppercase tracking-widest">Get In Touch</span>
              <h2 className="font-display text-[clamp(1.4rem,7.5vw,2.5rem)] md:text-5xl font-bold mt-4 leading-[1.2] md:leading-tight">
                <span className="block whitespace-nowrap">Let's build something</span>
                <span className="block text-[#6C63FF]">remarkable together</span>
              </h2>
              <p className="text-[#9090A8] leading-relaxed mt-6">
                Tell us about your project and our team will get back to you with a roadmap within 24 hours.
              </p>
            </div>

            <RotatingBorderContainer>
              <ContactForm />
            </RotatingBorderContainer>
          </div>
        </div>
      </section>
    </motion.div>
        ) : currentView === 'single-blog' ? (
          <BlogPostView 
            post={selectedBlogPost} 
            onBack={() => setCurrentView('blog')} 
            onHome={() => setCurrentView('home')} 
          />
        ) : currentView === 'blog' ? (
          <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BlogPage 
              onBack={() => {
                setCurrentView('home');
                window.scrollTo(0, 0);
              }}
              onOpenPost={(post) => {
                setSelectedBlogPost(post);
                setCurrentView('single-blog');
              }}
            />
          </motion.div>
        ) : currentView === 'problems' ? (
          <motion.div key="problems" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProblemsPage 
              onHome={() => { setCurrentView('home'); }} 
              caseStudies={caseStudies}
              onOpenCase={handleOpenCase}
            />
          </motion.div>
        ) : currentView === 'privacy' ? (
          <PrivacyPolicyPage onBack={() => { setCurrentView('home'); window.scrollTo(0, 0); }} />
        ) : currentView === 'terms' ? (
          <TermsPage onBack={() => { setCurrentView('home'); window.scrollTo(0, 0); }} />
        ) : ['ecommerce', 'webdesign', 'uiux', 'seo'].includes(currentView) ? (
          <ExpertiseDetailPage 
            type={currentView as any} 
            onBack={() => { setCurrentView('home'); window.scrollTo(0, 0); }} 
            onContactClick={() => { setCurrentView('contact'); window.scrollTo(0, 0); }}
          />
        ) : (
          <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CaseStudyDetail 
              caseId={selectedCaseId || ''} 
              caseStudies={caseStudies}
              onBack={() => {
                setCurrentView('problems');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onPageClick={(view) => { 
        if (view === 'contact') {
          if (currentView !== 'home') {
            setCurrentView('home');
            setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
          } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }
        setCurrentView(view); 
        window.scrollTo(0, 0); 
      }} />

      <AnimatePresence>
        {isConsultationModalOpen && (
          <ConsultationModal 
            isOpen={isConsultationModalOpen} 
            onClose={() => setIsConsultationModalOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Decorative Blur Orbs */}
      <div className="fixed top-1/2 left-0 w-[600px] h-[600px] bg-[#6C63FF]/5 blur-[150px] -translate-y-1/2 rounded-full pointer-events-none -z-1" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#A78BFA]/5 blur-[120px] rounded-full pointer-events-none -z-1" />
    </div>
  );
}
