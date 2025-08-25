import * as React from "react";

/**
 * Déverrouille le scroll uniquement sur les pages où ce composant est monté.
 * Restaure les styles précédents en cleanup.
 */
export default function ScrollSafe() {
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevRootHeight = root ? root.style.height : "";

    html.style.overflowY = "auto";
    body.style.overflowY = "auto";
    if (root) root.style.height = "auto";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      if (root) root.style.height = prevRootHeight;
    };
  }, []);

  return null;
}
