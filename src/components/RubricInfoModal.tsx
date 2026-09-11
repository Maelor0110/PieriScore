import React from 'react';
import { X, BookOpen, Shield, Flame, CheckCircle, HelpCircle } from 'lucide-react';

interface RubricInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RubricInfoModal: React.FC<RubricInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        id="rubric-modal-content"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-900 border border-neutral-700/80 p-6 shadow-2xl text-neutral-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 text-indigo-400 border border-neutral-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">
                Documentazione Ufficiale
              </span>
              <h2 className="text-xl font-bold text-white">Regolamento Pieri Score</h2>
            </div>
          </div>
          <button
            id="close-rubric-modal"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-6 text-sm text-neutral-300">
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-2 text-indigo-300">
              1. Punteggi e Categorie di Rischio
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                <span className="font-mono text-emerald-400 font-bold">&lt;6 punti:</span> Rischio basso
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                <span className="font-mono text-lime-400 font-bold">6-9 punti:</span> Rischio moderato-basso
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                <span className="font-mono text-amber-400 font-bold">9-12 punti:</span> Rischio moderato-alto
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                <span className="font-mono text-orange-400 font-bold">12-15 punti:</span> Rischio alto
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 sm:col-span-2">
                <span className="font-mono text-red-400 font-bold">&gt;15 punti:</span> Rischio altissimo
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40">
            <h3 className="text-sm font-bold text-red-300 uppercase font-mono tracking-wider mb-1 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-400" />
              Regola Speciale &quot;X&quot;
            </h3>
            <p className="text-xs text-red-200/90 leading-relaxed">
              Il parametro <b>X</b> comporta la collocazione automatica istantanea nella categoria <b>Rischio Altissimo</b>, a prescindere dal punteggio algebrico netto e dalle attenuanti accumulate.
              <br />
              <b>Condizioni trigger X:</b>
              <br />
              • Bodycount &gt; 15 partner
              <br />
              • Attività social: Influencer (reale o wannabe)
              <br />
              • Fumo / svapo / icos
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-2 text-indigo-300">
              2. Eccezioni Rilevanti
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
              <li>
                <b>Tatuaggi:</b> Qualsiasi numero assegna 10 punti. Tuttavia, se i tatuaggi rappresentano simboli riconducibili a ideologie di destra radicale, si applica l&apos;eccezione con tariffa agevolata di soli <b>3 punti</b>.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-emerald-400 uppercase font-mono tracking-wider mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              3. Tabella delle Attenuanti
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li className="flex justify-between p-2 rounded bg-neutral-950 border border-neutral-800">
                <span>È Serena Guido</span>
                <span className="font-mono text-emerald-400 font-bold">-15 punti</span>
              </li>
              <li className="flex justify-between p-2 rounded bg-neutral-950 border border-neutral-800">
                <span>Nessun social network</span>
                <span className="font-mono text-emerald-400 font-bold">-10 punti</span>
              </li>
              <li className="flex justify-between p-2 rounded bg-neutral-950 border border-neutral-800">
                <span>Fenotipo nordico</span>
                <span className="font-mono text-emerald-400 font-bold">-8 punti</span>
              </li>
              <li className="flex justify-between p-2 rounded bg-neutral-950 border border-neutral-800">
                <span>Ha riso quando al primo appuntamento le hai raccontato la barzelletta del negro che vuole iscriversi all&apos;università</span>
                <span className="font-mono text-emerald-400 font-bold">-6 punti</span>
              </li>
              <li className="flex justify-between p-2 rounded bg-neutral-950 border border-neutral-800">
                <span>Ha un viso dolce (cit.)</span>
                <span className="font-mono text-emerald-400 font-bold">-1 punto</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
          <button
            id="rubric-close-btn"
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold transition"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
};
