import React from 'react';
import { Lock, ShieldCheck, Key, FileJson, EyeOff, CheckCircle } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="glass-badge">
          <Lock className="w-3.5 h-3.5 text-white" />
          <span>Tizim Xavfsizligi va Maxfiylik (amatora.uz)</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">Xavfsizlik Standartlari hamda Ma'lumotlar Himoyasi</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          AMATORA platformasida foydalanuvchilar va o'yinchilarning shaxsiy ma'lumotlari Zero-Trust va shifrlash protokollari bilan himoyalangan.
        </p>
      </div>

      {/* Security Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        
        <div className="glass-card p-6 space-y-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <Key className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">Supabase RLS Shifrlash</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ma'lumotlar bazasidagi har bir satr Row-Level Security (RLS) siyosati bilan yopilgan. Har bir tashkilot va admin faqat o'ziga tegishli ma'lumotlarga ruxsat oladi.
          </p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">SSL / TLS 1.3 Shifrlangan Kanal</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            amatora.uz domeni va ilova o'rtasidagi barcha HTTP so'rovlari 256-bitli TLS shifrlash kanallari orqali uzatiladi. Uchinchi shaxslar ma'lumotni tutib qola olmaydi.
          </p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
            <EyeOff className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-heading font-bold text-lg text-white">Pasport va Suratlar Himoyasi</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            O'yinchilarning pasport seriyalari hamda shaxsiy ma'lumotlari faqat vakolatli ligalar adminlari uchun ochiq va doimiy audit jurnalida qayd etiladi.
          </p>
        </div>

      </div>

      {/* JSON Specification Container for amatora.uz */}
      <div className="glass-card p-6 sm:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <FileJson className="w-6 h-6 text-white" />
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-white">Rasmiy Domen JSON Xavfsizlik Deklaratsiyasi</h3>
            <p className="text-xs text-slate-400">Target Domain: amatora.uz</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
          <pre>{`{
  "domain": "amatora.uz",
  "security_protocol": "HTTPS / TLS 1.3",
  "data_integrity": "Strict Row-Level Security (RLS)",
  "api_isolation": "Static Web Client & Isolated Backend",
  "manifest_url": "https://amatora.uz/manifest.json",
  "certification": "ISO/IEC 27001 Standard Compliance",
  "status": "SECURE_ACTIVE"
}`}</pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white shrink-0" />
            <span>Tizimda hech qanday uchinchi tomon reklama trekerlari yo'q</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-white shrink-0" />
            <span>Xavfsiz kesh va tezkor statik kontent</span>
          </div>
        </div>

      </div>

    </div>
  );
};
