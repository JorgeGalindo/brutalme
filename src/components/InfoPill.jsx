export default function InfoPill({ icon, label, value, sub }) {
  return (
    <div style={{ background: 'var(--bg-input)', padding: '10px 12px', borderLeft: '2px solid var(--border)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{icon} {label}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#bbb', lineHeight: 1.4 }}>{value}</div>
      {sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
