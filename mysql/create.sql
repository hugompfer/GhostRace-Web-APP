drop database if exists GhostRace;
create database GhostRace;
use GhostRace;

CREATE TABLE Utilizador(idUtilizador bigint AUTO_INCREMENT ,
username varchar(50) not null unique,
dataNascimento Date not null,
pw varchar(50) not null,
pais varchar(50) not null,
email varchar(100) not null,
PRIMARY KEY (IdUtilizador));

CREATE TABLE Personagem(idPersonagem bigint AUTO_INCREMENT ,
nome varchar(50) not null,
PRIMARY KEY (idPersonagem));

CREATE TABLE Sessao(idSessao bigint AUTO_INCREMENT ,
dataSessao datetime not null,
idNivel bigint not null,
idSessaoContra bigint,
personagem varchar(50) not null,
idUtilizador bigint not null,
PRIMARY KEY (idSessao));

CREATE TABLE Nivel(idNivel bigint AUTO_INCREMENT,
nome varchar(20) not null,
PRIMARY KEY (idNivel));

CREATE TABLE Estatistica(idEstatistica bigint AUTO_INCREMENT ,
valor varchar(50) not null,
idTipoEstatistica bigint not null,
idSessao bigint not null,
PRIMARY KEY (idEstatistica));

CREATE TABLE TipoEstatistica(idTipoEstatistica bigint AUTO_INCREMENT ,
nome varchar(50) not null,
descriçao  varchar(200) not null,
PRIMARY KEY (idTipoEstatistica));

ALTER TABLE Sessao 
ADD CONSTRAINT sessao_utilizador_fk
FOREIGN KEY (idUtilizador) REFERENCES Utilizador (idUtilizador); 

ALTER TABLE Sessao 
ADD CONSTRAINT sessao_nivel_fk
FOREIGN KEY (idNivel) REFERENCES Nivel (idNivel); 

ALTER TABLE Estatistica 
ADD CONSTRAINT estatistica_sessao_fk
FOREIGN KEY (idSessao) REFERENCES Sessao (idSessao); 

ALTER TABLE Estatistica 
ADD CONSTRAINT estatistica_tipoEstatistica_fk
FOREIGN KEY (idTipoEstatistica) REFERENCES TipoEstatistica (idTipoEstatistica); 