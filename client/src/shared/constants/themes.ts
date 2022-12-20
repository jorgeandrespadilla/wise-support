import { Theme, ThemeBreakpoint } from 'types/ui';

export const allThemes: Theme[] = ['light', 'dark', 'system'];

export const sizeByBreakpoint: Record<ThemeBreakpoint, number> = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
};

export const breakpoints = {
    up: (breakpoint: ThemeBreakpoint) =>
        `(min-width: ${sizeByBreakpoint[breakpoint]}px)`,
    down: (breakpoint: ThemeBreakpoint) =>
        `(max-width: ${sizeByBreakpoint[breakpoint]}px)`,
    between: (start: ThemeBreakpoint, end: ThemeBreakpoint) =>
        `(min-width: ${sizeByBreakpoint[start]}px) and (max-width: ${
            sizeByBreakpoint[end] - 0.02
        }px)`,
};
