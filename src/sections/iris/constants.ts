import type { IrisMode } from '../../types/app';

export const IRIS_MODES = {
  HOME: 'home',
  TALK: 'talk',
  TEXT: 'text'
} as const;

export const IrisModeHelpers = {
  shouldShowBottomNav: (mode: IrisMode): boolean => {
    return mode === IRIS_MODES.HOME;
  },

  getDefaultMode: (): IrisMode => IRIS_MODES.HOME,

  isValidMode: (mode: string): mode is IrisMode => {
    return Object.values(IRIS_MODES).includes(mode as IrisMode);
  }
};
