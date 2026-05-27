import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Brandbook.css';

const COLORS = [
  { name: 'Navy', hex: '#0E1729', use: 'Background principal de todas as seções' },
  { name: 'Navy 2', hex: '#131D33', use: 'Background de cards e elementos secundários' },
  { name: 'Mint', hex: '#2EE5A5', use: 'Accent primário, divisores, ícones, CTAs' },
  { name: 'Blue', hex: '#3B9DFF', use: 'Accent secundário, hover, badges' },
  { name: 'White', hex: '#FFFFFF', use: 'Texto principal sobre fundos escuros' },
  { name: 'Gray', hex: '#A0AEC4', use: 'Texto secundário, corpo' },
];

const FONTS = [
  { nome: 'Cinzel', uso: 'Logo, títulos de display, headings principais', exemplo: 'META LINK CONSULTORIA' },
  { nome: 'Inter', uso: 'Corpo de texto, UI, labels, navegação', exemplo: 'Consultoria estratégica em tecnologia, inovação e desenvolvimento.' },
];

export default function Brandbook() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  function copy(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="bb">
      <header className="bb-header">
        <div className="bb-header-inner">
          <Link to="/" className="bb-back">← Voltar ao site</Link>
          <div className="bb-header-logo">
            <img src="/icon-metalink.png" alt="META LINK" />
            <span>META LINK · Brandbook</span>
          </div>
        </div>
      </header>

      <main className="bb-main">
        <section className="bb-hero">
          <div className="bb-hero-inner">
            <p className="bb-eyebrow">Manual de Identidade Visual</p>
            <h1>Brandbook<br /><em>META LINK</em></h1>
            <p className="bb-hero-desc">Documento oficial de identidade visual, tipografia, cores institucionais e diretrizes de aplicação da marca META LINK CONSULTORIA.</p>
          </div>
        </section>

        <section className="bb-section">
          <div className="bb-section-inner">
            <p className="bb-label">01 — Logotipo</p>
            <h2>Logo Oficial</h2>
            <p className="bb-desc">A marca META LINK é composta pelo símbolo (elo) e tipografia em Cinzel. Use sempre as versões oficiais — nunca recriar.</p>
            <div className="bb-logo-grid">
              <div className="bb-logo-card bb-logo-card--dark">
                <img src="/logo-metalink.png" alt="Logo principal" />
                <div className="bb-logo-meta"><strong>Logo Principal</strong><span>Fundo escuro (oficial)</span></div>
              </div>
              <div className="bb-logo-card bb-logo-card--icon">
                <img src="/icon-metalink.png" alt="Ícone" />
                <div className="bb-logo-meta"><strong>Símbolo Isolado</strong><span>Avatar, favicon, redes sociais</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bb-section bb-section--alt">
          <div className="bb-section-inner">
            <p className="bb-label">02 — Paleta Cromática</p>
            <h2>Cores Institucionais</h2>
            <p className="bb-desc">6 cores oficiais que definem a identidade visual em todas as aplicações. Clique no hex pra copiar.</p>
            <div className="bb-colors-grid">
              {COLORS.map(c => (
                <button key={c.hex} className="bb-color" onClick={() => copy(c.hex)} title={`Copiar ${c.hex}`}>
                  <div className="bb-color-swatch" style={{ background: c.hex }} />
                  <div className="bb-color-info">
                    <strong>{c.name}</strong>
                    <span className="bb-color-hex">{c.hex}</span>
                    <span className="bb-color-use">{c.use}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bb-section">
          <div className="bb-section-inner">
            <p className="bb-label">03 — Tipografia</p>
            <h2>Fontes Oficiais</h2>
            <p className="bb-desc">Trio tipográfico para todas as aplicações da marca, do digital ao impresso.</p>
            <div className="bb-fonts-grid">
              {FONTS.map(f => (
                <div key={f.nome} className="bb-font-card">
                  <div className="bb-font-name" style={{ fontFamily: f.nome }}>{f.exemplo}</div>
                  <div className="bb-font-meta">
                    <strong>{f.nome}</strong>
                    <span>{f.uso}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bb-section bb-section--alt">
          <div className="bb-section-inner">
            <p className="bb-label">04 — Diretrizes</p>
            <h2>Regras de Aplicação</h2>
            <div className="bb-guidelines">
              <div className="bb-guide bb-guide--do">
                <h4>✓ Fazer</h4>
                <ul>
                  <li>Usar apenas as 6 cores oficiais da paleta</li>
                  <li>Aplicar fundo navy (#0E1729) como base padrão</li>
                  <li>Usar Cinzel para headings e logotipo</li>
                  <li>Usar Inter para corpo, UI e labels</li>
                  <li>Manter área de respiro mínima ao redor do logo</li>
                  <li>Usar verde menta (#2EE5A5) como accent principal</li>
                </ul>
              </div>
              <div className="bb-guide bb-guide--dont">
                <h4>✗ Não Fazer</h4>
                <ul>
                  <li>Distorcer, rotacionar ou recortar o logo</li>
                  <li>Usar cores fora da paleta oficial</li>
                  <li>Aplicar fontes que não sejam Cinzel ou Inter</li>
                  <li>Adicionar sombras, brilhos ou efeitos 3D</li>
                  <li>Reduzir o logo abaixo de 32px de altura</li>
                  <li>Usar a logo sobre fundo de baixo contraste</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bb-footer">
        <div className="bb-footer-inner">
          <span>© {new Date().getFullYear()} META LINK CONSULTORIA · Brandbook v1.0</span>
          <Link to="/">← Voltar ao site</Link>
        </div>
      </footer>
    </div>
  );
}
