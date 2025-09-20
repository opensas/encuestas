# Historial de cambios

Todos los cambios relevantes de `encuestas` serán documentados en este archivo.

## [1.3.1] - 2025-09-19

### Nuevas características

- Se implementó testing de APIs con Playwright para validar endpoints REST.
- Se agregaron pruebas automatizadas para `/api/health` y `/api/provincias`.
- Se configuró ejecución paralela de pruebas Vitest y Playwright para mayor eficiencia.

### Comandos de pruebas disponibles

- `pnpm test:api [filtro?]` - Ejecuta pruebas de API que coincidan con el filtro (ej: `pnpm test:api health`)
- `pnpm test:play [filtro?]` - Ejecuta todas las pruebas de Playwright (API + E2E)

## [1.3.0] - 2025-09-19

### Actualizaciones importantes

- Se migró el proyecto a shadcn-svelte 1.0.7 y Tailwind CSS 4 para mejorar la experiencia de desarrollo y el rendimiento.
- Se actualizó bits-ui a la última versión para mayor compatibilidad.

### Nuevas características

- Se crearon páginas de demos para los distintos tipos de pregunta y componentes de la aplicación.

### Mejoras técnicas

- Se actualizó la configuración de componentes shadcn para la nueva versión.
- Se migró a la configuración vía CSS de Tailwind 4.
- Se actualizó la configuración de Vite para usar node-adapter-auto en modo de desarrollo y el adaptador IIS para el build.

## [1.2.5] - 2025-09-15

### Nuevas características

- Se implementaron pruebas automatizadas con Vitest Browser para mejorar la calidad del código.
- Se agregaron pruebas unitarias para componentes del servidor.
- Se implementaron pruebas de interfaz de usuario con navegador real.

### Pruebas implementadas

- Rating, Survey, GridApi, Multiple, Single, Text, GridText, Progress, página de demos

### Comandos de pruebas disponibles

- `pnpm test:unit` - Ejecuta pruebas unitarias del servidor
- `pnpm test:ui` - Ejecuta pruebas de interfaz de usuario con navegador
- `pnpm test:vite` - Ejecuta todas las pruebas de Vitest con navegador
- `pnpm test:e2e` - Ejecuta pruebas end-to-end con Playwright
- `pnpm test:all` - Ejecuta todas las pruebas incluyendo Playwright

## [1.2.3] - 2025-09-09

### Nuevas características

- Se agregó una barra de progreso en la aplicación para mejorar la experiencia del usuario.

## [1.2.2] - 2025-08-27

### Nuevas características

- Ahora es posible compilar el proyecto a un archivo ejecutable utilizando el comando `pnpm build:exe`.

## [1.2.0] - 2025-08-27

### Actualizaciones importantes

- Se migró el proyecto a `@opensas/sveltekit-adapter-node-iis` para mejorar la compatibilidad y rendimiento.

## [1.1.0] - 2025-08-21

### Nuevas características

- Se agregó persistencia de datos para mejorar la experiencia del usuario y reducir la carga de datos.

## [1.0.0] - 2024-12-20

### Lanzamiento inicial

- Se lanzó la versión inicial del proyecto `encuestas`.

## [0.1.0] - 2024-11-28

### Creación del repositorio

- Se creó el repositorio inicial del proyecto en `https://devops.trabajo.gob.ar/DGIIT/encuestas`
