if not exists (select name from sys.databases where name = 'encuestas')
begin
	create database encuestas;
	print 'Base de datos "encuestas" creada con éxito.';
end
else
begin
	print 'La base de datos "encuestas" ya existía.';
end
go