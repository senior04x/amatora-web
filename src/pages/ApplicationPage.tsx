import React, { useState, useEffect, useRef } from 'react';
import { Shield, User, Plus, Trash2, CheckCircle2, AlertCircle, Send, ArrowLeft, Camera, Image as ImageIcon, Crop, Lock, Phone, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ApplicationPageProps {
  orgSlug: string;
}

interface League {
  id: number;
  name: string;
  organization_id: number;
}

interface Team {
  id: number;
  name: string;
  league_id: number;
}

interface Organization {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  brand_colors?: any;
  contact_phone?: string;
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

// Clean 1:1 Image Cropper Modal (Zoom Removed)
const ImageCropperModal: React.FC<{
  isOpen: boolean;
  imageSrc: string | null;
  onCrop: (croppedBase64: string) => void;
  onClose: () => void;
}> = ({ isOpen, imageSrc, onCrop, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
  }, [isOpen, imageSrc]);

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
            className="glass-button glass-button-primary flex-1 py-3 text-xs font-bold"
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
  const [leagueTeams, setLeagueTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
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

  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(true);

  useEffect(() => {
    fetchOrgAndLeagues();
  }, [orgSlug]);

  useEffect(() => {
    if (selectedLeagueId) {
      fetchTeamsForLeague(Number(selectedLeagueId));
    }
  }, [selectedLeagueId]);

  const fetchTeamsForLeague = async (leagueId: number) => {
    try {
      const { data } = await supabase
        .from('teams')
        .select('id, name, league_id')
        .eq('league_id', leagueId)
        .order('name');
      setLeagueTeams(data || []);
      setSelectedTeamId('');
    } catch (err) {
      console.warn('Error fetching teams for league:', err);
      setLeagueTeams([]);
    }
  };

  const fetchOrgAndLeagues = async () => {
    setLoadingOrg(true);
    try {
      let query = supabase.from('organizations').select('*');
      if (!isNaN(Number(orgSlug))) {
        query = query.eq('id', Number(orgSlug));
      } else {
        query = query.eq('slug', orgSlug.toLowerCase());
      }

      const { data: orgData } = await query.maybeSingle();

      if (orgData) {
        setOrg(orgData);

        // Fetch registration status from sponsors KV table (REGISTRATION_OPEN_{orgId})
        try {
          const { data: spReg } = await supabase
            .from('sponsors')
            .select('logo_url')
            .in('name', [`REGISTRATION_OPEN_${orgData.id}`, 'REGISTRATION_OPEN_1', 'REGISTRATION_OPEN'])
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (spReg && spReg.logo_url !== null && spReg.logo_url !== undefined) {
            setIsRegistrationOpen(spReg.logo_url === 'true');
          } else if ((orgData as any).is_registration_open !== undefined && (orgData as any).is_registration_open !== null) {
            setIsRegistrationOpen(!!(orgData as any).is_registration_open);
          } else if ((orgData as any).registration_open !== undefined && (orgData as any).registration_open !== null) {
            setIsRegistrationOpen(!!(orgData as any).registration_open);
          } else {
            setIsRegistrationOpen(true);
          }
        } catch (e) {
          setIsRegistrationOpen(true);
        }

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
          name: orgSlug.toUpperCase(),
          slug: orgSlug.toLowerCase(),
        });
      }
    } catch (err) {
      console.warn('Error fetching organization info:', err);
      setOrg({
        id: 1,
        name: orgSlug.toUpperCase(),
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
      const targetOrgId = org?.id || 1;
      const selectedLeague = leagues.find((l) => String(l.id) === String(selectedLeagueId));
      
      // 1. Insert team record into 'teams' table
      const teamPayload: any = {
        organization_id: targetOrgId,
        name: teamName.trim(),
        logo_url: teamLogoUrl || 'https://amatora.uz/favicon.png',
        captain_phone: captainPhone.trim(),
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      if (selectedLeague?.name) {
        teamPayload.league = selectedLeague.name;
      }

      const { data: teamData, error: teamErr } = await supabase
        .from('teams')
        .insert([teamPayload])
        .select()
        .single();

      if (teamErr) {
        console.error('Teams table insertion error:', teamErr);
      }

      // 2. Insert players into 'applications' table
      const validPlayers = players.filter((p) => p.name.trim() || p.surname.trim());
      if (validPlayers.length > 0) {
        const playerRows = validPlayers.map((p) => ({
          organization_id: targetOrgId,
          team_id: teamData?.id || null,
          first_name: p.name.trim() || 'O\'yinchi',
          last_name: p.surname.trim() || '',
          father_name: p.fatherName.trim() || '',
          position: p.position || 'Yarim himoyachi',
          player_number: p.number || '',
          passport_series: p.passportSeries || '',
          passport_number: p.passportNumber || '',
          phone: p.phone || captainPhone.trim(),
          photo_url: p.photoUrl || 'https://amatora.uz/favicon.png',
          status: 'pending',
          comment: `Jamoa: ${teamName.trim()}`,
          created_at: new Date().toISOString(),
        }));

        const { error: playersErr } = await supabase.from('applications').insert(playerRows);
        if (playersErr) {
          console.error('Players insertion error:', playersErr);
        }
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
      const targetOrgId = org?.id || 1;
      const nameParts = indName.trim().split(' ');
      const firstName = nameParts[0] || indName.trim();
      const lastName = nameParts.slice(1).join(' ') || '';

      const playerPayload: any = {
        organization_id: targetOrgId,
        first_name: firstName,
        last_name: lastName,
        father_name: '',
        passport_series: '',
        passport_number: '',
        player_number: '',
        phone: indPhone.trim(),
        position: indPosition,
        birth_date: indAge ? `${indAge} yosh` : '',
        photo_url: indPhotoUrl || 'https://amatora.uz/favicon.png',
        comment: indNotes ? `[INDIVIDUAL] ${indNotes}` : '[INDIVIDUAL]',
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      if (selectedTeamId) {
        playerPayload.team_id = selectedTeamId;
      }

      const { error: appErr } = await supabase.from('applications').insert([playerPayload]);

      if (appErr) {
        console.error('Applications table insertion error:', appErr);
      }

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Submit error:', err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract Brand Colors Array safely from Supabase jsonb
  const getBrandColors = (): string[] => {
    if (!org || !org.brand_colors) return ['#3b2626', '#00d2fc'];
    let colors = org.brand_colors;
    if (typeof colors === 'string') {
      try {
        colors = JSON.parse(colors);
      } catch (e) {
        colors = [colors];
      }
    }
    if (Array.isArray(colors) && colors.length > 0) {
      return colors;
    }
    return ['#3b2626', '#00d2fc'];
  };

  const parsedColors = getBrandColors();
  const c1 = parsedColors[0] || '#3b2626';
  const c2 = parsedColors[1] || parsedColors[0] || '#00d2fc';
  const backgroundGradient = `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;

  if (submitSuccess) {
    return (
      <div 
        style={{ background: backgroundGradient }}
        className="relative z-10 border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-16 pb-20 text-center space-y-6 min-h-[calc(100vh-2rem)] flex flex-col justify-center items-center shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-black text-3xl text-white">Ariza Muvaffaqiyatli Yuborildi!</h2>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Arizangiz <strong>{org?.name || orgSlug.toUpperCase()}</strong> tashkilotchilariga yuborildi. Tezkorda ko'rsatilgan telefon raqami orqali bog'laniladi.
        </p>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            setMode('selection');
          }}
          className="glass-button glass-button-primary py-3 px-8 text-sm font-bold"
        >
          <span>Qaytadan Arizalar Yuborish</span>
        </button>
      </div>
    );
  }

  if (isRegistrationOpen === false) {
    const contactPhone = org?.contact_phone || (org as any)?.phone || '+998 90 903 58 08';
    return (
      <div 
        style={{ background: backgroundGradient }}
        className="relative z-10 border-t border-white/15 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-16 space-y-8 min-h-[calc(100vh-2rem)] flex flex-col justify-center items-center shadow-2xl transition-all duration-500 overflow-hidden"
      >
        {/* Soft overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none rounded-t-[36px] sm:rounded-t-[48px]" />

        {/* Dynamic Background Brand Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-30"
          style={{ backgroundColor: c1 }}
        />

        {/* Organization Header — ONLY Organization Logo and Name side-by-side */}
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto relative z-10">
          {org?.logo_url ? (
            <img
              src={org.logo_url}
              alt={org.name}
              className="h-24 sm:h-32 md:h-36 lg:h-40 w-auto object-contain drop-shadow-2xl shrink-0"
            />
          ) : null}
          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-wider text-left">
            {org?.name || orgSlug.toUpperCase()}
          </h1>
        </div>

        {/* Lock Notice Box */}
        <div className="glass-card max-w-md w-full p-8 space-y-6 text-center border border-white/20 relative z-10">
          <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading font-black text-2xl text-white">Ro'yxatdan O'tish Yopilgan</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tashkilot ro'yxatdan o'tishni yopib qo'ygan. Ma'lumot uchun tashkilotchi bilan bog'lanishingiz mumkin:
            </p>
          </div>

          {/* Contact Phone Number */}
          <a
            href={`tel:${contactPhone.replace(/\s+/g, '')}`}
            className="flex items-center justify-center gap-2.5 p-3.5 px-6 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all w-full text-decoration-none"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>{contactPhone}</span>
          </a>

          {/* Go to Home Page Button */}
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="glass-button glass-button-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-black" />
            <span>Bosh Sahifaga O'tish</span>
          </button>
        </div>

      </div>
    );
  }

  return (
    <div
      style={{ background: backgroundGradient }}
      className="relative z-10 rounded-t-[36px] sm:rounded-t-[48px] w-full px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-16 space-y-8 min-h-[calc(100vh-2rem)] flex flex-col justify-center border-t border-white/15 transition-all duration-500 shadow-2xl overflow-hidden"
    >
      {/* Soft overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none rounded-t-[36px] sm:rounded-t-[48px]" />

      {/* Dynamic Background Brand Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-40"
        style={{ backgroundColor: c1 }}
      />

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

      {/* Organization Header — ONLY Organization Logo and Name side-by-side */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto relative z-10">
        {org?.logo_url ? (
          <img
            src={org.logo_url}
            alt={org.name}
            className="h-24 sm:h-32 md:h-36 lg:h-40 w-auto object-contain drop-shadow-2xl shrink-0"
          />
        ) : null}
        <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-wider text-left">
          {org?.name || orgSlug.toUpperCase()}
        </h1>
      </div>

      {/* Mode 1: Selection Screen */}
      {mode === 'selection' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
          
          <div
            onClick={() => setMode('team')}
            className="glass-card p-8 space-y-6 flex flex-col justify-between cursor-pointer hover:border-white/40 hover:bg-white/[0.08] transition-all group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-black text-2xl text-white">Jamoaviy Ro'yxatdan O'tish</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Jamoangiz logotipi, nomi, kapitan ma'lumotlari hamda o'yinchilar rasmini kiritib ligaga qatnashish arizasini topshiring.
              </p>
            </div>
            <div className="glass-button glass-button-primary w-full py-3.5 text-center text-xs font-bold">
              <span>Jamoani Ro'yxatdan O'tkazish</span>
            </div>
          </div>

          <div
            onClick={() => setMode('individual')}
            className="glass-card p-8 space-y-6 flex flex-col justify-between cursor-pointer hover:border-white/40 hover:bg-white/[0.08] transition-all group"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <User className="w-7 h-7" />
              </div>
              <h2 className="font-heading font-black text-2xl text-white">Yakkaxon Ro'yxatdan O'tish</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Erkin agent sifatida rasmingiz va pozitsiyangiz bilan ma'lumot qoldiring, ligadagi jamoalarga taklif oling.
              </p>
            </div>
            <div className="glass-button w-full py-3.5 text-center text-xs font-bold">
              <span>O'yinchi Sifatida Ariza Qoldirish</span>
            </div>
          </div>

        </div>
      )}

      {/* Mode 2: Team Registration Form */}
      {mode === 'team' && (
        <form onSubmit={handleTeamSubmit} className="max-w-3xl mx-auto space-y-8 relative z-10">
          
          <button
            type="button"
            onClick={() => setMode('selection')}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
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
              1. Jamoa Ma'lumotlari va Logotip (1:1 Format)
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

                    <input
                      type="tel"
                      placeholder="Tel: +998 90 123 45 67"
                      value={p.phone}
                      onChange={(e) => handlePlayerChange(p.id, 'phone', e.target.value)}
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
        <form onSubmit={handleIndividualSubmit} className="max-w-xl mx-auto space-y-8 relative z-10">
          
          <button
            type="button"
            onClick={() => setMode('selection')}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
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

              {/* Target Team Selection Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Maqsadli Jamoa (Ixtiyoriy)</label>
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs outline-none"
                >
                  <option value="" className="bg-slate-900 text-white">
                    -- Erkin agent (Barcha jamoalarga ochiq) --
                  </option>
                  {leagueTeams.map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

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
