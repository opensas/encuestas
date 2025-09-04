currently using

https://github.com/Vuferen/sveltekit-adapter-node-iis for IIS adapter

(check svelte.config.js)

also check: https://github.com/abaga129/sveltekit-adapter-iis

---

open power shell as admin

PRE

Cargar el módulo WebAdministration

1. Check if IIS is installed

```shell
# Check IIS installation status
Get-WindowsOptionalFeature -Online -FeatureName "IIS-WebServerRole" | Select-Object State, FeatureName

# Check all IIS-related features
Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -like "IIS-*"} | Select-Object FeatureName, State

# Check all enabled IIS-related features
Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -like "IIS-*"} | Where-Object {$_.State -eq "Enabled"} | Select-Object FeatureName, State
```

2. Check ASP.NET 4.8

```shell
# Check ASP.NET 4.8 features
Get-WindowsOptionalFeature -Online -FeatureName "NetFx4Extended-ASPNET45" | Select-Object State, FeatureName
Get-WindowsOptionalFeature -Online -FeatureName "IIS-ASPNET45" | Select-Object State, FeatureName
Get-WindowsOptionalFeature -Online -FeatureName "IIS-NetFxExtensibility45" | Select-Object State, FeatureName
```

3. Check if URL Rewrite is installed

```shell
# Método 1: Verificar directamente el archivo DLL
Test-Path "C:\Windows\System32\inetsrv\rewrite.dll"

# Método 2: Buscar en el registro
Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\IIS Extensions\URL Rewrite" -ErrorAction SilentlyContinue

# Método 3: Verificar en características de Windows
Get-WindowsOptionalFeature -Online | Where-Object {$_.FeatureName -like "*rewrite*"}

# Método 4: Verificar en el directorio de programas
Test-Path "C:\Program Files\IIS Rewrite"
```
