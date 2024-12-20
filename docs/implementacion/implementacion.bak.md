- https://medium.com/@adarsh-d/deploy-node-js-application-on-iis-9703d5dfcaca

- iisnode iss module: https://github.com/Azure/iisnode

- url rewrite module: https://www.iis.net/downloads/microsoft/url-rewrite
  docs: https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-url-rewrite-module-20

example web.config file:

```xml
<configuration>
  <system.webServer>
  <handlers>
    <add name="iisnode" path="WebAPI.js" verb="*" modules="iisnode" />
  </handlers>

  <rewrite>
    <rules>
      <rule name="nodejs">
        <match url="(.*)" />
        <conditions>
          <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
        </conditions>
        <action type="Rewrite" url="/WebAPI.js" />
      </rule>
    </rules>
  </rewrite>

  <security>
    <requestFiltering>
      <hiddenSegments>
        <add segment="node_modules" />
        <add segment="iisnode" />
      </hiddenSegments>
    </requestFiltering>
  </security>
  </system.webServer>
</configuration>
```

---

windows 11 iso download

https://www.microsoft.com/en-us/software-download/windows11
