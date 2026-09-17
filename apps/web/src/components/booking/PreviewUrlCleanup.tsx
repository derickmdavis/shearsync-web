"use client";

import { useEffect } from "react";

export function PreviewUrlCleanup() {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("preview");

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, []);

  return null;
}
