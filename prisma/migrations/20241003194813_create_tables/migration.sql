BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[surveys] (
    [id] INT NOT NULL IDENTITY(1,1),
    [code] VARCHAR(50) NOT NULL CONSTRAINT [surveys_code_df] DEFAULT '',
    [version] INT NOT NULL CONSTRAINT [surveys_version_df] DEFAULT 1,
    [title] VARCHAR(1000) NOT NULL CONSTRAINT [surveys_title_df] DEFAULT '',
    [description] VARCHAR(4000) NOT NULL CONSTRAINT [surveys_description_df] DEFAULT '',
    [json_questions] VARCHAR(max) NOT NULL CONSTRAINT [surveys_json_questions_df] DEFAULT '',
    [created_at] DATETIME2 NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [created_by] INT NOT NULL CONSTRAINT [surveys_created_by_df] DEFAULT 0,
    [updated_by] INT NOT NULL CONSTRAINT [surveys_updated_by_df] DEFAULT 0,
    CONSTRAINT [surveys_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [surveys_code_version_key] UNIQUE NONCLUSTERED ([code],[version])
);

-- CreateTable
CREATE TABLE [dbo].[answers] (
    [id] INT NOT NULL IDENTITY(1,1),
    [survery_id] INT NOT NULL,
    [json_answers] VARCHAR(max) NOT NULL CONSTRAINT [answers_json_answers_df] DEFAULT '',
    [created_at] DATETIME2 NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [created_by] INT NOT NULL CONSTRAINT [answers_created_by_df] DEFAULT 0,
    [updated_by] INT NOT NULL CONSTRAINT [answers_updated_by_df] DEFAULT 0,
    CONSTRAINT [answers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[answers] ADD CONSTRAINT [answers_survery_id_fkey] FOREIGN KEY ([survery_id]) REFERENCES [dbo].[surveys]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
