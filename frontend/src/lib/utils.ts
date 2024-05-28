import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const merge = (input1: object, input2: object) => {
  const keys = Object.keys(input1).concat(Object.keys(input2));
  const res: Record<string, unknown> = {};
  keys.forEach((key) => {
    if (
      typeof input1[key as keyof typeof input1] === "object" &&
      typeof input2[key as keyof typeof input2] === "object"
    ) {
      res[key] = merge(
        input1[key as keyof typeof input1],
        input2[key as keyof typeof input2]
      );
    } else res[key] = input2[key as keyof typeof input2];
  });
  return res;
};
