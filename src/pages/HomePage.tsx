import React from 'react';
import { Shield, Smartphone, Trophy, Users, Zap, CheckCircle2, ArrowRight, Download, BarChart3, Image as ImageIcon, Lock } from 'lucide-react';

interface HomePageProps {
  onOpenDownload: () => void;
  setActiveTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDownload, setActiveTab }) => {
  return (
    <div className="space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-8 text-center space-y-8">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 glass-badge py-1.5 px-4">
          <Shield className="w-4 h-4 text-white" />
          <span>Professional Havaskor Futbol Ekotizimi (amatora.uz)</span>
        </div>

        {/* Main Monochromatic Headline */}
        <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Futbol Ligalari va Turnirlarini <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">Aqlli Boshqarish</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          O'yinlar jadvali, to'purarlar reytingi, arizalar, transferlar va match grafikalarini avtomatlashtirilgan real-vaqt rejimida boshqaring.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenDownload}
            className="glass-button glass-button-primary w-full sm:w-auto py-3.5 px-8 text-base"
          >
            <Download className="w-5 h-5 text-black" />
            <span>Ilovani Yuklab Olish</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className="glass-button w-full sm:w-auto py-3.5 px-8 text-base"
          >
            <span>Imkoniyatlar Bilan Tanishish</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Live System Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-12">
          
          <div className="glass-card p-6 text-center space-y-2">
            <Trophy className="w-6 h-6 text-white mx-auto opacity-80" />
            <div className="font-heading font-black text-2xl lg:text-3xl text-white">100+</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aktiv Ligalar</div>
          </div>

          <div className="glass-card p-6 text-center space-y-2">
            <Users className="w-6 h-6 text-white mx-auto opacity-80" />
            <div className="font-heading font-black text-2xl lg:text-3xl text-white">5,000+</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ro'yxatdan O'tgan O'yinchilar</div>
          </div>

          <div className="glass-card p-6 text-center space-y-2">
            <Zap className="w-6 h-6 text-white mx-auto opacity-80" />
            <div className="font-heading font-black text-2xl lg:text-3xl text-white">0.1s</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Real-Vaqt Sinxronizatsiyasi</div>
          </div>

          <div className="glass-card p-6 text-center space-y-2">
            <Lock className="w-6 h-6 text-white mx-auto opacity-80" />
            <div className="font-heading font-black text-2xl lg:text-3xl text-white">100%</div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Xavfsizlik (amatora.uz)</div>
          </div>

        </div>

      </section>

      {/* 2. ECOSYSTEM SHOWCASE CARDS */}
      <section className="space-y-12">
        
        <div className="text-center space-y-3">
          <div className="glass-badge">Tizim Imkoniyatlari</div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">AMATORA Platformasi Nimalarni Taqdim Etadi?</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Barcha tashkiliy jarayonlar bitta monolit glassmorphism ilovada jamlangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="glass-card p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Avtomatik Turnir Jadvali</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                O'yin natijalari kiritilishi bilan ochkolar, gollar nisbati hamda to'purarlar va assistentlar jadvali avtomatik ravishda hisoblab chiqiladi.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Ochkolarni real-vaqtda qayta ishlash</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Diskvalifikatsiya va sariq kartochkalar nazorati</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">1080x1080 Match Grafika Ekspor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turnir jadvali, o'yin natijalari va to'purarlar ro'yxatini ijtimoiy tarmoqlar uchun 1:1 formatdagi professional PNG fotosuratlarga 1 soniyada eksport qiling.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Avtomatik brending va homiylar logotiplari</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>PDF va PNG formatlarida yuklab olish</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Arizalar va Transferlar Control</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Komandalar tarkibi, o'yinchilar pasport ma'lumotlari hamda tahrirlash va transfer arizalarini bir bosishda tasdiqlang yoki rad eting.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Pasport va fotosurat verifikatsiyasi</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Transfer oynasini bir zumda boshqarish</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 3. CTA GLASS BANNER */}
      <section className="glass-card p-10 lg:p-14 text-center space-y-6 relative overflow-hidden">
        <div className="space-y-3 relative z-10 max-w-2xl mx-auto">
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">Ligangizni AMATORA Bilan Raqamlashtiring</h2>
          <p className="text-sm text-slate-400">
            AMATORA Admin ilovasini yuklab oling va turnirlarni professional darajada boshqarishni boshlang.
          </p>
        </div>
        <div className="pt-2 relative z-10">
          <button
            onClick={onOpenDownload}
            className="glass-button glass-button-primary py-4 px-10 text-base"
          >
            <Download className="w-5 h-5 text-black" />
            <span>Mobil Ilovani Yuklab Olish (amatora.uz)</span>
          </button>
        </div>
      </section>

    </div>
  );
};
