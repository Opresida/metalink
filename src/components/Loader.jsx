import React, { useState, useEffect } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`loader${hidden ? ' hidden' : ''}`} aria-hidden={hidden}>
      <img className="loader-logo" src="/icon-metalink.png" alt="META LINK" />
    </div>
  );
}
