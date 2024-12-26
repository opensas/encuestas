# Sistema Encuestas

Este sistema provee un servicio que permite crear, administrar y responder encuestas de manera simple y ágil.

## Repositorios

Repositorio git: https://devops.trabajo.gob.ar/DGIIT/encuestas

File sharing con el código compilado: `\\ministerio.trabajo.gov.ar\aplicaciones\Historial de Cambios Desa\Encuestas`

## Puesta en producción

- instalar Node LTS (actualmente la versión es v22.12.0) - [link de descarga](https://nodejs.org/dist/v22.12.0/node-v22.12.0-x64.msi)

- instalar pnpm (desde una consola de Power-shell ejecutar `Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression`)

- instalar IIS (con IIS Management Console y ASP.NET 4.8 cons sus dependencias)

- instalar Módulo URL Rewrite 2.1 - [link de descarga](https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi)

- instalar Modulo IISNode - [link de descarga](https://github.com/Azure/iisnode/releases/download/v0.2.26/iisnode-full-v0.2.26-x64.msi)

- copiar el código compilado a la carpeta a ser configurada como `Physical path` del IIS

```shell
$ xcopy /s /h /i /y "\\ministerio.trabajo.gov.ar\aplicaciones\Historial de Cambios Desa\Encuestas\Build\v001_yyyy-mm-dd" "C:\inetpub\wwwroot\encuestas"
```

- Crear la aplicación en IIS

  - configurar como `Physical path` la carpeta con el `build` de la aplicación (ej: C:\inetpub\wwwroot\encuestas)
  - elegir un puerto para exponer la aplicación (ej: 3000)
  - configurar el pool de la aplicación
    - .NET CLR version: No Managed Code
    - otorgar permisos sobre la carpeta `build` a la cuenta del pool de aplicaciones: Advanced Settings, Process Model, Identity

- Probar la aplicación

```shell
$ start http://localhost:3000
```

### Compilando la aplicación desde el código fuente (opcional)

- instalar git for windows - [link de descarga](https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/Git-2.47.1-64-bit.exe)

- clonar el repositorio en una carpeta de trabajo

```shell
$ git clone https://devops.trabajo.gob.ar/DGIIT/encuestas

$ cd encuestas/Main/Source
```

- instalar dependencias y compilar aplicación

```shell
# traer la ultima versión de la aplicación
$ git pull

# instalar dependencias
$ npm ci

# compilar la aplicación
# en la carpeta `build` quedará la aplicación compilada y el archivo web.config
$ npm run build
```

- ejecutar y probar la aplicación

```shell
## probar la aplicación
$ node build/index.js

## navegar a `http://localhost:3000`
$ start http://localhost:3000
```

## Ejecución en desarrollo

- instalar Node LTS (actualmente la versión es v22.12.0) [link de descarga](https://nodejs.org/dist/v22.12.0/node-v22.12.0-x64.msi)

- instalar pnpm (desde una consola de Power-shell ejecutar `Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression`)

```shell
$ git clone https://devops.trabajo.gob.ar/DGIIT/encuestas

$ cd encuestas/Main/Source

$ pnpm install

$ pnpm dev

  ➜  Local:   http://localhost:5173/
```

Navegar a `http://localhost:5173/` (o apretarla tecla `o`)
