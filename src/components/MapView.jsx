import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from 'react-leaflet';
import { BLOCK_META } from '../data';
import 'leaflet/dist/leaflet.css';

function FitBounds({ buildings }) {
  const map = useMap();
  useEffect(() => {
    if (buildings.length === 0) return;
    const bounds = buildings.map(b => [b.lat, b.lng]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [buildings, map]);
  return null;
}

export default function MapView({ buildings, routeBuildings, onSelectBuilding }) {
  return (
    <div style={{ height: 'calc(100vh - 200px)', minHeight: 400, position: 'relative' }}>
      <MapContainer
        center={[40.43, -3.70]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds buildings={buildings} />

        {buildings.map(b => {
          const meta = BLOCK_META[b.block];
          return (
            <CircleMarker
              key={b.id}
              center={[b.lat, b.lng]}
              radius={7}
              pathOptions={{ color: meta.color, fillColor: meta.color, fillOpacity: 0.8, weight: 1 }}
            >
              <Popup>
                <div className="popup-name" style={{ color: meta.color }}>{b.name}</div>
                <div className="popup-architect">{b.architect}</div>
                <div className="popup-year">{b.year}</div>
              </Popup>
            </CircleMarker>
          );
        })}

        {routeBuildings && routeBuildings.length > 1 && (
          <Polyline
            positions={routeBuildings.map(b => [b.lat, b.lng])}
            pathOptions={{ color: 'var(--text)', weight: 1, dashArray: '6 4', opacity: 0.4 }}
          />
        )}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 30, left: 10, zIndex: 1000,
        background: 'rgba(13,13,13,0.9)', border: '1px solid var(--border)', padding: '10px 14px',
      }}>
        {Object.entries(BLOCK_META).map(([key, m]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.color }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
