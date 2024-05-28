import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<Args = unknown, Response = unknown>(
  func: (...args: Args[]) => Response | Promise<Response>,
  timeout = 300
) {
  let timer: NodeJS.Timeout;
  return (...args: Args[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-expect-error the error is the actual behaviour we need.
      func.apply(this, args);
    }, timeout);
  };
}
