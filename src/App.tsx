/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  BookOpen,
  Bookmark,
  Sparkles,
  Zap,
  Info,
  Scale,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import {
  CATEGORIES,
  INITIAL_SCORE_STATE,
  calculatePieriScore,
} from './constants/pieriScoreData';
import { ScoreState, SavedEvaluation, AnagraficaData } from './types';
import { ScoreGauge } from './components/ScoreGauge';
import { QuestionCard } from './components/QuestionCard';
import { AttenuantiSection } from './components/AttenuantiSection';
import { AnagraficaSection } from './components/AnagraficaSection';
import { BreakdownModal } from './components/BreakdownModal';
import { ShareReportModal } from './components/ShareReportModal';
import { SavedProfilesModal } from './components/SavedProfilesModal';
import { RubricInfoModal } from './components/RubricInfoModal';

const STORAGE_KEY = 'pieri_score_saved_profiles_v1';

const INITIAL_ANAGRAFICA: AnagraficaData = {
  nome: '',
  eta: '',
  citta: '',
  professione: '',
  conosciutaSu: '',
  note: '',
  dataValutazione: new Date().toISOString().split('T')[0],
};

export default function App() {
  const [scoreState, setScoreState] = useState<ScoreState>(INITIAL_SCORE_STATE);
  const [anagrafica, setAnagrafica] = useState<AnagraficaData>(INITIAL_ANAGRAFICA);
  const [savedProfiles, setSavedProfiles] = useState<SavedEvaluation[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Modals state
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRubricOpen, setIsRubricOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProfiles));
    } catch {
      // ignore
    }
  }, [savedProfiles]);

  // Real-time calculation
  const scoreResult = useMemo(() => {
    return calculatePieriScore(scoreState);
  }, [scoreState]);

  // Handle single category option change
  const handleSelectOption = (categoryId: string, optionId: string) => {
    setScoreState((prev) => ({
      ...prev,
      [categoryId]: optionId,
    }));
  };

  // Handle attenuanti toggle
  const handleToggleAttenuante = (id: string) => {
    setScoreState((prev) => {
      const exists = prev.selectedAttenuanti.includes(id);
      const newAtt = exists
        ? prev.selectedAttenuanti.filter((item) => item !== id)
        : [...prev.selectedAttenuanti, id];

      // If user checks "Nessun social network", automatically adjust social activity to 0 if desired, or keep as is
      return {
        ...prev,
        selectedAttenuanti: newAtt,
      };
    });
  };

  const handleClearAttenuanti = () => {
    setScoreState((prev) => ({
      ...prev,
      selectedAttenuanti: [],
    }));
  };

  const handleReset = () => {
    setScoreState(INITIAL_SCORE_STATE);
    setAnagrafica(INITIAL_ANAGRAFICA);
  };

  const handleAnagraficaChange = (field: keyof AnagraficaData, value: string) => {
    setAnagrafica((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetAnagrafica = () => {
    setAnagrafica(INITIAL_ANAGRAFICA);
  };

  // Quick presets
  const applyPreset = (presetName: string) => {
    if (presetName === 'virtuous') {
      setScoreState({
        tattoos: 'none',
        bodycount: 'under_6',
        fatherRelationship: 'present_good',
        psychologist: 'never',
        socialActivity: 'max_1_monthly',
        smoking: 'no_smoke',
        selectedAttenuanti: ['sweet_face'],
      });
      setAnagrafica({
        nome: 'Candidata Virtuosa',
        eta: '22',
        citta: 'Bologna',
        professione: 'Studentessa Giurisprudenza',
        conosciutaSu: 'Amici in comune',
        note: 'Viso dolce e nessun vizio',
        dataValutazione: new Date().toISOString().split('T')[0],
      });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else if (presetName === 'moderate') {
      setScoreState({
        tattoos: 'radical_right',
        bodycount: '6_to_10',
        fatherRelationship: 'present_good_low_edu',
        psychologist: '1_to_6_months',
        socialActivity: '1_to_5_monthly',
        smoking: 'no_smoke',
        selectedAttenuanti: ['joke_reaction'],
      });
      setAnagrafica({
        nome: 'Profilo Moderato',
        eta: '25',
        citta: 'Verona',
        professione: 'Lavoratrice settore moda',
        conosciutaSu: 'Instagram',
        note: 'Ha riso alle battute spinte al primo appuntamento',
        dataValutazione: new Date().toISOString().split('T')[0],
      });
    } else if (presetName === 'danger') {
      setScoreState({
        tattoos: 'any',
        bodycount: '10_to_15',
        fatherRelationship: 'absent',
        psychologist: 'over_12_months',
        socialActivity: 'softcore',
        smoking: 'no_smoke',
        selectedAttenuanti: [],
      });
      setAnagrafica({
        nome: 'Profilo Rischio Alto',
        eta: '24',
        citta: 'Milano',
        professione: 'Content Creator',
        conosciutaSu: 'Tinder',
        note: 'Padre assente, oltre un anno di terapia e foto softcore',
        dataValutazione: new Date().toISOString().split('T')[0],
      });
    } else if (presetName === 'critical_x') {
      setScoreState({
        tattoos: 'any',
        bodycount: 'over_15',
        fatherRelationship: 'present_bad',
        psychologist: '6_to_12_months',
        socialActivity: 'influencer',
        smoking: 'smoker',
        selectedAttenuanti: [],
      });
      setAnagrafica({
        nome: 'Trigger X Multipli',
        eta: '26',
        citta: 'Roma',
        professione: 'Influencer / Modella',
        conosciutaSu: 'Serata / Locale',
        note: 'Influencer wannabe, fumatrice e bodycount oltre 15',
        dataValutazione: new Date().toISOString().split('T')[0],
      });
    } else if (presetName === 'serena_guido') {
      setScoreState({
        tattoos: 'any',
        bodycount: '6_to_10',
        fatherRelationship: 'present_good',
        psychologist: 'under_1_month',
        socialActivity: '1_to_5_monthly',
        smoking: 'no_smoke',
        selectedAttenuanti: ['serena_guido', 'nordic_phenotype', 'sweet_face'],
      });
      setAnagrafica({
        nome: 'Serena Guido',
        eta: '23',
        citta: 'Milano',
        professione: 'Studentessa',
        conosciutaSu: 'Hinge',
        note: 'Attenuante massima applicata (-15 pt)',
        dataValutazione: new Date().toISOString().split('T')[0],
      });
    }
  };

  // Save profile to history
  const handleSaveToHistory = (item: SavedEvaluation) => {
    setSavedProfiles((prev) => [item, ...prev]);
  };

  // Delete profile from history
  const handleDeleteProfile = (id: string) => {
    setSavedProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClearAllHistory = () => {
    setSavedProfiles([]);
  };

  // Load a saved profile
  const handleLoadProfile = (item: SavedEvaluation) => {
    setScoreState(item.state);
    if (item.anagrafica) {
      setAnagrafica(item.anagrafica);
    } else {
      setAnagrafica({
        ...INITIAL_ANAGRAFICA,
        nome: item.candidateName || '',
        note: item.notes || '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Pieri Score
                </h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700 font-semibold">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 -mt-0.5 hidden sm:block">
                Valutatore oggettivo dei fattori di rischio & attenuanti
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="open-rubric-btn"
              type="button"
              onClick={() => setIsRubricOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition cursor-pointer"
              title="Regolamento Ufficiale"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Regolamento</span>
            </button>

            <button
              id="open-history-btn"
              type="button"
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition cursor-pointer relative"
              title="Archivio Profili Salvati"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Archivio</span>
              {savedProfiles.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center -ml-0.5">
                  {savedProfiles.length}
                </span>
              )}
            </button>

            <button
              id="reset-form-btn"
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition cursor-pointer"
              title="Azzera e ripristina valori predefiniti"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Sezione Dati Anagrafici (In Alto) */}
        <section id="anagrafica-container" aria-label="Dati Anagrafici del Soggetto">
          <AnagraficaSection
            data={anagrafica}
            onChange={handleAnagraficaChange}
            onReset={handleResetAnagrafica}
          />
        </section>

        {/* Sticky Score Bar & Summary */}
        <section id="score-summary-section" aria-label="Riepilogo Punteggio">
          <ScoreGauge
            result={scoreResult}
            onOpenBreakdown={() => setIsBreakdownOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
          />
        </section>

        {/* Quick Scenario Presets */}
        <section
          id="presets-section"
          className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2 text-neutral-300">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-semibold text-white">Preset Rapidi per Collaudo:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => applyPreset('virtuous')}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 font-medium transition cursor-pointer"
            >
              🟢 Virtuoso (&lt;6 pt)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('moderate')}
              className="px-2.5 py-1 rounded-lg bg-lime-950/40 hover:bg-lime-900/50 text-lime-300 border border-lime-800/50 font-medium transition cursor-pointer"
            >
              🟡 Moderato (6-9 pt)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('danger')}
              className="px-2.5 py-1 rounded-lg bg-orange-950/40 hover:bg-orange-900/50 text-orange-300 border border-orange-800/50 font-medium transition cursor-pointer"
            >
              🟠 Alto (12-15 pt)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('critical_x')}
              className="px-2.5 py-1 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-700/60 font-bold transition cursor-pointer"
            >
              🔴 Trigger X (Altissimo)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('serena_guido')}
              className="px-2.5 py-1 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800/50 font-medium transition cursor-pointer"
            >
              ✨ Serena Guido (-15 pt)
            </button>
          </div>
        </section>

        {/* 6 Core Factor Cards */}
        <section id="question-factors-grid" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              Fattori di Calcolo (6 Aree)
            </h2>
            <span className="text-xs text-neutral-500">Seleziona un&apos;opzione per ciascuna voce</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <QuestionCard
                key={cat.id}
                category={cat}
                selectedValue={scoreState[cat.id as keyof ScoreState] as string}
                onSelect={(optId) => handleSelectOption(cat.id, optId)}
                index={idx}
              />
            ))}
          </div>
        </section>

        {/* Attenuanti Section */}
        <section id="attenuanti-wrapper" className="pt-2">
          <AttenuantiSection
            selectedIds={scoreState.selectedAttenuanti}
            onToggle={handleToggleAttenuante}
            onClearAll={handleClearAttenuanti}
          />
        </section>

        {/* Bottom Callout & Quick Action */}
        <section
          id="bottom-action-banner"
          className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Valutazione Completata?</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${scoreResult.riskColor.badgeBg}`}>
                {scoreResult.riskLabel}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Condividi l&apos;esito formattato per chat di gruppo o archivialo per future comparazioni.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              id="bottom-dettagli-btn"
              type="button"
              onClick={() => setIsBreakdownOpen(true)}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs sm:text-sm font-semibold text-neutral-200 transition"
            >
              Visualizza Log
            </button>
            <button
              id="bottom-share-btn"
              type="button"
              onClick={() => setIsShareOpen(true)}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              Genera Scheda
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 py-6 text-center text-xs text-neutral-500 mt-12">
        <p>
          Pieri Score WebApp • Algoritmo ufficiale dei fattori di rischio, eccezioni e attenuanti.
        </p>
      </footer>

      {/* Modals */}
      <BreakdownModal
        isOpen={isBreakdownOpen}
        onClose={() => setIsBreakdownOpen(false)}
        state={scoreState}
        result={scoreResult}
      />

      <ShareReportModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        state={scoreState}
        result={scoreResult}
        anagrafica={anagrafica}
        onSaveToHistory={handleSaveToHistory}
      />

      <SavedProfilesModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedList={savedProfiles}
        onLoadProfile={handleLoadProfile}
        onDeleteProfile={handleDeleteProfile}
        onClearAll={handleClearAllHistory}
      />

      <RubricInfoModal
        isOpen={isRubricOpen}
        onClose={() => setIsRubricOpen(false)}
      />
    </div>
  );
}
