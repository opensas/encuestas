# prisma tips

## migrations

### create a new migration without running it

```shell
$ pn prisma migrate dev --name add_encuesta --create-only
```

### check pending migrations

```shell
$ pn prisma migrate status
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQL Server database

2 migrations found in prisma/migrations
Following migration have not yet been applied:
20250621200956_add_referencia

To apply migrations in development run prisma migrate dev.
To apply migrations in production run prisma migrate deploy.
```

## misc

### set the allowed values for a field

```sql
-- CreateTable
CREATE TABLE [dbo].[Encuesta] (
    [encuestaId] INT NOT NULL IDENTITY(1,1),
    [fechaInsert] DATETIME2 NOT NULL CONSTRAINT [Encuesta_fechaInsert_df] DEFAULT CURRENT_TIMESTAMP,
    [estado] VARCHAR(20) NOT NULL CONSTRAINT [Encuesta_estado_df] DEFAULT 'en proceso',
    CONSTRAINT [Encuesta_pkey] PRIMARY KEY CLUSTERED ([encuestaId])
);

-- begin manually added
ALTER TABLE [dbo].[Encuesta]
ADD CONSTRAINT CHK_Estado_Encuesta
CHECK (estado = 'en proceso' OR estado = 'finalizada');
-- end manually added
```

# generate client code in node_modules folder

see https://github.com/prisma/prisma/discussions/21561

```
Can you please ensure that the Prisma client is generated inside the node_modules directory? This can be done by specifying the output path in your schema.prisma file to point to a directory within node_modules. For example:

generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/@prisma-app/client"
}

And then you would import your Prisma client like so:

import { PrismaClient } from '@prisma-app/client';
```

---

warn Prisma would have added DATABASE_URL but it already exists in .env
warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and a managed serverless Postgres database. Read: https://pris.ly/cli/beyond-orm

---

╭ Warning ───────────────────────────────────────────────────────────────────────────────────╮
│ │
│ Ignored build scripts: @prisma/client, @tailwindcss/oxide. │
│ Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts. │
│ │
╰────────────────────────────────────────────────────────────────────────────────────────────╯
