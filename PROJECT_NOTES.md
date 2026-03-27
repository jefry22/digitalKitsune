# DigitalKitsune - Gestor de Actividades

Proyecto para centralizar la gestion diaria de actividades del equipo de desarrollo WordPress.

## Problema actual

- Las tareas nacen en reuniones con cliente (capturas + notas en Drive).
- Luego se pasan manualmente al equipo.
- Al final del dia se reporta avance en Excel.
- Esto genera duplicidad, perdida de contexto y retrasos en el seguimiento.

## Objetivo

Crear una aplicacion interna para:

- Registrar actividades por cliente/proyecto.
- Asignar tareas al desarrollador.
- Actualizar estado y tiempo invertido.
- Generar reporte diario en Excel automaticamente.

## MVP (primera version)

1. Usuarios y roles (Admin, PM, Developer).
2. Clientes y proyectos.
3. Actividades (titulo, descripcion, prioridad, fecha, estado).
4. Evidencias adjuntas (capturas, links de Drive).
5. Vista "Mi dia" para cada desarrollador.
6. Reporte diario exportable a `.xlsx`.

## Flujo propuesto

1. PM crea actividad desde notas/capturas de reunion.
2. PM asigna al desarrollador con fecha y prioridad.
3. Developer actualiza progreso durante el dia.
4. Al cierre del dia, el sistema genera Excel por usuario o por proyecto.

## Stack definido

- Frontend/App: Next.js + React + Tailwind + TypeScript.
- Backend (fase inicial): API Routes/Server Actions en Next.js.
- Base de datos (proxima fase): MySQL con ORM (Prisma).
- Exportaciones (proxima fase): generacion de `.xlsx` desde backend.
- Almacenamiento: local o Drive/S3 segun necesidad.

## Siguientes pasos inmediatos

1. Definir modelo de datos base (usuarios, proyectos, actividades, reportes).
2. Crear autenticacion y roles (Admin, PM, Developer).
3. Construir CRUD de actividades con vista "Mi dia".
4. Agregar exportacion de reporte diario en Excel.
