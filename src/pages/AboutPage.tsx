import React from 'react';
import { Info, Shield, Server, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Info className="w-3.5 h-3.5 text-white" />
          <span>{t('about.badge')}</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
          {t('about.title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {t('about.desc')}
        </p>
      </div>

      {/* Mission & Infrastructure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        
        <div className="glass-card p-6 sm:p-8 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-xl text-white">{t('about.mission.title')}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('about.mission.desc')}
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Server className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-xl text-white">{t('about.infra.title')}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t('about.infra.desc')}
          </p>
        </div>

      </div>

      {/* System Technical Specs Box */}
      <div className="glass-card p-6 sm:p-8 max-w-5xl mx-auto space-y-6 border-white/20">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Terminal className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white">{t('about.stack.title')}</h3>
            <p className="text-xs text-slate-400">{t('about.stack.sub')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Web</div>
            <div className="text-xs text-slate-400">React, TypeScript, Vite</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Mobile</div>
            <div className="text-xs text-slate-400">React Native, Expo</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Desktop</div>
            <div className="text-xs text-slate-400">Windows .NET, WPF, OBS WebSocket</div>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Backend</div>
            <div className="text-xs text-slate-400">Supabase, PostgreSQL, RLS</div>
          </div>

        </div>
      </div>

    </div>
  );
};
