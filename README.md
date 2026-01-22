# Sistema Encuestas

Sistema para crear, administrar y responder encuestas.

## Repositorios

Código fuente: https://devops.trabajo.gob.ar/DGIIT/encuestas

Builds compilados: `\\ministerio.trabajo.gov.ar\aplicaciones\Historial de Cambios Desa\Encuestas`

## Puesta en producción

Prerrequisitos del servidor

- Node.js LTS v22.18.0 ([descargar](https://nodejs.org/dist/v22.18.0/node-v22.18.0-x64.msi))

- IIS (con Management Console y ASP.NET 4.8)

- Módulo URL Rewrite 2.1 ([descargar](https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi))

- Módulo IISNode ((https://github.com/Azure/iisnode/releases/download/v0.2.26/iisnode-full-v0.2.26-x64.msi))

### Instalación

1. Copiar build al servidor:

```shell
$ xcopy /s /h /i /y "\\ministerio.trabajo.gov.ar\aplicaciones\Historial de Cambios Desa\Encuestas\Build\v001_yyyy-mm-dd" "C:\inetpub\wwwroot\encuestas"
```

2. Crear la aplicación en IIS

   - Physical path: carpeta del build
   - Puerto: ej. 3000
   - Pool: .NET CLR version → "No Managed Code"
   - Otorgar permisos de la carpeta al identity del pool

3. Configurar variables de entorno (archivo .env):

   Crear un archivo .env con el siguiente contenido:

   ```shell
   APP_ENV=prod
   DATABASE_URL="sqlserver://S1-DIXX-SQL07;database=Encuestas;user=AppEncuestasDesa;password=********;encrypt=true;trustServerCertificate=true"
   ```

   > Para más información consultar el archivo [Main/Source/.env.example](./Main/Source/.env.example)

4. Probar: http://localhost:3000

## Desarrollo y compilación

### Opción 1: Instalación manual

- Node.js v22.18.0 ([descargar](https://nodejs.org/dist/v22.18.0/node-v22.18.0-x64.msi))
- pnpm 9.15.1: `npm install -g pnpm@9.15.1`
- npm 11.5.2: `npm install -g npm@11.5.2`

### Opción 2: [Volta](https://volta.sh/) (recomendado)

Gestiona automáticamente las versiones definidas en package.json.

Instalación:

```shell
irm https://get.volta.sh | iex
```

Uso:

```shell
cd Main/Source
node --version    # → v22.18.0
pnpm --version    # → 9.15.1
npm --version     # → 11.5.2
```

## Compilación

```shell
git clone https://devops.trabajo.gob.ar/DGIIT/encuestas
cd encuestas/Main/Source

rmdir /s /q node_modules
pnpm install
cp .env.example .env
pnpm run build
```

La aplicación compilada con todas sus dependencias será guardada en la carpeta `build/`

## Desarrollo

```shell
pnpm dev
# → http://localhost:5173/
```

Puede usar una base de datos persistente de desarrollo con docker:

```shell
pnpm db:start
```

Y se conecta con el siguiente string de conexión:

```shell
DATABASE_URL="sqlserver://localhost:1433;database=encuestas;user=sa;password=Dev.1234!;encrypt=true;trustServerCertificate=true"
```

O puede crear la base desde cero. Primero debe crear una base `encuestas` y luego ejecutar:

```shell
pnpm prisma deploy
```

### Pruebas

```shell

# run unit tests in watch mode
pnpm test:unit

# run unit tests with no watch mode
pnpm test:unit --run

# run playwright e2e test
pnpm test:e2e

# run all tests
pnpm test

# filter by file name
pnpm test:unit --run examples

# filter by test name
pnpm test:unit --run  -t condition
```

## Entornos

- devops: `https://devops.trabajo.gob.ar/DGIIT/encuestas`
- Desarrollo: `\\S1-DIXX-WEB14\W3-Sites2\EncuestasDesa`
- Logs: `\\s1-dixx-web14\w3-resources\encuestasdesa\logs`
- Base de datos: `encuestas en S1-DIXX-SQL07`

## Puesta en producción

### Entorno de desarrollo

- compilar la aplicación

```shell
pnpm build
```

- crear copia de la versión actual en desarrollo

copiar a `\\S1-DIXX-WEB14\W3-Sites2\EncuestasDesa\__history\encuestas_9_9_9` el contenido de la carpeta `\\S1-DIXX-WEB14\W3-Sites2\EncuestasDesa`

- copiar archivos a servidor de desarrollo

> Nota: NO SOBRE ESCRIBIR los siguientes archivos: `.env` y `web.config`

### Entorno de producción

Crear una carpeta en `\\ministerio.trabajo.gov.ar\aplicaciones\Historial de Cambios Desa\Encuestas\Releases\V9.9.9`

Con las siguientes carpetas

build: contiene la versión compilada (NO incluir los archivos `.env` ni `web.config`)

...
