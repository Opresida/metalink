import React, { useEffect } from 'react';
import Loader from '../components/Loader.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import CursorTrace from '../components/CursorTrace.jsx';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import QuemSomos from '../components/QuemSomos.jsx';
import Servicos from '../components/Servicos.jsx';
import Projetos from '../components/Projetos.jsx';
import MetricsTicker from '../components/MetricsTicker.jsx';
import FAQ from '../components/FAQ.jsx';
import Contatos from '../components/Contatos.jsx';
import Footer from '../components/Footer.jsx';
import WhatsAppBtn from '../components/WhatsAppBtn.jsx';
import useReveal from '../hooks/useReveal.js';

export default function Home() {
  useReveal();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    let tries = 0;
    const scrollToHash = () => {
      const el = document.querySelector(hash);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        return;
      }
      if (tries++ < 40) setTimeout(scrollToHash, 100);
    };
    setTimeout(scrollToHash, 200);
  }, []);

  return (
    <>
      <Loader />
      <ProgressBar />
      <CursorTrace />
      <Header />
      <main>
        <Hero />
        <QuemSomos />
        <Servicos />
        <Projetos />
        <MetricsTicker />
        <FAQ />
        <Contatos />
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
