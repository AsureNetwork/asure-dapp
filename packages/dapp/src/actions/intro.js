export const DISABLE_INTRO = '@@app/DISABLE_INTRO';
export const SKIP_INTRO = '@@app/SKIP_INTRO';
export const SHOW_INTRO = '@@app/SHOW_INTRO';

export function disableIntro() {
  return { type: DISABLE_INTRO };
}

export function skipIntro() {
  return { type: SKIP_INTRO };
}

export function showIntro() {
  return { type: SHOW_INTRO };
}
