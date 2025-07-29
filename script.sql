create database noviasONLINE;
use noviasONLINE;

create table empleados(
    id_Empleado int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apPaterno VARCHAR(20) NOT NULL,
    apMaterno VARCHAR(20) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('Administradora', 'Vendedora') DEFAULT 'Vendedora' NOT NULL
);

insert into empleados values (1,'Marcela Gpe', 'De la Rosa', 'Palomar',4492652351,'contra','Administradora');
insert into empleados values (2,'Daniela', 'app1', 'app2',4492807491,'contra12','Vendedora');

create table eventos (  
    id_Evento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipoEvento ENUM('CitaInicial', 'Medidas', 'Entrega', 'Planchado') NOT NULL,
    id_Empleado INT NOT NULL,
    fechaEvento DATE NOT NULL,
    horaEvento TIME NOT NULL,
    nombreCliente VARCHAR(70) NOT NULL,
    telefonoCliente VARCHAR(15) NOT NULL,
    codigoVestido VARCHAR(25),
    detalles VARCHAR(255),
    status ENUM('Pendiente', 'Completado', 'Cancelado') DEFAULT 'Pendiente' NOT NULL,

    CONSTRAINT fk_evento_empleado FOREIGN KEY (id_Empleado) REFERENCES empleados(id_Empleado)
);

CREATE TABLE solicitudes (
    id_Solicitud INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(30) NOT NULL,
    apPaterno VARCHAR(20) NOT NULL,
    apMaterno VARCHAR(20) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    fechaEvento DATE NOT NULL,
    horaEvento TIME NOT NULL,
	tipoEvento ENUM('CitaInicial', 'Medidas', 'Entrega', 'Planchado') NOT NULL,
    detalles VARCHAR(255),
    status ENUM('Denegado', 'Pendiente', 'Aceptado') DEFAULT 'Pendiente' NOT NULL
);

drop table empleados;
drop table eventos;
drop table solicitudes;