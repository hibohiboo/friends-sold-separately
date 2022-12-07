export const mswInit = (callback: () => void) => {
  if (import.meta.env.DEV) {
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { worker } = await import('./mocks/browser');

      worker.start();
      callback();
    })();
  } else {
    callback();
  }
};
