declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }
 
  export = WebpackWorker;
}

declare var API_URL_BASE: string;