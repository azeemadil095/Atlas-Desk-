import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Cpu, 
  Activity, 
  Zap, 
  ChevronDown, 
  Scale, 
  ArrowUpRight,
  ShieldCheck,
  MousePointer2,
  MonitorCheck
} from 'lucide-react';

// API Integration Placeholder
// This function skeleton would connect to a WooCommerce REST API
const fetchWooCommerceProduct = async (productId: string) => {
  const consumerKey = 'ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  const consumerSecret = 'cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  const url = `https://your-store.com/wp-json/wc/v3/products/${productId}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(consumerKey + ':' + consumerSecret),
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching WooCommerce product:', error);
    return null;
  }
};

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-bg-dark min-h-screen text-white overflow-hidden">
      {/* Navigation */}
      <nav class="fixed top-0 left-0 w-full z-50 px-8 md:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-bg-dark/50 border-b border-white/10">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Zap className="text-bg-dark fill-current" />
          </div>
          <span class="text-xl font-bold tracking-tighter uppercase whitespace-nowrap">Atlas Kinetic</span>
        </div>
        <div class="hidden lg:flex gap-8 items-center text-xs font-medium tracking-[0.2em] uppercase text-white/40">
          <a href="#features" class="hover:text-white transition-colors">Technology</a>
          <a href="#specs" class="hover:text-white transition-colors">Specifications</a>
          <a href="#problem" class="hover:text-white transition-colors">Philosophy</a>
          <span class="font-mono text-gold-400">£1,499.00</span>
        </div>
        <div class="flex gap-4">
          <button class="hidden sm:block border border-emerald-500 text-emerald-500 px-5 py-2 rounded-full text-xs font-bold hover:bg-emerald-500 hover:text-bg-dark transition-all duration-300">
            Connect API
          </button>
          <MagneticButton className="bg-emerald-500 text-bg-dark px-6 py-2 rounded-full text-xs font-bold hover:bg-emerald-400 transition-colors flex items-center gap-2 group shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            Buy Now <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </MagneticButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="z-10"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-gold-400 text-xs tracking-[0.4em] uppercase mb-6 block"
            >
              Series Pro // 2026
            </motion.span>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.9] mb-8">
              The Desk <br /> 
              That <span className="text-emerald-500">Thinks.</span>
            </h1>
            <p className="text-white/40 text-lg md:text-xl max-w-md leading-relaxed mb-10">
              Combatting the silent epidemic of sedentary work through real-time spinal alignment and AI-driven kinetic movement.
            </p>
            
            <div className="flex flex-wrap gap-6 items-center">
              <MagneticButton className="bg-emerald-500 text-bg-dark px-10 py-5 rounded-full text-lg font-bold hover:bg-emerald-400 transition-all shadow-[0_10px_40px_rgba(16,185,129,0.2)]">
                Pre-order Now
              </MagneticButton>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1 font-mono">Limited Edition</span>
                <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '66%' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-gold-400" 
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Component */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-[40px] p-8 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-[80px] -z-10" />
              
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-gold-400 tracking-widest uppercase">Sensor_Status: Active</div>
                  <div className="text-sm text-white/60">AI Spinal Alignment System</div>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <ShieldCheck className="text-emerald-500" size={24} />
                </div>
              </div>

              {/* Float Effect Content */}
              <div className="aspect-[4/3] flex items-center justify-center relative py-12">
                <motion.div
                  animate={{ y: [0, -15, 0], rotateX: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl relative overflow-hidden group"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=2670&auto=format&fit=crop" 
                    alt="Desk Texture" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                  />
                  <div className="z-10 text-center">
                    <MousePointer2 className="mx-auto mb-4 text-emerald-500 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Kinetic Surface AK-01</span>
                  </div>
                </motion.div>
                <div className="absolute w-4/5 h-2 bg-emerald-500/40 blur-xl translate-y-24 rounded-full opacity-50" />
              </div>

              {/* Technical Grid Overlay */}
              <div className="grid grid-cols-2 gap-8 mt-12 border-t border-white/10 pt-8">
                {[
                  { label: "Lift Range", value: "65 — 130", unit: "CM" },
                  { label: "AI Compute", value: "4.2", unit: "TOPS" },
                  { label: "Precision", value: "0.1", unit: "MM" },
                  { label: "Finish", value: "CARBON", unit: "", accent: true },
                ].map((s, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{s.label}</span>
                    <div className={`text-2xl font-bold ${s.accent ? 'text-gold-400' : ''}`}>
                      {s.value} <span className="text-xs font-normal text-white/40">{s.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Decorative Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-32 px-6 lg:px-12 bg-white text-bg-dark relative">
        {/* Sub-decorative line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-bg-dark rounded-b-full" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-emerald-600 text-xs tracking-[0.4em] uppercase mb-4 block">The Epidemic</span>
            <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-8">
              The Death <br/><span className="italic">of the Spine.</span>
            </h2>
            <p className="text-xl text-black/60 leading-relaxed max-w-md">
              In the age of digital expansion, we have become physically static. The traditional workspace is a relic that compromises human longevity.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Chronic Strain', value: '84%', icon: Activity },
              { label: 'Lost Flow', value: '$2.1k', icon: Zap },
              { label: 'Posture Drift', value: '1.2cm', icon: Scale },
              { label: 'Decay Level', value: 'HIGH', icon: ShieldCheck },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-8 border border-black/5 bg-black/[0.02] rounded-3xl group hover:bg-emerald-500/5 transition-colors duration-500"
              >
                <stat.icon className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={24} />
                <div className="text-4xl font-bold tracking-tighter mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-black/30">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section id="features" className="py-32 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.p 
              className="font-mono text-gold-400 text-xs tracking-[0.4em] uppercase mb-4"
              whileInView={{ opacity: [0, 1] }}
            >
              The Architecture
            </motion.p>
            <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter">Kinetic Intelligence.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-white/10 rounded-[40px] overflow-hidden">
            {[
              {
                title: "Nano-Sensor Array",
                desc: "Integrated LiDAR and pressure sensors track skeletal alignment 60 times per second.",
                icon: Cpu
              },
              {
                title: "Micro-Adjust Tech",
                desc: "Automated, silent motors adjust height and tilt to prevent spinal compression before it starts.",
                icon: MonitorCheck
              },
              {
                title: "Haptic Carbon Shell",
                desc: "Ultra-thin, matte black carbon fiber with haptic touch controls embedded in the veneer.",
                icon: Zap
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="group p-12 border-r border-white/10 last:border-r-0 hover:bg-emerald-500/[0.02] transition-colors duration-700 relative"
              >
                <feature.icon className="text-emerald-500 mb-12" size={32} />
                <h3 className="text-2xl font-bold mb-6 group-hover:text-gold-400 transition-colors">{feature.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">{feature.desc}</p>
                <div className="mt-12">
                  <div className="bg-white/10 h-[1px] w-full" />
                  <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/20">
                    <span>Active System</span>
                    <ArrowUpRight size={14} className="group-hover:text-emerald-500 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section id="specs" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <p className="font-mono text-emerald-500 text-xs tracking-widest uppercase mb-4">Architecture</p>
              <h2 className="text-5xl font-bold tracking-tight">The Pro Series.</h2>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-emerald-500 font-mono text-4xl font-bold italic">99.9%</span>
              <p className="text-xs font-mono uppercase tracking-widest opacity-40">Precision Rating</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-3xl overflow-hidden">
            {[
              { label: "AI Processor", value: "Neural-K1 Core" },
              { label: "Height Range", value: "58cm - 128cm" },
              { label: "Load Capacity", value: "150kg Static" },
              { label: "Surface Layer", value: "TPC Carbon Fiber" },
              { label: "Response Time", value: "12ms" },
              { label: "Connectivity", value: "WiFi 6E / BT 5.3" },
              { label: "Input Voltage", value: "110v - 240v" },
              { label: "Warranty", value: "10 Year Atlas" },
            ].map((spec, i) => (
              <div key={i} className="p-8 border-r border-b border-white/10 group hover:bg-emerald-500/5 transition-colors">
                <div className="text-xs font-mono uppercase tracking-widest opacity-40 mb-2 group-hover:text-emerald-500 transition-colors">{spec.label}</div>
                <div className="text-lg font-bold">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative">
        <div className="absolute inset-0 bg-emerald-500/5 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-block px-4 py-1 bg-gold-400 text-bg-dark text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-8"
          >
            Limited Edition Release
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight mb-12">
            Build Your <br />
            <span className="text-emerald-500">Empire.</span>
          </h2>
          <p className="text-xl text-white/40 mb-16 max-w-2xl mx-auto">
            The first 500 units of the Atlas Kinetic Desk Pro ship with a custom serialized carbon-fiber workspace mat and priority AI firmware updates.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <MagneticButton className="bg-emerald-500 text-bg-dark px-12 py-6 rounded-full text-xl font-black hover:bg-emerald-400 transition-all hover:scale-105 shadow-2xl shadow-emerald-500/20">
              Pre-order Now
            </MagneticButton>
            <div className="text-white/60 font-mono text-sm">
              Batch 01 Shipping <span className="text-emerald-500">October 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-xl font-bold tracking-tighter">ATLAS</div>
        <div className="flex gap-12 text-xs font-mono uppercase tracking-widest text-white/40">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
        <div className="text-[10px] font-mono text-white/20">
          © 2026 ATLAS KINETICS INC. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
