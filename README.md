# Patrimonio Moderno

Guia interactiva de arquitectura moderna y brutalista en Madrid. 111 edificios catalogados en tres bloques: brutalismo, racionalismo e iglesias del siglo XX.

**https://jorgegalindo.github.io/brutalme/**

## Contenido

- **61 edificios brutalistas** -- hormigon visto, megaestructuras, expresionismo estructural
- **28 edificios racionalistas** -- vanguardia republicana, Movimiento Moderno, miesianismo
- **22 iglesias del siglo XX** -- invencion espacial sacra en parroquias de barrio
- **6 rutas a pie** organizadas por proximidad geografica

## Funcionalidades

- Listado con busqueda por nombre, arquitecto, barrio, direccion o anno
- Filtros por bloque (brutalismo / racionalismo / iglesias), zona y estado de visita
- Mapa interactivo (Leaflet + CARTO dark tiles) con todos los edificios geolocalizados
- Marcar edificios como visitados (persistencia en localStorage)
- Los edificios visitados bajan al final de la lista y se atenuan visualmente
- Filtro "Por visitar" para ocultar los ya visitados
- Ficha expandible por edificio: descripcion, direccion, metro, acceso interior, proteccion patrimonial

## Stack

- React 19 + Vite 6
- Leaflet + react-leaflet
- CSS custom (Bebas Neue, Source Serif 4, Space Mono)
- Deploy: GitHub Pages via GitHub Actions

## Desarrollo

```
npm install
npm run dev
```

## Fuentes

- *Madrid Brutal* -- Alejandro Garcia Alcantara (Ediciones La Libreria, 3.a ed. 2025)
- Guia de Arquitectura de Madrid (COAM)
- Registro Docomomo Iberico
- Plan Nacional del Patrimonio Cultural del S. XX
