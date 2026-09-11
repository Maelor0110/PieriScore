import React from 'react';
import { AlertTriangle, ShieldAlert, Sparkles, Flame, CheckCircle2, ChevronRight } from 'lucide-react';
import { ScoreResult } from '../types';

interface ScoreGaugeProps {
  result: ScoreResult;
  onOpenBreakdown: () => void;
  onOpenShare: () => void;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  result,
  onOpenBreakdown,
  onOpenShare,
}) => {
  // Score range 0 to 25 for visual percentage
  const displayScore = result.isAutomaticX ? 'X' : result.netScore;
  const progressPercent = result.isAutomaticX
    ? 100
    : Math.min(100, Math.max(5, (result.netScore / 25) * 100));

  return (
    <div
      id="score-gauge-container"
      className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 shadow-xl backdrop-blur-md ${result.riskColor.bg} ${result.riskColor.border}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Score Number & Status */}
        <div className="flex items-center gap-4">
          <div
            id="score-main-badge"
            className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-900/90 border border-neutral-700/60 shadow-inner flex-shrink-0"
          >
            {result.isAutomaticX ? (
              <div className="text-center">
                <span className="text-4xl sm:text-5xl font-black text-red-500 tracking-wider animate-pulse">
                  X
                </span>
                <span className="block text-[10px] uppercase font-bold text-red-400/80 -mt-1">
                  Critico
                </span>
              </div>
            ) : (
              <div className="text-center">
                <span
                  className={`text-4xl sm:text-5xl font-black tracking-tight ${result.riskColor.text}`}
                >
                  {result.netScore}
                </span>
                <span className="block text-[10px] uppercase font-semibold text-neutral-400 -mt-1">
                  Punti Net
                </span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                id="risk-category-badge"
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase ${result.riskColor.badgeBg}`}
              >
                {result.isAutomaticX ? (
                  <Flame className="w-3.5 h-3.5 text-red-400 animate-bounce" />
                ) : result.riskLevel === 'basso' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
                {result.riskLabel}
              </span>

              {result.totalDiscount > 0 && (
                <span
                  id="attenuanti-summary-pill"
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                >
                  -{result.totalDiscount} pt attenuanti
                </span>
              )}
            </div>

            <p className="mt-1.5 text-sm text-neutral-300 font-medium max-w-xl line-clamp-2">
              {result.advice}
            </p>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2.5 sm:self-center flex-wrap">
          <button
            id="view-breakdown-btn"
            type="button"
            onClick={onOpenBreakdown}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-200 border border-neutral-700 transition"
          >
            Dettagli Calcolo
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            id="share-report-btn"
            type="button"
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Condividi Scheda
          </button>
        </div>
      </div>

      {/* Trigger X warning banner if applicable */}
      {result.isAutomaticX && (
        <div
          id="automatic-x-alert-banner"
          className="mt-4 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5"
        >
          <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-red-300">
              Trigger X Rilevato:{' '}
            </span>
            <span className="text-red-200/90">
              {result.xTriggers.join(' • ')}.
            </span>
            <p className="text-xs text-red-300/80 mt-0.5">
              In base alla regola ufficiale del Pieri Score, la presenza del parametro X forza la classificazione istantanea a <b>Rischio Altissimo</b> senza possibilità di scomputo tramite attenuanti.
            </p>
          </div>
        </div>
      )}

      {/* Range Scale Bar */}
      <div className="mt-4 pt-3 border-t border-neutral-800/60">
        <div className="flex justify-between items-center text-[11px] font-medium text-neutral-400 mb-1.5 px-0.5">
          <span>Scala di Rischio:</span>
          <span>
            {result.isAutomaticX
              ? 'Parametro X Attivo'
              : `Punti Base: ${result.baseScore} | Sconto: -${result.totalDiscount} | Netto: ${result.netScore}`}
          </span>
        </div>

        <div className="relative w-full h-2.5 rounded-full bg-neutral-900 border border-neutral-800 overflow-hidden flex">
          <div className="h-full w-[24%] bg-emerald-500/30 border-r border-neutral-950" title="<6 Basso" />
          <div className="h-full w-[16%] bg-lime-500/30 border-r border-neutral-950" title="6-9 Moderato-Basso" />
          <div className="h-full w-[16%] bg-amber-500/30 border-r border-neutral-950" title="9-12 Moderato-Alto" />
          <div className="h-full w-[16%] bg-orange-500/30 border-r border-neutral-950" title="12-15 Alto" />
          <div className="h-full w-[28%] bg-red-600/40" title=">15 o X Altissimo" />

          {/* Active indicator needle/bar */}
          <div
            className={`absolute top-0 bottom-0 transition-all duration-500 rounded-full shadow-lg ${result.riskColor.barColor}`}
            style={{
              width: `${progressPercent}%`,
              opacity: 0.9,
            }}
          />
        </div>

        {/* Range Labels */}
        <div className="grid grid-cols-5 text-[10px] sm:text-[11px] text-neutral-400 text-center mt-1 font-mono">
          <span className={result.riskLevel === 'basso' && !result.isAutomaticX ? 'text-emerald-400 font-bold' : ''}>
            &lt;6 Basso
          </span>
          <span className={result.riskLevel === 'moderato-basso' && !result.isAutomaticX ? 'text-lime-400 font-bold' : ''}>
            6-9 Mod-Basso
          </span>
          <span className={result.riskLevel === 'moderato-alto' && !result.isAutomaticX ? 'text-amber-400 font-bold' : ''}>
            9-12 Mod-Alto
          </span>
          <span className={result.riskLevel === 'alto' && !result.isAutomaticX ? 'text-orange-400 font-bold' : ''}>
            12-15 Alto
          </span>
          <span className={result.riskLevel === 'altissimo' || result.isAutomaticX ? 'text-red-400 font-bold' : ''}>
            &gt;15 / X Altissimo
          </span>
        </div>
      </div>
    </div>
  );
};
