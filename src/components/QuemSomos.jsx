import React from 'react';

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="module">
      <div className="wrap">
        <div className="module-head reveal">
          <div className="module-num">[01] /sobre</div>
          <h2 className="module-title">
            Uma marca <em>concebida</em> para a Amazônia —<br />
            com arquitetura intelectual própria.
          </h2>
        </div>

        <div className="manifesto-grid">
          <article className="manifesto reveal reveal-d1">
            <p className="manifesto-prelude">/* origem · 2018 */</p>
            <p>
              A <strong>META LINK</strong> nasceu em 2018, concebida com
              <em> arquitetura intelectual própria</em> — visão estratégica, inteligência
              institucional e propósito amazônico desde o primeiro dia. Pensada, não improvisada.
            </p>
            <p>
              Cada ciclo de projeto somou-se ao nosso know-how; cada parceria, ao nosso
              repertório. Crescemos sem perder o DNA que nos fundou:
              <em> repertório multiplicado, identidade preservada</em>.
            </p>
            <p>
              Operamos a partir de Manaus — vivendo a Amazônia, não consultando-a de longe.
              Integramos estratégia, tecnologia, ciência e território em um único movimento.
            </p>
          </article>

          <aside className="manifesto-meta reveal reveal-d2">
            <div className="meta-block">
              <span className="label-mute">[cnpj]</span>
              <p className="meta-val">29.776.966/0001-05</p>
            </div>
            <div className="meta-block">
              <span className="label-mute">[ativa.desde]</span>
              <p className="meta-val">2018<span className="dim">/03</span></p>
            </div>
            <div className="meta-block">
              <span className="label-mute">[capital.social]</span>
              <p className="meta-val">R$ 30.000<span className="dim">,00</span></p>
              <span className="dimmer t-mono">integralizado</span>
            </div>
            <div className="meta-block">
              <span className="label-mute">[porte]</span>
              <p className="meta-val">ME<span className="dim"> · governanca regular</span></p>
            </div>
            <div className="meta-block">
              <span className="label-mute">[sede]</span>
              <p className="meta-val">Manaus<span className="dim"> · AM</span></p>
              <span className="dimmer t-mono">lat -3.1190 · lng -60.0217</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
