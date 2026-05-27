import React from 'react';
import NetworkCanvas from './NetworkCanvas.jsx';

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-text">
        <div className="hero-meta reveal">
          <span><span className="hero-meta-dot" /> META<em style={{ color: 'var(--node)', fontStyle: 'normal' }}>·</em>LINK <span className="dim">v.2026</span></span>
          <span><span className="dim">/</span> manaus·am</span>
          <span><span className="dim">/</span> b2b·consultoria</span>
        </div>
        <h1 className="hero-title reveal reveal-d1">
          <span className="hero-title-line">Conectamos</span>
          <span className="hero-title-line"><em>estratégia</em> a</span>
          <span className="hero-title-line"><em>execução</em>.</span>
        </h1>
        <p className="hero-sub reveal reveal-d2">
          Cada projeto é uma conexão entre um problema real e o método que resolve.
          Trabalhamos consultoria, tecnologia e inovação como camadas de um único sistema.
        </p>
        <div className="hero-btns reveal reveal-d3">
          <a href="#contatos" className="btn btn--primary">iniciar.sessao()</a>
          <a href="#projetos" className="btn btn--ghost">mapa.projetos →</a>
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
