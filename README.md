# Proyecto Final de Ingeniería Web

**Autor**: *Jorge Andrés Padilla*

El proyecto final de ingeniería web fue desarrollado con **Node.js** (versión 16) y está compuesto por dos componentes:
- El proyecto de backend creado con **Express.js**, que se encuentra en la carpeta `server`.
- El proyecto de frontend creado con **React.js**, que se encuentra en la carpeta `client`.

Ambos proyectos están desarrollados en **TypeScript**, y se usa una base de datos **PostgreSQL** para el almacenamiento de los datos.

## Antes de Empezar

1. Instalar las dependencias de Node.js ejecutando el comando `npm install` en la raíz del proyecto.

2. Configurar las variables de entorno dentro del proyecto `server`. Para ello, se debe crear un archivo `.env` en el directorio raíz del proyecto y configurar todas las variables descritas en el archivo `.env.example`.
   
Variables de entorno del proyecto `server`:

Variable	      | Descripción
---          	  | ---
`SERVER_PORT`     | Número de puerto para escuchar las peticiones HTTP
`SERVER_BASE_URL` | Ruta base donde se encuentra el servidor (por defecto, `/`)
`DATABASE_URL`    | Cadena de conexión a la base de datos PostgreSQL (ver documentación de [Prisma](https://pris.ly/d/connection-strings))

3. Restaurar la base de datos ejecutando el comando `npm run db:restore` en la raíz del proyecto.

## Administrar la Base de Datos (Backend)

Para restaurar la base de datos, se debe ejecutar el comando `npx prisma migrate dev` (o `npm run db:restore`). Este comando también ejecuta el comando `npx prisma generate` para actualizar los archivos del cliente de Prisma.

Para generar una nueva migración, se debe ejecutar el comando `npx prisma migrate dev --name <nombre>` (usar el formato `migration_name`).

Para reiniciar la base de datos, se debe ejecutar el comando `npx prisma migrate reset`. Este comando eliminará todos los datos existentes de la base de datos y recreará la base de datos.

Para añadir datos de prueba a la base de datos, se debe ejecutar el comando `npx prisma db seed`.

> Al modificar el esquema de la base de datos, se debe ejecutar el comando `npx prisma generate` para que se actualicen los archivos del cliente de Prisma. Cabe destacar que, al instalar las dependencias de Node.js, el comando `npx prisma generate` se ejecuta automáticamente.

## Correr el proyecto

En la raíz del proyecto, abrir una terminal y ejecutar el comando `npm start`. Esto iniciará tanto el servidor como la aplicación cliente del proyecto.