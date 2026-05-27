import React from 'react';

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="module">
      <div className="wrap">
        <div className="module-head reveal">
          <div className="module-num">[01] /sobre</div>
          <h2 className="module-title">
            Uma <em>consultoria</em> que opera como um<br />
            sistema integrado, não como departamentos.
          </h2>
        </div>

        <div className="manifesto-grid">
          <article className="manifesto reveal reveal-d1">
            <p className="manifesto-prelude">/* manifesto.md */</p>
            <p>
              A <strong>META LINK</strong> nasceu em 2018 com uma tese simples:
              empresas brasileiras não precisam de mais frameworks — precisam de
              alguém que <em>conecte</em> diagnóstico, decisão e execução em um único fio.
            </p>
            <p>
              Construímos a operação inteira sobre essa ideia. Cada cliente é tratado
              como um sistema vivo: o que parece um problema de gestão muitas vezes é
              um problema de dados; o que parece tecnologia muitas vezes é estratégia mal
              traduzida; e o que parece inovação muitas vezes é só execução com método.
            </p>
            <p>
              Por isso operamos em três camadas que conversam entre si — não em silos.
              Quando entregamos, o cliente recebe uma <em>conexão</em>, não um relatório.
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
