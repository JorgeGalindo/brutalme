import { useState } from 'react';
import BuildingCard from './BuildingCard';

export default function RouteCard({ r, routeBuildings, expandedBuildings, onToggleBuilding, visited, onToggleVisited }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', marginBottom: 10, transition: 'border-color 0.2s', borderColor: open ? 'var(--text)' : 'var(--border)' }}>
      <div
        style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      >
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', marginRight: 10 }}>RUTA {r.id}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: 1 }}>{r.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{r.duration}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>{r.stops} paradas</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-ghost)', transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
        </div>
      </div>
      {open && (
        <div className="fade-in" style={{ borderTop: '1px solid var(--border-dim)' }}>
          <div style={{ padding: '12px 18px 16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '3px 8px' }}>📍 {r.zone}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '3px 8px' }}>🚇 Inicio: {r.metro}</span>
              {r.metroEnd && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '3px 8px' }}>🏁 Fin: {r.metroEnd}</span>}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#bbb', lineHeight: 1.6, margin: 0 }}>{r.description}</p>
          </div>
          {routeBuildings.length > 0 && (
            <div style={{ padding: '0 14px 14px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingLeft: 4 }}>
                {routeBuildings.length} edificios en esta ruta
              </div>
              {routeBuildings.map(b => (
                <BuildingCard
                  key={b.id} b={b}
                  isExpanded={expandedBuildings.has(b.id)}
                  onToggle={() => onToggleBuilding(b.id)}
                  nested
                  isVisited={visited.includes(b.id)}
                  onToggleVisited={onToggleVisited}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
