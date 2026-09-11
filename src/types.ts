export type RiskLevel = 
  | 'basso'
  | 'moderato-basso'
  | 'moderato-alto'
  | 'alto'
  | 'altissimo';

export interface ScoreOption {
  id: string;
  label: string;
  points: number;
  isAutomaticX?: boolean;
  note?: string;
}

export interface QuestionCategory {
  id: string;
  title: string;
  subtitle?: string;
  iconName: string;
  options: ScoreOption[];
}

export interface AttenuanteItem {
  id: string;
  label: string;
  discount: number; // positive number to be subtracted (e.g. 15 for -15 pt)
  subtitle?: string;
  tag?: string;
}

export interface ScoreState {
  tattoos: string;
  bodycount: string;
  fatherRelationship: string;
  psychologist: string;
  socialActivity: string;
  smoking: string;
  selectedAttenuanti: string[];
}

export interface ScoreResult {
  baseScore: number;
  totalDiscount: number;
  netScore: number;
  isAutomaticX: boolean;
  xTriggers: string[];
  riskLevel: RiskLevel;
  riskLabel: string;
  riskColor: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    accent: string;
    barColor: string;
  };
  advice: string;
}

export interface AnagraficaData {
  nome: string;
  eta: string;
  citta: string;
  professione: string;
  conosciutaSu: string;
  note: string;
  dataValutazione: string;
}

export interface SavedEvaluation {
  id: string;
  candidateName: string;
  timestamp: number;
  anagrafica?: AnagraficaData;
  state: ScoreState;
  result: ScoreResult;
  notes?: string;
}
