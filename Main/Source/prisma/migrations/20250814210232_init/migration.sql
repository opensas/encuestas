BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Respuesta]
(
	[respuestaId] INT NOT NULL IDENTITY(1,1),
	[tipoEncuestaId] VARCHAR(50) NOT NULL,
	[referencia] VARCHAR(100),
	[encuesta] VARCHAR(max) NOT NULL CONSTRAINT [Respuesta_encuesta_df] DEFAULT '',
	[estado] VARCHAR(20) NOT NULL CONSTRAINT [Respuesta_estado_df] DEFAULT 'creado',
	[respuestas] VARCHAR(max) CONSTRAINT [Respuesta_respuestas_df] DEFAULT '',
	[preguntaActiva] VARCHAR(50),
	[puntaje] FLOAT(53),
	[inicio] DATETIME2 NOT NULL CONSTRAINT [Respuesta_inicio_df] DEFAULT CURRENT_TIMESTAMP,
	[fin] DATETIME2,
	[fechaInsert] DATETIME2 NOT NULL CONSTRAINT [Respuesta_fechaInsert_df] DEFAULT CURRENT_TIMESTAMP,
	[fechaUpdate] DATETIME2 NOT NULL CONSTRAINT [Respuesta_fechaUpdate_df] DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT [Respuesta_pkey] PRIMARY KEY CLUSTERED ([respuestaId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Respuesta_tipoEncuestaId] ON [dbo].[Respuesta]([tipoEncuestaId], [fechaInsert]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Respuesta_referencia] ON [dbo].[Respuesta]([referencia], [fechaInsert]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Respuesta_estado] ON [dbo].[Respuesta]([estado], [fechaInsert]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Respuesta_fechaInsert] ON [dbo].[Respuesta]([fechaInsert]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
	ROLLBACK TRAN;
END;
THROW

END CATCH
