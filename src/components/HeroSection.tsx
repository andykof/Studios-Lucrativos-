/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';
import { motion } from 'motion/react';
import { Shield, Sparkles, AlertCircle, ArrowRight, Loader2, Sparkle, Calendar, Phone, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onSuccess: (name: string) => void;
  preselectedProperty?: string;
}

export default function HeroSection({ onSuccess, preselectedProperty = 'uniko' }: HeroSectionProps) {
  const { addLead } = useLeads();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('uniko');
  const [contactPreference, setContactPreference] = useState('whatsapp');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  useEffect(() => {
    if (preselectedProperty) {
      setInterest(preselectedProperty);
    }
  }, [preselectedProperty]);

  const validatePhone = (num: string) => {
    const raw = num.replace(/\D/g, '');
    return raw.length >= 10 && raw.length <= 11;
  };

  const validateEmail = (mail: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 10) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setPhone(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    if (!name.trim() || name.trim().split(' ').length < 2) {
      newErrors.name = 'Insira seu nome completo (Nome e Sobrenome).';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Insira um e-mail válido.';
    }
    if (!validatePhone(phone)) {
      newErrors.phone = 'Insira um número de telefone/WhatsApp válido com DDD.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await addLead({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        propertyInterest: `${interest === 'uniko' ? 'UNIKO Vila Olímpia' : interest === 'verus' ? 'VERUS Mackenzie' : 'Ambos os Projetos'} (Preferência: ${contactPreference})`,
      });

      // WhatsApp Dynamic URL composition
      const propertyLabel = interest === 'uniko' 
        ? 'UNIKO Vila Olímpia' 
        : interest === 'verus' 
          ? 'VERUS Mackenzie' 
          : 'Ambos os Projetos';

      const preferenceLabel = contactPreference === 'whatsapp' 
        ? 'WhatsApp' 
        : contactPreference === 'phone' 
          ? 'Ligação' 
          : 'E-mail';

      const whatsappMessage = `Olá! Quero falar com um corretor sobre os Studios Lucrativos. Seguem meus dados do formulário:

👤 *Nome:* ${name.trim()}
✉️ *E-mail:* ${email.trim()}
📞 *Telefone:* ${phone.trim()}
🏢 *Ativo de Interesse:* ${propertyLabel}
💬 *Preferência de Contato:* ${preferenceLabel}`;

      const whatsappUrl = `https://wa.me/5511961716766?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in a new tab/window
      window.open(whatsappUrl, '_blank');

      onSuccess(name.trim());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100vh] md:min-h-screen flex items-center bg-forest-dark overflow-hidden py-24 md:py-16 px-4 sm:px-6 md:px-8">
      {/* Background Graphic representing premium urban and architecture focus - MOBILE ONLY */}
      <div className="absolute top-0 left-0 w-full h-[75vh] z-0 md:hidden">
        <picture>
          <source media="(max-width: 640px)" srcSet="https://drive.google.com/thumbnail?id=1X6EvakplOf_jL_tWJfyhNll-5SFlE9dy&sz=w800" />
          <source media="(max-width: 1024px)" srcSet="https://drive.google.com/thumbnail?id=1X6EvakplOf_jL_tWJfyhNll-5SFlE9dy&sz=w1600" />
          <img
            src="https://drive.google.com/thumbnail?id=1X6EvakplOf_jL_tWJfyhNll-5SFlE9dy&sz=w2500"
            alt="Studios Lucrativos Sao Paulo"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-contain object-top"
          />
        </picture>
        {/* Custom balanced dark masking: solid transparent layer + subtle direction gradients */}
        <div className="absolute inset-0 bg-forest-dark/40" />
        {/* Mobile Gradients for smooth transition into the tall content area */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/50 to-transparent" />
      </div>

      {/* Background Graphic representing premium urban focus - DESKTOP ONLY */}
      <div className="absolute inset-0 z-0 hidden md:block select-none pointer-events-none">
        <img
          src="https://offloadmedia.feverup.com/saopaulosecreto.com/wp-content/uploads/2020/07/19075110/%40andreiamarzola-819x1024.jpg"
          alt="São Paulo Vista Aérea"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-cover opacity-[0.65] filter brightness-[0.85]"
        />
        {/* Fine-tuned directional overlays: transition to solid dark on the left for maximum text contrast, fading out to expose the gorgeous skyline on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/70 to-forest-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-forest-dark/50" />
      </div>

      {/* Dynamic Gold Light Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-accent/10 md:bg-accent/5 blur-3xl rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-10 pt-8 md:pt-12 pb-12">
        
        {/* Top Centered Section: Copy, Badges & CTA */}
        <div className="flex flex-col items-center space-y-4 max-w-3xl w-full px-4">
          
          <div className="flex items-center justify-center gap-2">
            <span className="bg-accent/10 border border-accent/25 text-accent text-[9px] md:text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full font-montserrat flex items-center gap-1.5 shadow-sm">
              <Shield size={11} className="shrink-0" /> Canal de Vendas Oficial
            </span>
          </div>

          <h1 className="text-[36px] sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none uppercase font-montserrat">
            Uniko Vila Olímpia
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl font-bold font-montserrat text-slate-300">
            O menor valor da região: <span className="text-accent underline decoration-accent/50 underline-offset-4">R$ 15.500/m²</span>
          </div>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-light max-w-xl">
            Invista com inteligência na Vila Olímpia, no coração financeiro de SP. Studios de alto padrão com altíssima procura por aluguel corporativo e temporada (short-stay).
          </p>

          <div className="pt-2 w-full sm:w-auto flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 12px rgba(196, 164, 125, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('lead-form-box')}
              className="w-full sm:w-auto px-8 py-3 bg-accent hover:bg-accent-hover text-forest-dark font-extrabold tracking-wider text-xs uppercase cursor-pointer rounded-sm shadow-xl flex items-center justify-center gap-2 font-montserrat transition-all"
            >
              Falar com nossos corretores <ArrowRight size={14} />
            </motion.button>
            
            {/* Scroll down indicator linking to action */}
            <button 
              onClick={() => scrollToSection('tour-section')}
              className="group text-[11px] font-medium text-accent hover:text-white uppercase tracking-widest font-montserrat flex flex-col items-center gap-1 transition-colors mt-2 cursor-pointer"
            >
              <span>Explore o Tour Virtual 360° Abaixo</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronDown size={14} className="text-accent group-hover:text-white" />
              </motion.div>
            </button>
          </div>

        </div>

        {/* Middle Section: Integrated Tour 360° */}
        <div id="tour-section" className="w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="w-full h-full bg-forest-dark/95 backdrop-blur-md border-2 border-accent/20 hover:border-accent/40 rounded-lg shadow-2xl relative overflow-hidden transition-all"
          >
            {/* Top gold details */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-hover to-accent z-20" />
            
            <iframe 
              src="https://tour.fotoestudio360.com.br/KzUniko/" 
              className="w-full h-full border-none relative z-10" 
              title="Tour Virtual 360° Uniko" 
              allowFullScreen
            />
          </motion.div>
        </div>

        {/* Bottom Section: Form to Contact Broker */}
        <div id="lead-form-box" className="w-full max-w-2xl bg-forest-dark/95 backdrop-blur-md border border-accent/20 p-5 md:p-6 rounded-md shadow-xl text-left relative z-20 mt-4 mx-4">
          <h3 className="text-xs sm:text-sm font-bold text-white mb-4 font-montserrat uppercase tracking-wider text-center border-b border-accent/10 pb-3">
            Preencha para faturar condições exclusivas e falar com um corretor:
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input Name */}
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-montserrat">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Anderson Abreu"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  disabled={loading}
                  className={`w-full px-3 py-2 text-xs bg-forest-light/20 border rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
                    errors.name ? 'border-accent' : 'border-forest-light/40 focus:border-accent'
                  }`}
                />
                {errors.name && (
                  <p className="text-[10px] text-accent flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle size={10} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Input Phone */}
              <div className="space-y-1">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-montserrat">
                  WhatsApp com DDD
                </label>
                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => {
                    handlePhoneChange(e);
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  disabled={loading}
                  className={`w-full px-3 py-2 text-xs bg-forest-light/20 border rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
                    errors.phone ? 'border-accent' : 'border-forest-light/40 focus:border-accent'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[10px] text-accent flex items-center gap-1 mt-1 font-medium">
                    <AlertCircle size={10} /> {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-1">
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 font-montserrat">
                E-mail do Investidor
              </label>
              <input
                type="email"
                placeholder="seuemail@empresa.com.br"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                disabled={loading}
                className={`w-full px-3 py-2 text-xs bg-forest-light/20 border rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
                  errors.email ? 'border-accent' : 'border-forest-light/40 focus:border-accent'
                }`}
              />
              {errors.email && (
                <p className="text-[10px] text-accent flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle size={10} /> {errors.email}
                </p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.01, boxShadow: '0 0 12px rgba(196, 164, 125, 0.3)' }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-forest-dark font-extrabold uppercase tracking-wider text-[11px] rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all transition-colors shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin text-forest-dark shrink-0" />
                  <span>Enviando ao Consultor...</span>
                </>
              ) : (
                <>
                  <span>Garantir Condições e Falar com Corretores</span>
                  <ArrowRight size={14} className="shrink-0" />
                </>
              )}
            </motion.button>
          </form>
        </div>

      </div>
    </section>
  );
}
