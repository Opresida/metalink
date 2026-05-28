import React from 'react';

const items = [
  { k: 'desde', v: '2018', d: 'operacao continua' },
  { k: 'competencias', v: '12', d: 'integradas em uma empresa' },
  { k: 'dominios', v: '10', d: 'frentes de know-how aplicado' },
  { k: 'camadas', v: '4', d: 'uma so arquitetura' },
  { k: 'bioeconomia', v: 'ativa', d: 'valor real da floresta' },
  { k: 'alianca', v: 'IDASAM', d: 'parceria estrategica' },
  { k: 'sede', v: 'manaus·am', d: 'coracao da amazonia' },
  { k: 'capitulo', v: 'amplificacao', d: 'novo ciclo · 2026', up: true },
];

const loop = [...items, ...items];

export default function MetricsTicker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {loop.map((it, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-key">{it.k}</span>
            <span className="ticker-eq">=</span>
            <span className={`ticker-val${it.up ? ' ticker-val--up' : ''}`}>{it.v}</span>
            <span className="ticker-desc">/* {it.d} */</span>
          </span>
        ))}
      </div>
    </div>
  );
}
