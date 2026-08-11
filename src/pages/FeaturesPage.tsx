import React, { useState } from 'react';
import { Layers, Trophy, Users, BarChart2, ImageIcon, Zap, Award } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tournaments' | 'matches' | 'graphics'>('all');

  const features = [
    {
      id: 1,
      category: 'tournaments',
      title: 'Avtomatlashtirilgan Liga va Tur Boshqaruvi',
      description: 'Har bir liga uchun tur o\'yinlarini taqsimlash, o\'yin kunlari hamda stadionlarni belgilash moduli.',
      icon: Trophy,
      specs: ['Chortakiy va davriy sistema', 'Klublar statistikasi', 'Ochkolarni hisoblash mantig\'i']
    },
    {
      id: 2,
      category: 'matches',
      title: 'Real-Vaqt Live Match Taymeri',
      description: 'Match hakamlari uchun taymer, taymlarni almashtirish, daqiqa va uzaytirilgan daqiqalarni kiritish.',
      icon: Zap,
      specs: ['1-Taym / 2-Taym taymerlari', 'Sariq/Qizil kartochkalar', 'Gol mualliflari hamda assistlar']
    },
    {
      id: 3,
      category: 'graphics',
      title: '1:1 PNG Graphic Canvas Export Engine',
      description: 'Turnir jadvali, to\'purarlar hamda o\'yinlar jadvalini 1080x1080 o\'lchamdagi professional tayyor rasmlarga eksport qilish.',
      icon: ImageIcon,
      specs: ['Futbol shablonlari', 'Homiylar logotiplari', 'Bir zumda yuklab olish']
    },
    {
      id: 4,
      category: 'tournaments',
      title: 'O\'yinchilar va Arizalar Verifikatsiyasi',
      description: 'O\'yinchi suratlari, pasport seriyasi, otasining ismi hamda jamoaga biriktirish arizalarini ko\'rib chiqish.',
      icon: Users,
      specs: ['Fotosurat qirqish va ko\'rish', 'Transfer oynalari', 'Birxillikni aniqlash']
    },
    {
      id: 5,
      category: 'matches',
      title: 'Homiylar Boshqaruvi va Liga Shabloni',
      description: 'Tashkilotning bosh homiysi va ikkinchi darajali homiylarini har bir liga grafikasiga integratsiya qilish.',
      icon: Award,
      specs: ['Bosh Homiy oltin belgisi', 'Homiylar strip paneli', 'Liga bo\'yicha yoqish/o\'chirish']
    },
    {
      id: 6,
      category: 'graphics',
      title: 'PDF Hisobotlar va Eksport Hujjatlari',
      description: 'Barcha o\'yinlar natijalari hamda to\'purarlar jadvalini rasmiy chop etish uchun PDF fayllarga o\'tkazish.',
      icon: BarChart2,
      specs: ['Rasmiy pechat bloki', 'Chop etish formati', 'Ekotizim raqamli kaliti (amatora.uz)']
    }
  ];

  const filtered = features.filter(f => activeCategory === 'all' || f.category === activeCategory);

  return (
    <div className="space-y-16 py-6">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Layers className="w-3.5 h-3.5 text-white" />
          <span>Platforma Imkoniyatlari Katalogi</span>
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-white">Turnirlarni Boshqarishning Har Bir Tizim Moduli</h1>
        <p className="text-sm sm:text-base text-slate-400">
          AMATORA platformasida har bir funksiya tezkor va aniq ishlash uchun modulli arxitektura asosida tayyorlangan.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto bg-white/[0.03] border border-white/10 p-1.5 rounded-2xl">
        {[
          { id: 'all', label: 'Barcha Modullar' },
          { id: 'tournaments', label: 'Turnirlar va O\'yinchilar' },
          { id: 'matches', label: 'Match Boshqaruvi' },
          { id: 'graphics', label: 'Grafika Eksport' },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filtered.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="glass-card p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="font-heading font-bold text-xl text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                {item.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
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
