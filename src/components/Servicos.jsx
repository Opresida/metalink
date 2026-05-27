import React from 'react';
import { servicos } from '../data/servicos.js';

export default function Servicos() {
  return (
    <section id="servicos" className="section">
      <div className="section-inner">
        <div className="reveal">
          <div className="section-label">Estrutura Estratégica</div>
          <h2 className="section-title">Nossos serviços</h2>
          <div className="divider" />
          <p className="section-desc">Três frentes integradas que cobrem a jornada completa do diagnóstico à entrega, com foco em resultado.</p>
        </div>
        <div className="serv-grid">
          {servicos.map((s, i) => (
            <div key={s.id} className={`serv-card reveal reveal-d${i + 1}`}>
              <div className="serv-icon">{s.icone}</div>
              <h3>{s.titulo}</h3>
              <hr />
              <p>{s.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
