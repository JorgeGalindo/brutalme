import BUILDINGS from './buildings';

export const BLOCK_META = {
  brutalist: { label: "Brutalismo", color: "#c44536", tagline: "Hormigón, volúmenes rotundos, megaestructuras", intro: "Hormigón visto, volúmenes escultóricos y fachadas texturadas definen esta generación de edificios madrileños, erigidos durante los últimos años del franquismo y la primera democracia. Muchos se sitúan en distritos obreros periféricos — Moratalaz, Carabanchel, San Blas — donde fueron diseñados como vivienda social, colegios e infraestructura pública para una ciudad que duplicaba su población cada década." },
  rationalist: { label: "Racionalismo", color: "#2d6a4f", tagline: "Vanguardia republicana, Movimiento Moderno, miesianismo", intro: "Los edificios racionalistas de Madrid trazan el arco dramático de la modernidad española: desde la euforia de la vanguardia republicana de los años 20, pasando por la destrucción de la Guerra Civil, hasta la madurez del Movimiento Moderno en los 50 y 60 — el acero de De la Sota, el vidrio de Moreno Barberá, la precisión de Corrales y Molezún. Muchos sobrevivieron al bombardeo de artillería, al exilio de sus arquitectos y a décadas de indiferencia oficial. Lo que queda es una capa extraordinariamente rica del tejido urbano, concentrada en Chamberí, Ciudad Universitaria y el eje de la Castellana." },
  churches: { label: "Iglesias s. XX", color: "#5a189a", tagline: "Invención espacial sacra", intro: "La expansión de posguerra de Madrid exigió cientos de nuevas parroquias para los barrios periféricos, y la archidiócesis confió muchas a los mejores arquitectos modernos de España. El resultado es un corpus extraordinario de arquitectura sacra que abarca desde las bóvedas de ladrillo de Luis Moya Blanco hasta el hormigón de encofrado flexible de Miguel Fisac — una galería oculta de invención espacial dispersa por parroquias suburbanas en las que la mayoría de madrileños nunca ha entrado." },
};

export const ZONES = [
  { key: "centro", label: "Centro", match: ["Centro", "Salamanca", "Retiro"] },
  { key: "chamberi", label: "Chamberí", match: ["Chamberí"] },
  { key: "chamartin", label: "Chamartín · Tetuán", match: ["Chamartín", "Tetuán"] },
  { key: "moncloa", label: "Moncloa · Latina", match: ["Moncloa-Aravaca", "Latina"] },
  { key: "sur", label: "Sur", match: ["Carabanchel", "Usera", "Arganzuela", "Moratalaz"] },
  { key: "norte", label: "Norte · Este", match: ["Hortaleza", "San Blas", "Canillejas", "Fuencarral", "Cantoblanco", "Alcobendas", "Ciudad Lineal"] },
];

export function getZone(barrio) {
  const b = barrio.toLowerCase();
  for (const z of ZONES) {
    if (z.match.some(m => b.includes(m.toLowerCase()))) return z.key;
  }
  return null;
}

export function getBlockCount(block) {
  return BUILDINGS.filter(b => b.block === block).length;
}
