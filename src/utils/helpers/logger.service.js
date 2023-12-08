/* eslint-disable prefer-rest-params */
export class LoggerService {
  constructor() {
    this.environment = null;
  }

  get debugMode() {
    this.environment = window["__env"];
    return this.environment?.debug ?? false;
  }

  get log() {
    return this.debugMode ? console.log.bind(window.console) : function () {};
  }

  get debug() {
    return this.debugMode ? console.debug.bind(window.console) : function () {};
  }

  get info() {
    return this.debugMode ? console.info.bind(window.console) : function () {};
  }

  get warn() {
    return this.debugMode ? console.warn.bind(window.console) : function () {};
  }

  get error() {
    if (window["__env"]?.production) {
      const original = window.console["error"];
      console["error"] = function () {
        if (arguments?.[0]) {
          logToServer(arguments[0]);
        }

        if (original.apply) {
          original.apply(original, arguments);
        } else {
          const message = Array.prototype.slice.apply(arguments).join(" ");
          original(message);
        }
      };
    }
    return this.debugMode ? console.error.bind(window.console) : function () {};
  }

  get table() {
    return this.debugMode ? console.table.bind(window.console) : function () {};
  }
}

export const logger = new LoggerService();

export const logToServer = (error) => {
  if (!Object.keys(error).length) return;
  const env = window["__env"];

  const errorPrep = {
    error,
    env,
    user: JSON.parse(localStorage.getItem("user") ?? "{}"),
    userAgent: navigator.userAgent,
    currentUrl: window.location.href,
    time: new Date(),
    history: document.referrer,
    windowWidth:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    windowHeight:
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight,
  };

  const logServer = env?.urls?.logServer;
  if (logServer) {
    fetch(logServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorPrep),
    });
  }
};
