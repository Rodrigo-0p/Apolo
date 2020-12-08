CREATE DATABASE apoloImport;

create Table usuario(
    iduser serial Primary key,
	nombre varchar(35) not null,
    email varchar(35) not null,
	contraseña varchar(255) not null,
	fechaCrea timestamp not null
);


