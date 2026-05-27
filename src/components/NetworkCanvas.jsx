import React, { useRef, useEffect } from 'react';

/**
 * Rede animada — pontos se conectando quando estão próximos.
 * Inspirado em particles.js mas escrito do zero pra controle total.
 */
export default function NetworkCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let nodes = [];
    let mouse = { x: -9999, y: -9999 };
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resize() {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
    }
    function init() {
      const r = canvas.getBoundingClientRect();
      const count = Math.min(58, Math.floor((r.width * r.height) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1.2 + Math.random() * 1.8,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function frame() {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);

      // Update
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > r.width) n.vx *= -1;
        if (n.y < 0 || n.y > r.height) n.vy *= -1;
        n.pulse += 0.02;
      });

      // Lines between near nodes
      const maxDist = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.32;
            ctx.strokeStyle = `rgba(0, 229, 165, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Mouse interaction — node attraction + line to nearest
      let nearest = null;
      let nearestD = 180;
      nodes.forEach(n => {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < nearestD) { nearest = n; nearestD = d; }
      });
      if (nearest) {
        ctx.strokeStyle = `rgba(0, 229, 165, ${0.6 - nearestD / 300})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(nearest.x, nearest.y);
        ctx.stroke();
      }

      // Nodes (with pulse)
      nodes.forEach(n => {
        const pulseR = n.r + Math.sin(n.pulse) * 0.4;
        ctx.fillStyle = '#00E5A5';
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fill();
        // glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 4);
        grd.addColorStop(0, 'rgba(0, 229, 165, .22)');
        grd.addColorStop(1, 'rgba(0, 229, 165, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }
    function onResize() { resize(); init(); }

    resize();
    init();
    frame();

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
