import React, { useEffect, useRef } from "react";

export default function NavigateToTop() {
  const topElementRef = useRef(null);

  useEffect(() => {
    if (topElementRef.current) {
      topElementRef.current.focus();
    }
  }, []);

  return null;
}
