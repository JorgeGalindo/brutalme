export default function Header() {
  return (
    <header style={{ position: 'relative', overflow: 'hidden', padding: '40px 24px 24px', borderBottom: '1px solid var(--border-faint)' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: "repeating-linear-gradient(0deg, #f0ece2 0px, #f0ece2 1px, transparent 1px, transparent 6px), repeating-linear-gradient(90deg, #f0ece2 0px, #f0ece2 1px, transparent 1px, transparent 6px)", pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: 2, lineHeight: 1.05, margin: 0, maxWidth: 700 }}>
          Patrimonio<br />
          <span style={{ color: 'var(--red)' }}>Moderno</span>
        </h1>
      </div>
    </header>
  );
}
