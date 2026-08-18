import React from 'react';
import { Lock, ShieldCheck, Key, FileJson, CheckCircle, Mail, FileText } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Lock className="w-3.5 h-3.5 text-white" />
          <span>Tizim Xavfsizligi va Maxfiylik</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
          Xavfsizlik Standartlari va Ma'lumotlar Himoyasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          AMATORA platformasida foydalanuvchilar, jamoalar va turnir tashkilotchilarining ma'lumotlari zamonaviy xavfsizlik standartlari hamda qat'iy ruxsat nazorati orqali himoyalanadi.
        </p>
      </div>

      {/* Security Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        
        {/* Pillar 1: Access Control */}
        <div className="glass-card p-6 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Key className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">Rolli Kirish Nazorati (RBAC)</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ma'lumotlar bazasi Row-Level Security (RLS) va rolli ruxsat tizimi bilan himoyalangan. Tashkilotchilar va adminlar faqat o'zlariga tegishli liga hamda o'yin ma'lumotlarini boshqara oladilar.
          </p>
        </div>

        {/* Pillar 2: HTTPS / Encrypted Traffic */}
        <div className="glass-card p-6 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">Shifrlangan Aloqa (HTTPS)</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Platforma bilan mijoz dasturlari (Veb, Mobil, Desktop) o'rtasidagi barcha tarmoq so'rovlari va API ulanishlari zamonaviy HTTPS shifrlangan protokollari orqali xavfsiz uzatiladi.
          </p>
        </div>

        {/* Pillar 3: Data Privacy */}
        <div className="glass-card p-6 space-y-4 border-white/20">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">Ma'lumotlar Maxfiyligi</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Foydalanuvchilar va jamoa a'zolarining ma'lumotlari faqat musobaqalarni o'tkazish va rasmiy ro'yxatga olish maqsadlarida foydalaniladi hamda uchinchi tomonlarga sotilmaydi.
          </p>
        </div>

      </div>

      {/* Technical Overview & Contact */}
      <div className="glass-card p-6 sm:p-8 max-w-5xl mx-auto space-y-6 border-white/20">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <FileJson className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white">Platforma Xavfsizlik Konfiguratsiyasi</h3>
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
            <span>Foydalanuvchi ma'lumotlari tijoriy reklama tarmoqlariga berilmaydi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white shrink-0" />
            <span>Xavfsiz kesh va avtomatik zaxiralash tizimi</span>
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
            <span>Maxfiylik Siyosati (Privacy Policy)</span>
          </a>

          <a
            href="mailto:security@amatora.uz"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Xavfsizlik bo'yicha aloqa: security@amatora.uz</span>
          </a>
        </div>

      </div>

    </div>
  );
};

