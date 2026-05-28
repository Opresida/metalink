import React from 'react';
import NetworkCanvas from './NetworkCanvas.jsx';

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-text">
        <div className="hero-meta reveal">
          <span><span className="hero-meta-dot" /> META<em style={{ color: 'var(--node)', fontStyle: 'normal' }}>//</em>LINK <span className="dim">desde 2018</span></span>
          <span><span className="dim">/</span> manaus·amazonas</span>
          <span><span className="dim">/</span> consultoria estratégica</span>
        </div>
        <h1 className="hero-title reveal reveal-d1">
          <span className="hero-title-line">Inteligência, inovação e</span>
          <span className="hero-title-line">desenvolvimento <em>estratégico</em></span>
          <span className="hero-title-line">para a <em>Amazônia</em>.</span>
        </h1>
        <p className="hero-sub reveal reveal-d2">
          Transformamos desafios amazônicos em soluções estruturantes, tecnológicas e
          sustentáveis — integrando estratégia, tecnologia, ciência e território em um único movimento.
        </p>
        <div className="hero-btns reveal reveal-d3">
          <a href="#contatos" className="btn btn--primary">Falar com a diretoria</a>
          <a href="#projetos" className="btn btn--ghost">nossas frentes →</a>
        </div>
      </div>
      <div className="hero-canvas-wrap">
        <NetworkCanvas />
      </div>
      <div className="hero-coords">
        <span>lat: <span className="dim">-3.1190</span></span>
        <span>lng: <span className="dim">-60.0217</span></span>
        <span>desde: <span className="dim">2018</span></span>
      </div>
    </section>
  );
}
