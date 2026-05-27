import React, { useState } from 'react';
import { faq } from '../data/faq.js';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="module">
      <div className="wrap">
        <div className="module-head reveal">
          <div className="module-num">[04] /faq</div>
          <h2 className="module-title">
            Perguntas que <em>aparecem antes</em><br />
            do primeiro contrato.
          </h2>
        </div>

        <div className="faq-terminal reveal reveal-d1">
          {faq.map((item, i) => {
            const isOpen = i === open;
            return (
              <div key={i} className={`faq-row${isOpen ? ' faq-row--open' : ''}`}>
                <button className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="faq-prompt">{isOpen ? '─' : '>'}</span>
                  <span className="faq-q-text">{item.pergunta}</span>
                  <span className="faq-q-num">{String(i + 1).padStart(2, '0')}</span>
                </button>
                {isOpen && (
                  <div className="faq-a">
                    <span className="faq-prompt faq-prompt--a">~</span>
                    <p>{item.resposta}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
