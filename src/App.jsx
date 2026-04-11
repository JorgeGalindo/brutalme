import { useState } from 'react';
import { BUILDINGS, ROUTES, BLOCK_META, ZONES, getZone } from './data';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import BuildingCard from './components/BuildingCard';
import MapView from './components/MapView';
import RouteCard from './components/RouteCard';
import Footer from './components/Footer';

export default function App() {
  const [view, setView] = useState('buildings');
  const [activeBlock, setActiveBlock] = useState('all');
  const [activeZone, setActiveZone] = useState('all');
  const [search, setSearch] = useState('');
  const [onlyPending, setOnlyPending] = useState(false);
  const [expanded, setExpanded] = useState(new Set());
  const [visited, setVisited] = useLocalStorage('brutalme_visited', []);

  const toggleExpanded = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleVisited = (id) => {
    setVisited(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = BUILDINGS.filter(b => {
    if (activeBlock !== 'all' && b.block !== activeBlock) return false;
    if (activeZone !== 'all' && getZone(b.barrio) !== activeZone) return false;
    if (onlyPending && visited.includes(b.id)) return false;
    if (search) {
      const q = search.toLowerCase();
      if (![b.name, b.architect, b.barrio, b.address, b.description, b.year].some(f => f.toLowerCase().includes(q))) return false;
    }
    return true;
  }).sort((a, b) => {
    const aV = visited.includes(a.id) ? 1 : 0;
    const bV = visited.includes(b.id) ? 1 : 0;
    if (aV !== bV) return aV - bV;
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <Header />

      <FilterBar
        view={view} setView={setView}
        activeBlock={activeBlock} setActiveBlock={setActiveBlock}
        activeZone={activeZone} setActiveZone={setActiveZone}
        search={search} setSearch={setSearch}
        onlyPending={onlyPending} setOnlyPending={setOnlyPending}
        visitedCount={visited.length}
      />

      <main style={{ maxWidth: view === 'map' ? '100%' : 900, margin: '0 auto', padding: view === 'map' ? 0 : '24px 24px 80px' }}>
        {view === 'buildings' && (
          <>
            {activeBlock !== 'all' && BLOCK_META[activeBlock]?.intro && (
              <div className="fade-in" style={{ padding: '16px 18px', background: 'var(--bg-nested)', borderLeft: `3px solid ${BLOCK_META[activeBlock].color}`, marginBottom: 16 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.65, margin: 0 }}>{BLOCK_META[activeBlock].intro}</p>
              </div>
            )}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', marginBottom: 16 }}>
              {filtered.length} edificio{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
              {activeZone !== 'all' && <> · <span style={{ color: 'var(--text-muted)' }}>{ZONES.find(z => z.key === activeZone)?.label}</span></>}
              {search && <> · buscando "<span style={{ color: 'var(--text-muted)' }}>{search}</span>"</>}
            </div>
            {filtered.map(b => (
              <BuildingCard
                key={b.id} b={b}
                isExpanded={expanded.has(b.id)}
                onToggle={() => toggleExpanded(b.id)}
                isVisited={visited.includes(b.id)}
                onToggleVisited={toggleVisited}
              />
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-ghost)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>Sin resultados</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>Prueba con otro término de búsqueda</div>
              </div>
            )}
          </>
        )}

        {view === 'map' && (
          <MapView
            buildings={filtered}
            routeBuildings={null}
          />
        )}

        {view === 'routes' && (
          <div style={{ padding: '24px 24px 80px', maxWidth: 900, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', marginBottom: 16 }}>
              6 RUTAS A PIE · MEDIO DÍA CADA UNA
            </div>
            {ROUTES.map(r => (
              <RouteCard
                key={r.id} r={r}
                routeBuildings={BUILDINGS.filter(b => b.route === r.id)}
                expandedBuildings={expanded}
                onToggleBuilding={toggleExpanded}
                visited={visited}
                onToggleVisited={toggleVisited}
              />
            ))}
            <div style={{ marginTop: 24, padding: 20, background: 'var(--bg-input)', border: '1px solid var(--border-faint)' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                Cada ruta agrupa edificios de los tres bloques por proximidad geográfica. El metro de inicio y fin está indicado. El descubrimiento más revelador puede ser geográfico: la arquitectura más rica no está en el eje turístico Sol–Prado–Retiro sino en las parroquias y conjuntos de vivienda de Carabanchel, Usera, Hortaleza y San Blas, donde los mejores arquitectos de España se enfrentaron al verdadero reto de la modernidad — dar dignidad a la vivienda masiva y el espacio sacro con presupuestos mínimos.
              </p>
            </div>
          </div>
        )}
      </main>

      {view !== 'map' && <Footer totalBuildings={BUILDINGS.length} />}
    </div>
  );
}
