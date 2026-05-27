import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="section-inner">
        <div className="ft-grid">
          <div className="ft-brand">
            <div className="ft-brand-top">
              <img src="/icon-metalink.png" alt="META LINK" />
              <span className="ft-brand-name">META LINK</span>
            </div>
            <p>Consultoria estratégica em tecnologia, inovação e desenvolvimento de soluções. Manaus, no coração da Amazônia, conectando negócios em todo o Brasil.</p>
          </div>
          <div className="ft-col">
            <h5>Navegação</h5>
            <ul>
              <li><a href="#quem-somos">Quem Somos</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#projetos">Projetos</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contatos">Contato</a></li>
              <li><Link to="/brandbook">Brandbook</Link></li>
            </ul>
          </div>
          <div className="ft-col">
            <h5>Institucional</h5>
            <ul>
              <li><a href="mailto:contato@metalinkconsultoria.com.br">contato@metalinkconsultoria.com.br</a></li>
              <li><span>Manaus — Amazonas</span></li>
              <li><span>CNPJ 29.776.966/0001-05</span></li>
            </ul>
          </div>
        </div>
        <div className="ft-bottom">
          <span className="ft-bottom-text">© {new Date().getFullYear()} META LINK CONSULTORIA. Todos os direitos reservados.</span>
          <span className="ft-bottom-cnpj">Ativa desde 2018</span>
        </div>
      </div>
    </footer>
  );
}
