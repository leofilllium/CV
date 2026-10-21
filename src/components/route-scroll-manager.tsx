"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteScrollManager() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const previous = previousPathname.current;
    previousPathname.current = pathname;

    if (previous === null || previous === pathname || window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
