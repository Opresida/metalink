import React, { useState } from 'react';

const camadas = [
  {
    id: 'estrategia',
    num: '01',
    titulo: 'Estratégia',
    tag: 'consultoria · diagnóstico',
    desc: 'Diagnosticamos o sistema atual da empresa e desenhamos o caminho do ponto A ao B com escopo, prazo e indicadores definidos. Sem powerpoint que ninguém abre depois.',
    output: 'plano de ação executável + governança',
  },
  {
    id: 'tecnologia',
    num: '02',
    titulo: 'Tecnologia',
    tag: 'engenharia · IA · automação',
    desc: 'Construímos as ferramentas que destravam o plano. Apps, automação de processos, dashboards, IA aplicada — código próprio quando precisa, ou integração quando existe.',
    output: 'sistemas em produção + manutenção',
  },
  {
    id: 'inovacao',
    num: '03',
    titulo: 'Inovação',
    tag: 'bioeconomia · captação · impacto',
    desc: 'Estruturamos projetos de impacto e bioeconomia conectados ao ecossistema amazônico, com captação técnica em bancos, fundos e editais públicos.',
    output: 'projeto aprovado + recurso captado',
  },
];

export default function Servicos() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="servicos" className="module">
      <div className="wrap">
        <div className="module-head reveal">
          <div className="module-num">[02] /servicos</div>
          <h2 className="module-title">
            Três <em>camadas</em> conectadas que cobrem
            <br />a jornada inteira — diagnóstico → entrega.
          </h2>
        </div>

        <div className="servicos-grafo">
          <svg className="servicos-svg" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">
            <line x1="166" y1="40" x2="500" y2="40" className={`svc-edge ${hovered ? 'svc-edge--active' : ''}`} />
            <line x1="500" y1="40" x2="834" y2="40" className={`svc-edge ${hovered ? 'svc-edge--active' : ''}`} />
            <circle cx="166" cy="40" r="4" className="svc-edge-dot" />
            <circle cx="500" cy="40" r="4" className="svc-edge-dot" />
            <circle cx="834" cy="40" r="4" className="svc-edge-dot" />
          </svg>

          <div className="servicos-nodes">
            {camadas.map((c, i) => (
              <article
                key={c.id}
                className={`svc-node reveal reveal-d${i + 1}${hovered === c.id ? ' svc-node--active' : ''}`}
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
