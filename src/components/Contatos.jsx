import React, { useState } from 'react';

export default function Contatos() {
  const [form, setForm] = useState({ nome: '', email: '', empresa: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const linhas = [
      `Nome: ${form.nome}`,
      `Email: ${form.email}`,
      form.empresa ? `Empresa: ${form.empresa}` : null,
      '',
      form.mensagem,
    ].filter(Boolean).join('\n');
    const mailto = `mailto:contato@metalinkconsultoria.com.br?subject=${encodeURIComponent('Contato pelo site')}&body=${encodeURIComponent(linhas)}`;
    window.location.href = mailto;
    setEnviado(true);
  }

  return (
    <section id="contatos" className="section">
      <div className="section-inner">
        <div className="reveal">
          <div className="section-label">Fale Conosco</div>
          <h2 className="section-title">Vamos conversar</h2>
          <div className="divider" />
          <p className="section-desc">Disponível para abertura de conta empresarial estruturada e desenvolvimento de relacionamento estratégico de longo prazo.</p>
        </div>
        <div className="cont-grid">
          <div className="cont-info">
            <div className="cont-item reveal reveal-d1">
              <div className="cont-item-icon">✉</div>
              <div>
                <h4>Email</h4>
                <a href="mailto:contato@metalinkconsultoria.com.br">contato@metalinkconsultoria.com.br</a>
              </div>
            </div>
            <div className="cont-item reveal reveal-d2">
              <div className="cont-item-icon">⌖</div>
              <div>
                <h4>Sede</h4>
                <p>Manaus — Amazonas</p>
              </div>
            </div>
            <div className="cont-item reveal reveal-d3">
              <div className="cont-item-icon">⚲</div>
              <div>
                <h4>CNPJ</h4>
                <p>29.776.966/0001-05</p>
              </div>
            </div>
            <div className="cont-item reveal reveal-d4">
              <div className="cont-item-icon">⚐</div>
              <div>
                <h4>Atendimento</h4>
                <p>Diretoria Comercial</p>
              </div>
            </div>
          </div>
          <form className="cont-form reveal reveal-d2" onSubmit={onSubmit}>
            {enviado ? (
              <div className="cont-form-success">
                ✓ Mensagem encaminhada. Em breve nossa equipe entrará em contato.
              </div>
            ) : (
              <>
                <label>
                  <span>Nome</span>
                  <input required value={form.nome} onChange={(e) => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Seu nome completo" />
                </label>
                <label>
                  <span>Email</span>
                  <input required type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="seu@email.com" />
                </label>
                <label>
                  <span>Empresa</span>
                  <input value={form.empresa} onChange={(e) => setForm(f => ({ ...f, empresa: e.target.value }))} placeholder="Nome da sua empresa (opcional)" />
                </label>
                <label>
                  <span>Mensagem</span>
                  <textarea required value={form.mensagem} onChange={(e) => setForm(f => ({ ...f, mensagem: e.target.value }))} placeholder="Conte um pouco sobre o que precisa..." />
                </label>
                <button type="submit" className="btn btn-primary">Enviar mensagem</button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
