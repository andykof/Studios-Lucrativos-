/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';
import { motion } from 'motion/react';
import { Shield, Sparkles, AlertCircle, ArrowRight, Loader2, Sparkle, Calendar, Phone } from 'lucide-react';

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
      {/* Background Graphic representing premium urban and architecture focus */}
      <div className="absolute top-0 left-0 w-full h-[75vh] md:h-full z-0">
        <picture>
          <source media="(max-width: 640px)" srcSet="https://drive.google.com/thumbnail?id=1X6EvakplOf_jL_tWJfyhNll-5SFlE9dy&sz=w800" />
          <source media="(max-width: 1024px)" srcSet="https://drive.google.com/thumbnail?id=1X6EvakplOf_jL_tWJfyhNll-5SFlE9dy&sz=w1600" />
          <img
            src="https://drive.google.com/thumbnail?id=1X6EvakplOf_jL_tWJfyhNll-5SFlE9dy&sz=w2500"
            alt="Studios Lucrativos Sao Paulo"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-contain object-top md:object-center"
          />
        </picture>
        {/* Custom balanced dark masking: solid transparent layer + subtle direction gradients */}
        <div className="absolute inset-0 bg-forest-dark/40 md:bg-forest-dark/10" />
        
        {/* Desktop Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/95 via-forest-dark/50 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-forest-dark/80 hidden md:block" />
        
        {/* Mobile Gradients for smooth transition into the tall content area */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/50 to-transparent md:hidden" />
      </div>

      {/* Dynamic Gold Light Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-accent/10 md:bg-accent/5 blur-3xl rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center pt-8 md:pt-12">
        
        {/* Left Specification Column + Monumental Headings */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full space-y-8 md:space-y-12">
          
          {/* Central Title and SEO Optimized heading */}
          <div className="space-y-4 text-left pt-12 md:pt-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent/10 border border-accent/30 text-accent text-[9px] md:text-[10px] font-black uppercase tracking-widest py-1.5 px-3 md:px-4 rounded-full font-montserrat flex items-center gap-1.5 shadow-sm">
                <Shield size={12} className="shrink-0" /> Canal Oficial de Vendas
              </span>
            </div>
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight font-serif leading-[1.1] md:leading-[1.15]">
              Desvende o Segredo dos Investidores de Sucesso: <br className="hidden md:block" />
              <span className="font-extrabold font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-accent">
                Studios de Alto Padrão
              </span> com Rentabilidade Garantida em SP.
            </h1>
            <p className="text-slate-300 text-[15px] sm:text-sm md:text-base max-w-xl leading-relaxed font-sans font-light pt-2">
              Somos a <strong className="text-white font-bold">parceria oficial de vendas</strong> Kallas. Fale com nossa <strong className="text-accent font-bold">consultoria especializada</strong> e garanta acesso a <strong className="text-white font-bold">condições exclusivas de lançamento</strong>. Maximize seu patrimônio com o portfólio restrito UNIKO e VERUS.
            </p>
          </div>
          
          {/* Header specification grid focusing on critical ICP metrics */}
          <div className="space-y-4 md:space-y-5 font-sans text-left max-w-2xl">
            {/* UNIKO Block */}
            <div className="flex flex-col space-y-2.5 bg-forest-dark/60 backdrop-blur-sm p-5 md:p-6 rounded-md border border-accent/20 md:border-forest-light/40 shadow-sm transition-all hover:border-accent/50">
              <h3 className="text-base sm:text-lg md:text-xl font-black font-montserrat tracking-tight text-accent leading-snug">
                UNIKO Vila Olímpia: A Estratégia Faria Lima para seu Patrimônio.
              </h3>
              <p className="text-[13px] md:text-sm text-slate-300 font-light leading-relaxed">
                <span className="font-bold text-white">A partir de R$ 275k.</span> Posicione seu capital no coração financeiro de São Paulo. Demanda corporativa ininterrupta garante seu financiamento e rentabilidade superior em short stay. Um ativo Kallas com retorno comprovado.
              </p>
              <button 
                onClick={() => scrollToSection('plantas')} 
                className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-accent hover:text-white uppercase tracking-widest font-montserrat transition-colors pt-1"
              >
                Conheça o UNIKO <ArrowRight size={14} />
              </button>
            </div>
            
            {/* VERUS Block */}
            <div className="flex flex-col space-y-2.5 bg-forest-dark/60 backdrop-blur-sm p-5 md:p-6 rounded-md border border-slate-300/20 md:border-forest-light/40 shadow-sm transition-all hover:border-slate-300/50">
              <h3 className="text-base sm:text-lg md:text-xl font-black font-montserrat tracking-tight text-white leading-snug">
                VERUS Mackenzie: A Distorção de Mercado em Higienópolis.
              </h3>
              <p className="text-[13px] md:text-sm text-slate-300 font-light leading-relaxed">
                <span className="font-bold text-accent">R$ 13.900 o m².</span> Invista em uma localização com vacância histórica zero, impulsionada pelo polo universitário e de saúde. A segurança e valorização que só um empreendimento Kallas pode oferecer.
              </p>
              <button 
                onClick={() => scrollToSection('plantas')} 
                className="inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold text-slate-200 hover:text-accent uppercase tracking-widest font-montserrat transition-colors pt-1"
              >
                Explore o VERUS <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="flex text-left pt-2 md:pt-4">
            <button
              onClick={() => scrollToSection('form-contato')}
              className="w-full md:w-auto px-8 py-4 sm:py-3.5 bg-accent hover:bg-accent-hover text-forest-dark text-xs sm:text-sm font-extrabold font-montserrat uppercase tracking-wider transition-all cursor-pointer rounded-sm shadow-xl"
            >
              Descubra seu Próximo Investimento Lucrativo
            </button>
          </div>
        </div>

        {/* Right Conversion Lead Form - Gold Glassmorphism design suitable for high net worth buyers */}
        <div id="form-contato" className="lg:col-span-5 relative mt-8 lg:mt-0 pb-12 md:pb-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full bg-forest-dark/95 backdrop-blur-md border border-accent/40 md:border-accent/30 p-6 md:p-8 rounded-lg shadow-2xl relative overflow-hidden text-white mx-auto sm:max-w-md lg:max-w-none"
          >
            {/* Top gold line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 md:h-1 bg-gradient-to-r from-accent via-accent-hover to-accent" />

            {/* Form Header */}
            <div className="mb-6 md:mb-6 space-y-3 md:space-y-3 text-center md:text-left">
              <h2 className="text-xl md:text-[22px] font-bold font-serif text-white tracking-wide leading-tight">
                Preencha para Acessar Informações Exclusivas: Plantas, Análise de Payback e Condições Especiais de Lançamento.
              </h2>
              <span className="inline-block text-[10px] md:text-[11px] bg-red-500/20 text-red-100 px-3 py-1.5 md:py-1.5 rounded-sm uppercase tracking-wider font-extrabold font-montserrat shadow-sm border border-red-500/30">
                Lote Restrito • Últimas Unidades Disponíveis. Garanta sua Prioridade.
              </span>
            </div>

            {/* Entry Form */}
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-4">
              
              {/* Contact preference */}
              <div className="space-y-2 md:space-y-1.5 text-left">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-accent font-montserrat">
                  Preferencia de Envio das Tabelas:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'phone', label: 'Ligação' },
                    { id: 'email', label: 'E-mail' }
                  ].map((pref) => (
                    <button
                      key={pref.id}
                      type="button"
                      onClick={() => setContactPreference(pref.id)}
                      className={`py-3 md:py-2 px-1 text-center text-xs font-bold rounded-sm border transition-all cursor-pointer ${
                        contactPreference === pref.id
                          ? 'bg-accent/20 border-accent text-accent font-extrabold shadow-sm'
                          : 'bg-forest-light/10 md:bg-transparent border-forest-light/40 text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {pref.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Name */}
              <div className="space-y-1.5 md:space-y-1 text-left">
                <label className="block text-[11px] md:text-[10px] font-semibold uppercase tracking-wider text-slate-300 md:text-slate-400 font-montserrat">
                  Seu Nome Completo
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
                  className={`w-full px-4 py-3.5 md:py-2.5 text-sm md:text-sm bg-forest-light/30 md:bg-forest-light/20 border rounded-sm text-white focus:outline-none focus:bg-forest-light/40 md:focus:bg-forest-light/35 focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-400 md:placeholder:text-slate-500 ${
                    errors.name ? 'border-accent' : 'border-forest-light/40 focus:border-accent'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-accent flex items-center gap-1.5 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Input Email */}
              <div className="space-y-1.5 md:space-y-1 text-left">
                <label className="block text-[11px] md:text-[10px] font-semibold uppercase tracking-wider text-slate-300 md:text-slate-400 font-montserrat">
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
                  className={`w-full px-4 py-3.5 md:py-2.5 text-sm md:text-sm bg-forest-light/30 md:bg-forest-light/20 border rounded-sm text-white focus:outline-none focus:bg-forest-light/40 md:focus:bg-forest-light/35 focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-400 md:placeholder:text-slate-500 ${
                    errors.email ? 'border-accent' : 'border-forest-light/40 focus:border-accent'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-accent flex items-center gap-1.5 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Input Phone */}
              <div className="space-y-1.5 md:space-y-1 text-left">
                <label className="block text-[11px] md:text-[10px] font-semibold uppercase tracking-wider text-slate-300 md:text-slate-400 font-montserrat">
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
                  className={`w-full px-4 py-3.5 md:py-2.5 text-sm md:text-sm bg-forest-light/30 md:bg-forest-light/20 border rounded-sm text-white focus:outline-none focus:bg-forest-light/40 md:focus:bg-forest-light/35 focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-400 md:placeholder:text-slate-500 ${
                    errors.phone ? 'border-accent' : 'border-forest-light/40 focus:border-accent'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-accent flex items-center gap-1.5 mt-1 font-medium">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Planta filter selection as Radio Buttons */}
              <div className="space-y-2.5 md:space-y-2 text-left pt-2 pb-2">
                <label className="block text-[11px] md:text-[10px] font-semibold uppercase tracking-wider text-slate-300 md:text-slate-400 font-montserrat mb-1">
                  Ativo de Maior Interesse:
                </label>
                <div className="space-y-2">
                  {[
                    { val: 'uniko', title: 'UNIKO Vila Olímpia' },
                    { val: 'verus', title: 'VERUS Mackenzie' },
                    { val: 'ambos', title: 'Ambos os Projetos' }
                  ].map((option) => (
                    <label key={option.val} className={`flex items-center gap-3 p-3 text-sm md:text-sm font-medium rounded-sm border cursor-pointer transition-all ${interest === option.val ? 'bg-forest-light/60 border-accent text-white shadow-sm' : 'bg-forest-light/20 border-forest-light/40 text-slate-300 hover:border-slate-400 hover:bg-forest-light/30'}`}>
                      <input 
                        type="radio" 
                        name="propertyInterest"
                        value={option.val}
                        checked={interest === option.val}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-4 h-4 accent-accent shrink-0" 
                      />
                      <span>{option.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit button with golden glowing effect */}
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: '0 0 15px rgba(196, 164, 125, 0.4)' }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 md:py-3.5 px-6 mt-4 md:mt-2 bg-accent hover:bg-accent-hover text-forest-dark font-extrabold uppercase tracking-wider text-xs md:text-xs rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all transition-colors shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-forest-dark shrink-0" />
                    <span>Enviando ao Consultor...</span>
                  </>
                ) : (
                  <>
                    <span>QUERO RECEBER O MEMORIAL DESCRITIVO</span>
                    <ArrowRight size={16} className="shrink-0" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-5 md:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-[10px] md:text-[10px] text-slate-400 font-light text-center">
              <Shield size={13} className="text-accent shrink-0" />
              <span>Seus dados confidenciais sob proteção total (LGPD).</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
