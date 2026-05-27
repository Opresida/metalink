# TODO — METALINK

## Aguardando entrega do cliente
- [ ] **Número oficial do WhatsApp** — atualmente placeholder `5592999990000` em [src/components/WhatsAppBtn.jsx](src/components/WhatsAppBtn.jsx)
- [ ] **Email institucional definitivo** — atualmente `contato@metalinkconsultoria.com.br` (palpite); confirmar e atualizar em Contatos.jsx + Footer.jsx + Brandbook
- [ ] **Telefone fixo / WhatsApp comercial** pra seção Contatos
- [ ] **Logo em versão alternativa** (light? icon transparente isolado?) se houver
- [ ] **Foto/asset visual do Hero** — atualmente Hero é texto puro com gradient; pode receber imagem/vídeo se cliente enviar
- [ ] **Endereço físico completo** (se houver sede física pra divulgar)

## Funcionalidades pendentes (priorização)

### Alta
- [ ] OG image 1200x630 (replicar padrão do GLOMAM)
- [ ] Integração real do form Contatos (Resend, EmailJS ou Netlify Forms)
- [ ] Gerador de cartão de visita + assinatura email no /brandbook (replicar do GLOMAM)

### Média
- [ ] Seção de depoimentos/casos de sucesso (quando clientes autorizarem)
- [ ] Página /servicos/:slug detalhada pra cada uma das 3 frentes
- [ ] SEO meta tags Open Graph dinâmicas por rota
- [ ] Sitemap.xml e robots.txt

### Baixa
- [ ] Modo claro (paleta light alternativa)
- [ ] PWA (manifest + service worker)
- [ ] Tradução EN/ES
- [ ] Lazy load de seções pesadas

## Concluído

- [x] Setup inicial React 19 + Vite 8 + Router 7 *(aprovado 2026-05-27)*
- [x] Design system completo (paleta navy/mint/blue + Cinzel/Inter) *(2026-05-27)*
- [x] Header com scroll-aware + drawer mobile *(2026-05-27)*
- [x] Hero institucional com CTAs *(2026-05-27)*
- [x] Seção Quem Somos (2 cards) *(2026-05-27)*
- [x] Seção Serviços (3 frentes) *(2026-05-27)*
- [x] Seção Projetos (10 cards do portfólio) *(2026-05-27)*
- [x] Seção FAQ (6 perguntas) *(2026-05-27)*
- [x] Seção Contatos com form mailto + info *(2026-05-27)*
- [x] Footer institucional *(2026-05-27)*
- [x] WhatsApp button flutuante *(2026-05-27)*
- [x] Loader + ProgressBar *(2026-05-27)*
- [x] Brandbook completo (Logo + Cores + Tipografia + Diretrizes) *(2026-05-27)*
- [x] BrandbookGate (proteção SHA-256 client-side) *(2026-05-27)*
- [x] Favicons multi-size (16/32/180/192/512) *(2026-05-27)*
- [x] Deploy Netlify config (netlify.toml + redirects) *(2026-05-27)*
