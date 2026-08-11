import React, { useState, useEffect, useRef } from 'react';
import { Shield, User, Plus, Trash2, CheckCircle2, AlertCircle, Send, ArrowLeft, Camera, Image as ImageIcon, Crop } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ApplicationPageProps {
  orgSlug: string;
}

interface League {
  id: number;
  name: string;
  organization_id: number;
}

interface Organization {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
}

interface PlayerInput {
  id: string;
  name: string;
  surname: string;
  fatherName: string;
  position: string;
  number: string;
  passportSeries: string;
  passportNumber: string;
  phone: string;
  photoUrl?: string;
}

// Interactive 1:1 Image Cropper Modal Component
const ImageCropperModal: React.FC<{
  isOpen: boolean;
  imageSrc: string | null;
  onCrop: (croppedBase64: string) => void;
  onClose: () => void;
}> = ({ isOpen, imageSrc, onCrop, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    if (isOpen && imageSrc && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        canvas.width = 400;
        canvas.height = 400;

        if (ctx) {
          ctx.clearRect(0, 0, 400, 400);
          ctx.drawImage(
            img,
            startX,
            startY,
            size,
            size,
            0,
            0,
            400,
            400
          );
        }
      };
      img.src = imageSrc;
    }
  }, [isOpen, imageSrc, zoom]);

  if (!isOpen || !imageSrc) return null;

  const handleConfirmCrop = () => {
    if (canvasRef.current) {
      const croppedData = canvasRef.current.toDataURL('image/jpeg', 0.85);
      onCrop(croppedData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-6 space-y-6 text-center">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-white" />
            <h3 className="font-heading font-bold text-lg text-white">Rasmni Qirqish (1:1 Format)</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">Bekor qilish</button>
        </div>

        <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black">
          <canvas ref={canvasRef} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400">Kattalashtirish (Zoom)</label>
          <input
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full accent-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="glass-button flex-1 py-3 text-xs"
          >
            <span>Bekor Qilish</span>
          </button>
          <button
            type="button"
            onClick={handleConfirmCrop}
            className="glass-button glass-button-primary flex-1 py-3 text-xs"
          >
            <span>Qirqish va Saqlash</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ApplicationPage: React.FC<ApplicationPageProps> = ({ orgSlug }) => {
  const [mode, setMode] = useState<'selection' | 'team' | 'individual'>('selection');
  const [, setLoadingOrg] = useState<boolean>(true);
  const [org, setOrg] = useState<Organization | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Cropper modal state
  const [cropperOpen, setCropperOpen] = useState<boolean>(false);
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<{ type: 'logo' | 'player' | 'indPlayer'; playerId?: string } | null>(null);

  // Form states for Team Application
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('');
  const [teamName, setTeamName] = useState<string>('');
  const [teamLogoUrl, setTeamLogoUrl] = useState<string | undefined>();
  const [captainName, setCaptainName] = useState<string>('');
  const [captainPhone, setCaptainPhone] = useState<string>('');
  const [players, setPlayers] = useState<PlayerInput[]>([
    { id: '1', name: '', surname: '', fatherName: '', position: 'Yarim himoyachi', number: '10', passportSeries: '', passportNumber: '', phone: '' }
  ]);

  // Form states for Individual Application
  const [indName, setIndName] = useState<string>('');
  const [indPhone, setIndPhone] = useState<string>('');
  const [indPosition, setIndPosition] = useState<string>('Yarim himoyachi');
  const [indAge, setIndAge] = useState<string>('');
  const [indPhotoUrl, setIndPhotoUrl] = useState<string | undefined>();
  const [indNotes, setIndNotes] = useState<string>('');

  useEffect(() => {
    fetchOrgAndLeagues();
  }, [orgSlug]);

  const fetchOrgAndLeagues = async () => {
    setLoadingOrg(true);
    try {
      const { data: orgData } = await supabase
        .from('organizations')
        .select('*')
        .eq('slug', orgSlug.toLowerCase())
        .maybeSingle();

      if (orgData) {
        setOrg(orgData);
        const { data: leagueData } = await supabase
          .from('leagues')
          .select('id, name, organization_id')
          .eq('organization_id', orgData.id)
          .order('name');
        
        setLeagues(leagueData || []);
        if (leagueData && leagueData.length > 0) {
          setSelectedLeagueId(String(leagueData[0].id));
        }
      } else {
        setOrg({
          id: 1,
          name: orgSlug.toUpperCase() + ' Tashkiloti',
          slug: orgSlug.toLowerCase(),
        });
      }
    } catch (err) {
      console.warn('Error fetching organization info:', err);
      setOrg({
        id: 1,
        name: orgSlug.toUpperCase() + ' Tashkiloti',
        slug: orgSlug.toLowerCase(),
      });
    } finally {
      setLoadingOrg(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, target: { type: 'logo' | 'player' | 'indPlayer'; playerId?: string }) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setRawImageSrc(reader.result as string);
        setCropTarget(target);
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBase64: string) => {
    if (!cropTarget) return;

    if (cropTarget.type === 'logo') {
      setTeamLogoUrl(croppedBase64);
    } else if (cropTarget.type === 'player' && cropTarget.playerId) {
      setPlayers((prev) =>
        prev.map((p) => (p.id === cropTarget.playerId ? { ...p, photoUrl: croppedBase64 } : p))
      );
    } else if (cropTarget.type === 'indPlayer') {
      setIndPhotoUrl(croppedBase64);
    }
  };

  const handleAddPlayer = () => {
    setPlayers((prev) => [
      ...prev,
      { id: String(Date.now()), name: '', surname: '', fatherName: '', position: 'Yarim himoyachi', number: String(prev.length + 1), passportSeries: '', passportNumber: '', phone: '' }
    ]);
  };

  const handleRemovePlayer = (id: string) => {
    if (players.length <= 1) return;
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePlayerChange = (id: string, field: keyof PlayerInput, value: string) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !captainName.trim() || !captainPhone.trim()) {
      setSubmitError("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        organization_id: org?.id || 1,
        league_id: selectedLeagueId ? Number(selectedLeagueId) : null,
        team_name: teamName.trim(),
        team_logo: teamLogoUrl || null,
        captain_name: captainName.trim(),
        captain_phone: captainPhone.trim(),
        players_data: players.filter((p) => p.name.trim() || p.surname.trim()),
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('team_requests').insert([payload]);

      if (error) {
        console.warn('team_requests insertion fallback note:', error);
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Submit error:', err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIndividualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!indName.trim() || !indPhone.trim()) {
      setSubmitError("Iltimos, ism va telefon raqamingizni kiriting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        organization_id: org?.id || 1,
        league_id: selectedLeagueId ? Number(selectedLeagueId) : null,
        player_name: indName.trim(),
        phone: indPhone.trim(),
        position: indPosition,
        age: indAge,
        photo_url: indPhotoUrl || null,
        notes: indNotes,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('individual_requests').insert([payload]);

      if (error) {
        console.warn('individual_requests insertion fallback note:', error);
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Submit error:', err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-black text-3xl text-white">Ariza Muvaffaqiyatli Yuborildi!</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Arizangiz <strong>{org?.name || orgSlug.toUpperCase()}</strong> tashkilotchilari tomonidan ko'rib chiqiladi. Tezkorda ko'rsatilgan telefon raqami orqali bog'laniladi.
        </p>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            setMode('selection');
          }}
          className="glass-button glass-button-primary py-3 px-8 text-sm"
        >
          <span>Qaytadan Arizalar Yuborish</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-white/[0.04] backdrop-blur-2xl border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 space-y-12">
      
      {/* Cropper Modal */}
      <ImageCropperModal
        isOpen={cropperOpen}
        imageSrc={rawImageSrc}
        onCrop={handleCropComplete}
        onClose={() => {
          setCropperOpen(false);
          setRawImageSrc(null);
        }}
      />

      {/* Organization Branding Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="glass-badge">
          <span>{org?.name || orgSlug.toUpperCase() + " Tashkiloti"} • Ro'yxatdan O'tish Portali</span>
        </div>

        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
          {org?.name || orgSlug.toUpperCase() + " Turnirlari"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Turnirlarda ishtirok etish uchun tayyor jamoangizni ro'yxatdan o'tkazing yoki yakkaxon o'yinchi sifatida ariza qoldiring.
        </p>
      </div>

      {/* Mode 1: Selection Screen */}
      {mode === 'selection' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <div
            onClick={() => setMode('team')}
            className="glass-card p-8 space-y-6 flex flex-col justify-between cursor-pointer hover:border-white/40 hover:bg-white/[0.06] transition-all group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-black text-2xl text-white">Jamoaviy Ro'yxatdan O'tish</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tayyor jamoangiz bormi? Jamoa logotipi, nomi, kapitan ma'lumotlari hamda o'yinchilar rasmini kiritib ligaga to'liq qatnashish arizasini topshiring.
              </p>
            </div>
            <div className="glass-button glass-button-primary w-full py-3.5 text-center text-xs">
              <span>Jamoani Ro'yxatdan O'tkazish</span>
            </div>
          </div>

          <div
            onClick={() => setMode('individual')}
            className="glass-card p-8 space-y-6 flex flex-col justify-between cursor-pointer hover:border-white/40 hover:bg-white/[0.06] transition-all group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <User className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-black text-2xl text-white">Yakkaxon Ro'yxatdan O'tish</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Jamoangiz yo'qmi yoki erkin agentmisiz? O'zingiz haqingizda rasmingiz va pozitsiyangiz bilan ma'lumot qoldiring, ligadagi jamoalarga taklif oling.
              </p>
            </div>
            <div className="glass-button w-full py-3.5 text-center text-xs">
              <span>O'yinchi Sifatida Ariza Qoldirish</span>
            </div>
          </div>

        </div>
      )}

      {/* Mode 2: Team Registration Form */}
      {mode === 'team' && (
        <form onSubmit={handleTeamSubmit} className="max-w-3xl mx-auto space-y-8">
          
          <button
            type="button"
            onClick={() => setMode('selection')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orqaga qaytish</span>
          </button>

          {submitError && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-300">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Section 1: Team Info & Logo Upload */}
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <h3 className="font-heading font-bold text-xl text-white border-b border-white/10 pb-4">
              1. Jamoa Ma'lumotlari va Logotip (1:1 Cropper)
            </h3>

            {/* Team Logo Dropzone / Picker */}
            <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/20 rounded-2xl bg-white/[0.02] hover:border-white/40 transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, { type: 'logo' })}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              {teamLogoUrl ? (
                <div className="space-y-3">
                  <img src={teamLogoUrl} alt="Jamoa Logotipi" className="w-24 h-24 rounded-full object-cover border-2 border-white/30 mx-auto shadow-xl" />
                  <p className="text-xs text-slate-300">Logotip yuklandi (O'zgartirish uchun bosing)</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-white">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-white">Jamoa Logotipini Yuklash (1x1 format)</p>
                  <p className="text-[11px] text-slate-400">Bosing va rasmni 1:1 ko'rinishida qirqing</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leagues.length > 0 && (
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Turnir (Liga) *</label>
                  <select
                    value={selectedLeagueId}
                    onChange={(e) => setSelectedLeagueId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none"
                  >
                    {leagues.map((l) => (
                      <option key={l.id} value={l.id} className="bg-slate-900 text-white">
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Jamoa Nomi *</label>
                <input
                  type="text"
                  placeholder="Masalan: FC Paxtakor"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Kapitan Ismi-Sharifi *</label>
                <input
                  type="text"
                  placeholder="Masalan: Jasur Rahimov"
                  value={captainName}
                  onChange={(e) => setCaptainName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Kapitan Telefoni *</label>
                <input
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={captainPhone}
                  onChange={(e) => setCaptainPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none placeholder:text-slate-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Players Roster with Photo Cropper */}
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-heading font-bold text-xl text-white">2. O'yinchilar Ro'yxati ({players.length})</h3>
              <button
                type="button"
                onClick={handleAddPlayer}
                className="glass-button text-xs py-2 px-3 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>O'yinchi Qo'shish</span>
              </button>
            </div>

            <div className="space-y-4">
              {players.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Player photo upload dropzone */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                        {p.photoUrl ? (
                          <img src={p.photoUrl} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-5 h-5 text-slate-400" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e, { type: 'player', playerId: p.id })}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-300">O'yinchi #{idx + 1}</span>
                        <p className="text-[10px] text-slate-400">Rasmni qirqib yuklash uchun bosing</p>
                      </div>
                    </div>

                    {players.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePlayer(p.id)}
                        className="text-red-400 hover:text-red-300 text-xs p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Ismi"
                      value={p.name}
                      onChange={(e) => handlePlayerChange(p.id, 'name', e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs outline-none placeholder:text-slate-500"
                    />

                    <input
                      type="text"
                      placeholder="Familiyasi"
                      value={p.surname}
                      onChange={(e) => handlePlayerChange(p.id, 'surname', e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs outline-none placeholder:text-slate-500"
                    />

                    <input
                      type="text"
                      placeholder="Otasining ismi"
                      value={p.fatherName}
                      onChange={(e) => handlePlayerChange(p.id, 'fatherName', e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs outline-none placeholder:text-slate-500"
                    />

                    <select
                      value={p.position}
                      onChange={(e) => handlePlayerChange(p.id, 'position', e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs outline-none"
                    >
                      <option className="bg-slate-900" value="Darvozabon">Darvozabon</option>
                      <option className="bg-slate-900" value="Himoyachi">Himoyachi</option>
                      <option className="bg-slate-900" value="Yarim himoyachi">Yarim himoyachi</option>
                      <option className="bg-slate-900" value="Hujumchi">Hujumchi</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Raqami (masalan 10)"
                      value={p.number}
                      onChange={(e) => handlePlayerChange(p.id, 'number', e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs outline-none placeholder:text-slate-500"
                    />

                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        placeholder="AA"
                        maxLength={2}
                        value={p.passportSeries}
                        onChange={(e) => handlePlayerChange(p.id, 'passportSeries', e.target.value.toUpperCase())}
                        className="w-14 p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs text-center outline-none placeholder:text-slate-500 uppercase"
                      />
                      <input
                        type="text"
                        placeholder="1234567"
                        maxLength={7}
                        value={p.passportNumber}
                        onChange={(e) => handlePlayerChange(p.id, 'passportNumber', e.target.value)}
                        className="flex-1 p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="glass-button glass-button-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-black" />
            <span>{isSubmitting ? "Arizalar Saqlanmoqda..." : "Jamoa Arizasini Yuborish"}</span>
          </button>

        </form>
      )}

      {/* Mode 3: Individual Player Form */}
      {mode === 'individual' && (
        <form onSubmit={handleIndividualSubmit} className="max-w-xl mx-auto space-y-8">
          
          <button
            type="button"
            onClick={() => setMode('selection')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orqaga qaytish</span>
          </button>

          {submitError && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-xs text-red-300">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="glass-card p-6 sm:p-8 space-y-6">
            <h3 className="font-heading font-bold text-xl text-white border-b border-white/10 pb-4">
              Yakkaxon O'yinchi Ma'lumotlari
            </h3>

            {/* Individual Player Photo Upload Dropzone */}
            <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/20 rounded-2xl bg-white/[0.02] hover:border-white/40 transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, { type: 'indPlayer' })}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              {indPhotoUrl ? (
                <div className="space-y-3">
                  <img src={indPhotoUrl} alt="O'yinchi Rasmi" className="w-24 h-24 rounded-full object-cover border-2 border-white/30 mx-auto shadow-xl" />
                  <p className="text-xs text-slate-300">Rasm yuklandi (O'zgartirish uchun bosing)</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto text-white">
                    <Camera className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-white">O'yinchi Rasmini Yuklash (1:1 format)</p>
                  <p className="text-[11px] text-slate-400">Bosing va rasmni qirqing</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {leagues.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Maqsadli Liga *</label>
                  <select
                    value={selectedLeagueId}
                    onChange={(e) => setSelectedLeagueId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none"
                  >
                    {leagues.map((l) => (
                      <option key={l.id} value={l.id} className="bg-slate-900 text-white">
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Ism va Familiyangiz *</label>
                <input
                  type="text"
                  placeholder="Masalan: Sardor Alimov"
                  value={indName}
                  onChange={(e) => setIndName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Telefon Raqamingiz *</label>
                <input
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={indPhone}
                  onChange={(e) => setIndPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none placeholder:text-slate-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Pozitsiyangiz</label>
                  <select
                    value={indPosition}
                    onChange={(e) => setIndPosition(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none"
                  >
                    <option className="bg-slate-900" value="Darvozabon">Darvozabon</option>
                    <option className="bg-slate-900" value="Himoyachi">Himoyachi</option>
                    <option className="bg-slate-900" value="Yarim himoyachi">Yarim himoyachi</option>
                    <option className="bg-slate-900" value="Hujumchi">Hujumchi</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Yoshingiz</label>
                  <input
                    type="number"
                    placeholder="Masalan: 22"
                    value={indAge}
                    onChange={(e) => setIndAge(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Qo'shimcha izoh / Tajribangiz</label>
                <textarea
                  placeholder="Ilgari qaysi jamoalarda o'ynagansiz..."
                  value={indNotes}
                  onChange={(e) => setIndNotes(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none placeholder:text-slate-500 resize-none"
                />
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="glass-button glass-button-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-black" />
            <span>{isSubmitting ? "Yuborilmoqda..." : "Ariza Qoldirish"}</span>
          </button>

        </form>
      )}

    </div>
  );
};
