import React, { useState } from 'react';

const camadas = [
  {
    id: 'estrategia',
    num: '01',
    titulo: 'Estratégia',
    tag: 'estratégia · modelagem',
    desc: 'Visão, governança e arquitetura organizacional. Diagnóstico de maturidade, modelagem institucional e roadmaps de inovação que saem do papel.',
    output: 'plano executável + governança',
  },
  {
    id: 'tecnologia',
    num: '02',
    titulo: 'Tecnologia',
    tag: 'engenharia · IA · plataformas',
    desc: 'Soluções digitais, IA aplicada, dados e infraestrutura. Da floresta ao painel executivo, em tempo real — engenharia própria quando precisa, integração quando já existe.',
    output: 'sistemas em produção',
  },
  {
    id: 'ciencia',
    num: '03',
    titulo: 'Ciência',
    tag: 'pesquisa aplicada · PD&I',
    desc: 'Estudos, evidências e estruturação científica. Pesquisa aplicada, editais e infraestrutura de PD&I conectados à realidade amazônica.',
    output: 'projeto aprovado + recurso captado',
  },
  {
    id: 'ecossistema',
    num: '04',
    titulo: 'Ecossistema',
    tag: 'formação · articulação',
    desc: 'Capacitação técnica em escala, alianças e ativação de redes. Formamos pessoas e fortalecemos ecossistemas de inovação no território.',
    output: 'ecossistema ativado',
  },
];

export default function Servicos() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="servicos" className="module">
      <div className="wrap">
        <div className="module-head reveal">
          <div className="module-num">[02] /atuação</div>
          <h2 className="module-title">
            Quatro <em>camadas</em>. Uma só arquitetura —
            <br />integradas em um único movimento.
          </h2>
        </div>

        <div className="servicos-grafo">
          <svg className="servicos-svg" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
            <line x1="125" y1="40" x2="375" y2="40" className={`svc-edge ${hovered ? 'svc-edge--active' : ''}`} />
            <line x1="375" y1="40" x2="625" y2="40" className={`svc-edge ${hovered ? 'svc-edge--active' : ''}`} />
            <line x1="625" y1="40" x2="875" y2="40" className={`svc-edge ${hovered ? 'svc-edge--active' : ''}`} />
            <circle cx="125" cy="40" r="4" className="svc-edge-dot" />
            <circle cx="375" cy="40" r="4" className="svc-edge-dot" />
            <circle cx="625" cy="40" r="4" className="svc-edge-dot" />
            <circle cx="875" cy="40" r="4" className="svc-edge-dot" />
          </svg>

          <div className="servicos-nodes">
            {camadas.map((c, i) => (
              <article
                key={c.id}
                className={`svc-node reveal reveal-d${i + 1}`}
                data-active={hovered === c.id ? 'true' : undefined}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="svc-node-head">
                  <span className="label-mute">{`<no.${c.num}>`}</span>
                  <h3 className="svc-node-title">{c.titulo}</h3>
                  <span className="svc-node-tag">{c.tag}</span>
                </div>
                <p className="svc-node-desc">{c.desc}</p>
                <div className="svc-node-foot">
                  <span className="label-mute">[output]</span>
                  <span>{c.output}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
