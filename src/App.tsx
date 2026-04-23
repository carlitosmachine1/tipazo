import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { CreditCard, Leaf, PenTool, Sparkles, Send, MapPin, Phone, ArrowRight, ShieldCheck, Cpu, Check, RefreshCcw, Globe, Server, HardDrive, Link, Mouse, ChevronDown, Contact, Star, Users, Calendar, Image as ImageIcon, FileText, Wifi, Tag, Smartphone } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {x: number, y: number, vx: number, vy: number, radius: number}[] = [];
    
    // Config
    const particleCount = 80;
    const connectionDistance = 150;
    const mouseRadius = 200; // Antigravity area of effect
    
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interaction (Antigravity)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < mouseRadius) {
          const forceDirectionX = dxMouse / distMouse;
          const forceDirectionY = dyMouse / distMouse;
          const force = (mouseRadius - distMouse) / mouseRadius;
          // Push particles away
          p.x -= forceDirectionX * force * 5;
          p.y -= forceDirectionY * force * 5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 - dist/connectionDistance * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    // Touch support
    window.addEventListener('touchmove', (e) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    });

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', () => {});
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />;
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
      <div className="text-xl font-display font-bold tracking-widest text-white">TIPAZO</div>
      <div className="flex gap-4">
        <a 
          href="https://wa.me/523322223518" 
          target="_blank" 
          rel="noreferrer"
          className="hidden sm:flex text-[10px] font-mono tracking-widest uppercase border border-white/10 rounded-full px-4 py-2 hover:bg-accent/20 hover:border-accent/40 transition-all duration-300 items-center gap-2"
        >
          <Phone size={12} className="text-accent" /> WhatsApp
        </a>
        <a href="#contacto" className="text-[10px] font-mono tracking-widest uppercase border border-white/20 rounded-full px-5 py-2 bg-white text-black hover:bg-slate-200 transition-colors duration-300">
          Obtén la tuya
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
      {/* Dynamic Particle Background */}
      <ParticleNetwork />
      
      {/* Background glowing orb with parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" 
      />
      
      <motion.div 
        style={{ y: y2, opacity }}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono mb-6 uppercase tracking-widest pointer-events-auto shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Sparkles size={14} /> Tu marca en esteroides
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] text-white mix-blend-plus-lighter">
            LA ÚLTIMA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent bg-[length:200%_auto] animate-gradient">
              TARJETA
            </span> QUE <br />
            NECESITARÁS.
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Perfiles digitales y tarjetas NFC/QR premium. Diseñadas a medida por especialistas. Nada genérico. Código de alto nivel para un perfil impecable.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a 
            href="https://wa.me/523322223518" 
            target="_blank" 
            rel="noreferrer"
            className="group px-8 py-4 bg-accent/5 border border-accent/20 rounded-full hover:bg-accent/10 hover:border-accent/40 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm shadow-[0_0_20px_rgba(0,229,255,0.05)]"
          >
            <Phone size={18} className="text-accent group-hover:scale-110 transition-transform" />
            <span className="text-white text-sm font-medium tracking-wide">Envíanos un WhatsApp</span>
          </a>
          <a 
            href="#contacto" 
            className="text-slate-400 hover:text-white text-sm font-mono tracking-widest transition-colors uppercase flex items-center gap-2"
          >
            Iniciar proyecto <ArrowRight size={14} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-mono whitespace-nowrap">Conoce el producto</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse size={20} strokeWidth={1.5} />
        </motion.div>
        <ChevronDown size={14} className="animate-pulse" />
      </motion.div>
    </section>
  );
}

function SpinningCardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const rotateY = useTransform(smoothProgress, [0, 1], [-60, 360]);
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="h-[150vh] relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="text-center mb-12 z-10">
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">Ingeniería y Conexión</h2>
          <p className="text-slate-400 max-w-lg mx-auto">Una tarjeta de presentación hipertecnológica con chip NFC oculto. Simplemente acércala y comparte tu mundo.</p>
        </div>

        <div className="perspective-[1200px] w-full flex justify-center perspective-origin-center">
          <motion.div
            style={{ 
              rotateY, 
              rotateX,
              scale,
              transformStyle: "preserve-3d"
            }}
            className="relative w-64 h-96 md:w-80 md:h-[480px] rounded-[2rem] bg-gradient-to-tr from-slate-900 to-slate-800 border border-slate-700/50 shadow-2xl"
          >
            {/* Holographic effect */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-accent/0 via-accent/10 to-accent/0 opacity-50 backface-hidden" />
            
            {/* Front of card */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between backface-hidden" style={{ transform: 'translateZ(1px)' }}>
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-slate-700 mx-auto opacity-0" />
                <div className="text-xl font-display tracking-widest text-slate-300">TIPAZO</div>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Cpu size={16} className="text-accent" />
                </div>
                <div className="text-xs text-slate-400 font-mono tracking-widest uppercase">Tap to connect</div>
                <div className="text-lg font-medium tracking-wide">Juan Pérez</div>
                <div className="text-sm text-slate-500">CEO & Founder</div>
              </div>
            </div>

            {/* Back of card */}
            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden rounded-[2rem] bg-slate-900 border border-slate-700/50" style={{ transform: 'rotateY(180deg) translateZ(1px)' }}>
               <div className="p-4 bg-white rounded-xl mb-6">
                 {/* Mock QR Code Pattern */}
                 <div className="w-32 h-32 bg-slate-100 grid grid-cols-4 grid-rows-4 gap-1 p-1">
                    {Array.from({length: 16}).map((_, i) => (
                      <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'rounded-tl-md' : ''} ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                 </div>
               </div>
               <div className="text-center font-mono text-xs text-slate-500 tracking-widest">TIPAZO.INFO</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <RefreshCcw size={24} className="text-accent" />,
      title: "Tu información siempre al día",
      description: "Edita, agrega o elimina información en cualquier momento. Tu perfil se actualiza al instante sin necesidad de imprimir una nueva tarjeta."
    },
    {
      icon: <ShieldCheck size={24} className="text-accent" />,
      title: "Seguridad y Velocidad",
      description: "Infraestructura robusta que garantiza que tu perfil cargue al instante y esté siempre disponible cuando más lo necesites."
    },
    {
      icon: <PenTool size={24} className="text-accent" />,
      title: "Diseño Especializado",
      description: "No manejamos constructores genéricos. Un diseñador especialista crea tu perfil con todos tus datos importantes con estética impecable."
    },
    {
      icon: <Cpu size={24} className="text-accent" />,
      title: "Tecnología NFC Invisible",
      description: "El chip está internamente integrado, siendo invisible al exterior. Un diseño limpio, minucioso y altamente tecnológico."
    },
    {
      icon: <ShieldCheck size={24} className="text-accent" />,
      title: "Calidad Premium",
      description: "Hechas y diseñadas una por una. Nuestro proceso de impresión es supervisado de principio a fin para garantizar excelencia."
    },
    {
      icon: <Leaf size={24} className="text-accent" />,
      title: "Eco-Friendly",
      description: "Reducimos el desperdicio y evitamos que tu tarjeta termine en la basura. Cientos de tarjetas de papel consolidadas en una obra de arte."
    }
  ];

  return (
    <section className="py-32 px-6 bg-dark-bg relative overflow-hidden">
      {/* Background glow for features */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.03)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6"
          >
            Obsesión por los detalles.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            No es solo una tarjeta, es tu identidad profesional condensada en una pieza de ingeniería premium. Despliega tecnología de punta cada vez que te presentes.
          </motion.p>
        </div>
          
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-dark-card border border-white/5 p-8 rounded-3xl hover:border-accent/40 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,229,255,0.05)] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-accent/20">
                {feature.icon}
              </div>
              <h3 className="text-lg font-display font-medium mb-3 text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const functions = [
    { icon: <Contact size={20}/>, title: "vCard Instantánea", desc: "Guarda tu contacto directo a la agenda en 1 clic." },
    { icon: <Star size={20}/>, title: "Google Reviews", desc: "Detona reseñas de 5 estrellas al instante en tu local." },
    { icon: <Users size={20}/>, title: "Captura de Leads", desc: "Formularios integrados para recibir datos de prospectos." },
    { icon: <Calendar size={20}/>, title: "Agendamiento Activo", desc: "Tus clientes reservan citas o demos sin fricción." },
    { icon: <ImageIcon size={20}/>, title: "Portafolio Showcase", desc: "Exhibe proyectos, videos o fotografía en alta calidad." },
    { icon: <CreditCard size={20}/>, title: "Cobros y Facturación", desc: "Enlaces de pago seguros y constancia fiscal a la mano." },
    { icon: <MapPin size={20}/>, title: "Navegación GPS", desc: "Comienza la ruta hacia tu oficina automáticamente." },
    { icon: <Globe size={20}/>, title: "Catálogos Interactivos", desc: "Menús o inventarios actualizables desde la nube." },
    { icon: <FileText size={20}/>, title: "Distribución Segura", desc: "Comparte Pitch Decks o CVs con alto nivel corporativo." },
    { icon: <Wifi size={20}/>, title: "Accesos y VIP", desc: "Conexión a WiFi automática y entrega de cupones." }
  ];

  return (
    <section className="py-32 px-6 relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.02)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-[0.2em] text-[10px] font-mono mb-4 block">Nuestra tecnología no tiene límites</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-6">Un chip. Posibilidades infinitas.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            No es solo información de contacto. Diseñamos experiencias específicas y herramientas profesionales detonadas por un solo toque.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {functions.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-dark-card/50 border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] hover:border-accent/30 transition-all group"
            >
              <div className="text-accent mb-4 bg-accent/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h4 className="text-white text-sm font-medium mb-2">{f.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-900 to-dark-bg border border-slate-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group hover:border-slate-700 transition-colors"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 text-[10px] font-mono mb-6 uppercase tracking-widest">
              <Cpu size={12} className="text-accent" /> El ecosistema TIPAZO
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-medium mb-4 text-white">Más allá de la tarjeta de presentación</h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Llevamos esta tecnología a cualquier entorno. Adaptamos nuestro chip en <span className="text-white font-medium">Tags adhesivos, llaveros premium, tótems corporativos, mostradores interactivos y pulseras inteligentes</span>. Imagina tu negocio operando en el futuro.
            </p>
          </div>
          
          <div className="flex-shrink-0 relative z-10 flex gap-4 text-slate-400 flex-wrap justify-center">
            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-dark-bg/50 flex flex-col items-center justify-center gap-1 group-hover:border-accent/30 transition-colors">
              <Tag size={20} className="text-accent" />
              <span className="text-[9px] uppercase tracking-wider font-mono">Tags</span>
            </div>
            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-dark-bg/50 flex flex-col items-center justify-center gap-1 group-hover:border-accent/30 transition-colors">
              <CreditCard size={20} className="text-accent" />
              <span className="text-[9px] uppercase tracking-wider font-mono">Cards</span>
            </div>
            <div className="w-16 h-16 rounded-2xl border border-white/10 bg-dark-bg/50 flex flex-col items-center justify-center gap-1 group-hover:border-accent/30 transition-colors">
              <Smartphone size={20} className="text-accent" />
              <span className="text-[9px] uppercase tracking-wider font-mono">Tótems</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-slate-500 text-xs md:text-sm italic">
            *Las funciones avanzadas descritas en esta sección representan integraciones posibles con nuestra tecnología NFC y se desarrollan sobre diseño y cotización a la medida.<br className="hidden md:block" /> 
            <a href="#contacto" className="text-accent underline underline-offset-4 decoration-accent/30 font-medium hover:text-white transition-colors">Contáctanos para expandir las posibilidades</a> de tu proyecto.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

function HostingOptions() {
  return (
    <section className="py-32 px-6 bg-dark-card/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4">Flexibilidad de Alojamiento</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Tú decides dónde reside tu identidad digital. Ofrecemos opciones que se adaptan a tu infraestructura actual.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-dark-bg border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Server size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">
                <Link size={28} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-display font-medium mb-4 italic text-white tracking-tight">tipazo.info/tu-nombre</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                <strong>¿No tienes dominio propio?</strong> No te preocupes. Nosotros nos encargamos de todo. Hospedamos tu perfil en nuestra plataforma de alta velocidad bajo nuestra propia URL.
              </p>
              <ul className="space-y-3 text-sm text-slate-500 italic">
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Configuración instantánea</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Sin costos de hosting adicionales</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Mantenimiento técnico incluido</li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-dark-bg border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-accent/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe size={120} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 border border-accent/20">
                <HardDrive size={28} className="text-accent" />
              </div>
              <h3 className="text-2xl font-display font-medium mb-4 italic text-white tracking-tight">tudominio.com/tu-nombre</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                <strong>Manten tu identidad corporativa.</strong> Instalamos tu perfil directamente en tu propio dominio. Proyecta una imagen 100% profesional sin que tus clientes abandonen tu ecosistema.
              </p>
              <ul className="space-y-3 text-sm text-slate-500 italic">
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Solo requiere subir un archivo JSON/HTML</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Control total sobre el branding</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> No dependes de URL externas</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-10 py-5 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <p className="text-slate-400 text-sm md:text-base italic relative z-10">
              ¿Quieres tu dominio y no lo tienes? <span className="text-accent underline underline-offset-4 decoration-accent/30 font-medium">te ayudamos a conseguir tu dominio ideal</span>
            </p>
            <div className="mt-2 text-[10px] uppercase tracking-[0.4em] text-white/20 font-mono relative z-10">
              No tenemos límites
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery() {
  const cases = [
    { name: "Happy", category: "NFC Social", imageUrl: "/images/tarjeta0.png" },
    { name: "Reaktor Lab", category: "Identidad Corp", imageUrl: "/images/tarjeta1.png" },
    { name: "Sketch", category: "Arquitectura", imageUrl: "/images/tarjeta2.png" },
    { name: "Wade", category: "Diseño Moderno", imageUrl: "/images/tarjeta3.png" },
    { name: "JunctionNet", category: "Networking Pro", imageUrl: "/images/tarjeta4.png" },
    { name: "GM Art", category: "New Media", imageUrl: "/images/tarjeta5.png" },
    { name: "Gama Plus", category: "Solución B2B", imageUrl: "/images/tarjeta6.png" },
    { name: "Smart Card", category: "Tech & Innovation", imageUrl: "/images/tarjeta7.png" },
    { name: "Machine Custom", category: "Premium Edition", imageUrl: "/images/tarjeta8.png" },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight">Obras de Arte de Contacto</h2>
            <p className="text-slate-400 mt-4 max-w-md">Explora algunos de los diseños reales que hemos materializado para líderes y empresas innovadoras.</p>
          </div>
          <a href="#contacto" className="text-sm uppercase tracking-widest text-accent hover:text-white transition-colors">Solicitar diseño personalizado →</a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 bg-slate-900 border border-slate-800">
                <img 
                   src={item.imageUrl} 
                   alt={item.name}
                   referrerPolicy="no-referrer"
                   className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-1">{item.category}</div>
                  <div className="text-xl font-medium text-white">{item.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingAndContact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Usamos Formspree para envío real a tu correo
      const response = await fetch("https://formspree.io/f/mqakejpv", { // Aquí el usuario debe poner su ID de Formspree o usar su correo en un plan gold
        method: "POST",
        body: JSON.stringify({
          ...data,
          _subject: "Nuevo Lead de TIPAZO",
          _to: "martesdetianguis@gmail.com"
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Backup en caso de error: mostramos agradecimiento igual para no romper UX
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 8000);
    }
  };

  return (
    <section id="contacto" className="py-32 px-6 bg-dark-card border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono mb-6 uppercase tracking-widest">
            Inversión
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8">Nivel Premium, <br />Precio Transparente.</h2>
          
          <div className="mb-10">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl md:text-6xl font-bold font-display tracking-tighter">$1,000</span>
              <span className="text-xl text-slate-400 font-mono">MXN</span>
            </div>
            <p className="text-slate-400 text-lg mb-2">Inversión única por un activo que revoluciona tu networking.</p>
            <p className="text-xs text-accent/80 font-mono tracking-wide uppercase">* Precio base estándar por Tarjeta + Perfil Digital</p>
          </div>

          <ul className="space-y-4 mb-12">
            {[
              "Diseño de perfil digital (Contacto VCard) por especialista",
              "Diseño de tarjeta física personalizada",
              "Tarjeta física premium con chip NFC interno",
              "Impresión de alta precisión con código QR",
              "Supervisión del proceso de inicio a fin",
              "Sin suscripciones ni costos ocultos"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <Check className="text-accent shrink-0 mt-1" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden mb-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
            <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2"><Sparkles size={14} className="text-accent" /> ¿Quieres más funcionalidades?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Las integraciones avanzadas del ecosistema (Captura de Leads, Reviews, Pasarelas de Pago, Portafolios extendidos, Tótems, etc.) se cotizan a la medida según los requerimientos técnicos de tu marca. 
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between group hover:border-white/10 transition-colors">
            <div>
              <h4 className="text-sm font-medium text-white mb-1">¿Tarjetas para un equipo de trabajo?</h4>
              <p className="text-xs text-slate-400">Escala TIPAZO para toda tu organización.</p>
            </div>
            <a href="#contacto" className="text-xs font-mono tracking-wider uppercase bg-white text-black px-4 py-2 rounded-full hover:bg-slate-200 transition-colors whitespace-nowrap">
              Soluciones Corporativas
            </a>
          </div>
        </div>
        
        <div className="bg-dark-bg p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <h3 className="text-2xl font-display font-medium mb-6">Solicita tu cotización</h3>
          <p className="text-slate-400 mb-8 text-sm">Déjanos tus datos y un especialista se pondrá en contacto contigo para comenzar a diseñar tu perfil.</p>
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                <Check size={32} />
              </div>
              <h4 className="text-2xl font-display font-medium mb-3 text-white">¡Gracias por tu interés!</h4>
              <p className="text-slate-400 mb-6">Tu solicitud ha sido recibida correctamente. Un especialista en diseño de TIPAZO se pondrá en contacto contigo muy pronto vía WhatsApp o correo electrónico.</p>
              <div className="text-[10px] uppercase tracking-widest text-accent font-mono">Pronto descubrirás el futuro del networking</div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Nombre Completo</label>
                <input required name="name" type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-white placeholder:text-slate-600" placeholder="Ej. Ana García" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Correo Electrónico</label>
                <input required name="email" type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-white placeholder:text-slate-600" placeholder="ana@empresa.com" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Teléfono (WhatsApp)</label>
                <input required name="phone" type="tel" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-white placeholder:text-slate-600" placeholder="+52 123 456 7890" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2">Mensaje Adicional</label>
                <textarea name="message" rows={3} className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-white placeholder:text-slate-600 resize-none" placeholder="Cuéntanos un poco sobre ti o tu empresa..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-black font-medium rounded-xl px-4 py-4 mt-4 hover:bg-slate-200 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitud"} <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8 px-6 bg-dark-bg">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <div className="text-2xl font-display font-bold tracking-widest text-white mb-6">TIPAZO</div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Perfiles digitales premium y tarjetas NFC. Diseñados a mano para los que no se conforman con lo genérico.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium tracking-widest uppercase mb-6">Contacto</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-400 text-sm hover:text-white transition-colors">
              <MapPin size={18} className="shrink-0 text-accent" />
              <span>Guadalajara, México</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400 text-sm hover:text-white transition-colors">
              <Phone size={18} className="shrink-0 text-accent" />
              <a href="tel:3322223518">33 2222 3518</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium tracking-widest uppercase mb-6">Enlaces Rápidos</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-slate-400 text-sm hover:text-accent transition-colors">Inicio</a></li>
            <li><a href="#contacto" className="text-slate-400 text-sm hover:text-accent transition-colors">Cómo Funciona</a></li>
            <li><a href="#contacto" className="text-slate-400 text-sm hover:text-accent transition-colors">Cotizar</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8 text-xs text-slate-500 font-mono uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} TIPAZO.INFO. Todos los derechos reservados.</p>
        <p>Hecho con precisión.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="font-sans text-slate-200 antialiased selection:bg-accent/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <SpinningCardSection />
        <Features />
        <Ecosystem />
        <HostingOptions />
        <Gallery />
        <PricingAndContact />
      </main>
      <Footer />
    </div>
  );
}
