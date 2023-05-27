<div align="center">
  <img src="preview/logo.png" alt="Wise Support Logo" width="100" />
  <h1 align="center">Wise Support</h1>
    <div align="center">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=jorgeandrespadilla_wise-support&metric=alert_status"/>
  </div>
  <p align="center">
    Sistema para la gestión de tickets de soporte creado con TypeScript, Express y React.
  </p>
</div>

## Previsualización

![Modo claro](preview/light-mode.png)
_Modo claro_

![Modo oscuro](preview/dark-mode.png)
_Modo oscuro_

![Estadísticas](preview/stats.png)
_Estadísticas_

![Ajustes](preview/settings.png)
_Ajustes_

## Descripción

Este repositorio contiene el código fuente de la aplicación web desarrollada para el proyecto final de Ingeniería Web.

Wise Support es un sistema enfocado en la gestión de tickets soporte que se generan dentro de una empresa, con el objetivo de dar seguimiento al nivel de productividad de cada uno de los usuarios de soporte a lo largo del tiempo en función de los tickets atendidos. Para ello, la aplicación ofrece las siguientes funcionalidades:

-   Gestión de usuarios.
-   Gestión de tickets.
-   Gestión de categorías de tickets.
-   Gestión de tareas asociadas a los tickets.
-   Visualización de estadísticas.

El sistema maneja tres tipos de usuarios:

-   **Administrador**: tiene acceso a todas las funcionalidades del sistema.
-   **Supervisor**: asigna tickets a los usuarios de soporte y da seguimiento a los tickets asignados. Además, puede ver las estadísticas de productividad de los usuarios de soporte.
-   **Agente** (usuario de soporte): atiende los tickets asignados por el supervisor y registra las tareas realizadas para dar solución a los tickets.

## Estructura

El repositorio está compuesto por dos componentes:

-   Backend que contiene la API del proyecto (código fuente ubicado en el directorio `server`).
-   Frontend que contiene la aplicación SPA del proyecto (código fuente ubicado en el directorio `client`).

## Características

-   Manejo de usuarios.
-   Visualización de estadísticas.
-   Autenticación y control de acceso basado en roles.
-   Uso de migraciones para la administración de la base de datos.
-   Diseño responsivo y accesible.

## Tecnologías y Herramientas

-   Los proyectos fueron desarrollados en TypeScript usando la versión 16 de Node.js, y son gestionados usando NPM Workspaces.
-   El **Backend** utiliza Express.js y Prisma (ORM).
-   El **Frontend** utiliza React.js y Tailwind CSS para el diseño de la aplicación.
-   El proyecto utiliza PostgreSQL para el almacenamiento de los datos.
-   El sistema de autenticación se implementa usando JWT (JSON Web Tokens).
-   El proyecto utiliza Jest para la ejecución de pruebas unitarias.
-   El proyecto utiliza ESLint y Prettier para la verificación y formateo del código fuente.

## Instalaciones y Configuraciones Previas

1. Instalar PostgreSQL y crear una base de datos llamada `wise_support`.

2. Clonar el repositorio.

3. Instalar las dependencias de Node.js ejecutando el comando `npm install` en la raíz del proyecto.

4. Configurar las variables de entorno dentro del proyecto `server`. Para ello, se debe crear un archivo `.env` en el directorio raíz del proyecto y configurar todas las variables descritas en el archivo `.env.example` (ver [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)).

5. Restaurar la base de datos ejecutando el comando `npm run db:restore` en la raíz del proyecto (ver [Administración de la Base de Datos](#administración-de-la-base-de-datos)).

### Configuración de Variables de Entorno

1. Variables de entorno del proyecto `client`:

    Actualmente, el proyecto `client` no posee variables de entorno para el ambiente de desarrollo. Sin embargo, al momento de generar la aplicación para el ambiente de producción, se debe configurar la variable de entorno `REACT_APP_API_URL` con la URL base del servidor de producción donde se alojará la API (la URL base del servidor debe tener el formato `https://www.example.com`).

2. Variables de entorno del proyecto `server`:

    | Variable                   | Descripción                                                                                                            |
    | -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
    | `SERVER_PORT`              | Número de puerto para escuchar las peticiones HTTP                                                                     |
    | `SERVER_BASE_URL`          | Ruta base donde se encuentra el servidor (por defecto, apunta a la ruta raíz)                                          |
    | `JWT_ACCESS_TOKEN_SECRET`  | Clave secreta usada para generar y verificar los tokens de acceso JWT (variable requerida)                             |
    | `JWT_REFRESH_TOKEN_SECRET` | Clave secreta usada para generar y verificar los tokens de refrescamiento JWT (variable requerida)                     |
    | `DATABASE_URL`             | Cadena de conexión a la base de datos PostgreSQL (ver documentación de [Prisma](https://pris.ly/d/connection-strings)) |

    > En producción, es necesario configurar las variables de entorno en el servidor donde se desplegará la aplicación, dado que las variables de entorno no se leen desde el archivo `.env` en producción.

### Administración de la Base de Datos

_La administración de la base de datos se realiza dentro del directorio `server`._

Para ejecutar las migraciones de la base de datos, se debe ejecutar el comando `npx prisma migrate dev` (o `npm run db:restore`).

Para generar una nueva migración, se debe ejecutar el comando `npx prisma migrate dev --name <nombre>` (usar el formato `migration_name`). Para no incorporar datos de prueba, se debe añadir la opción `--skip-seed` al comando (esta opción es recomendada cuando se realiza un cambio en el modelo de datos que pueda afectar los datos de prueba generados con el comando `seed`).

Para restaurar/reiniciar la base de datos, se debe ejecutar el comando `npx prisma migrate reset`. Este comando eliminará todos los datos existentes de la base de datos y recreará la base de datos junto con los datos de prueba.

Para añadir datos de prueba a la base de datos, se debe ejecutar el comando `npx prisma db seed`. Este comando se ejecuta automáticamente cuando se restaura o se genera una nueva migración de la base de datos.

> Al modificar el esquema de la base de datos, se debe ejecutar el comando `npx prisma generate` para poder actualizar los archivos del ORM Prisma. Cabe destacar que, al instalar las dependencias de Node.js o restaurar la base de datos, el comando `npx prisma generate` se ejecuta automáticamente.

## Correr el proyecto

Ejecutar el comando `npm start` en la raíz del proyecto. Esto iniciará tanto el servidor como la aplicación web del proyecto.

Para usar la aplicación, se dispone de una cuenta de usuario administrador con las siguientes credenciales:

-   **Correo electrónico**: `admin@test.com`
-   **Contraseña**: `admin123`

## Desplegar el proyecto

Para desplegar el cliente en producción, se debe ejecutar el comando `npm run build` en la raíz del directorio `client`. Esto generará una carpeta `build`, la cual contiene los archivos estáticos de la aplicación web.

Para desplegar el servidor en producción, se debe ejecutar el comando `npm run build` en la raíz del directorio `server`. Esto generará una carpeta `build`, la cual contiene los archivos compilados del servidor. Previo a la ejecución del servidor, debemos configurar la instancia de la base de datos PostgreSQL y las variables de entorno en el servidor de producción, así como el comando `npm run db:restore` para restaurar la base de datos. Para iniciar el servidor en producción, se debe ejecutar el comando `npm start:production` en la raíz del directorio `server`.

## Contribuciones

Los commits del proyecto utilizan la convención de [Commits Convencionales](https://www.conventionalcommits.org/) y un esquema de [Versionado Semántico](https://semver.org/).

Las contribuciones al proyecto y el reporte de errores son bienvenidos. Para contribuir al proyecto, se debe crear un nuevo _pull request_ con la descripción de los cambios realizados.

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).
