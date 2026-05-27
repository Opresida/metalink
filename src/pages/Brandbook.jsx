import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Brandbook.css';

/* ── Paleta ── */
const COLORS = [
  { name: 'Void',        var: '--void',      hex: '#050810', use: 'Background base de todo o sistema' },
  { name: 'Surface',     var: '--surface',   hex: '#0A1020', use: 'Cards, blocos secundários' },
  { name: 'Surface 2',   var: '--surface-2', hex: '#131D33', use: 'Hover, blocos ativos' },
  { name: 'Node',        var: '--node',      hex: '#00E5A5', use: 'Accent primário, conexões ativas, sinal' },
  { name: 'Signal',      var: '--signal',    hex: '#4DAEFF', use: 'Accent secundário, status, cluster B' },
  { name: 'Warm',        var: '--warm',      hex: '#F0CFA0', use: 'Accent terciário, destaque editorial' },
  { name: 'Text',        var: '--text',      hex: '#E8ECF5', use: 'Texto principal' },
  { name: 'Text Mute',   var: '--text-mute', hex: '#6B7591', use: 'Texto secundário, body em serif' },
  { name: 'Text Dim',    var: '--text-dim',  hex: '#3E4660', use: 'Texto terciário, números mono' },
];

const FONTS = [
  { name: 'JetBrains Mono', use: 'Labels, dados, metadados, código, números, navegação', sample: '01 ─ sistema ativo' },
  { name: 'Fraunces',       use: 'Display, títulos, corpo editorial, manifesto, citações', sample: 'Conectamos estratégia' },
];

const TABS = [
  { id: 'logo',       label: 'logo',       num: '01' },
  { id: 'cores',      label: 'cores',      num: '02' },
  { id: 'tipografia', label: 'tipografia', num: '03' },
  { id: 'ui',         label: 'ui.system',  num: '04' },
  { id: 'materiais',  label: 'materiais',  num: '05' },
  { id: 'guidelines', label: 'diretrizes', num: '06' },
];

export default function Brandbook() {
  const [tab, setTab] = useState('logo');
  const [copied, setCopied] = useState(null);

  /* Gerador (cartão + assinatura) */
  const [pessoa, setPessoa] = useState({
    nome: 'Nome do Consultor',
    funcao: 'Diretor de Operações',
    cim: '0000',
    email: 'nome@metalinkconsultoria.com.br',
    telefone: '+55 (92) 98113-9760',
  });
  const [pdfStatus, setPdfStatus] = useState({ kind: 'idle', msg: '' });
  const [copyStatus, setCopyStatus] = useState({ kind: 'idle', msg: '' });
  const cardFrenteRef = useRef(null);
  const cardVersoRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function copyHex(hex) {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  }

  function slug(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  async function baixarCartaoPDF() {
    if (!cardFrenteRef.current || !cardVersoRef.current) return;
    setPdfStatus({ kind: 'loading', msg: 'gerando.pdf()' });
    try {
      const imgs = [...cardFrenteRef.current.querySelectorAll('img'), ...cardVersoRef.current.querySelectorAll('img')];
      await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      await new Promise(r => setTimeout(r, 150));
      const opts = { scale: 4, backgroundColor: null, useCORS: true, allowTaint: true, logging: false };
      const frente = await html2canvas(cardFrenteRef.current, opts);
      const verso = await html2canvas(cardVersoRef.current, opts);
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [90, 50] });
      pdf.addImage(frente.toDataURL('image/png'), 'PNG', 0, 0, 90, 50, undefined, 'FAST');
      pdf.addPage([90, 50], 'landscape');
      pdf.addImage(verso.toDataURL('image/png'), 'PNG', 0, 0, 90, 50, undefined, 'FAST');
      pdf.save(`cartao-metalink-${slug(pessoa.nome) || 'sem-nome'}.pdf`);
      setPdfStatus({ kind: 'success', msg: 'pdf.baixado_ok — pronto pra gráfica' });
      setTimeout(() => setPdfStatus({ kind: 'idle', msg: '' }), 4000);
    } catch (e) {
      setPdfStatus({ kind: 'error', msg: `erro: ${e.message}` });
    }
  }

  function assinaturaHTML(p) {
    return `<table cellpadding="0" cellspacing="0" style="font-family:'JetBrains Mono',Consolas,monospace;max-width:540px;background:#050810;padding:24px">
  <tr>
    <td style="padding-right:24px;border-right:1px solid #00E5A5;vertical-align:top">
      <div style="width:64px;height:64px;background:rgba(0,229,165,0.08);display:flex;align-items:center;justify-content:center;text-align:center;line-height:64px">
        <img src="https://i.imgur.com/wpJp2AR.png" alt="META LINK" width="48" style="vertical-align:middle"/>
      </div>
    </td>
    <td style="padding-left:24px;vertical-align:top">
      <p style="margin:0;font-family:'Fraunces',Georgia,serif;font-size:18px;font-weight:400;color:#E8ECF5;letter-spacing:-0.01em">
        ${p.nome}
      </p>
      <p style="margin:4px 0 0;font-family:'JetBrains Mono',monospace;font-size:11px;color:#00E5A5;letter-spacing:0.04em">
        ${p.funcao} <span style="color:#3E4660">· CIM ${p.cim}</span>
      </p>
      <div style="width:32px;height:1px;background:#00E5A5;margin:14px 0"></div>
      <p style="margin:0;font-family:'JetBrains Mono',monospace;font-size:11px;color:#6B7591;line-height:1.7">
        <span style="color:#3E4660">[email]</span> ${p.email}<br/>
        <span style="color:#3E4660">[fone]</span> ${p.telefone}<br/>
        <span style="color:#3E4660">[sede]</span> manaus · am
      </p>
      <p style="margin:14px 0 0;font-family:'JetBrains Mono',monospace;font-style:italic;font-size:11px;color:#F0CFA0">
        // META<span style="color:#00E5A5">·</span>LINK consultoria
      </p>
    </td>
  </tr>
</table>`;
  }

  async function copiarAssinatura() {
    try {
      await navigator.clipboard.writeText(assinaturaHTML(pessoa));
      setCopyStatus({ kind: 'success', msg: 'html.copiado_ok — cole no editor de assinatura' });
      setTimeout(() => setCopyStatus({ kind: 'idle', msg: '' }), 4000);
    } catch (e) {
      setCopyStatus({ kind: 'error', msg: `falha: ${e.message}` });
    }
  }

  function baixarAssinaturaHTML() {
    const blob = new Blob([assinaturaHTML(pessoa)], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `assinatura-metalink-${slug(pessoa.nome) || 'sem-nome'}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bb">
      <header className="bb-header">
        <div className="bb-header-inner">
          <Link to="/" className="bb-back"><span className="bracket-key">←</span> voltar.ao.site</Link>
          <div className="bb-header-logo">
            <img src="/icon-metalink.png" alt="" />
            <span>META<span className="bracket-key">·</span>LINK · brandbook<span className="dimmer"> v.1.0</span></span>
          </div>
        </div>
      </header>

      <main className="bb-main">
        <section className="bb-hero">
          <div className="wrap">
            <p className="bb-hero-prelude t-mono">/* manual.de.identidade.visual */</p>
            <h1 className="bb-hero-title">
              Brandbook<br /><em>META<span style={{color:'var(--node)'}}>·</span>LINK</em>
            </h1>
            <p className="bb-hero-desc">
              Documento oficial de identidade visual, tipografia, cromática institucional, sistema de componentes e materiais aplicados da META LINK CONSULTORIA.
              Tudo derivado do conceito-mãe: <em>sistema vivo</em>.
            </p>
          </div>
        </section>

        <nav className="bb-tabs">
          <div className="wrap bb-tabs-inner">
            {TABS.map(t => (
              <button key={t.id} className={`bb-tab${tab === t.id ? ' bb-tab--active' : ''}`} onClick={() => setTab(t.id)}>
                <span className="bb-tab-num">[{t.num}]</span> {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* ════════════════ LOGO ════════════════ */}
        {tab === 'logo' && (
          <section className="bb-section">
            <div className="wrap">
              <div className="bb-section-head">
                <p className="label">01 · logo</p>
                <h2>Marca <em>META·LINK</em></h2>
                <p className="bb-desc">A marca é composta pelo símbolo (elo) + tipografia mono. O elo representa o ato de conectar — coluna conceitual de todo o sistema. Use sempre as versões oficiais. Nunca recriar.</p>
              </div>
              <div className="bb-logo-grid">
                <div className="bb-logo-card bb-logo-card--main">
                  <img src="/logo-metalink.png" alt="Logo principal" />
                  <div className="bb-logo-meta">
                    <span className="label-mute">[logo.principal]</span>
                    <p>Aplicação oficial sobre fundo void <code>#050810</code></p>
                  </div>
                </div>
                <div className="bb-logo-card bb-logo-card--icon">
                  <img src="/icon-metalink.png" alt="Símbolo" />
                  <div className="bb-logo-meta">
                    <span className="label-mute">[simbolo.isolado]</span>
                    <p>Avatar, favicon, redes sociais</p>
                  </div>
                </div>
              </div>
              <div className="bb-logo-rules">
                <div className="bb-rule">
                  <span className="label-mute">[minimo.altura]</span>
                  <p className="t-mono">32px <span className="dim">/ digital</span> · 12mm <span className="dim">/ print</span></p>
                </div>
                <div className="bb-rule">
                  <span className="label-mute">[area.respiro]</span>
                  <p className="t-mono">1× altura do símbolo em todos os lados</p>
                </div>
                <div className="bb-rule">
                  <span className="label-mute">[formato.exportar]</span>
                  <p className="t-mono">PNG transparente / SVG vetorial</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════ CORES ════════════════ */}
        {tab === 'cores' && (
          <section className="bb-section">
            <div className="wrap">
              <div className="bb-section-head">
                <p className="label">02 · cores</p>
                <h2>Paleta <em>institucional</em></h2>
                <p className="bb-desc">9 cores oficiais. Cada uma com função semântica (não decorativa). Clique no hex pra copiar.</p>
              </div>
              <div className="bb-colors-grid">
                {COLORS.map(c => (
                  <button key={c.hex} className="bb-color" onClick={() => copyHex(c.hex)} title={`copiar ${c.hex}`}>
                    <div className="bb-color-swatch" style={{ background: c.hex }}>
                      {copied === c.hex && <span className="bb-color-copied">copiado</span>}
                    </div>
                    <div className="bb-color-info">
                      <div className="bb-color-top">
                        <strong>{c.name}</strong>
                        <code className="bb-color-hex">{c.hex}</code>
                      </div>
                      <code className="bb-color-var dim">{c.var}</code>
                      <p className="bb-color-use">{c.use}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════════ TIPOGRAFIA ════════════════ */}
        {tab === 'tipografia' && (
          <section className="bb-section">
            <div className="wrap">
              <div className="bb-section-head">
                <p className="label">03 · tipografia</p>
                <h2>Duo <em>oficial</em></h2>
                <p className="bb-desc">Apenas duas famílias — combinadas em todo o sistema. JetBrains Mono pra estruturas técnicas (labels, dados, código). Fraunces pra narrativa (corpo, títulos editoriais).</p>
              </div>
              <div className="bb-fonts">
                {FONTS.map(f => (
                  <div key={f.name} className="bb-font-card">
                    <p className="bb-font-sample" style={{ fontFamily: f.name === 'Fraunces' ? 'Fraunces, serif' : 'JetBrains Mono, monospace' }}>
                      {f.sample}
                    </p>
                    <div className="bb-font-meta">
                      <div>
                        <span className="label-mute">[familia]</span>
                        <strong>{f.name}</strong>
                      </div>
                      <div>
                        <span className="label-mute">[uso]</span>
                        <p>{f.use}</p>
                      </div>
                      <div>
                        <span className="label-mute">[google.fonts]</span>
                        <code className="t-mono dim">{f.name.toLowerCase().replace(' ', '+')}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bb-type-scale">
                <h3 className="bb-h3">Escala</h3>
                <div className="bb-scale-row"><span className="label-mute">[display.xl]</span><span style={{fontFamily:'Fraunces',fontSize:'5.2rem',fontWeight:300,letterSpacing:'-0.035em',lineHeight:1}}>Aa</span><code className="t-mono dim">clamp(2.4, 6.5vw, 5.2rem) · 300</code></div>
                <div className="bb-scale-row"><span className="label-mute">[display.lg]</span><span style={{fontFamily:'Fraunces',fontSize:'2.8rem',fontWeight:300}}>Aa</span><code className="t-mono dim">clamp(1.8, 4vw, 2.8rem) · 300</code></div>
                <div className="bb-scale-row"><span className="label-mute">[heading]</span><span style={{fontFamily:'Fraunces',fontSize:'1.6rem',fontWeight:400}}>Aa</span><code className="t-mono dim">1.6rem · 400</code></div>
                <div className="bb-scale-row"><span className="label-mute">[body]</span><span style={{fontFamily:'Fraunces',fontSize:'1rem',fontWeight:300}}>Aa</span><code className="t-mono dim">1rem · 300</code></div>
                <div className="bb-scale-row"><span className="label-mute">[mono.label]</span><span style={{fontFamily:'JetBrains Mono',fontSize:'.72rem',color:'var(--node)'}}>aa</span><code className="t-mono dim">.72rem · 500 · lowercase</code></div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════ UI SYSTEM ════════════════ */}
        {tab === 'ui' && (
          <section className="bb-section">
            <div className="wrap">
              <div className="bb-section-head">
                <p className="label">04 · ui.system</p>
                <h2>Componentes <em>vivos</em></h2>
                <p className="bb-desc">Sistema de componentes base — botões, badges, cards, forms. Cada um derivado da gramática "terminal + serif editorial".</p>
              </div>

              <div className="bb-ui-group">
                <h3 className="bb-h3">Botões</h3>
                <div className="bb-ui-row">
                  <button className="btn btn--primary">enviar.sessao()</button>
                  <button className="btn">mapa.projetos →</button>
                  <button className="btn btn--ghost">cancelar</button>
                </div>
                <pre className="bb-code">{`<button class="btn btn--primary">label()</button>
<button class="btn">label →</button>
<button class="btn btn--ghost">label</button>`}</pre>
              </div>

              <div className="bb-ui-group">
                <h3 className="bb-h3">Badges / Status</h3>
                <div className="bb-ui-row">
                  <span className="proj-pill proj-pill--piloto">Piloto</span>
                  <span className="proj-pill proj-pill--impl">Em Implementação</span>
                  <span className="proj-pill proj-pill--estr">Estruturado</span>
                </div>
                <pre className="bb-code">{`<span class="proj-pill proj-pill--piloto">Piloto</span>
<span class="proj-pill proj-pill--impl">Em Implementação</span>
<span class="proj-pill proj-pill--estr">Estruturado</span>`}</pre>
              </div>

              <div className="bb-ui-group">
                <h3 className="bb-h3">Cards / Nós</h3>
                <div className="bb-ui-row">
                  <article className="svc-node bb-ui-card-demo">
                    <div className="svc-node-head">
                      <span className="label-mute">{'<no.demo>'}</span>
                      <h3 className="svc-node-title">Card Padrão</h3>
                      <span className="svc-node-tag">tag · contextual</span>
                    </div>
                    <p className="svc-node-desc">Descrição do nó em Fraunces 300, line-height 1.6. Pode ter qualquer extensão.</p>
                    <div className="svc-node-foot">
                      <span className="label-mute">[output]</span>
                      <span>resultado.entregavel</span>
                    </div>
                  </article>
                </div>
              </div>

              <div className="bb-ui-group">
                <h3 className="bb-h3">Form fields</h3>
                <div className="bb-ui-row" style={{flexDirection:'column',alignItems:'stretch',maxWidth:420}}>
                  <label className="ct-field">
                    <span><span className="bracket-key">›</span> nome</span>
                    <input placeholder="texto.placeholder" />
                  </label>
                  <label className="ct-field">
                    <span><span className="bracket-key">›</span> mensagem</span>
                    <textarea placeholder="multi.linha" rows="2" />
                  </label>
                </div>
              </div>

              <div className="bb-ui-group">
                <h3 className="bb-h3">Indicadores ao vivo</h3>
                <div className="bb-ui-row">
                  <span style={{fontFamily:'var(--mono)',color:'var(--node)',display:'flex',alignItems:'center',gap:8}}><span className="ct-pulse" /> sistema ativo</span>
                  <span style={{fontFamily:'var(--mono)',color:'var(--text-mute)'}}>02:34:17 GMT-4</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════ MATERIAIS ════════════════ */}
        {tab === 'materiais' && (
          <section className="bb-section">
            <div className="wrap">
              <div className="bb-section-head">
                <p className="label">05 · materiais</p>
                <h2>Aplicações <em>físicas + digitais</em></h2>
                <p className="bb-desc">Modelos prontos pra produção. Preencha os dados uma única vez → todos os materiais atualizam ao vivo. Baixe em PDF / HTML / PNG.</p>
              </div>

              {/* ── Gerador unificado ── */}
              <h3 className="bb-h3">Gerador automatizado</h3>
              <p className="bb-desc">Preencha uma vez. Cartão de visita e assinatura de email atualizam ao vivo.</p>

              <div className="bb-gen-wrap">
                <div className="bb-gen-form">
                  <label><span><span className="bracket-key">›</span> nome.completo</span><input value={pessoa.nome} onChange={e => setPessoa(p => ({ ...p, nome: e.target.value }))} placeholder="Nome do Consultor" /></label>
                  <label><span><span className="bracket-key">›</span> funcao</span><input value={pessoa.funcao} onChange={e => setPessoa(p => ({ ...p, funcao: e.target.value }))} placeholder="Diretor de Operações" /></label>
                  <label><span><span className="bracket-key">›</span> cim</span><input value={pessoa.cim} onChange={e => setPessoa(p => ({ ...p, cim: e.target.value }))} placeholder="0000" /></label>
                  <label><span><span className="bracket-key">›</span> email</span><input type="email" value={pessoa.email} onChange={e => setPessoa(p => ({ ...p, email: e.target.value }))} placeholder="nome@metalinkconsultoria.com.br" /></label>
                  <label><span><span className="bracket-key">›</span> telefone</span><input value={pessoa.telefone} onChange={e => setPessoa(p => ({ ...p, telefone: e.target.value }))} placeholder="+55 (92) 98113-9760" /></label>
                </div>

                <div className="bb-gen-preview">
                  <p className="bb-preview-label">/* preview · cartao de visita · frente */</p>
                  <div className="bb-card bb-card--frente" ref={cardFrenteRef}>
                    <div className="bb-card-grid" />
                    <div className="bb-card-corner bb-card-corner--tl" />
                    <div className="bb-card-corner bb-card-corner--tr" />
                    <div className="bb-card-corner bb-card-corner--bl" />
                    <div className="bb-card-corner bb-card-corner--br" />
                    <div className="bb-card-content">
                      <div className="bb-card-top">
                        <img src="/icon-metalink.png" alt="META LINK" />
                        <span className="bb-card-brand">META<span style={{color:'var(--node)'}}>·</span>LINK</span>
                      </div>
                      <div className="bb-card-mid">
                        <p className="bb-card-name">{pessoa.nome || '—'}</p>
                        <p className="bb-card-fn">{pessoa.funcao || '—'} <span style={{color:'var(--text-dim)'}}>· CIM {pessoa.cim || '—'}</span></p>
                      </div>
                      <div className="bb-card-foot">
                        <p>{pessoa.email || '—'}</p>
                        <p>{pessoa.telefone || '—'}</p>
                        <p className="dim">manaus · am</p>
                      </div>
                    </div>
                  </div>

                  <p className="bb-preview-label">/* preview · cartao de visita · verso */</p>
                  <div className="bb-card bb-card--verso" ref={cardVersoRef}>
                    <div className="bb-card-grid" />
                    <div className="bb-card-corner bb-card-corner--tl" />
                    <div className="bb-card-corner bb-card-corner--tr" />
                    <div className="bb-card-corner bb-card-corner--bl" />
                    <div className="bb-card-corner bb-card-corner--br" />
                    <div className="bb-card-verso-content">
                      <img src="/icon-metalink.png" alt="" />
                      <p className="bb-card-verso-brand">META<span style={{color:'var(--node)'}}>·</span>LINK</p>
                      <p className="bb-card-verso-sub">/* sistema vivo */</p>
                    </div>
                  </div>

                  <button type="button" className="btn btn--primary" onClick={baixarCartaoPDF} disabled={pdfStatus.kind === 'loading'} style={{width:'100%',justifyContent:'center'}}>
                    {pdfStatus.kind === 'loading' ? 'gerando.pdf()' : '↓ baixar.cartao.pdf()'}
                  </button>
                  {pdfStatus.kind !== 'idle' && <div className={`bb-gen-msg bb-gen-msg--${pdfStatus.kind}`}>{pdfStatus.msg}</div>}
                </div>
              </div>

              {/* ── Assinatura ── */}
              <h3 className="bb-h3" style={{marginTop:64}}>Assinatura de email</h3>
              <p className="bb-desc">HTML inline-styled. Compatível com Gmail, Outlook, Apple Mail.</p>

              <div className="bb-sig-wrap">
                <div className="bb-sig-preview" dangerouslySetInnerHTML={{ __html: assinaturaHTML(pessoa) }} />
                <div className="bb-sig-actions">
                  <button type="button" className="btn btn--primary" onClick={copiarAssinatura}>copiar.html()</button>
                  <button type="button" className="btn" onClick={baixarAssinaturaHTML}>baixar.html()</button>
                </div>
                {copyStatus.kind !== 'idle' && <div className={`bb-gen-msg bb-gen-msg--${copyStatus.kind}`}>{copyStatus.msg}</div>}
                <details className="bb-code-toggle">
                  <summary>/* ver código HTML gerado */</summary>
                  <pre className="bb-code bb-code--scroll">{assinaturaHTML(pessoa)}</pre>
                </details>
              </div>

              {/* ── OG Image ── */}
              <h3 className="bb-h3" style={{marginTop:64}}>Imagem de compartilhamento</h3>
              <p className="bb-desc">Open Graph image (1200 × 630 px) exibida automaticamente quando links da META LINK são compartilhados em WhatsApp, Facebook, LinkedIn, Twitter, Telegram.</p>

              <div className="bb-og-wrap">
                <div className="bb-og-preview">
                  <img src="/og-image.png" alt="Preview OG META LINK" />
                </div>
                <div className="bb-og-meta">
                  <div className="bb-og-specs">
                    <div><span className="label-mute">[dimensoes]</span><strong>1200 × 630 px</strong></div>
                    <div><span className="label-mute">[formato]</span><strong>PNG · 192KB</strong></div>
                    <div><span className="label-mute">[uso]</span><strong>Open Graph · Twitter Card</strong></div>
                    <div><span className="label-mute">[regen]</span><code className="t-mono dim">pnpm og:generate</code></div>
                  </div>
                  <a href="/og-image.png" download="metalink-open-graph.png" className="btn btn--primary" style={{justifyContent:'center'}}>↓ baixar.og.png()</a>
                </div>
              </div>

              {/* ── Papel timbrado ── */}
              <h3 className="bb-h3" style={{marginTop:64}}>Papel timbrado</h3>
              <p className="bb-desc">Modelo A4 institucional. Cabeçalho com identidade, corpo do documento, rodapé com dados legais.</p>

              <div className="bb-letterhead-wrap">
                <div className="bb-letterhead">
                  <div className="bb-lh-header">
                    <div className="bb-lh-brand">
                      <img src="/icon-metalink.png" alt="" />
                      <div>
                        <p className="bb-lh-name">META<span style={{color:'var(--node)'}}>·</span>LINK</p>
                        <p className="bb-lh-sub">consultoria · tecnologia · inovação</p>
                      </div>
                    </div>
                    <div className="bb-lh-meta t-mono dim">
                      <p>contato@metalinkconsultoria.com.br</p>
                      <p>manaus · am · brasil</p>
                      <p>cnpj 29.776.966/0001-05</p>
                    </div>
                  </div>
                  <div className="bb-lh-line" />
                  <div className="bb-lh-body">
                    <p className="bb-lh-date t-mono">Manaus, {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}.</p>
                    <p className="bb-lh-greeting">Prezado(a) Senhor(a),</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="bb-lh-sig">
                      <div className="bb-lh-sig-line" />
                      <p className="bb-lh-sig-name">Diretoria Comercial</p>
                      <p className="bb-lh-sig-sub t-mono dim">META·LINK CONSULTORIA</p>
                    </div>
                  </div>
                  <div className="bb-lh-footer t-mono">
                    <span className="dim">/* metalinkconsultoria.com.br */</span>
                    <span className="dim">cnpj 29.776.966/0001-05</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ════════════════ DIRETRIZES ════════════════ */}
        {tab === 'guidelines' && (
          <section className="bb-section">
            <div className="wrap">
              <div className="bb-section-head">
                <p className="label">06 · diretrizes</p>
                <h2>Regras de <em>aplicação</em></h2>
                <p className="bb-desc">Normas para preservar a integridade do sistema visual em todas as superfícies — digital, impresso, social.</p>
              </div>

              <div className="bb-guides">
                <div className="bb-guide bb-guide--do">
                  <h4>fazer</h4>
                  <ul>
                    <li>Usar exclusivamente as <strong>9 cores oficiais</strong> da paleta institucional</li>
                    <li>Aplicar fundo <code className="t-mono">--void</code> (#050810) como base padrão de toda interface</li>
                    <li><strong>JetBrains Mono</strong> em labels, dados, números, navegação, código e elementos técnicos</li>
                    <li><strong>Fraunces</strong> em corpo editorial, títulos display, manifestos e citações</li>
                    <li>Usar <code className="t-mono">--node</code> (#00E5A5) como sinal de vida, conexão ativa, status positivo</li>
                    <li>Numerar seções com <code className="t-mono">[01]</code>, <code className="t-mono">[02]</code> em mono</li>
                    <li>Preservar grid sutil de 64px no fundo de páginas longas</li>
                    <li>Manter área de respiro ≥ 1× a altura do símbolo ao redor do logo</li>
                  </ul>
                </div>
                <div className="bb-guide bb-guide--dont">
                  <h4>não.fazer</h4>
                  <ul>
                    <li>Distorcer, rotacionar, espelhar, recolorir ou recortar o logo</li>
                    <li>Adicionar cores fora da paleta oficial (sem azul corporativo, sem laranja, etc.)</li>
                    <li>Usar outras famílias tipográficas além de <strong>Mono + Fraunces</strong></li>
                    <li>Aplicar gradientes coloridos genéricos, sombras 3D ou efeitos de brilho</li>
                    <li>Usar a logo sobre fundo de baixo contraste ou texturas competitivas</li>
                    <li>Reduzir o logo abaixo de <strong>32px</strong> de altura (mínimo absoluto)</li>
                    <li>Centralizar tudo (a hierarquia editorial requer alinhamento à esquerda + assimetria)</li>
                    <li>Usar emojis decorativos — exceto símbolos técnicos (›, →, ·, /*  */)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bb-footer">
        <div className="bb-footer-inner">
          <span className="t-mono dim">© {new Date().getFullYear()} · META·LINK CONSULTORIA · brandbook v.1.0</span>
          <Link to="/" className="t-mono">← voltar.ao.site</Link>
        </div>
      </footer>
    </div>
  );
}
