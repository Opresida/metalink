import React, { useState, useEffect } from 'react';

const steps = [
  'inicializando.sessao',
  'autenticando',
  'estabelecendo.conexao',
  'sistema.pronto',
];

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 220);
    const t = setTimeout(() => setHidden(true), 1100);
    return () => { clearInterval(tick); clearTimeout(t); };
  }, []);

  return (
    <div className={`loader${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <span className="loader-text">{steps[step]}</span>
    </div>
  );
}
