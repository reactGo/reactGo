export {};
declare global {
  interface Error {}
  interface Window {
    __INITIAL_STATE__: any;
  }
  interface NodeModule {
    hot: any;
  }
}
