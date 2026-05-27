import React from 'react';
import { faq } from '../data/faq.js';

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Dúvidas frequentes</div>
          <h2 className="section-title">Perguntas e respostas</h2>
          <div className="divider" style={{ margin: '18px auto' }} />
        </div>
        <div className="faq-list">
          {faq.map((item, i) => (
            <details key={i} className="faq-item reveal">
              <summary>{item.pergunta}</summary>
              <div className="faq-content">{item.resposta}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
