import React from 'react';
import { PenTool, Users, UserCheck, Brain, Share2, Cigarette, Check, Flame } from 'lucide-react';
import { QuestionCategory } from '../types';

interface QuestionCardProps {
  category: QuestionCategory;
  selectedValue: string;
  onSelect: (optionId: string) => void;
  index: number;
}

const ICON_MAP: Record<string, React.ElementType> = {
  PenTool,
  Users,
  UserCheck,
  Brain,
  Share2,
  Cigarette,
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  category,
  selectedValue,
  onSelect,
  index,
}) => {
  const IconComponent = ICON_MAP[category.iconName] || PenTool;

  return (
    <div
      id={`category-card-${category.id}`}
      className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-5 sm:p-6 transition-all shadow-lg hover:border-neutral-700/80"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-neutral-800/90 border border-neutral-700/60 flex items-center justify-center text-indigo-400 flex-shrink-0">
          <IconComponent className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
              Fattore {index + 1}
            </span>
          </div>
          <h2 className="text-lg font-bold text-neutral-100">{category.title}</h2>
          {category.subtitle && (
            <p className="text-xs text-neutral-400 mt-0.5">{category.subtitle}</p>
          )}
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {category.options.map((opt) => {
          const isSelected = selectedValue === opt.id;
          const isTriggerX = opt.isAutomaticX;

          return (
            <button
              key={opt.id}
              id={`option-${category.id}-${opt.id}`}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                isSelected
                  ? isTriggerX
                    ? 'border-red-500 bg-red-950/40 text-neutral-100 shadow-md ring-1 ring-red-500/50'
                    : 'border-indigo-500 bg-indigo-950/40 text-neutral-100 shadow-md ring-1 ring-indigo-500/50'
                  : 'border-neutral-800/90 bg-neutral-900/40 hover:bg-neutral-800/50 hover:border-neutral-700 text-neutral-300'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Radio check indicator */}
                <div
                  className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? isTriggerX
                        ? 'border-red-500 bg-red-600 text-white'
                        : 'border-indigo-500 bg-indigo-600 text-white'
                      : 'border-neutral-700 bg-neutral-800/80 group-hover:border-neutral-600'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Option text */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-sm font-semibold tracking-tight ${
                        isSelected ? 'text-white' : 'text-neutral-200'
                      }`}
                    >
                      {opt.label}
                    </span>
                    {opt.id === 'radical_right' && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Eccezione
                      </span>
                    )}
                  </div>
                  {opt.note && (
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                      {opt.note}
                    </p>
                  )}
                </div>
              </div>

              {/* Point Badge */}
              <div className="flex-shrink-0 pl-2">
                {isTriggerX ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black bg-red-600/30 text-red-300 border border-red-500/40">
                    <Flame className="w-3 h-3 text-red-400" />
                    X
                  </span>
                ) : (
                  <span
                    className={`inline-block px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                      isSelected
                        ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-500/40'
                        : opt.points === 0
                        ? 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                        : 'bg-neutral-800/90 text-neutral-300 border border-neutral-700/80'
                    }`}
                  >
                    {opt.points > 0 ? `+${opt.points} pt` : '0 pt'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
