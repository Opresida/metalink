import React from 'react';
import { projetos } from '../data/projetos.js';

export default function Projetos() {
  return (
    <section id="projetos" className="section">
      <div className="section-inner">
        <div className="reveal">
          <div className="section-label">Portfólio</div>
          <h2 className="section-title">Projetos em andamento</h2>
          <div className="divider" />
          <p className="section-desc">Dez frentes ativas — entre pilotos, projetos em implementação e estruturados — que sustentam o modelo de negócio recorrente da META LINK.</p>
        </div>
        <div className="proj-grid">
          {projetos.map((p) => (
            <div key={p.id} className="proj-card reveal">
              <span className={`proj-status proj-status--${p.status}`}>{p.statusLabel}</span>
              <h4>{p.titulo}</h4>
              <p>{p.descricao}</p>
              <div className="proj-receita">Receita: <strong>{p.receita}</strong></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
