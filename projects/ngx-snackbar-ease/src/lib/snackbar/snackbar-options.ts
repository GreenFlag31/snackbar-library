export interface Options {
  snackbar?: {
    enter?: string;
    leave?: string;
    top?: string;
    left?: string;
    position?: Position;
    duration?: number;
  };
  size?: {
    height?: string;
    maxHeight?: string;
    width?: string;
    maxWidth?: string;
    padding?: string;
  };
  data?: {
    [key: string]: unknown;
  };
}

export type Position =
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
  | 'top-left'
  | 'top'
  | 'top-right';
