export type OutfitId = 'cricket-cap' | 'grad-cap' | 'explorer-hat' | 'safa';

export const OUTFITS: { id: OutfitId; name: string; blurb: string; price: number }[] = [
  { id: 'cricket-cap', name: 'Cricket cap', blurb: 'For the ones who code between overs', price: 100 },
  { id: 'explorer-hat', name: 'Explorer hat', blurb: 'Every yatra needs one', price: 150 },
  { id: 'grad-cap', name: 'Graduation cap', blurb: 'Dress for the certificate you want', price: 200 },
  { id: 'safa', name: 'Festive safa', blurb: 'Celebrate every finished stage', price: 300 },
];

export const STREAK_FREEZE = { price: 50, max: 2 };

/** Coins for finishing a lesson; perfect runs earn a bonus. */
export const coinsFor = (kind: 'lesson' | 'practice', perfect: boolean) => (kind === 'lesson' ? 10 : 5) + (perfect ? 5 : 0);
