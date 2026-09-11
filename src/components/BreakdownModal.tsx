import React from 'react';
import { X, CheckCircle, Flame, ShieldAlert, ArrowRight } from 'lucide-react';
import { ScoreResult, ScoreState } from '../types';
import { CATEGORIES, ATTENUANTI } from '../constants/pieriScoreData';

interface BreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: ScoreState;
  result: ScoreResult;
}

export const BreakdownModal: React.FC<BreakdownModalProps> = ({
  isOpen,
  onClose,
  state,
  result,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        id="breakdown-modal-content"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-900 border border-neutral-700/80 p-6 shadow-2xl text-neutral-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">
              Audit Matematico
            </span>
            <h2 className="text-xl font-bold text-white">Dettaglio Calcolo Pieri Score</h2>
          </div>
          <button
            id="close-breakdown-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status banner */}
        <div
          className={`mt-4 p-4 rounded-xl border flex items-center justify-between gap-4 ${result.riskColor.bg} ${result.riskColor.border}`}
        >
          <div>
            <span className="text-xs uppercase font-mono tracking-wider opacity-80">
              Esito Complessivo
            </span>
            <div className="text-lg font-black text-white flex items-center gap-2">
              {result.riskLabel}
              {result.isAutomaticX && (
                <span className="text-xs px-2 py-0.5 rounded bg-red-600/40 text-red-200 border border-red-500/50">
                  Trigger X
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase font-mono tracking-wider opacity-80">Punteggio</span>
            <div className="text-2xl font-black font-mono">
              {result.isAutomaticX ? 'X' : `${result.netScore} pt`}
            </div>
          </div>
        </div>

        {/* Categories Breakdown Table */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase text-neutral-400 font-bold tracking-wider mb-3">
            Fattori di Rischio Base
          </h3>
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const selectedId = state[cat.id as keyof ScoreState] as string;
              const opt = cat.options.find((o) => o.id === selectedId);
              if (!opt) return null;

              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-sm"
                >
                  <div className="min-w-0 pr-3">
                    <span className="text-xs text-neutral-400 block font-mono">
                      {cat.title}
                    </span>
                    <span className="font-semibold text-neutral-200">{opt.label}</span>
                  </div>
                  <div className="flex-shrink-0 font-mono font-bold">
                    {opt.isAutomaticX ? (
                      <span className="inline-flex items-center gap-1 text-red-400 bg-red-950/50 px-2 py-1 rounded border border-red-500/30">
                        <Flame className="w-3.5 h-3.5" />
                        Trigger X
                      </span>
                    ) : opt.points === 0 ? (
                      <span className="text-neutral-500">0 pt</span>
                    ) : (
                      <span className="text-indigo-400">+{opt.points} pt</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center py-2.5 px-3 mt-1 font-mono text-sm border-t border-neutral-800 text-neutral-300">
            <span>Subtotale Punti Base:</span>
            <span className="font-bold text-white">+{result.baseScore} pt</span>
          </div>
        </div>

        {/* Attenuanti Breakdown */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider mb-3">
            Attenuanti Applicate (-{result.totalDiscount} pt)
          </h3>
          {state.selectedAttenuanti.length === 0 ? (
            <div className="p-3.5 rounded-xl bg-neutral-950/40 border border-dashed border-neutral-800 text-xs text-neutral-400 text-center">
              Nessuna attenuante selezionata.
            </div>
          ) : (
            <div className="space-y-2">
              {state.selectedAttenuanti.map((attId) => {
                const item = ATTENUANTI.find((a) => a.id === attId);
                if (!item) return null;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-sm"
                  >
                    <div className="min-w-0 pr-3">
                      <span className="font-semibold text-emerald-200">{item.label}</span>
                      {item.subtitle && (
                        <p className="text-xs text-neutral-400">{item.subtitle}</p>
                      )}
                    </div>
                    <span className="font-mono font-bold text-emerald-400 flex-shrink-0">
                      -{item.discount} pt
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Official Thresholds Table */}
        <div className="mt-6 pt-5 border-t border-neutral-800">
          <h3 className="text-xs font-mono uppercase text-neutral-400 font-bold tracking-wider mb-3">
            Soglie Ufficiali Pieri Score
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between">
              <span className="text-neutral-300">&lt; 6 punti:</span>
              <span className="font-bold text-emerald-400">Rischio basso</span>
            </div>
            <div className="p-2.5 rounded-lg bg-lime-950/30 border border-lime-800/40 flex items-center justify-between">
              <span className="text-neutral-300">6 - 9 punti:</span>
              <span className="font-bold text-lime-400">Rischio moderato-basso</span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 flex items-center justify-between">
              <span className="text-neutral-300">9 - 12 punti:</span>
              <span className="font-bold text-amber-400">Rischio moderato-alto</span>
            </div>
            <div className="p-2.5 rounded-lg bg-orange-950/30 border border-orange-800/40 flex items-center justify-between">
              <span className="text-neutral-300">12 - 15 punti:</span>
              <span className="font-bold text-orange-400">Rischio alto</span>
            </div>
            <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-800/40 flex items-center justify-between sm:col-span-2">
              <span className="text-neutral-300">&gt; 15 punti OPPURE trigger X:</span>
              <span className="font-bold text-red-400">Rischio altissimo</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            id="modal-breakdown-ok"
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
