function getApiOrigin() {
  const apiUrl = String(import.meta.env.VITE_API_URL || "");

  if (!apiUrl) {
    if (typeof window !== "undefined") {
      const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
      if (isLocalHost) {
        return "http://localhost:4000";
      }
    }

    return "";
  }

  try {
    return new URL(apiUrl).origin;
  } catch {
    if (typeof window !== "undefined") {
      const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
      if (isLocalHost) {
        return "http://localhost:4000";
      }
    }

    return "";
  }
}

export function resolveAssetUrl(src?: string | null) {
  if (!src) {
    return "";
  }

  if (/^https?:\/\//i.test(src)) {
    return src;
  }

  if (src.startsWith("/assets/")) {
    return src;
  }

  if (src.startsWith("/uploads/")) {
    const origin = getApiOrigin();
    return origin ? `${origin}${src}` : src;
  }

  return src;
}
