import React, { useState } from 'react';

export default function Contatos() {
  const [form, setForm] = useState({ nome: '', email: '', empresa: '', contexto: '' });
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const body = [
      `nome: ${form.nome}`,
      `email: ${form.email}`,
      form.empresa ? `empresa: ${form.empresa}` : null,
      '',
      `contexto:`,
      form.contexto,
    ].filter(Boolean).join('\n');
    window.location.href = `mailto:contato@metalinkconsultoria.com.br?subject=${encodeURIComponent('[site] nova sessao')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contatos" className="module">
      <div className="wrap">
        <div className="module-head reveal">
          <div className="module-num">[05] /contato</div>
          <h2 className="module-title">
            Abrir uma <em>sessão</em> de diagnóstico
            <br />começa com uma mensagem.
          </h2>
        </div>

        <div className="ct-grid">
          <div className="ct-info reveal reveal-d1">
            <div className="ct-block">
              <span className="label-mute">[email.comercial]</span>
              <a href="mailto:contato@metalinkconsultoria.com.br" className="ct-val">contato@metalinkconsultoria.com.br</a>
            </div>
            <div className="ct-block">
              <span className="label-mute">[sede.fisica]</span>
              <p className="ct-val">Manaus · Amazonas <span className="dim">/ Brasil</span></p>
              <span className="dimmer t-mono">lat -3.1190 · lng -60.0217</span>
            </div>
            <div className="ct-block">
              <span className="label-mute">[atendimento]</span>
              <p className="ct-val">Diretoria comercial direta</p>
              <span className="dimmer t-mono">sem intermediário, sem callcenter</span>
            </div>
            <div className="ct-block">
              <span className="label-mute">[cnpj]</span>
              <p className="ct-val">29.776.966/0001-05</p>
            </div>
            <div className="ct-block">
              <span className="label-mute">[disponibilidade]</span>
              <p className="ct-val">
                <span className="ct-pulse" /> aceitando novos projetos
              </p>
              <span className="dimmer t-mono">resposta em até 48h úteis</span>
            </div>
          </div>

          <form className="ct-form reveal reveal-d2" onSubmit={onSubmit}>
            <div className="ct-form-head">
              <span className="label">$ iniciar.sessao()</span>
              <span className="label-mute">// preencha os campos abaixo</span>
            </div>
            {sent ? (
              <div className="ct-form-success">
                <span className="label">[ok] mensagem encaminhada</span>
                <p className="dim">retornamos em ate 48h uteis.</p>
              </div>
            ) : (
              <>
                <label className="ct-field">
                  <span><span className="bracket-key">›</span> nome</span>
                  <input required value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="seu nome completo" />
                </label>
                <label className="ct-field">
                  <span><span className="bracket-key">›</span> email</span>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="contato@empresa.com" />
                </label>
                <label className="ct-field">
                  <span><span className="bracket-key">›</span> empresa <span className="dimmer">opcional</span></span>
                  <input value={form.empresa} onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))} placeholder="nome da organização" />
                </label>
                <label className="ct-field">
                  <span><span className="bracket-key">›</span> contexto</span>
                  <textarea required rows="4" value={form.contexto} onChange={e => setForm(f => ({ ...f, contexto: e.target.value }))} placeholder="o que está tentando resolver?" />
                </label>
                <button type="submit" className="btn btn--primary">enviar.sessao()</button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
