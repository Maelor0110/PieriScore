import React, { useState } from 'react';
import { User, MapPin, Briefcase, Calendar, MessageSquare, ChevronDown, ChevronUp, Sparkles, RotateCcw } from 'lucide-react';
import { AnagraficaData } from '../types';

interface AnagraficaSectionProps {
  data: AnagraficaData;
  onChange: (field: keyof AnagraficaData, value: string) => void;
  onReset: () => void;
}

const COMMON_CHANNELS = [
  'Hinge',
  'Tinder',
  'Instagram',
  'Amici in comune',
  'Università / Lavoro',
  'Serata / Locale',
];

export const AnagraficaSection: React.FC<AnagraficaSectionProps> = ({
  data,
  onChange,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const hasAnyData = Boolean(
    data.nome || data.eta || data.citta || data.professione || data.conosciutaSu || data.note
  );

  const summarySubtitle = [
    data.nome || 'Soggetto non specificato',
    data.eta ? `${data.eta} anni` : null,
    data.citta || null,
    data.conosciutaSu ? `via ${data.conosciutaSu}` : null,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <div
      id="anagrafica-section"
      className="rounded-2xl border border-neutral-800 bg-neutral-900/70 shadow-xl backdrop-blur-sm overflow-hidden transition-all"
    >
      {/* Header bar */}
      <div
        className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-neutral-800/40 transition select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/60 border border-indigo-700/50 flex items-center justify-center text-indigo-400 flex-shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">
                Anagrafica & Profilo
              </span>
              {data.nome && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono font-bold border border-indigo-500/30">
                  {data.nome}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-100 truncate">
              Dati Anagrafici del Soggetto
            </h2>
            <p className="text-xs text-neutral-400 truncate">
              {hasAnyData ? summarySubtitle : 'Inserisci i dettagli del profilo per contestualizzare la scheda di rischio'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {hasAnyData && (
            <button
              type="button"
              id="reset-anagrafica-btn"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="text-xs text-neutral-400 hover:text-neutral-200 px-2.5 py-1 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900 transition flex items-center gap-1"
              title="Azzera anagrafica"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Pulisci</span>
            </button>
          )}

          <div className="w-8 h-8 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-neutral-400 hover:text-neutral-200 transition">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expandable Form Body */}
      {isOpen && (
        <div className="px-4 pb-5 sm:px-5 border-t border-neutral-800/70 pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Nome / Alias */}
            <div>
              <label
                htmlFor="anagrafica-nome"
                className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Nome / Alias
              </label>
              <input
                id="anagrafica-nome"
                type="text"
                value={data.nome}
                onChange={(e) => onChange('nome', e.target.value)}
                placeholder="Es: Chiara / Date di venerdì"
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
              />
            </div>

            {/* Età */}
            <div>
              <label
                htmlFor="anagrafica-eta"
                className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Età
              </label>
              <input
                id="anagrafica-eta"
                type="number"
                min="18"
                max="99"
                value={data.eta}
                onChange={(e) => onChange('eta', e.target.value)}
                placeholder="Es: 23"
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
              />
            </div>

            {/* Città / Provenienza */}
            <div>
              <label
                htmlFor="anagrafica-citta"
                className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5 flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Città / Domicilio
              </label>
              <input
                id="anagrafica-citta"
                type="text"
                value={data.citta}
                onChange={(e) => onChange('citta', e.target.value)}
                placeholder="Es: Milano, Bologna, Roma..."
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
              />
            </div>

            {/* Professione / Studio */}
            <div>
              <label
                htmlFor="anagrafica-professione"
                className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5 flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-violet-400" />
                Studio / Professione
              </label>
              <input
                id="anagrafica-professione"
                type="text"
                value={data.professione}
                onChange={(e) => onChange('professione', e.target.value)}
                placeholder="Es: Scienze della Comunicazione, HR..."
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
              />
            </div>
          </div>

          {/* Row 2: Canale di conoscenza e Data */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <div className="sm:col-span-2">
              <label
                htmlFor="anagrafica-canale"
                className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5 flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                Canale di Incontro / Conoscenza
              </label>
              <div className="space-y-2">
                <input
                  id="anagrafica-canale"
                  type="text"
                  value={data.conosciutaSu}
                  onChange={(e) => onChange('conosciutaSu', e.target.value)}
                  placeholder="Es: Hinge, Tinder, Festa di laurea, Amici..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
                />
                {/* Quick pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-neutral-400 font-mono">Suggeriti:</span>
                  {COMMON_CHANNELS.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => onChange('conosciutaSu', ch)}
                      className={`text-[11px] px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                        data.conosciutaSu === ch
                          ? 'bg-indigo-600/40 text-indigo-200 border-indigo-500/60 font-semibold'
                          : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-300'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="anagrafica-data"
                className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                Data Valutazione / Date
              </label>
              <input
                id="anagrafica-data"
                type="date"
                value={data.dataValutazione}
                onChange={(e) => onChange('dataValutazione', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Row 3: Note / Prima impressione */}
          <div className="pt-1">
            <label
              htmlFor="anagrafica-note"
              className="block text-xs font-mono font-semibold uppercase text-neutral-300 mb-1.5"
            >
              Note Aggiuntive / Prima Impressione
            </label>
            <input
              id="anagrafica-note"
              type="text"
              value={data.note}
              onChange={(e) => onChange('note', e.target.value)}
              placeholder="Es: Dice di non usare molto il telefono ma ha 2000 follower, simpatica ma ambigua sul padre..."
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition"
            />
          </div>
        </div>
      )}
    </div>
  );
};
