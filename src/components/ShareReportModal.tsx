import React, { useState, useEffect } from 'react';
import { X, Copy, Check, BookmarkPlus, Share2, Sparkles, AlertTriangle } from 'lucide-react';
import { ScoreResult, ScoreState, SavedEvaluation, AnagraficaData } from '../types';
import { CATEGORIES, ATTENUANTI } from '../constants/pieriScoreData';

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ScoreState;
  result: ScoreResult;
  anagrafica: AnagraficaData;
  onSaveToHistory: (evaluation: SavedEvaluation) => void;
}

export const ShareReportModal: React.FC<ShareReportModalProps> = ({
  isOpen,
  onClose,
  state,
  result,
  anagrafica,
  onSaveToHistory,
}) => {
  const [candidateName, setCandidateName] = useState(anagrafica.nome || '');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notes, setNotes] = useState(anagrafica.note || '');

  useEffect(() => {
    if (anagrafica.nome) {
      setCandidateName(anagrafica.nome);
    }
    if (anagrafica.note) {
      setNotes(anagrafica.note);
    }
  }, [anagrafica]);

  if (!isOpen) return null;

  const generateReportText = () => {
    const finalName = candidateName.trim() || anagrafica.nome.trim() || 'Anonimo';
    const anagraficaLines: string[] = [];
    if (finalName) anagraficaLines.push(`Soggetto: ${finalName}`);
    if (anagrafica.eta) anagraficaLines.push(`Età: ${anagrafica.eta} anni`);
    if (anagrafica.citta) anagraficaLines.push(`Città: ${anagrafica.citta}`);
    if (anagrafica.professione) anagraficaLines.push(`Studio/Lavoro: ${anagrafica.professione}`);
    if (anagrafica.conosciutaSu) anagraficaLines.push(`Conosciuta tramite: ${anagrafica.conosciutaSu}`);
    if (anagrafica.dataValutazione) anagraficaLines.push(`Data Valutazione: ${anagrafica.dataValutazione}`);
    if (notes.trim()) anagraficaLines.push(`Note: ${notes.trim()}`);

    const anagraficaHeader = anagraficaLines.length > 0 ? `${anagraficaLines.join('\n')}\n` : '';
    
    // category summary
    const catLines = CATEGORIES.map((cat) => {
      const selectedId = state[cat.id as keyof ScoreState] as string;
      const opt = cat.options.find((o) => o.id === selectedId);
      if (!opt) return '';
      const ptStr = opt.isAutomaticX ? '[TRIGGER X]' : `(+${opt.points} pt)`;
      return `• ${cat.title}: ${opt.label} ${ptStr}`;
    }).filter(Boolean).join('\n');

    // attenuanti summary
    const attLines = state.selectedAttenuanti.length > 0
      ? state.selectedAttenuanti.map((attId) => {
          const item = ATTENUANTI.find((a) => a.id === attId);
          return item ? `  - ${item.label} (-${item.discount} pt)` : '';
        }).filter(Boolean).join('\n')
      : '  (Nessuna)';

    const xInfo = result.isAutomaticX
      ? `\n🚨 TRIGGER X ATTIVI: ${result.xTriggers.join(', ')} -> Collocazione automatica in Rischio Altissimo`
      : '';

    return `════════════════════════════
📊 PIERI SCORE REPORT UFFICIALE
════════════════════════════
${anagraficaHeader}Classificazione: ${result.riskLabel.toUpperCase()}
Punteggio Netto: ${result.isAutomaticX ? 'X (CRITICO)' : `${result.netScore} pt`}
(Punti base: ${result.baseScore} | Attenuanti: -${result.totalDiscount})${xInfo}

📋 FATTORI DI RISCHIO:
${catLines}

🛡️ ATTENUANTI:
${attLines}

💬 COMMENTO TECNICO:
${result.advice}
════════════════════════════
Calcolato con Pieri Score WebApp`;
  };

  const handleCopy = async () => {
    const text = generateReportText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSave = () => {
    const finalName = candidateName.trim() || anagrafica.nome.trim() || 'Valutazione senza nome';
    const newEval: SavedEvaluation = {
      id: `eval-${Date.now()}`,
      candidateName: finalName,
      timestamp: Date.now(),
      anagrafica: {
        ...anagrafica,
        nome: finalName,
        note: notes.trim() || anagrafica.note,
      },
      state: { ...state },
      result: { ...result },
      notes: notes.trim() || undefined,
    };
    onSaveToHistory(newEval);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        id="share-modal-content"
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-900 border border-neutral-700/80 p-6 shadow-2xl text-neutral-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Scheda Pieri Score</h2>
              <p className="text-xs text-neutral-400">Condividi nei gruppi o salva nella cronologia</p>
            </div>
          </div>
          <button
            id="close-share-modal"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Name Input */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1">
              Nome / Alias del Soggetto (Opzionale)
            </label>
            <input
              type="text"
              id="candidate-name-input"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Es: Chiara / Date di venerdì"
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1">
              Note Personali (Opzionale)
            </label>
            <input
              type="text"
              id="candidate-notes-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Es: conosciuta su Hinge, simpatica ma tatuaggio sospetto"
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Formatted Preview Box */}
        <div className="mt-4">
          <label className="block text-xs font-mono font-semibold uppercase text-neutral-400 mb-1">
            Anteprima Messaggio WhatsApp / Telegram
          </label>
          <pre
            id="report-text-preview"
            className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] leading-relaxed text-neutral-300 whitespace-pre-wrap max-h-56 overflow-y-auto select-all"
          >
            {generateReportText()}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="save-to-history-btn"
            type="button"
            onClick={handleSave}
            disabled={saved}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition border ${
              saved
                ? 'bg-emerald-900/50 border-emerald-500 text-emerald-300'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                Salvato in Cronologia!
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4 text-neutral-400" />
                Salva Profilo in Archivio
              </>
            )}
          </button>

          <button
            id="copy-report-clipboard-btn"
            type="button"
            onClick={handleCopy}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copiato negli Appunti!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copia Scheda Completa
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
