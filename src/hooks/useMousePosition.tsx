interface State {
  x: number | undefined;
  y: number | undefined;
}

function useMousePosition() {
  const [
    mousePosition,
    setMousePosition
  ] = React.useState<State>({ x: undefined, y: undefined });

  React.useEffect(() => {
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