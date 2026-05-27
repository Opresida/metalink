import React from 'react';

const items = [
  { k: 'pdi.norte', v: 'R$ 2bn', d: 'movimento atual anual' },
  { k: 'projecao', v: 'R$ 5bn', d: 'pos reforma tributaria', up: true },
  { k: 'zfm', v: 'ativa', d: 'lei de informatica vigente' },
  { k: 'migracao.corp', v: 'crescente', d: 'sul → norte' },
  { k: 'demanda.tech', v: 'aquecida', d: 'estruturacao avancada' },
  { k: 'projetos.ativos', v: '10', d: 'no mapa atual' },
  { k: 'desde', v: '2018', d: 'operacao continua' },
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
