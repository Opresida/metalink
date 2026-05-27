import React, { useEffect, useRef } from 'react';

/**
 * Cursor minimal — ponto verde que segue o ponteiro.
 * Esconde em touch devices via CSS.
 */
export default function CursorTrace() {
  const dotRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    let raf;

    function onMove(e) {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      dot.style.opacity = '1';
    }
    function onLeave() { dot.style.opacity = '0'; }

    function loop() {
      const { x: tx, y: ty } = targetRef.current;
      const { x: px, y: py } = posRef.current;
      posRef.current.x = px + (tx - px) * 0.22;
      posRef.current.y = py + (ty - py) * 0.22;
      dot.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={dotRef} className="cursor-trace" aria-hidden="true" />;
}
