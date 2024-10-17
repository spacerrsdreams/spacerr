export const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw {
        message: `Network response was not ok. Status: ${res.status}`,
        status: res.status,
        body: errorBody,
      };
    }

    if (res.status === 204 || res.headers.get("content-length") === "0") {
      return {} as T;
    }

    const contentType = res.headers.get("Content-Type")?.toLowerCase();

    if (contentType && contentType.includes("application/json")) {
      return (await res.json()) as T;
    }

    if (contentType && contentType.includes("text/")) {
      return (await res.text()) as unknown as T;
    }

    throw new Error(`Unsupported content type: ${contentType}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request was aborted.");
      }
      console.error("API Request Error: ", error.message);
      throw error;
    }

    if (typeof error === "object" && error !== null && "message" in error) {
      const err = error as { message: string };
      console.error("Custom API Error: ", err.message);
      throw new Error(err.message);
    }

    console.error("Unknown API Request Error");
    throw new Error("An unknown error occurred during the API request.");
  }
};
