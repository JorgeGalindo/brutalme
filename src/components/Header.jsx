import { BLOCK_META, getBlockCount } from '../data';

function StatBar({ label, count, total, color }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color }}>{count}</span>
      </div>
      <div style={{ height: 3, background: 'var(--border-faint)', width: '100%' }}>
        <div style={{ height: 3, background: color, width: `${(count / total) * 100}%`, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

export default function Header({ totalBuildings, visitedCount }) {
  return (
    <header style={{ position: 'relative', overflow: 'hidden', padding: '60px 24px 40px', borderBottom: '1px solid var(--border-faint)' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: "repeating-linear-gradient(0deg, #f0ece2 0px, #f0ece2 1px, transparent 1px, transparent 6px), repeating-linear-gradient(90deg, #f0ece2 0px, #f0ece2 1px, transparent 1px, transparent 6px)", pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: 2, lineHeight: 1.05, marginBottom: 16, maxWidth: 700 }}>
          Patrimonio<br />
          <span style={{ color: 'var(--red)' }}>Moderno</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-dim)', maxWidth: 560, lineHeight: 1.6 }}>
          Madrid atesora una de las concentraciones más ricas de arquitectura del siglo XX en Europa, pero permanece invisible para los visitantes obsesionados con el Prado y el Palacio Real. Esta guía cataloga {totalBuildings} edificios en tres bloques — brutalismo, racionalismo e iglesias modernas — desde la vanguardia de los años 20 hasta las megaestructuras tardo-brutalistas de los 80.
        </p>

        <div style={{ marginTop: 28, maxWidth: 320 }}>
          {Object.entries(BLOCK_META).map(([key, m]) => (
            <StatBar key={key} label={m.label} count={getBlockCount(key)} total={totalBuildings} color={m.color} />
          ))}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', marginTop: 8 }}>
            {totalBuildings} edificios · 1920s–1990s
          </div>
          {visitedCount > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Visitados</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)' }}>{visitedCount} / {totalBuildings}</span>
              </div>
              <div style={{ height: 3, background: 'var(--border-faint)', width: '100%' }}>
                <div style={{ height: 3, background: 'var(--gold)', width: `${(visitedCount / totalBuildings) * 100}%`, transition: 'width 0.4s ease' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
