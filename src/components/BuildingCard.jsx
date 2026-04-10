import { BLOCK_META } from '../data';
import { ROUTES } from '../data';
import InfoPill from './InfoPill';

export default function BuildingCard({ b, isExpanded, onToggle, nested, isVisited, onToggleVisited, isInRoute, onToggleRoute }) {
  const meta = BLOCK_META[b.block];
  return (
    <div
      style={{
        background: nested ? 'var(--bg-nested)' : 'var(--bg-card)',
        border: `1px solid ${isExpanded ? meta.color : 'var(--border)'}`,
        borderLeft: `4px solid ${meta.color}`,
        marginBottom: nested ? 8 : 12,
        transition: 'all 0.25s ease',
      }}
    >
      <div
        style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: meta.color, letterSpacing: 1, textTransform: 'uppercase' }}>{meta.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{b.year}</span>
            {b.protection && b.protection.includes('BIC') && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--gold)', background: '#2a2000', padding: '2px 6px', letterSpacing: 0.5 }}>BIC</span>
            )}
            {isVisited && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--green)', background: '#0a2a1a', padding: '2px 6px', letterSpacing: 0.5 }}>VISITADO</span>
            )}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: 1, margin: 0, lineHeight: 1.3 }}>{b.name}</h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 1.4 }}>{b.architect}</p>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--text-ghost)', flexShrink: 0, transition: 'transform 0.25s', transform: isExpanded ? 'rotate(45deg)' : 'none' }}>+</span>
      </div>

      {isExpanded && (
        <div className="fade-in" style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border-dim)', paddingTop: 16 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#ccc', lineHeight: 1.65, margin: '0 0 16px' }}>{b.description}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 16 }}>
            <InfoPill icon="📍" label="Dirección" value={b.address} sub={b.barrio} />
            {b.metro && b.metro !== '—' && <InfoPill icon="🚇" label="Metro" value={b.metro} />}
            {b.bus && <InfoPill icon="🚌" label="Bus" value={b.bus} />}
            <InfoPill icon="🚪" label="Interior" value={b.interior} />
            {b.protection && <InfoPill icon="🛡️" label="Protección" value={b.protection} />}
            {b.route > 0 && <InfoPill icon="🗺️" label="Ruta" value={`Ruta ${b.route}: ${ROUTES.find(r => r.id === b.route)?.name}`} />}
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleVisited(b.id); }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px',
                border: `1px solid ${isVisited ? 'var(--green)' : 'var(--border)'}`,
                background: isVisited ? 'var(--green)' : 'transparent',
                color: isVisited ? 'var(--text)' : 'var(--text-muted)',
                cursor: 'pointer', letterSpacing: 0.5,
              }}
            >
              {isVisited ? '✓ VISITADO' : 'MARCAR VISITADO'}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleRoute(b.id); }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, padding: '6px 14px',
                border: `1px solid ${isInRoute ? 'var(--red)' : 'var(--border)'}`,
                background: isInRoute ? 'var(--red)' : 'transparent',
                color: isInRoute ? 'var(--text)' : 'var(--text-muted)',
                cursor: 'pointer', letterSpacing: 0.5,
              }}
            >
              {isInRoute ? '✓ EN MI RUTA' : '+ MI RUTA'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
