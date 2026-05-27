import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  { num: '01', label: 'sobre',    link: '#quem-somos' },
  { num: '02', label: 'servicos', link: '#servicos' },
  { num: '03', label: 'projetos', link: '#projetos' },
  { num: '04', label: 'faq',      link: '#faq' },
  { num: '05', label: 'contato',  link: '#contatos' },
];

function useTime() {
  const [t, setT] = useState(() => fmt(new Date()));
  useEffect(() => {
    const id = setInterval(() => setT(fmt(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}
function fmt(d) {
  return d.toLocaleTimeString('en-GB', { hour12: false, timeZone: 'America/Manaus' });
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const time = useTime();

  function handleLink(link, e) {
    if (link.startsWith('#')) {
      e.preventDefault();
      setOpen(false);
      if (location.pathname !== '/') {
        window.location.href = '/' + link;
        return;
      }
      const el = document.querySelector(link);
      if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
  }

  return (
    <header className="hdr">
      <div className="hdr-inner">
        <Link to="/" className="hdr-logo">
          <img src="/icon-metalink-transparent.png" alt="" />
          <span className="hdr-logo-text">META<em>·</em>LINK</span>
        </Link>
        <nav className="hdr-nav">
          {menu.map(item => (
            <a key={item.num} href={item.link} onClick={(e) => handleLink(item.link, e)}>
              <span className="hdr-nav-num">[{item.num}]</span> {item.label}
            </a>
          ))}
        </nav>
        <div className="hdr-status">
          <span className="hdr-time">{time}</span>
          <span className="hdr-live">sistema ativo</span>
        </div>
        <button className={`hdr-burger${open ? ' hdr-burger--open' : ''}`} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
      <nav className={`hdr-drawer${open ? ' open' : ''}`}>
        {menu.map(item => (
          <a key={item.num} href={item.link} onClick={(e) => handleLink(item.link, e)}>
            <span className="hdr-nav-num">[{item.num}]</span> {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
