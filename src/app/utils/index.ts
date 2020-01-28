export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as any
  );
}

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
export const getHashParams = () => {
  const hash = new URLSearchParams(window.location.hash.substring(1));
  return {
    access_token: hash.get('access_token'),
    refresh_token: hash.get('refresh_token')
  };
}
