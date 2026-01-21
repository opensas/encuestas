I have a svelkit 5 app with typescript, prisma an sql server

I'm deploying it on windows

I'm using sveltekit-adapter-node-iis

adapter node iss just build the application to ./build folder
and then copy server.cjs and web.config (for iis) files to out folder
then it build the app with npm ci and copy .env files

server.cjs just patches a small discrepancy with the way IIS handles the process.env.SOCKET_PATH en var

see:
//server.cjs
process.env.SOCKET_PATH = process.env.PORT;
delete process.env.PORT

## import('./index.js')

and this is the web.config file

---

<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <handlers>
            <add name="iisnode" path="server.cjs" verb="*" modules="iisnode" />
        </handlers>
        <iisnode
            nodeProcessCommandLine="&quot;C:\Program Files\nodejs\node.exe&quot;"
            watchedFiles="web.config;*.js;*.cjs" 
        />
        <rewrite>
            <rules>
                <!-- All other URLs are mapped to the node.js site entry point -->
                <rule name="node">
                    <match url=".*" />
                    <action type="Rewrite" url="server.cjs" />
                </rule>
            </rules>
          <!-- Change it back if Location Header got rewrited-->
            <outboundRules>
                <rule name="back">
                    <match serverVariable="RESPONSE_Location" pattern="(.*)/server.cjs" />
                    <action type="Rewrite" value="{R:1}" />
                </rule>
        </outboundRules>
        </rewrite>
        <defaultDocument>
            <files>
                <add value="server.cjs" />
            </files>
        </defaultDocument>
        <httpErrors errorMode="Detailed" />
    </system.webServer>
</configuration>
---
the whole index.js module from adapter-node-iis

---

import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import node_adapter from '@sveltejs/adapter-node'
import child_process from 'node:child_process';

const files = fileURLToPath(new URL('./files', import.meta.url).href);

/\*_ @type {import('.').default} _/
export default function (opts = {}) {
const { out = 'build', precompress, envPrefix = '', polyfill = true, includePackage = true, buildNodeModules = false, transferEnv = false } = opts;

/\*_ @type {import('@sveltejs/kit').Adapter} _/
const na = node_adapter({out, precompress, envPrefix, polyfill});

    return {
    	name: 'sveltekit-adapter-node-iis',

    	async adapt(builder) {
      console.info("Running @sveltejs/adapter-node");
      await na.adapt(builder);
      console.info("Finished @sveltejs/adapter-node");

      console.info("Running sveltekit-adapter-node-iis");

      copyFileSync(`${files}\\server.cjs`, `${out}\\server.cjs`);
      copyFileSync(`${files}\\web.config`, `${out}\\web.config`);

      if (includePackage) {
        copyFileSync(`package.json`, `${out}\\package.json`);
        copyFileSync(`package-lock.json`, `${out}\\package-lock.json`);

        if (buildNodeModules) {
          console.info("Building node_modules")
          child_process.execSync(`cd ${out} && npm ci --omit dev`,{stdio:[0,1,2]});
        }
      }

      if (transferEnv) {
        copyFileSync(`.env`, `${out}\\.env`);
      }

      console.info("Finished sveltekit-adapter-node-iis");
    }

}
}

---

I run npm run build, and the app is copied to build folder, with the web.config and .env file

## to update the already deployed app:

- copiar el código compilado a la carpeta a ser configurada como `Physical path` del IIS

```shell
$ xcopy /s /h /i /y "\\ministerio.trabajo.gov.ar\aplicaciones\Historial de Cambios Desa\Encuestas\Build\v001_yyyy-mm-dd" "C:\inetpub\wwwroot\encuestas"

---

how can I automate it all using ms devops?

I want to commit to master and get the whole deploy triggered

I'd like to run

pnpm run check:all
pnpm run test

before deploying

give me a step by step guide
```
