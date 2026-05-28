import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <img src="/icon-metalink-transparent.png" alt="" />
            <div>
              <div className="ft-brand-name">META<span className="bracket-key">//</span>LINK</div>
              <div className="ft-brand-sub t-mono dim">inteligência · inovação · amazônia</div>
            </div>
          </div>
          <div className="ft-meta t-mono">
            <span className="dim">[v.2026.1]</span>
            <span className="dim">·</span>
            <span className="dim">manaus·am</span>
            <span className="dim">·</span>
            <span className="dim">ativa desde 2018</span>
          </div>
        </div>

        <div className="ft-grid">
          <div className="ft-col">
            <span className="label-mute">[mapa]</span>
            <ul>
              <li><a href="#quem-somos">/sobre</a></li>
              <li><a href="#servicos">/atuação</a></li>
              <li><a href="#projetos">/frentes</a></li>
              <li><a href="#faq">/faq</a></li>
              <li><a href="#contatos">/contato</a></li>
              <li><Link to="/brandbook">/brandbook <span className="dimmer">[restrito]</span></Link></li>
            </ul>
          </div>

          <div className="ft-col">
            <span className="label-mute">[contato]</span>
            <ul>
              <li><a href="mailto:contato@metalinkconsultoria.com.br">contato@metalinkconsultoria.com.br</a></li>
              <li><span className="dim">manaus · amazonas</span></li>
              <li><span className="dim">brasil</span></li>
            </ul>
          </div>

          <div className="ft-col">
            <span className="label-mute">[institucional]</span>
            <ul>
              <li><span className="dim">cnpj 29.776.966/0001-05</span></li>
              <li><span className="dim">porte me · governanca regular</span></li>
              <li><span className="dim">capital R$ 30.000 integralizado</span></li>
            </ul>
          </div>

          <div className="ft-col">
            <span className="label-mute">[coords]</span>
            <ul>
              <li><span className="dim">lat <span className="t-mono" style={{ color: 'var(--node)' }}>-3.1190</span></span></li>
              <li><span className="dim">lng <span className="t-mono" style={{ color: 'var(--node)' }}>-60.0217</span></span></li>
              <li><span className="dim">tz <span className="t-mono" style={{ color: 'var(--node)' }}>GMT-4</span></span></li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <span className="t-mono dim">© {new Date().getFullYear()} · META LINK CONSULTORIA</span>
          <span className="t-mono dim">/* sistema vivo · build {new Date().toISOString().slice(0, 10)} */</span>
        </div>
      </div>
    </footer>
  );
}
