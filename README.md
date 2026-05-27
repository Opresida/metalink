# META LINK CONSULTORIA

Site institucional da **META LINK CONSULTORIA** — empresa de consultoria estratégica em tecnologia, inovação e desenvolvimento de soluções corporativas. Sede: Manaus/AM. CNPJ 29.776.966/0001-05.

**Stack:** React 19 + Vite 8 + React Router DOM 7 · CSS puro com design system · Deploy Netlify (estático).

---

## Instalação

```bash
pnpm install
pnpm dev    # http://localhost:5000
pnpm build  # produção
```

⚠️ Projeto padronizado em **pnpm**. Não usar npm — gera package-lock.json que conflita com pnpm-lock.yaml usado pelo Netlify.

---

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Home institucional (Hero, Quem Somos, Serviços, Projetos, FAQ, Contatos) |
| `/brandbook` | Manual de identidade visual (protegido por login) |

---

## Seções da Home

1. **Hero** — apresentação principal com tagline e CTAs
2. **Quem Somos** — atuação + credenciais formais
3. **Serviços** — 3 frentes (Consultoria Empresarial, Tecnologia, Inovação)
4. **Projetos** — 10 cards do portfólio (Home Care Tech, Núcleo PMEs, etc.)
5. **FAQ** — 6 perguntas frequentes
6. **Contatos** — formulário + dados institucionais
7. **Footer** — navegação + dados legais

---

## Identidade visual

**Paleta oficial:**
- Navy `#0E1729` (fundo)
- Navy 2 `#131D33` (cards)
- Mint `#2EE5A5` (accent principal)
- Blue `#3B9DFF` (accent secundário)
- White `#FFFFFF` (texto)
- Gray `#A0AEC4` (texto secundário)

**Tipografia:** Cinzel (display) + Inter (body)

---

## Brandbook — proteção

Rota `/brandbook` protegida por usuário+senha (client-side, SHA-256). **Credenciais default:**

- Usuário: `metalink`
- Senha: `inovacao2026`

Pra trocar: ver instruções em [src/components/BrandbookGate.jsx](src/components/BrandbookGate.jsx).

⚠️ É proteção contra acesso casual, não segurança real (hash fica no bundle). Adequado pra brandbook/marca, NÃO usar pra LGPD/financeiro.

---

## Estrutura

```
src/
  components/   Header, Footer, Hero, QuemSomos, Servicos, Projetos, FAQ,
                Contatos, WhatsAppBtn, Loader, ProgressBar, BrandbookGate
  pages/        Home, Brandbook
  hooks/        useReveal (Intersection Observer pra scroll animations)
  data/         servicos.js, projetos.js, faq.js
  index.css     Design system completo
public/         Favicons, logos, ícones
```

---

## Deploy

Netlify automático via push na `main` (depois de configurar repositório no painel Netlify).
