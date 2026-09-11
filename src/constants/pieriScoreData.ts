import { QuestionCategory, AttenuanteItem, ScoreState, ScoreResult } from '../types';

export const CATEGORIES: QuestionCategory[] = [
  {
    id: 'tattoos',
    title: 'Tatuaggi',
    subtitle: 'Presenza di tatuaggi corporei o eccezioni ideologiche',
    iconName: 'PenTool',
    options: [
      {
        id: 'none',
        label: 'Nessun tatuaggio',
        points: 0,
        note: 'Pelle immacolata',
      },
      {
        id: 'any',
        label: 'Qualsiasi numero di tatuaggi',
        points: 10,
        note: 'Da piccoli simboli a maniche intere (10 punti)',
      },
      {
        id: 'radical_right',
        label: '*Eccezione: tatuaggi riconducibili a ideologie di destra radicale',
        points: 3,
        note: 'Tariffa speciale agevolata (3 punti anziché 10)',
      },
    ],
  },
  {
    id: 'bodycount',
    title: 'Bodycount',
    subtitle: 'Numero stimato o dichiarato di partner sessuali passati',
    iconName: 'Users',
    options: [
      {
        id: 'under_6',
        label: '< 6 partner',
        points: 3,
        note: 'Range controllato (>6 nel prospetto originale = 3 punti)',
      },
      {
        id: '6_to_10',
        label: '6 - 10 partner',
        points: 8,
        note: 'Fascia intermedia (8 punti)',
      },
      {
        id: '10_to_15',
        label: '10 - 15 partner',
        points: 12,
        note: 'Fascia elevata (12 punti)',
      },
      {
        id: 'over_15',
        label: '> 15 partner',
        points: 15,
        isAutomaticX: true,
        note: 'Condizione critica: Trigger X (Rischio altissimo immediato)',
      },
    ],
  },
  {
    id: 'fatherRelationship',
    title: 'Rapporto con il padre',
    subtitle: 'Presenza e dinamiche paterne nel nucleo familiare',
    iconName: 'UserCheck',
    options: [
      {
        id: 'present_good',
        label: 'Padre presente, buon rapporto',
        points: 0,
        note: 'Equilibrio familiare ottimale (0 punti)',
      },
      {
        id: 'present_good_low_edu',
        label: 'Padre presente, buon rapporto ma carenza educativa rilevante',
        points: 6,
        note: 'Affetto presente ma assenza di polso o guida formativa (6 punti)',
      },
      {
        id: 'present_bad',
        label: 'Padre presente, cattivo rapporto',
        points: 10,
        note: 'Conflitto continuo o risentimento manifesto (10 punti)',
      },
      {
        id: 'absent',
        label: 'Padre fisicamente assente dal nucleo abitativo',
        points: 12,
        note: 'Assenza fisica continuativa / abbandono (12 punti)',
      },
    ],
  },
  {
    id: 'psychologist',
    title: 'Frequentazione psicologo',
    subtitle: 'Durata cumulativa o attuale del percorso di terapia psicologica',
    iconName: 'Brain',
    options: [
      {
        id: 'never',
        label: 'Nessuna frequentazione / Mai andata',
        points: 0,
        note: 'Nessuna seduta psicologica (0 punti)',
      },
      {
        id: 'under_1_month',
        label: '< 1 mese',
        points: 3,
        note: 'Fase esplorativa iniziale (3 punti)',
      },
      {
        id: '1_to_6_months',
        label: '1 - 6 mesi',
        points: 6,
        note: 'Percorso breve (6 punti)',
      },
      {
        id: '6_to_12_months',
        label: '6 - 12 mesi',
        points: 8,
        note: 'Percorso consolidato (8 punti)',
      },
      {
        id: 'over_12_months',
        label: '> 12 mesi',
        points: 12,
        note: 'Terapia cronica / a lungo termine (12 punti)',
      },
    ],
  },
  {
    id: 'socialActivity',
    title: 'Attività social',
    subtitle: 'Frequenza di pubblicazione foto/storie e tipologia di account',
    iconName: 'Share2',
    options: [
      {
        id: 'max_1_monthly',
        label: 'Max 1 foto/storia pubblicata al mese',
        points: 0,
        note: 'Profilo sobrio, uso minimale (0 punti)',
      },
      {
        id: '1_to_5_monthly',
        label: '1 - 5 foto/storie pubblicate al mese',
        points: 6,
        note: 'Attività regolare media (6 punti)',
      },
      {
        id: 'over_5_monthly',
        label: '> 5 foto/storie pubblicate al mese',
        points: 10,
        note: 'Presenza costante sulle piattaforme (10 punti)',
      },
      {
        id: 'softcore',
        label: 'Foto porno softcore pubblicate',
        points: 15,
        note: 'Contenuti ammiccanti o intimo in evidenza (15 punti)',
      },
      {
        id: 'influencer',
        label: 'Influencer (reale o wannabe)',
        points: 20,
        isAutomaticX: true,
        note: 'Condizione critica: Trigger X (Rischio altissimo immediato)',
      },
    ],
  },
  {
    id: 'smoking',
    title: 'Fumo / Svapo / IQOS',
    subtitle: 'Abitudine al tabacco tradizionale o da inalazione elettronica',
    iconName: 'Cigarette',
    options: [
      {
        id: 'no_smoke',
        label: 'Non fuma / Non usa svapo / Non usa IQOS',
        points: 0,
        note: 'Nessun consumo di tabacco o vapore (0 punti)',
      },
      {
        id: 'smoker',
        label: 'Fumo / svapo / icos',
        points: 20,
        isAutomaticX: true,
        note: 'Condizione critica: Trigger X (Rischio altissimo immediato)',
      },
    ],
  },
];

export const ATTENUANTI: AttenuanteItem[] = [
  {
    id: 'serena_guido',
    label: 'È Serena Guido',
    discount: 15,
    subtitle: 'Immunità leggendaria o eccezione ad personam',
    tag: '-15 pt',
  },
  {
    id: 'no_social',
    label: 'Nessun social network',
    discount: 10,
    subtitle: 'Zero profili Instagram, TikTok, BeReal, Facebook',
    tag: '-10 pt',
  },
  {
    id: 'nordic_phenotype',
    label: 'Fenotipo nordico',
    discount: 8,
    subtitle: 'Tratti somatici nord-europei / bionda con occhi chiari',
    tag: '-8 pt',
  },
  {
    id: 'joke_reaction',
    label: 'Ha riso quando al primo appuntamento le hai raccontato la barzelletta del negro che vuole iscriversi all\'università',
    discount: 6,
    subtitle: 'Dimostrata tolleranza al black humor d\'annata al date inaugurale',
    tag: '-6 pt',
  },
  {
    id: 'sweet_face',
    label: 'Ha un viso dolce (cit.)',
    discount: 1,
    subtitle: 'Mitezza dei lineamenti facciali attenuante d\'ufficio',
    tag: '-1 pt',
  },
];

export const INITIAL_SCORE_STATE: ScoreState = {
  tattoos: 'none',
  bodycount: 'under_6',
  fatherRelationship: 'present_good',
  psychologist: 'never',
  socialActivity: 'max_1_monthly',
  smoking: 'no_smoke',
  selectedAttenuanti: [],
};

export function calculatePieriScore(state: ScoreState): ScoreResult {
  let baseScore = 0;
  const xTriggers: string[] = [];

  // Tattoos
  const tattooOpt = CATEGORIES[0].options.find((o) => o.id === state.tattoos);
  if (tattooOpt) {
    baseScore += tattooOpt.points;
    if (tattooOpt.isAutomaticX) xTriggers.push(`Tatuaggi: ${tattooOpt.label}`);
  }

  // Bodycount
  const bcOpt = CATEGORIES[1].options.find((o) => o.id === state.bodycount);
  if (bcOpt) {
    baseScore += bcOpt.points;
    if (bcOpt.isAutomaticX) xTriggers.push(`Bodycount: ${bcOpt.label}`);
  }

  // Father
  const fatherOpt = CATEGORIES[2].options.find((o) => o.id === state.fatherRelationship);
  if (fatherOpt) {
    baseScore += fatherOpt.points;
    if (fatherOpt.isAutomaticX) xTriggers.push(`Padre: ${fatherOpt.label}`);
  }

  // Psychologist
  const psychoOpt = CATEGORIES[3].options.find((o) => o.id === state.psychologist);
  if (psychoOpt) {
    baseScore += psychoOpt.points;
    if (psychoOpt.isAutomaticX) xTriggers.push(`Psicologo: ${psychoOpt.label}`);
  }

  // Social
  const socialOpt = CATEGORIES[4].options.find((o) => o.id === state.socialActivity);
  if (socialOpt) {
    baseScore += socialOpt.points;
    if (socialOpt.isAutomaticX) xTriggers.push(`Social: ${socialOpt.label}`);
  }

  // Smoking
  const smokeOpt = CATEGORIES[5].options.find((o) => o.id === state.smoking);
  if (smokeOpt) {
    baseScore += smokeOpt.points;
    if (smokeOpt.isAutomaticX) xTriggers.push(`Fumo/Svapo/Icos`);
  }

  // Attenuanti
  let totalDiscount = 0;
  state.selectedAttenuanti.forEach((attId) => {
    const item = ATTENUANTI.find((a) => a.id === attId);
    if (item) {
      totalDiscount += item.discount;
    }
  });

  const netScore = Math.max(0, baseScore - totalDiscount);
  const isAutomaticX = xTriggers.length > 0;

  // Determination of Risk
  // Prompt rules:
  // X: collocazione automatica nella categoria Rischio altissimo
  // <6 punti: Rischio basso
  // 6-9 punti: Rischio moderato-basso
  // 9-12 punti: Rischio moderato-alto
  // 12-15: Rischio alto
  // >15: Rischio altissimo

  if (isAutomaticX) {
    return {
      baseScore,
      totalDiscount,
      netScore,
      isAutomaticX: true,
      xTriggers,
      riskLevel: 'altissimo',
      riskLabel: 'Rischio Altissimo (Trigger X)',
      riskColor: {
        bg: 'bg-red-950/40',
        border: 'border-red-600',
        text: 'text-red-500',
        badgeBg: 'bg-red-500/20 text-red-400 border border-red-500/30',
        accent: '#ef4444',
        barColor: 'bg-red-600',
      },
      advice:
        'Collocazione automatica: Presenza di fattore non negoziabile X (Bodycount >15, Influencer o Fumo/Svapo/Icos). Rischio critico assoluto indipendentemente dalle attenuanti.',
    };
  }

  if (netScore < 6) {
    return {
      baseScore,
      totalDiscount,
      netScore,
      isAutomaticX: false,
      xTriggers: [],
      riskLevel: 'basso',
      riskLabel: 'Rischio Basso',
      riskColor: {
        bg: 'bg-emerald-950/30',
        border: 'border-emerald-500',
        text: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
        accent: '#10b981',
        barColor: 'bg-emerald-500',
      },
      advice: 'Punteggio sotto i 6 punti. Profilo bilanciato con stabilità relazionale elevata e minime incognite.',
    };
  }

  if (netScore <= 9) {
    return {
      baseScore,
      totalDiscount,
      netScore,
      isAutomaticX: false,
      xTriggers: [],
      riskLevel: 'moderato-basso',
      riskLabel: 'Rischio Moderato-Basso',
      riskColor: {
        bg: 'bg-lime-950/30',
        border: 'border-lime-500',
        text: 'text-lime-400',
        badgeBg: 'bg-lime-500/20 text-lime-300 border border-lime-500/30',
        accent: '#84cc16',
        barColor: 'bg-lime-500',
      },
      advice: 'Punteggio tra 6 e 9 punti. Margine di gestione favorevole con lievi peculiarità caratteriali.',
    };
  }

  if (netScore <= 12) {
    return {
      baseScore,
      totalDiscount,
      netScore,
      isAutomaticX: false,
      xTriggers: [],
      riskLevel: 'moderato-alto',
      riskLabel: 'Rischio Moderato-Alto',
      riskColor: {
        bg: 'bg-amber-950/30',
        border: 'border-amber-500',
        text: 'text-amber-400',
        badgeBg: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
        accent: '#f59e0b',
        barColor: 'bg-amber-500',
      },
      advice: 'Punteggio tra 9 e 12 punti. Richiede cautela, monitoraggio delle dinamiche e nervi saldi.',
    };
  }

  if (netScore <= 15) {
    return {
      baseScore,
      totalDiscount,
      netScore,
      isAutomaticX: false,
      xTriggers: [],
      riskLevel: 'alto',
      riskLabel: 'Rischio Alto',
      riskColor: {
        bg: 'bg-orange-950/30',
        border: 'border-orange-500',
        text: 'text-orange-400',
        badgeBg: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
        accent: '#f97316',
        barColor: 'bg-orange-500',
      },
      advice: 'Punteggio tra 12 e 15 punti. Zona rossa di pericolo: alta volatilità e turbolenza garantita.',
    };
  }

  // > 15
  return {
    baseScore,
    totalDiscount,
    netScore,
    isAutomaticX: false,
    xTriggers: [],
    riskLevel: 'altissimo',
    riskLabel: 'Rischio Altissimo',
    riskColor: {
      bg: 'bg-red-950/40',
      border: 'border-red-600',
      text: 'text-red-500',
      badgeBg: 'bg-red-500/20 text-red-400 border border-red-500/30',
      accent: '#ef4444',
      barColor: 'bg-red-600',
    },
    advice: 'Punteggio superiore a 15 punti. Soglia di allarme superata: evacuazione consigliata.',
  };
}
