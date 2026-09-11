import React from 'react';
import { X, Trash2, FolderOpen, Calendar, ArrowRight, ShieldCheck, Flame, AlertTriangle } from 'lucide-react';
import { SavedEvaluation } from '../types';

interface SavedProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedList: SavedEvaluation[];
  onLoadProfile: (item: SavedEvaluation) => void;
  onDeleteProfile: (id: string) => void;
  onClearAll: () => void;
}

export const SavedProfilesModal: React.FC<SavedProfilesModalProps> = ({
  isOpen,
  onClose,
  savedList,
  onLoadProfile,
  onDeleteProfile,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div
        id="saved-profiles-modal-content"
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-neutral-900 border border-neutral-700/80 p-6 shadow-2xl text-neutral-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400">
              Archivio Locale
            </span>
            <h2 className="text-xl font-bold text-white">Valutazioni Salvate ({savedList.length})</h2>
          </div>
          <button
            id="close-saved-modal"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="mt-4 space-y-3">
          {savedList.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-neutral-800 rounded-2xl">
              <FolderOpen className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <p className="text-sm text-neutral-400 font-medium">Nessuna valutazione archiviata.</p>
              <p className="text-xs text-neutral-500 mt-1">
                Calcola un Pieri Score e premi &quot;Condividi Scheda&quot; -&gt; &quot;Salva Profilo&quot; per archiviarlo qui.
              </p>
            </div>
          ) : (
            savedList.map((item) => {
              const formattedDate = new Date(item.timestamp).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-base">
                        {item.candidateName}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${item.result.riskColor.badgeBg}`}
                      >
                        {item.result.riskLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-300">
                        {item.result.isAutomaticX ? 'Score: X' : `Score: ${item.result.netScore} pt`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        {formattedDate}
                      </span>
                      {item.anagrafica?.eta && (
                        <span className="px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                          {item.anagrafica.eta} anni
                        </span>
                      )}
                      {item.anagrafica?.citta && (
                        <span className="px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                          {item.anagrafica.citta}
                        </span>
                      )}
                      {item.anagrafica?.conosciutaSu && (
                        <span className="px-1.5 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                          via {item.anagrafica.conosciutaSu}
                        </span>
                      )}
                      {item.notes && (
                        <span className="italic text-neutral-400 truncate max-w-xs">
                          "{item.notes}"
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        onLoadProfile(item);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-semibold transition cursor-pointer"
                    >
                      Carica
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteProfile(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-950/50 text-neutral-500 hover:text-red-400 border border-transparent hover:border-red-500/30 transition cursor-pointer"
                      title="Elimina"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {savedList.length > 0 && (
          <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-red-400/80 hover:text-red-300 transition"
            >
              Svuota Archivio
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition"
            >
              Chiudi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
