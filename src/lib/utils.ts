import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPassword = async (password: string) => bcrypt.hash(password, 10);

export const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Network response was not ok. Status: ${res.status} - ${errorBody}`);
    }

    if (res.status === 204 || res.headers.get("content-length") === "0") {
      return {} as T;
    }

    const contentType = res.headers.get("Content-Type")?.toLowerCase();
    if (contentType?.includes("application/json")) return res.json() as Promise<T>;
    if (contentType?.includes("text/")) return res.text() as unknown as T;

    throw new Error(`Unsupported content type: ${contentType}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
    console.error("API Request Error:", errorMessage);
    throw error instanceof Error ? error : new Error(errorMessage);
  }
};
