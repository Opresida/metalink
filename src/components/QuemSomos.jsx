import React from 'react';

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="section">
      <div className="section-inner">
        <div className="reveal">
          <div className="section-label">Sobre a Empresa</div>
          <h2 className="section-title">Quem somos</h2>
          <div className="divider" />
          <p className="section-desc">Empresa de consultoria com atuação em tecnologia, inovação e desenvolvimento de soluções corporativas. Estrutura moderna, governança definida e foco em resultados mensuráveis.</p>
        </div>
        <div className="qs-grid">
          <div className="qs-card reveal reveal-d1">
            <h3>Nossa atuação</h3>
            <ul>
              <li>
                <div className="qs-icon">▴</div>
                <div>Consultoria com foco em <strong>tecnologia, inovação</strong> e desenvolvimento de soluções customizadas.</div>
              </li>
              <li>
                <div className="qs-icon">◆</div>
                <div>Estrutura moderna adaptada à <strong>nova economia digital</strong> e ao mercado B2B contemporâneo.</div>
              </li>
              <li>
                <div className="qs-icon">↗</div>
                <div>Foco em <strong>escalabilidade, eficiência</strong> e geração real de valor para os negócios dos clientes.</div>
              </li>
            </ul>
          </div>
          <div className="qs-card reveal reveal-d2">
            <h3>Credenciais e formalização</h3>
            <ul>
              <li>
                <div className="qs-icon">✓</div>
                <div><strong>CNPJ:</strong> 29.776.966/0001-05 — ativa desde 2018 (porte ME).</div>
              </li>
              <li>
                <div className="qs-icon">✓</div>
                <div>Estrutura societária <strong>regular</strong> e governança comercial definida.</div>
              </li>
              <li>
                <div className="qs-icon">✓</div>
                <div>Capital social integralizado: <strong>R$ 30.000,00</strong>, evidenciando solidez operacional.</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
