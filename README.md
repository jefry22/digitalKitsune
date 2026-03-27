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
npm run deploy:server
```

## Scripts

- `npm run dev`: desarrollo
- `npm run build`: compilacion de produccion
- `npm run start`: ejecutar build
- `npm run lint`: revisar estilo/codigo

## Modulo actual: Login con roles

Se implemento un primer modulo de autenticacion con rutas protegidas por rol.

- Login: `/login`
- Dashboard: `/dashboard`
- Vistas protegidas: `/admin`, `/pm`, `/developer`

API del modulo de autenticacion:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

Credenciales demo:

- Admin: `admin@digitalkitsune.com` / `Admin123!`
- PM: `pm@digitalkitsune.com` / `Pm123456!`
- Developer: `dev@digitalkitsune.com` / `Dev123456!`

## Variables de entorno

Crea un archivo `.env.local` en local (y `.env` en servidor) con:

```env
AUTH_SECRET=coloca_aqui_un_secreto_largo_y_unico
```

Si no defines `AUTH_SECRET`, el sistema usa un valor por defecto solo para desarrollo.
