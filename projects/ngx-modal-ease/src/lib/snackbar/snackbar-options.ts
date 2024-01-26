export interface Options {
  snackbar?: {
    enter?: string;
    leave?: string;
    top?: string;
    left?: string;
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
