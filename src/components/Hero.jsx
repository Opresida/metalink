import React from 'react';

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow reveal">Consultoria Estratégica</p>
          <h1 className="hero-title reveal reveal-d1">
            Estratégia, <em>Tecnologia</em><br />
            e Inovação.
          </h1>
          <p className="hero-sub reveal reveal-d2">
            Integramos consultoria, tecnologia e inovação para desenvolver soluções escaláveis, sustentáveis e alinhadas às demandas do mercado contemporâneo.
          </p>
          <div className="hero-btns reveal reveal-d3">
            <a href="#servicos" className="btn btn-primary">Conheça nossos serviços</a>
            <a href="#contatos" className="btn btn-ghost">Falar com a equipe</a>
          </div>
          <div className="hero-loc reveal reveal-d4">
            <span className="hero-loc-dot" />
            Manaus — Amazonas
          </div>
        </div>
      </div>
    </section>
  );
}
