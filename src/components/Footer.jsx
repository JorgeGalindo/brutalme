export default function Footer({ totalBuildings }) {
  return (
    <>
      {/* Vanishing heritage */}
      <div style={{ borderTop: '1px solid var(--border-faint)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Patrimonio en riesgo</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 8px' }}>
            Varios edificios brutalistas importantes se han perdido o están desapareciendo. La Pagoda (Laboratorios Jorba) de Miguel Fisac, demolida en 1999 pese a protestas masivas, fue el único edificio español seleccionado para una exposición de arquitectura del MoMA de Nueva York. La UVA de Hortaleza (Fernando Higueras, 1963), que Louis Kahn elogió como uno de los doce conjuntos residenciales más humanos del mundo, está siendo demolida bajo un programa de regeneración. Y las Torres de Colón perdieron su revestimiento original y su icónica corona en la reforma de 2020–2024. La carrera por documentar estos edificios — liderada por García Alcántara y el COAM — es también una carrera contra el tiempo.
          </p>
        </div>
      </div>

      {/* References */}
      <div style={{ borderTop: '1px solid var(--border-ghost)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Fuentes y experiencias</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginBottom: 20 }}>
            <div style={{ padding: '12px 14px', background: 'var(--bg-input)', borderLeft: '2px solid var(--red)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#ccc', textTransform: 'uppercase', letterSpacing: 1 }}>Madrid Brutal</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>Alejandro García Alcántara · fotos: Luis Carrón</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-ghost)', marginTop: 2 }}>Ediciones La Librería, 3.ª ed. 2025 · 174 pp. · ~25 €</div>
            </div>
            <div style={{ padding: '12px 14px', background: 'var(--bg-input)', borderLeft: '2px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#ccc', textTransform: 'uppercase', letterSpacing: 1 }}>Guía de Arquitectura de Madrid</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>COAM (Colegio Oficial de Arquitectos de Madrid)</div>
            </div>
            <div style={{ padding: '12px 14px', background: 'var(--bg-input)', borderLeft: '2px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#ccc', textTransform: 'uppercase', letterSpacing: 1 }}>Registro Docomomo Ibérico</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>Documentación del Movimiento Moderno</div>
            </div>
            <div style={{ padding: '12px 14px', background: 'var(--bg-input)', borderLeft: '2px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#ccc', textTransform: 'uppercase', letterSpacing: 1 }}>Plan Nacional del Patrimonio Cultural del S. XX</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>Ministerio de Cultura</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            <div style={{ padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--border-faint)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>@madrid_brutalism</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-ghost)', marginTop: 2 }}>Instagram · 38K+ seguidores · A. García Alcántara</div>
            </div>
            <div style={{ padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--border-faint)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Open House Madrid</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-ghost)', marginTop: 2 }}>Anual, habitualmente octubre · Interiores abiertos</div>
            </div>
            <div style={{ padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--border-faint)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>Madrid es BRUTAL(-ista)</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-ghost)', marginTop: 2 }}>Ruta guiada por Cristina · APIT.es · Rubén Darío → Glorieta de Ruiz Giménez</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <footer style={{ borderTop: '1px solid var(--border-ghost)', padding: 24, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-invisible)', letterSpacing: 1 }}>
          MADRID PATRIMONIO MODERNO · {totalBuildings} EDIFICIOS · 6 RUTAS · 1920s–1990s
        </div>
      </footer>
    </>
  );
}
