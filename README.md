# DigitalKitsune

Sistema interno para gestionar actividades del equipo WordPress y generar reportes diarios.

## Stack

- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript

## Desarrollo local

1. Instalar dependencias:

```bash
npm install
```

2. Levantar entorno de desarrollo:

```bash
npm run dev
```

3. Abrir en navegador:

`http://localhost:3000`

## Flujo Git recomendado (local -> servidor)

Este repositorio queda preparado para trabajar en local y desplegar en servidor por Git.

### 1) En este servidor (solo una vez)

Cuando tengas la URL del repositorio remoto:

```bash
git remote add origin <URL_DEL_REPOSITORIO>
git add .
git commit -m "chore: initialize nextjs project"
git push -u origin main
```

### 2) En tu maquina local

```bash
git clone <URL_DEL_REPOSITORIO>
cd digitalkitsune
npm install
npm run dev
```

### 3) Publicar cambios al servidor

En local:

```bash
git add .
git commit -m "feat: descripcion corta"
git push
```

En servidor:

```bash
git pull
npm install
npm run build
```

## Scripts

- `npm run dev`: desarrollo
- `npm run build`: compilacion de produccion
- `npm run start`: ejecutar build
- `npm run lint`: revisar estilo/codigo
