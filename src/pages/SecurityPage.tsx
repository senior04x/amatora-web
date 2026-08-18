import React from 'react';
import { Lock, ShieldCheck, Key, FileJson, CheckCircle, Phone, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SecurityPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Lock className="w-3.5 h-3.5 text-white" />
          <span>{t('security.badge')}</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
          {t('security.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {t('security.desc')}
        </p>
      </div>

      {/* Security Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        
        {/* Pillar 1: Access Control */}
        <div className="glass-card p-6 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Key className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">{t('security.p1.title')}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('security.p1.desc')}
          </p>
        </div>

        {/* Pillar 2: HTTPS / Encrypted Traffic */}
        <div className="glass-card p-6 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">{t('security.p2.title')}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('security.p2.desc')}
          </p>
        </div>

        {/* Pillar 3: Data Privacy */}
        <div className="glass-card p-6 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">{t('security.p3.title')}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('security.p3.desc')}
          </p>
        </div>

      </div>

      {/* Technical Overview & Contact */}
      <div className="glass-card p-6 sm:p-8 max-w-5xl mx-auto space-y-6 border-white/20">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <FileJson className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white">{t('security.tech.title')}</h3>
            <p className="text-xs text-slate-400">Domen: amatora.uz</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
          <pre>{`{
  "domain": "amatora.uz",
  "security_protocol": "HTTPS / TLS",
  "access_control": "Row-Level Security (RLS) & Role-Based Access",
  "api_architecture": "Authenticated REST API & WebSocket",
  "data_protection": "Encrypted Transit & Isolated Backend",
  "status": "ACTIVE_PROTECTED"
}`}</pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white shrink-0" />
            <span>{t('security.check1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white shrink-0" />
            <span>{t('security.check2')}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <a
            href="/privacy-policy.html"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>{t('security.privacy')}</span>
          </a>

          <a
            href="tel:+998933786886"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>{t('security.contact')}</span>
          </a>
        </div>

      </div>

    </div>
  );
};

