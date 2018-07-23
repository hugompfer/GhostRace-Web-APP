use ghostrace;
insert into Utilizador(username,dataNascimento,pw,pais,email) values("hugo",curdate(),"1","Portugal","hugo@hotmail.com");
insert into Utilizador(username,dataNascimento,pw,pais,email)  values("ruben",curdate(),"1","Portugal","ruben@hotmail.com");
insert into Utilizador(username,dataNascimento,pw,pais,email)  values("tiago",curdate(),"1","Portugal","tiago@hotmail.com");

insert into nivel(nome) values("Nivel 1");
insert into nivel(nome) values("Nivel 2");

insert into personagem(nome) values("Scout");
insert into personagem(nome) values("Buster");
insert into personagem(nome) values("Sargent");

insert into sessao(dataSessao,idNivel,idSessaoContra,personagem,idUtilizador)values(now(),1,-1,"Scout",1);
insert into sessao(dataSessao,idNivel,idSessaoContra,personagem,idUtilizador)values(now(),1,1,"Scout",2);

insert into TipoEstatistica(nome,descriçao)values("Resultado","Jogador ganhou ou não");
insert into TipoEstatistica(nome,descriçao)values("Tempo","Tempo que demorou a acabar o nivel");

insert into estatistica(valor,idTipoEstatistica,idSessao) values("Derrota",1,1);
insert into estatistica(valor,idTipoEstatistica,idSessao) values("Vitoria",1,2);
insert into estatistica(valor,idTipoEstatistica,idSessao) values("2.93",2,1);
insert into estatistica(valor,idTipoEstatistica,idSessao) values("3.93",2,2);
