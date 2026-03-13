<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# EduPanel - Secundaria & Bachillerato

Panel educativo con juegos y analíticas para aula. Los datos se cargan desde `datos.csv` y el panel de administración sincroniza reportes desde Google Sheets.

## Funcionalidades
- Inicio de sesión con selección de avatar (modo alumno y modo administrador).
- Selección de asignatura y situación de aprendizaje, con modo de repaso general.
- Juegos: Rosco, Ahorcado, Verdadero/Falso y Memory.
- Panel de administración con tabla de reportes, filtros por ID de app, alumno, asignatura y tema.
- Configuración multi-tenant por `id` en la URL (p. ej. `?id=grupoA`).
- Activación/desactivación de asignaturas y temas.
- Modo claro/oscuro.
- Carga automática de `datos.csv` y plantilla de ejemplo descargable.

## Ejecutar en local
**Requisitos:** Node.js

1. Instala dependencias:
   `npm install`
2. Ejecuta en desarrollo:
   `npm run dev`

## Build y despliegue (Vite + GitHub Pages)
1. Construye el sitio:
   `npm run build`
2. El build deja en `dist/` el resultado de Vite, `datos.csv` y este `README.md`.

Notas:
- El build usa `base: './'`, compatible con GitHub Pages de proyecto.
- Si necesitas una base explícita (p. ej. `/NOMBRE_REPO/`), ejecuta: `VITE_BASE=/NOMBRE_REPO/ npm run build`
