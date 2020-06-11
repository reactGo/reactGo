export {};

declare module '*.png' {
  const value: any;
  export = value;
}

declare global {
  interface Error {}
  interface Window {
    __INITIAL_STATE__: any;
  }
  interface NodeModule {
    hot: any;
  }
}
