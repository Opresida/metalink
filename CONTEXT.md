# CONTEXT — METALINK

Regras de negócio, design system, padrões.

## Identidade visual

**Paleta oficial (6 cores institucionais):**

```css
--navy:        #0E1729   /* fundo principal */
--navy-2:      #131D33   /* cards */
--navy-3:      #1A2640   /* hover, gradientes */
--mint:        #2EE5A5   /* accent primário, CTA, divisores */
--blue:        #3B9DFF   /* accent secundário */
--white:       #FFFFFF   /* texto principal */
--gray:        #A0AEC4   /* texto secundário */
--gray-2:      #5A6478   /* texto terciário */
--border:      rgba(255,255,255,.08)
```

**Tipografia:**
- **Cinzel** — display (logo, headings principais, brand)
- **Inter** — body, UI, labels, navegação

**Tom de voz:** corporativo, técnico, direto. Sem floreio.

## Padrão de seção

```jsx
<section id="slug" className="section">
  <div className="section-inner">
    <div className="reveal">
      <div className="section-label">RÓTULO</div>
      <h2 className="section-title">Título</h2>
      <div className="divider" />
      <p className="section-desc">Descrição opcional.</p>
    </div>
    {/* conteúdo com .reveal nos elementos animados */}
  </div>
</section>
```

E registrar o `id` como link de âncora no [Header.jsx](src/components/Header.jsx).

## Padrão de botão

```jsx
<a href="..." className="btn btn-primary">Texto</a>     // mint
<a href="..." className="btn btn-outline">Texto</a>    // mint outline
<a href="..." className="btn btn-ghost">Texto</a>      // border neutro
```

## Animações

- Toda transition usa `var(--ease)` = `cubic-bezier(.4, 0, .2, 1)`
- Elementos animados ao scroll: classe `.reveal` + `useReveal()` hook
- Delays: `.reveal-d1` (.1s), `.reveal-d2` (.2s), `.reveal-d3` (.3s), `.reveal-d4` (.4s)

## Responsividade

Breakpoints obrigatórios pra testar:
- **1280px** (desktop padrão, --maxw)
- **900px** (transição → mobile menu)
- **768px** (tablet)
- **540px** (mobile)
- **480px** (mobile pequeno)

## Brandbook

Rota `/brandbook` protegida por usuário+senha (client-side SHA-256). Credenciais ativas:
- `metalink` : `inovacao2026`

Pra trocar/adicionar: editar `VALID_HASHES` em [src/components/BrandbookGate.jsx](src/components/BrandbookGate.jsx).

Brandbook contém 4 seções: Logo, Cores (clicáveis pra copiar hex), Tipografia, Diretrizes (Do/Don't).

## Deploy

- Netlify estático via `pnpm build`
- Frozen lockfile com `pnpm-lock.yaml`
- Redirects SPA fallback configurado em `netlify.toml`
- Headers de cache pra `/assets/*` (immutable, 1 ano)

## Regras invioláveis

- ❌ Sem backend, banco, API
- ❌ Sem Tailwind ou CSS-in-JS
- ❌ Sem outras fontes além de Cinzel + Inter
- ❌ Sem outras cores além das 6 oficiais
- ❌ Nunca commitar package-lock.json (gitignored)
