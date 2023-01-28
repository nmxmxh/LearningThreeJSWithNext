import { useState, useEffect } from "react";

interface State {
  x: number | undefined;
  y: number | undefined;
}

export default function useMousePosition() {
  const [
    mousePosition,
    setMousePosition
  ] = useState<State>({ x: undefined, y: undefined });

  useEffect(() => {
    function updateMousePosition(event: MouseEvent) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};