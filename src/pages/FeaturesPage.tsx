import React, { useState } from 'react';
import { Layers, Trophy, Users, BarChart2, ImageIcon, Zap, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FeaturesPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'tournaments' | 'matches' | 'graphics'>('all');

  const features = [
    {
      id: 1,
      category: 'tournaments',
      title: t('features.f1.title'),
      description: t('features.f1.desc'),
      icon: Trophy,
      specs: [t('features.f1.s1'), t('features.f1.s2'), t('features.f1.s3')]
    },
    {
      id: 2,
      category: 'matches',
      title: t('features.f2.title'),
      description: t('features.f2.desc'),
      icon: Zap,
      specs: [t('features.f2.s1'), t('features.f2.s2'), t('features.f2.s3')]
    },
    {
      id: 3,
      category: 'graphics',
      title: t('features.f3.title'),
      description: t('features.f3.desc'),
      icon: ImageIcon,
      specs: [t('features.f3.s1'), t('features.f3.s2'), t('features.f3.s3')]
    },
    {
      id: 4,
      category: 'tournaments',
      title: t('features.f4.title'),
      description: t('features.f4.desc'),
      icon: Users,
      specs: [t('features.f4.s1'), t('features.f4.s2'), t('features.f4.s3')]
    },
    {
      id: 5,
      category: 'matches',
      title: t('features.f5.title'),
      description: t('features.f5.desc'),
      icon: Award,
      specs: [t('features.f5.s1'), t('features.f5.s2'), t('features.f5.s3')]
    },
    {
      id: 6,
      category: 'graphics',
      title: t('features.f6.title'),
      description: t('features.f6.desc'),
      icon: BarChart2,
      specs: [t('features.f6.s1'), t('features.f6.s2'), t('features.f6.s3')]
    }
  ];

  const filtered = features.filter(f => activeCategory === 'all' || f.category === activeCategory);

  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Layers className="w-3.5 h-3.5 text-white" />
          <span>{t('features.badge')}</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">{t('features.title')}</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {t('features.desc')}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto bg-white/[0.04] border border-white/10 p-1.5 rounded-2xl">
        {[
          { id: 'all', label: t('features.tab.all') },
          { id: 'tournaments', label: t('features.tab.tournaments') },
          { id: 'matches', label: t('features.tab.matches') },
          { id: 'graphics', label: t('features.tab.graphics') },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === tab.id
                ? 'bg-white text-black font-extrabold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="glass-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="font-heading font-bold text-lg text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1.5">
                {item.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
