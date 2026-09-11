import React from 'react';
import { Shield, Check, Minus } from 'lucide-react';
import { ATTENUANTI } from '../constants/pieriScoreData';

interface AttenuantiSectionProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClearAll: () => void;
}

export const AttenuantiSection: React.FC<AttenuantiSectionProps> = ({
  selectedIds,
  onToggle,
  onClearAll,
}) => {
  const totalDiscount = selectedIds.reduce((sum, id) => {
    const item = ATTENUANTI.find((a) => a.id === id);
    return sum + (item ? item.discount : 0);
  }, 0);

  return (
    <div
      id="attenuanti-section-card"
      className="rounded-2xl border border-emerald-900/60 bg-gradient-to-b from-neutral-900/80 to-emerald-950/20 p-5 sm:p-6 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-900/40 border border-emerald-700/50 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                Sconti & Salvezza
              </span>
            </div>
            <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
              Attenuanti Ufficiali
              {selectedIds.length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  {selectedIds.length} attive
                </span>
              )}
            </h2>
            <p className="text-xs text-neutral-400">
              Fattori di sconto cumulabili applicati direttamente al punteggio totale.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="text-right">
            <span className="text-[11px] text-neutral-400 block font-medium">Sconto totale:</span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              -{totalDiscount} pt
            </span>
          </div>

          {selectedIds.length > 0 && (
            <button
              id="clear-attenuanti-btn"
              type="button"
              onClick={onClearAll}
              className="text-xs text-neutral-400 hover:text-neutral-200 px-2.5 py-1 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900 transition"
            >
              Azzera
            </button>
          )}
        </div>
      </div>

      {/* Grid of Attenuanti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {ATTENUANTI.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <button
              key={item.id}
              id={`attenuante-${item.id}`}
              type="button"
              onClick={() => onToggle(item.id)}
              className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 cursor-pointer group ${
                isSelected
                  ? 'border-emerald-500/80 bg-emerald-950/40 text-neutral-100 shadow-md ring-1 ring-emerald-500/40'
                  : 'border-neutral-800/90 bg-neutral-900/50 hover:bg-neutral-800/50 hover:border-neutral-700 text-neutral-300'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Custom Checkbox */}
                <div
                  className={`w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-600 text-white'
                      : 'border-neutral-700 bg-neutral-800 group-hover:border-neutral-600'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <Minus className="w-2.5 h-2.5 opacity-0 group-hover:opacity-40 text-neutral-400" />
                  )}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold tracking-tight ${
                      isSelected ? 'text-white' : 'text-neutral-200'
                    }`}
                  >
                    {item.label}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Discount Badge */}
              <div className="flex-shrink-0">
                <span
                  className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                    isSelected
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40'
                      : 'bg-neutral-800/90 text-emerald-400/90 border border-neutral-700/80'
                  }`}
                >
                  -{item.discount} pt
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
