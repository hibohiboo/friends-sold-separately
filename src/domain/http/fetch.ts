// RequestInfoは tsconfig.jsonの"lib"に"DOM"を入れると使えるようになる
export const myFetch = async (input: RequestInfo, init: RequestInit) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);
  try {
    const res = await fetch(input, { signal: controller.signal, ...init });
    if (!res.ok) throw new Error(`${res.status}:${res.statusText}`);
    return res;
  } catch (e) {
    console.warn(e);
    throw e;
  } finally {
    clearTimeout(timeout);
  }
};
