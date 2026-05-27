import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Quem Somos', link: '#quem-somos' },
  { label: 'Serviços', link: '#servicos' },
  { label: 'Projetos', link: '#projetos' },
  { label: 'FAQ', link: '#faq' },
  { label: 'Contato', link: '#contatos' },
];

const ROTAS_HEADER_SOLIDO = [];

export default function Header() {
  const location = useLocation();
  const forcarSolido = ROTAS_HEADER_SOLIDO.includes(location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isScrolled = forcarSolido || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleLink(link, e) {
    if (link.startsWith('#')) {
      e.preventDefault();
      setOpen(false);
      if (location.pathname !== '/') {
        window.location.href = '/' + link;
        return;
      }
      const el = document.querySelector(link);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  }

  return (
    <header className={`hdr${isScrolled ? ' scrolled' : ''}`}>
      <div className="hdr-inner">
        <Link to="/" className="hdr-logo">
          <img src="/icon-metalink.png" alt="META LINK" />
          <span className="hdr-logo-text">META LINK</span>
        </Link>
        <nav className="hdr-nav">
          {menuItems.map(item => (
            <a key={item.link} href={item.link} onClick={(e) => handleLink(item.link, e)}>{item.label}</a>
          ))}
        </nav>
        <div className="hdr-cta">
          <a href="#contatos" onClick={(e) => handleLink('#contatos', e)} className="btn btn-primary">Fale Conosco</a>
        </div>
        <button className="hdr-burger" aria-label="Abrir menu" onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
      <nav className={`hdr-drawer${open ? ' open' : ''}`}>
        {menuItems.map(item => (
          <a key={item.link} href={item.link} onClick={(e) => handleLink(item.link, e)}>{item.label}</a>
        ))}
        <div className="hdr-drawer-cta">
          <a href="#contatos" onClick={(e) => handleLink('#contatos', e)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Fale Conosco</a>
        </div>
      </nav>
    </header>
  );
}
