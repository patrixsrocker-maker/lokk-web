'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Package, Building2, ShieldCheck, Smartphone, 
  ArrowRight, Zap, Cpu, Lock, CheckCircle, Send, Loader2
} from 'lucide-react';

const LokkLandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error

  // --- CONFIGURACIÓN DEL CORREO ---
  // PEGA AQUÍ TU URL DE FORMSPREE (Ej: https://formspree.io/f/xmqwdz...)
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqeeanjg"; 

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Recopilamos los datos del formulario
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        setFormStatus('success');
        e.target.reset(); // Limpiar formulario
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  // --- COMPONENTES UI ---
  const Button = ({ children, variant = 'primary', className = '', onClick, ...props }) => {
    const baseStyle = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95";
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 border border-transparent disabled:opacity-70 disabled:cursor-not-allowed",
      outline: "border border-slate-300 text-slate-700 hover:border-slate-800 hover:text-slate-900 bg-transparent hover:bg-slate-50",
    };
    return (
      <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  };

  const SectionTitle = ({ title, subtitle }) => (
    <div className="mb-16 text-center max-w-3xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">{title}</h2>
      <p className="text-lg text-slate-600 leading-relaxed">{subtitle}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold shadow-md group-hover:bg-blue-700 transition-colors">L</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">LOKK</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#soluciones" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Soluciones</a>
            <a href="#como-funciona" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Cómo funciona</a>
            <a href="#tecnologia" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Tecnología</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="primary" className="hidden md:flex py-2 px-4 text-sm" onClick={() => setIsModalOpen(true)}>
              Cotizar Locker
            </Button>
            <button className="md:hidden text-slate-600 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-5">
             <a href="#soluciones" className="text-slate-600 font-medium py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Soluciones</a>
             <a href="#como-funciona" className="text-slate-600 font-medium py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Cómo funciona</a>
             <a href="#tecnologia" className="text-slate-600 font-medium py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Tecnología</a>
             <Button variant="primary" className="w-full mt-2" onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}>
               Cotizar Locker
             </Button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-6 border border-blue-100">
              <Zap size={14} /> Nueva generación 2026
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Logística Inteligente para <span className="text-blue-600">Espacios Modernos</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Automatiza la recepción de paquetería y custodia de activos con seguridad IoT. Sin llaves, sin contacto, 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#soluciones" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full">Ver Soluciones <ArrowRight size={18} /></Button>
              </a>
              <a href="#como-funciona" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full">Cómo funciona</Button>
              </a>
            </div>
          </div>
          
          <div className="relative h-[500px] bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-center shadow-2xl overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
             <div className="relative z-10 text-center transition-transform duration-700 group-hover:scale-105">
                <div className="w-56 h-80 bg-gradient-to-b from-white to-slate-100 rounded-xl border border-slate-300 shadow-2xl mx-auto flex flex-col p-4 relative">
                   <div className="grid grid-cols-2 gap-2 h-full">
                      {[...Array(6)].map((_,i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded flex items-center justify-center shadow-sm">
                           <div className="w-1 h-4 bg-slate-300 rounded-full"></div>
                        </div>
                      ))}
                   </div>
                </div>
                <p className="mt-6 text-sm font-mono text-slate-400">Modelo LOKK-PRO V2</p>
             </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="soluciones" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="Una solución, dos ecosistemas" subtitle="Hemos diseñado hardware y software adaptado a las necesidades críticas de cada sector." />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group bg-white">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform"><Package size={32} /></div>
              <h3 className="text-2xl font-bold mb-4">Para Residencias</h3>
              <p className="text-slate-600 mb-6">Recepción de delivery automática. Adiós a la recepción saturada.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> Integración con Apps</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-500"/> Alertas WhatsApp</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group bg-white">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 transition-transform"><Building2 size={32} /></div>
              <h3 className="text-2xl font-bold mb-4">Para Empresas</h3>
              <p className="text-slate-600 mb-6">Custodia de activos IT y gestión de documentos internos.</p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-slate-500"/> Logs de auditoría</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-slate-500"/> API para RRHH</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle title="Experiencia sin fricción" subtitle="Tres pasos simples para completar cualquier entrega de forma segura." />
          <div className="grid md:grid-cols-3 gap-12 relative">
             <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-slate-200 -z-10"></div>
             {[
               { icon: Smartphone, title: "1. Entrega", desc: "El repartidor selecciona al usuario en la pantalla táctil." },
               { icon: Zap, title: "2. Notificación", desc: "El usuario recibe un PIN único o QR en su celular al instante." },
               { icon: Lock, title: "3. Recojo", desc: "Escaneo rápido, apertura automática y retiro del paquete." }
             ].map((step, i) => (
               <div key={i} className="flex flex-col items-center text-center bg-slate-50 p-4">
                 <div className="w-24 h-24 bg-white border border-slate-200 rounded-full flex items-center justify-center text-blue-600 mb-6 shadow-sm z-10">
                   <step.icon size={32} strokeWidth={1.5} />
                 </div>
                 <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                 <p className="text-slate-600 text-sm">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* TECNOLOGÍA */}
      <section id="tecnologia" className="py-24 bg-slate-900 text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-mono text-sm mb-4"><Cpu size={16} /> INGENIERÍA PERUANA</div>
            <h2 className="text-4xl font-bold mb-6">Seguridad blindada</h2>
            <p className="text-slate-400 text-lg mb-8">Placa base propia con ESP32 y cifrado bancario.</p>
            <div className="space-y-4">
              {["Cifrado Flash Encryption", "Acero reforzado", "Sistema 100% Autónomo"].map((item, i) => (
                <div key={i} className="flex items-center gap-4"><ShieldCheck className="text-blue-500" size={20} /> <span className="text-slate-300">{item}</span></div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <button onClick={() => setIsModalOpen(true)} className="text-white hover:text-blue-400 font-medium flex items-center gap-2 transition-colors">
                 Solicitar Ficha Técnica <ArrowRight size={16}/>
              </button>
            </div>
          </div>
          <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 font-mono text-sm shadow-2xl">
             <p className="text-blue-400">const lokk = new Firmware();</p>
             <p className="text-green-400 mt-2">lokk.secure_connect();</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900 text-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <p className="font-bold text-white mb-2">LOKK Technologies S.A.C.</p>
           <p>© 2026 Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* --- MODAL DE COTIZACIÓN (CONECTADO) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 overflow-hidden animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>

            {formStatus === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Recibido!</h3>
                <p className="text-slate-600 mb-6">Hemos recibido tus datos correctamente. Te escribiremos a la brevedad.</p>
                <Button variant="outline" onClick={() => { setIsModalOpen(false); setFormStatus('idle'); }}>
                  Cerrar
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Cotizar Smart Locker</h3>
                  <p className="text-slate-600 text-sm">Déjanos tus datos para enviarte una propuesta.</p>
                </div>
                
                {formStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                    Hubo un error al enviar. Por favor intenta de nuevo o escribe a contacto@lokk.pe
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                    <input name="nombre" required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tu nombre" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Correo Corporativo</label>
                    <input name="email" required type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="tu@empresa.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Celular / WhatsApp</label>
                    <input name="telefono" type="tel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="999 000 000" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Proyecto</label>
                    <select name="tipo_proyecto" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                       <option value="Residencial">Edificio Residencial</option>
                       <option value="Corporativo">Oficina / Corporativo</option>
                       <option value="Club">Club / Gimnasio</option>
                       <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <Button variant="primary" type="submit" className="w-full justify-center" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? (
                      <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                    ) : (
                      <><Send size={18} /> Solicitar Cotización</>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default LokkLandingPage;
