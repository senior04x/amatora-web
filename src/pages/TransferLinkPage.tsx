import { ArrowLeftRight, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { transferNativeUrl } from '../utils/transferLink';

const copy = {
  uz: { title: 'Transfer arizasi', description: 'Ariza holatini ko‘rish va qaror berish uchun AMATORA ilovasida o‘z hisobingizga kiring.', open: 'Ilovada ochish', download: 'Ilovani yuklab olish', hint: 'Ilova ochilmasa, uni o‘rnating yoki yangilang va shu havolaga qayting.' },
  ru: { title: 'Заявка на трансфер', description: 'Войдите в свой аккаунт в приложении AMATORA, чтобы посмотреть статус заявки и принять решение.', open: 'Открыть в приложении', download: 'Скачать приложение', hint: 'Если приложение не открывается, установите или обновите его и вернитесь к этой ссылке.' },
  en: { title: 'Transfer request', description: 'Sign in to your account in the AMATORA app to view the request and make your decision.', open: 'Open in app', download: 'Download the app', hint: 'If the app does not open, install or update it and return to this link.' },
};

export function TransferLinkPage({ transferId }: { transferId: string }) {
  const { language } = useLanguage();
  const text = copy[language];
  const url = transferNativeUrl(transferId);
  if (!url) return null;
  return <section className="mx-auto max-w-lg px-4 py-12 sm:py-20">
    <div className="rounded-2xl border border-white/15 bg-[#141414] p-6 sm:p-8 text-center space-y-6">
      <ArrowLeftRight aria-hidden="true" className="mx-auto h-10 w-10 text-[#E85002]" />
      <h1 className="font-heading text-2xl font-bold text-white">{text.title}</h1>
      <p className="text-sm leading-relaxed text-slate-300">{text.description}</p>
      <a href={url} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E85002] px-4 py-3 font-bold text-white hover:bg-[#B83D00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        <Smartphone aria-hidden="true" size={20} />{text.open}
      </a>
      <a href="/apps" className="block rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10">{text.download}</a>
      <p className="text-xs leading-relaxed text-slate-400">{text.hint}</p>
    </div>
  </section>;
}
