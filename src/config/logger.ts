// src/lib/logger.ts

type LogArguments = unknown[];

const isDevelopment = import.meta.env.VITE_ENV === "development";

const getCallerFile = (): string => {
  const stack = new Error().stack;

  if (!stack) {
    return "unknown";
  }

  const stackLines = stack.split("\n");

  // Skip:
  // 0 -> Error
  // 1 -> getCallerFile()
  // 2 -> logger method
  // 3 -> actual caller
  const callerLine = stackLines[3];

  if (!callerLine) {
    return "unknown";
  }

  // Chrome / Edge:
  // at functionName (http://localhost:5173/src/foo.ts:10:5)
  // at http://localhost:5173/src/foo.ts:10:5
  //
  // Firefox:
  // functionName@http://localhost:5173/src/foo.ts:10:5

  const match = callerLine.match(/(?:\()?(https?:\/\/[^)\s]+|\/[^)\s]+):\d+:\d+(?:\))?/);

  if (!match) {
    return "unknown";
  }

  return match[1];
};

const log =
  (level: "info" | "debug" | "warn" | "error") =>
  (...args: LogArguments): void => {
    if (!isDevelopment) {
      return;
    }

    const filePath = getCallerFile();

    const prefix = `[${level.toUpperCase()}] [${filePath}]`;

    switch (level) {
      case "info":
        console.info(prefix, ...args);
        break;

      case "debug":
        console.debug(prefix, ...args);
        break;

      case "warn":
        console.warn(prefix, ...args);
        break;

      case "error":
        console.error(prefix, ...args);
        break;
    }
  };

const logger = {
  info: log("info"),
  debug: log("debug"),
  warn: log("warn"),
  error: log("error"),
};

export default logger;
