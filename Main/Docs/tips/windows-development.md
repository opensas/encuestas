# Consejos para configurar estación de trabajo para windows

## Configurar variables de entorno para usar el proxy

```shell
setx HTTP_PROXY "http://<USER>:<PASSWORD>@fortiproxy.ministerio.trabajo.gov.ar:8080" /M
setx HTTPS_PROXY "http://<USER>:<PASSWORD>@fortiproxy.ministerio.trabajo.gov.ar:8080" /M
setx NO_PROXY "localhost,127.0.0.1,::1" /M
```

Si no funciona probar con configuraciones específicos para cada herramienta

Para git

```shell
$ $git config --global http.proxy fortiproxy.ministerio.trabajo.gov.ar:8080
$ $git config --global https.proxy fortiproxy.ministerio.trabajo.gov.ar:8080
```

Para npm

```shell
npm config set proxy http://fortiproxy.ministerio.trabajo.gov.ar:8080
npm config set https-proxy http://fortiproxy.ministerio.trabajo.gov.ar:8080
```

Para nvm

```shell
nvm proxy fortiproxy.ministerio.trabajo.gov.ar:8080
```

Para vscode, editar la configuración de vscode

```json
	"http.proxy": "http://<USER>:<PASSWORD>@fortiproxy.ministerio.trabajo.gov.ar:8080",
	"http.proxyStrictSSL": false,
	"http.proxyAuthorization": null,
	"http.proxySupport": "override"
```

#TODO hacer funcionar volta en windows

## Evitar conversiones automáticas de retornos de carro con git windows

crear el archivo .gitattributes

```
# Prettier on Linux uses LF line endings, Git for Windows defaults to converting them to CRLF.
# This caused false "modified file" warnings when switching between OSes.
# This file ensures consistent LF line endings for all text files across Linux and Windows.
# It prevents Git from performing automatic line ending conversion

# DEFAULT: Treat everything as binary (no processing)
* -text

# EXCEPTIONS: These are text files and should use LF endings
*.js text eol=lf
*.ts text eol=lf
*.json text eol=lf
*.md text eol=lf
*.css text eol=lf
*.svelte text eol=lf
*.yml text eol=lf
*.yaml text eol=lf
*.html text eol=lf
*.txt text eol=lf

# Special case: Windows files that actually need CRLF
*.cmd text eol=crlf
*.bat text eol=crlf
```

## Crear un alias para ejecutar pnpm como pn

abrir una consola de power-shell

verificar si existe un archivo $PROFILE

ej: `C:\Users\sscarano\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`

```shell
Test-Path $PROFILE
```

Si no existe crearlo

```shell
New-Item -Path $PROFILE -Type File -Force
```

Editarlo

```shell
notepad $PROFILE
```

Agregar la siguiente línea

```shell
Set-Alias -Name pn -Value pnpm
```

Ejecutarlo

```shell
. $PROFILE
```

## Configurar git para usar el proxy

Abrir archivo en C:\Users\sscarano\.gitconfig

```shell
[credential "helperselector"]
	selected = wincred
[credential "https://devops.trabajo.gob.ar"]
	provider = generic
[user]
	name = Sebastian Antonio Scarano
	email = sscarano@trabajo.gob.ar
[http]
	sslVerify = true
	proxy = http://fortiproxy.ministerio.trabajo.gov.ar:8080
[https]
	proxy = http://fortiproxy.ministerio.trabajo.gov.ar:8080
[http "https://devops.trabajo.gob.ar"]
	proxy =
[https "https://devops.trabajo.gob.ar"]
	proxy =
```
