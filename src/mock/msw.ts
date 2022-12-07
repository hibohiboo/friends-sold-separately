export const mswInit = async () => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { worker } = await import('./mocks/browser');

    worker.start();
  }
};
