import React, { useState, useEffect, useRef } from 'react';
import Brandbook from '../pages/Brandbook.jsx';

/**
 * Proteção client-side da rota /brandbook.
 *
 * IMPORTANTE: "segurança contra acesso casual", não proteção real.
 * Hash fica no bundle JS — quem abrir DevTools consegue ler (mas não a senha).
 * Adequado pra brandbook/identidade visual; NÃO usar pra dados pessoais ou financeiros.
 *
 * Como adicionar/trocar credenciais:
 *   1. node -e "const c=require('crypto');console.log(c.createHash('sha256').update('USUARIO:SENHA').digest('hex'))"
 *   2. Copia o hash e substitui/adiciona em VALID_HASHES.
 *
 * Credenciais ativas:
 *   - metalink : inovacao2026
 */
const VALID_HASHES = [
  '570934173fc530ca7e99bc96ce5c88c6457fc90080b870d2830084f989f1fd17',
];

const STORAGE_KEY = 'metalink_brandbook_auth_v1';

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function BrandbookGate() {
  const [authed, setAuthed] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'ok') setAuthed(true);
  }, []);

  useEffect(() => { if (!authed && inputRef.current) inputRef.current.focus(); }, [authed]);

  async function handleLogin(e) {
    e.preventDefault();
    setErro(''); setLoading(true);
    try {
      const hash = await sha256(`${usuario.trim()}:${senha}`);
      if (VALID_HASHES.includes(hash)) {
        sessionStorage.setItem(STORAGE_KEY, 'ok');
        setAuthed(true);
      } else {
        setErro('Usuário ou senha incorretos.');
        setSenha('');
      }
    } catch (e) {
      setErro(`Erro inesperado: ${e.message}`);
    } finally { setLoading(false); }
  }

  if (authed) return <Brandbook />;

  return (
    <div className="bb-gate">
      <div className="bb-gate-deco" aria-hidden="true" />
      <div className="bb-gate-card">
        <div className="bb-gate-logo">
          <img src="/icon-metalink.png" alt="META LINK" width="80" height="80" />
        </div>
        <p className="bb-gate-label">Acesso Restrito</p>
        <h1 className="bb-gate-title">Brandbook META LINK</h1>
        <p className="bb-gate-desc">Área de identidade visual oficial, modelos institucionais e materiais de marca. Acesso autorizado apenas para colaboradores e fornecedores credenciados.</p>
        <form className="bb-gate-form" onSubmit={handleLogin}>
          <label>
            <span>Usuário</span>
            <input ref={inputRef} type="text" autoComplete="username" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
          </label>
          <label>
            <span>Senha</span>
            <input type="password" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </label>
          {erro && <div className="bb-gate-error">{erro}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 8, justifyContent: 'center' }}>
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
        <p className="bb-gate-help">Não tem acesso? Solicite credenciais em <a href="mailto:contato@metalinkconsultoria.com.br">contato@metalinkconsultoria.com.br</a></p>
      </div>
    </div>
  );
}
