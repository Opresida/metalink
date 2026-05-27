import React, { useState } from 'react';
import { projetos } from '../data/projetos.js';

/**
 * Mapa de Conexões — cada projeto é um nó com coordenadas no plano.
 * Relações (edges) ligam projetos relacionados.
 */
const layout = {
  1:  { x: 18, y: 22, cluster: 'a' }, // Home Care Tech
  9:  { x: 36, y: 14, cluster: 'a' }, // Transformação Digital
  6:  { x: 50, y: 30, cluster: 'a' }, // Sistemas
  7:  { x: 68, y: 18, cluster: 'a' }, // Lab Pesquisa

  2:  { x: 14, y: 60, cluster: 'b' }, // Núcleo PMEs
  5:  { x: 32, y: 72, cluster: 'b' }, // Educação Corp
  8:  { x: 52, y: 64, cluster: 'b' }, // Eventos

  3:  { x: 74, y: 52, cluster: 'c' }, // Hub Inovação
  10: { x: 86, y: 68, cluster: 'c' }, // Captação
  4:  { x: 88, y: 36, cluster: 'c' }, // Intermediação B2B
};

const edges = [
  [1, 9], [9, 6], [6, 7], [1, 6],
  [2, 5], [5, 8], [2, 8],
  [3, 10], [10, 4], [3, 4],
  [6, 8], [7, 3], [9, 4],
];

const clusterColor = {
  a: 'var(--node)',
  b: 'var(--signal)',
  c: 'var(--warm)',
};

export default function Projetos() {
  const [active, setActive] = useState(null);
  const activeP = projetos.find(p => p.id === active);
  const activeEdges = active ? edges.filter(([a, b]) => a === active || b === active) : [];
  const connected = active ? new Set(activeEdges.flatMap(([a, b]) => [a, b])) : new Set();

  return (
    <section id="projetos" className="module">
      <div className="wrap">
        <div className="module-head reveal">
          <div className="module-num">[03] /projetos</div>
          <h2 className="module-title">
            Dez <em>nós</em> ativos compõem o mapa
            <br />atual de operações da META LINK.
          </h2>
        </div>

        <div className="proj-map reveal reveal-d1">
          <div className="proj-canvas">
            <svg className="proj-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {edges.map(([a, b], i) => {
                const A = layout[a]; const B = layout[b];
                const isActive = active && (a === active || b === active);
                return (
                  <line
                    key={i}
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    className={`proj-edge${isActive ? ' proj-edge--active' : ''}`}
                  />
                );
              })}
            </svg>
            {projetos.map(p => {
              const pos = layout[p.id];
              if (!pos) return null;
              const isActive = p.id === active;
              const isConn = connected.has(p.id);
              return (
                <button
                  key={p.id}
                  className={`proj-node proj-node--${pos.cluster}${isActive ? ' proj-node--active' : ''}${active && !isActive && !isConn ? ' proj-node--dim' : ''}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, '--node-color': clusterColor[pos.cluster] }}
                  onClick={() => setActive(active === p.id ? null : p.id)}
                  onMouseEnter={() => setActive(p.id)}
                >
                  <span className="proj-node-dot" />
                  <span className="proj-node-label">{String(p.id).padStart(2, '0')} · {p.titulo}</span>
                </button>
              );
            })}

            <div className="proj-axis proj-axis--x">
              <span>tech</span><span>·</span><span>educ</span><span>·</span><span>capital</span>
            </div>
            <div className="proj-axis proj-axis--y">
              <span>operacional</span><span>·</span><span>estrutural</span>
            </div>
          </div>

          <div className="proj-detail">
            {activeP ? (
              <>
                <div className="proj-detail-head">
                  <span className="label-mute">{`<no.${String(activeP.id).padStart(2, '0')}>`}</span>
                  <h3>{activeP.titulo}</h3>
                </div>
                <p className="proj-detail-desc">{activeP.descricao}</p>
                <div className="proj-detail-grid">
                  <div>
                    <span className="label-mute">[status]</span>
                    <span className={`proj-pill proj-pill--${activeP.status}`}>{activeP.statusLabel}</span>
                  </div>
                  <div>
                    <span className="label-mute">[receita]</span>
                    <span>{activeP.receita}</span>
                  </div>
                  <div>
                    <span className="label-mute">[conexoes]</span>
                    <span>{activeEdges.length} nós relacionados</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="proj-detail-empty">
                <p className="t-mono dim">// passe o mouse sobre um nó</p>
                <p className="t-mono dim">// para inspecionar o projeto</p>
              </div>
            )}
          </div>
        </div>

        <div className="proj-legend reveal reveal-d2">
          <span><span className="proj-dot" style={{ background: 'var(--node)' }} /> cluster tech</span>
          <span><span className="proj-dot" style={{ background: 'var(--signal)' }} /> cluster educação · operação</span>
          <span><span className="proj-dot" style={{ background: 'var(--warm)' }} /> cluster capital · inovação</span>
        </div>
      </div>
    </section>
  );
}
