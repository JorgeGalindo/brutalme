import { BLOCK_META, ZONES, getZone } from '../data';
import { BUILDINGS } from '../data';

export default function FilterBar({
  view, setView,
  activeBlock, setActiveBlock,
  activeZone, setActiveZone,
  search, setSearch,
}) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg)', borderBottom: '1px solid var(--border-faint)', padding: '12px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* View toggle + block filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 0 }}>
            {[
              { v: 'buildings', l: 'Edificios' },
              { v: 'map', l: 'Mapa' },
              { v: 'routes', l: 'Rutas' },
            ].map(({ v, l }) => (
              <button key={v} onClick={() => setView(v)} style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, padding: '6px 16px',
                border: '1px solid var(--border)',
                borderRight: v !== 'routes' ? 'none' : undefined,
                background: view === v ? 'var(--text)' : 'transparent',
                color: view === v ? 'var(--bg)' : 'var(--text-muted)',
                cursor: 'pointer', letterSpacing: 0.5,
              }}>{l}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveBlock('all')} style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, padding: '5px 12px',
              border: `2px solid ${activeBlock === 'all' ? 'var(--text-muted)' : 'var(--border)'}`,
              background: activeBlock === 'all' ? 'var(--text)' : 'transparent',
              color: activeBlock === 'all' ? 'var(--bg)' : 'var(--text-muted)',
              cursor: 'pointer', letterSpacing: 0.5,
            }}>TODOS ({BUILDINGS.length})</button>
            {Object.entries(BLOCK_META).map(([key, m]) => {
              const count = BUILDINGS.filter(b => b.block === key).length;
              return (
                <button key={key} onClick={() => setActiveBlock(key)} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, padding: '5px 12px',
                  border: `2px solid ${m.color}`,
                  background: activeBlock === key ? m.color : 'transparent',
                  color: activeBlock === key ? '#fff' : m.color,
                  cursor: 'pointer', letterSpacing: 0.5,
                }}>{m.label} ({count})</button>
              );
            })}
          </div>
        </div>

        {(view === 'buildings' || view === 'map') && (
          <>
            {/* Zone filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-ghost)' }}>ZONA</span>
              <button onClick={() => setActiveZone('all')} style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
                border: '1px solid var(--border)',
                background: activeZone === 'all' ? 'var(--border-dim)' : 'transparent',
                color: activeZone === 'all' ? 'var(--text)' : 'var(--text-faint)',
                cursor: 'pointer',
              }}>TODAS</button>
              {ZONES.map(z => {
                const count = BUILDINGS.filter(b => getZone(b.barrio) === z.key && (activeBlock === 'all' || b.block === activeBlock)).length;
                return (
                  <button key={z.key} onClick={() => setActiveZone(z.key)} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
                    border: '1px solid var(--border)',
                    background: activeZone === z.key ? 'var(--border-dim)' : 'transparent',
                    color: activeZone === z.key ? 'var(--text)' : 'var(--text-faint)',
                    cursor: 'pointer', opacity: count === 0 ? 0.35 : 1,
                  }}>{z.label} <span style={{ color: 'var(--text-ghost)' }}>{count}</span></button>
                );
              })}
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Buscar por nombre, arquitecto, barrio, dirección, año…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 13,
                background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text)',
                outline: 'none',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
