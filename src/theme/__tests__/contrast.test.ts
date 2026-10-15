import { describe, expect, it } from '@jest/globals';

import { colors, contrast, NAVY, onDark } from '..';

// Aurora Glass surfaces: the navy background and the lightest glass panel.
const SURFACES = { navy: NAVY, glass: '#262060' };

describe('Aurora Glass colours meet WCAG AA', () => {
  const text = { ink: colors.ink, ink2: colors.ink2, ink3: colors.ink3, inkBody: colors.inkBody };
  const accents = { primary: colors.primary, success: colors.success, danger: colors.danger, saffron: colors.saffron, teal: colors.teal };
  const inks = { saffronInk: colors.saffronInk, successInk: colors.successInk, dangerInk: colors.dangerInk, warnInk: colors.warnInk };

  it.each(Object.entries({ ...text, ...accents, ...inks }))('%s reads on navy and on glass', (_, c) => {
    for (const s of Object.values(SURFACES)) expect(contrast(c, s)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(Object.entries(accents))('navy text reads on a %s fill', (_, c) => {
    expect(contrast(colors.onColor, c)).toBeGreaterThanOrEqual(4.5);
  });

  it('lifts dark content colours and leaves bright ones alone', () => {
    expect(contrast(onDark('#1D4ED8'), SURFACES.glass)).toBeGreaterThanOrEqual(4.6);
    expect(onDark('#FFFFFF')).toBe('#FFFFFF');
  });
});
