/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  BASE_URL: (import.meta as any).env.VITE_BASE_URL as string,
  ENV: (import.meta as any).env.VITE_ENV as string,
};
