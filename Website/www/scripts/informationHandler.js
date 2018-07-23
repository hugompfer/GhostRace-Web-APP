"use strict";
/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(AJAX)
 * @memberof window
 */
function loadInformation() {
    var info = new Information();
    info.getStatisticsCountry();
    info.getStatisticsRanking();
    info.getStatisticsTimePlayed();
    info.getStatisticType();
    info.getLevels();
    info.getCharacters();
    window.info = info;
}


/** 
* @class Guarda toda informação necessaria na execução site 
* @constructs Informacao
* 
* @property {string} id - elemento HTML que contém a informação.
* @property {characters[]} characters - Array de objetos do tipo Character, para guardar todos as personagen do jogo
* @property {levels[]} levels - Array de objetos do tipo Level, para guardar todas os niveis do jogo 
* @property {country[]} countries - Dicionario de objetos do tipo Country, para guardar todos os countries do nosso sistema
* @property {people[]} people - Array de objetos do tipo Person, para guardar todos utilizadores do sistema/jogo
* @property {sessions[]} sessions - Array de objetos do tipo Session, para guardar todas os sessões do jogo 
* @property {statistics[]} statistics - Array de objetos do tipo Statistic, para guardar todas as estatisticas do jogo
* @property {statisticsRanking[]} statisticsRanking - dicionario de objetos do tipo Rank, para guardar o ranking de vitorias do jogo
* @property {statisticsTimePlayed[]} statisticsTimePlayed - Array de objetos do tipo TimePlayed, para guardar o ranking de tempo jogado do jogo
* @property {statisticsPlayerPerCountry[]} statisticsPlayerPerCountry - Array de objetos do tipo StatisticCountry, para guardar o ranking de jogadores por pais
* @property {statisticsTypes[]} statisticsTypes - Array de objetos do tipo StatisticType, para guardar todas os tipos de estatistica do jogo
*/
function Information() {
    this.id = document.getElementById("Information");
    this.characters = [];
    this.levels = []
    this.people = [];
    this.sessions = [];
    this.statistics = [];
    this.statisticsRanking = [];
    this.statisticsTimePlayed = [];
    this.statisticsPlayerPerCountry = [];
    this.statisticsTypes = [];
    this.countries = { "Portugal": 1, "Inglaterra": 2, "Espanha": 3, "França": 4 };
};



/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade personagem 
* @constructs Person
* @param {int} id - id da personagem
* @param {String} name - nome da personagem
*/

function Character(id, name) {
    this.id = id;
    this.name = name;
}
/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Person
* @param {int} id - id da pessoa
* @param {String} username - username da pessoa
* @param {Date} birthDate - data de nascimento da pessoa
* @param {String} idCountry - pais da pessoa
* @param {String} email - email da pessoa
*/
function Person(id, username, birthDate, country, email) {
    this.id = id;
    this.username = username;
    this.birthDate = birthDate;
    this.country = country;
    this.email = email;
}

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade sessão de jogo
* @constructs Session
* @param {int} id - id da sessão
* @param {string} date - data da sessão
* @param {int} level - nivel da sessão
* @param {string} character - nome da personagem
* @param {int} sessionAgainst - id da sessão contra
* @param {int} player - id da pessoa que fez a sessão
*/
function Session(id, date, level, character, sessionAgainst, player) {
    this.id = id;
    this.date = new Date(date);
    this.level = level;
    this.character = character;
    this.sessionAgainst = sessionAgainst;
    this.player = player;

};

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade estatistica de uma sessão
* @constructs Statistic
* @param {int} id - id da estatistica
* @param {string} type - type da estatistica
* @param {string} value - valor da estatistica
* @param {int} idSession - id da sessão correspondente
*/
function Statistic(id, type, value, idSession) {
    this.id = id;
    this.type = isNaN(type) ? getStatisticTypeId(type) : getStatisticTypeName(type);
    this.value = value;
    this.idSession = idSession;
};

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade rank de uma pessoa
* @constructs Rank
* @property {String} username - username da pessoa
* @property {int} vitorias - numero de vitorias
* @param {dicionary} data - dicionario com a informação do rank
*/
function Rank(data) {
    this.username = (data ? data['username'] : undefined);
    this.vitorias = (data ? data['vitorias'] : undefined);
};

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade TimePlayed de uma pessoa
* @constructs TimePlayed
* @param {String} username - username da pessoa
* @param {int} timeplayed - tempo total jogado
* @param {dicionary} data - dicionario com a informação do TimePlayed
*/
function TimePlayed(data) {
    this.username = (data ? data['username'] : undefined);
    this.timeplayed = (data ? data['tempojogado'] : undefined);
};

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade StatisticCountry de um pais
* @constructs StatisticCountry
* @param {String} country - pais
* @param {int} numberOfPlayers - numero total de pessoas
* @param {dicionary} data - dicionario com a informação do StatisticCountry
*/
function StatisticCountry(data) {
    this.country = (data ? data['pais'] : undefined);
    this.numberOfPlayers = (data ? data['NumeroDeJogadores'] : undefined);
};

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade StatisticType de uma estatistica
* @constructs StatisticType
* @param {int} id - id do tipo
* @param {String} name - nome do tipo
* @param {dicionary} data - dicionario com a informação do StatisticType
*/
function StatisticType(data) {
    this.id = (data ? data['idTipoEstatistica'] : undefined);;
    this.name = (data ? data['nome'] : undefined);;
};

/**
 * Insere no element com id characters a informação das personagens
 */
Information.prototype.showCharacters = function () {
    var characterSelect = document.getElementById("characters");
    for (var i = 0; i < this.characters.length; i++) {
        var opt = document.createElement('option');
        opt.textContent = this.characters[i].name;
        characterSelect.appendChild(opt);
    }
};

/**
 * Insere no element com id levelSession a informação dos niveis
 */
Information.prototype.showLevels = function () {
    var levelSelect = document.getElementById("levelSession");
    for (var i = 0; i < this.levels.length; i++) {
        var opt = document.createElement('option');
        opt.textContent = this.levels[i].idNivel;
        levelSelect.appendChild(opt);
    }
};

/**
 * coloca a palavra "Jogadores" no elemento subtitle e cria dinamicamente uma tabela com a informação das pessoas, bem como os seus butoes
 */
Information.prototype.showPerson = function () {
    document.getElementById("subtitle").textContent = "Jogadores";

    var table = document.createElement("table");
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    table.id = "personsTable";
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tableLine(new Person(), true));
    for (var i = 0; i < this.people.length; i++) {
        tbody.appendChild(tableLine(this.people[i], false));
    }

    replaceChilds("tableZone", table);
    removeChils("tableButtons");
    createButton("removePlayers", "btn remove", "/images/remove.png", "Eliminar", "tableButtons", function () { openModal("deleteModal", "removePlayers"); });
    createButton("editPlayer", "btn edit", "/images/edit.png", "Editar", "tableButtons", function () { openModal("playerModal", "editPlayer"); });
    createButton("addPlayer", "btn add", "/images/add.png", "Adicionar jogador", "tableButtons", function () { openModal("playerModal", "addPlayer"); });
};


/**
 * Função genérica que cria um botão HTML, dá-lhe um evento e coloca-o na árvore de nós
 * @param {String} id - id para dar ao botão
 * @param {String} clas - class para dar ao botão
 * @param {HTMLElement} parent - nó pai do botão
 * @param {function} event - evento do botão.
 * @param {String} value - texto do botão.
 */
function createButton(id, clas, src, value, parent, event) {
    var divButon = document.createElement("div");
    divButon.className = clas;
    divButon.id = id;
    var img = document.createElement("img");
    img.src = src;
    var span = document.createElement("span");
    var text = document.createElement("b");
    text.textContent = value;
    span.appendChild(text);
    divButon.appendChild(img);
    divButon.appendChild(span);

    divButon.addEventListener("click", event);
    document.getElementById(parent).appendChild(divButon);
}


/**
 * Função que substitui todos os elementos filhos de um elemento HTML por um novo elemento HTML (facilitador de DOM)
 * @param {string} id - id do elemento HTML para o qual se pretende substituir os filhos.
 * @param {HTMLElement} newSon - elemento HTML que será o novo filho.
 */
function replaceChilds(id, newSon) {
    removeChils(id);
    var no = document.getElementById(id);
    no.appendChild(newSon);
};


/**
 * Função que remove todos os elementos filhos de um elemento HTML 
 * @param {string} id - id do elemento HTML para o qual se pretende remover os filhos.
 */
function removeChils(id) {
    var no = document.getElementById(id);
    while (no.hasChildNodes()) {
        no.removeChild(no.lastChild);
    }

};

/**
 * coloca a palavra "Sessões" no elemento subtitle e cria dinamicamente uma tabela com a informação das sessões, bem como os butões
 */
Information.prototype.showSessions = function () {
    document.getElementById("subtitle").textContent = "Sessões";

    var table = document.createElement("table");
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    table.id = "tableSessions";
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tableLine(new Session(), true));
    for (var i = 0; i < this.sessions.length; i++) {
        tbody.appendChild(tableLine(this.sessions[i], false));
    }
    replaceChilds("tableZone", table);
    removeChils("tableButtons");
    createButton("removeSessions", "btn remove", "/images/remove.png", "Eliminar", "tableButtons", function () { openModal("deleteModal", "removeSessions"); });
    createButton("editSession", "btn edit", "/images/edit.png", "Editar", "tableButtons", function () { openModal("sessionModal", "editSession"); });
    createButton("addSession", "btn add", "/images/add.png", "Adicionar Sessão", "tableButtons", function () { openModal("sessionModal", "addSession"); });
};

/**
 * coloca a palavra "Estatísticas" no elemento category e cria dinamicamente uma tabela com a informação das estatisticas bem como os butões
 */
Information.prototype.showStatistics = function () {
    document.getElementById("category").textContent = "Estatísticas";

    var table = document.createElement("table");
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    table.id = "statisticsTable";
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tableLine(new Statistic(), true));
    for (var i = 0; i < this.statistics.length; i++) {
        tbody.appendChild(tableLine(this.statistics[i], false));
    }
    replaceChilds("tableStatisticSpace", table);
    removeChils("tableStatsButtons");
    createButton("removeStatistics", "btn remove", "/images/remove.png", "Eliminar", "tableStatsButtons", function () { openModal("deleteModal", "removeStatistics"); });
    createButton("editStatistic", "btn edit", "/images/edit.png", "Editar", "tableStatsButtons", function () { openModal("statisticsModal", "editStatistic"); });
    createButton("addStatistic", "btn add", "/images/add.png", "Adicionar Estatistica", "tableStatsButtons", function () { openModal("statisticsModal", "addStatistic"); });
};


/**
 * coloca a palavra "Ranking" no elemento category e cria dinamicamente uma tabela com a informação do ranking bem como os butões
 */
Information.prototype.showStatisticsRanking = function () {
    document.getElementById("category").textContent = "Ranking";
    var table = document.createElement("table");
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    table.id = "statisticsTable";
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tableLine(new Rank(), true));
    for (var i = 0; i < this.statisticsRanking.length; i++) {
        tbody.appendChild(tableLine(this.statisticsRanking[i], false));
    }
    replaceChilds("tableStatisticSpace", table);
    removeChils("tableStatsButtons");
};

/**
 * coloca a palavra "Tempo jogado" no elemento category e cria dinamicamente uma tabela com a informação do ranking de tempo jogado bem como os butões
 */
Information.prototype.showStatisticsTimePlayed = function () {
    document.getElementById("category").textContent = "Tempo jogado";
    var table = document.createElement("table");
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    table.id = "statisticsTable";
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tableLine(new TimePlayed(), true));
    for (var i = 0; i < this.statisticsTimePlayed.length; i++) {
        tbody.appendChild(tableLine(this.statisticsTimePlayed[i], false));
    }
    replaceChilds("tableStatisticSpace", table);
    removeChils("tableStatsButtons");
};

/**
 * coloca a palavra "Jogador por país" no elemento category e cria dinamicamente uma tabela com a informação dos jofadores por pais bem como os butões
 */
Information.prototype.showStatisticsCountry = function () {
    document.getElementById("category").textContent = "Jogador por país";

    var table = document.createElement("table");
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    table.id = "statisticsTable";
    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tableLine(new StatisticCountry(), true));
    for (var i = 0; i < this.statisticsPlayerPerCountry.length; i++) {
        tbody.appendChild(tableLine(this.statisticsPlayerPerCountry[i], false));
    }
    replaceChilds("tableStatisticSpace", table);
    removeChils("tableStatsButtons");
};

/**
 * Insere no element com id statisticType a informação dos tipos de estatistica
 */
Information.prototype.showStatisticsTypes = function () {
    var select = document.getElementById("statisticType");
    for (var i = 0; i < this.statisticsTypes.length; i++) {
        var opt = document.createElement('option');
        opt.textContent = this.statisticsTypes[i].name;
        select.appendChild(opt);
    }
};


/**
 * Insere nos elementos respeticos a informação do utilizador logado
 */
Information.prototype.showPersonDataAccount = function () {
    document.getElementById("usernameAcc").value = info.userLogged["username"];
    document.getElementById("emailAcc").value = info.userLogged["email"];
    document.getElementById("birthdateAcc").value = formatedToString(info.userLogged["dataNascimento"]);
    document.getElementById("countryAcc").options[info.countries[info.userLogged["pais"]]].selected = 'selected';
    document.getElementById("passwordAcc").value = info.userLogged["pw"];
}


/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos character através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getCharacters = function () {
    this.characters=[];
    var characters = this.characters;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/characters");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.message.forEach(function (current) {
                characters.push(new Character(current.idPersonagem, current.nome));
            });
            info.showCharacters();
        }
    }
    xhr.send();
};

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos Level através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getLevels = function () {
    this.levels=[];
    var levels = this.levels;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/levels");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.levels.forEach(function (current) {
                levels.push(current);
            });
            info.showLevels();
        }
    }
    xhr.send();
};


/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos Person através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getPerson = function (dontShow) {
    this.people = [];
    var people = this.people;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/users");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.user.forEach(function (current) {
                people.push(new Person(current.idUtilizador, current.username, new Date(current.dataNascimento), current.pais, current.email));
            });
            document.getElementById("containerInformation").style.display = "block";
            info.showPerson();
        } else if (this.status === 401 && this.readyState === 4 && !dontShow) {
            document.getElementById("permission").style.display = "block";
        }
    }
    xhr.send();
};

/**
 * Função que apaga o recurso pessoa com um pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removePerson = function (id) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("DELETE", "/users/" + id);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            for (var i = 0; i < info.people.length; i++) {
                if (info.people[i].id == id) {
                    info.people.splice(i, 1);
                }
            }
            info.showPerson();
        }
    }
    xhr.send();
}
/**
 * Função que insere ou atualiza o recurso pessoa com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 * @param {String} action - controla qual a operação do CRUD queremos fazer
 * @param {int} id - id da pessoa
  */
Information.prototype.processingPerson = function (id, action) {
    var username = document.getElementById("usernamePlayer").value;
    var birthdate = formatedToString(new Date(document.getElementById("birthdatePlayer").value));
    var select = document.getElementById("countryPlayer");
    var country = select.options[select.selectedIndex].value;
    var email = document.getElementById("emailPlayer").value;
    var person = new Person(id, username, birthdate, country, email);
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (action === "create") {
        xhr.open("POST", "/users/");
        person.password = document.getElementById("passwordPlayer").value;
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                var newPerson = new Person(xhr.response.insertId, username, birthdate, country, email);
                info.people.push(newPerson);
                info.showPerson();
            }else if (this.status === 401 && this.readyState === 4){
                document.getElementById("usernamePlayer").style.backgroundColor = "#FA8072";
            }
        }
    } else {
        xhr.open("PUT", "/users/" + id);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                for (var i = 0; i < info.people.length; i++) {
                    if (info.people[i].id == id) {
                        var newPerson = new Person(xhr.response.insertId, username, birthdate, country, email);
                        info.people[i] = person;
                    }
                }
                info.showPerson();
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    if (validatePersonData(person, "emailPlayer", "usernamePlayer","passwordPlayer","countryPlayer","birthdatePlayer")) {
        xhr.send(JSON.stringify(person));
        return true;
    }
    return false;

}

/**
 * Função que verifica se um email está correto ou não
 * @param {String} email - email a validar
 */
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Função que verifica se existe um utilizador com um determinado username
 * @param {String} username - username a verificar
 * @param {int} personId - id da pessoa
 */
function usernameExists(personId, username) {
    for (var i = 0; i < info.people.length; i++) {
        if (info.people[i].id != personId && username == info.people[i].username) {
            return true;
        }
    }
}

/**
 * Função que verifica se um utilizador tem os dados corretos
 * @param {Person} person - pessoa a verificar os dados
 * @param {String} elem1 - corresponde a um id de um elemento HTML de email
 * @param {String} elem1 - corresponde a um id de um elemento HTML de username
 * @param {String} elem1 - corresponde a um id de um elemento HTML de password
 * @param {String} elem1 - corresponde a um id de um elemento HTML de country
 * @param {String} elem1 - corresponde a um id de um elemento HTML de birthDate
 */
function validatePersonData(person, elem1, elem2,elem3,elem4,elem5) {
    clearPerson(elem1, elem2,elem3,elem4,elem5);
    if (!validateEmail(person.email)) {
        document.getElementById(elem1).style.backgroundColor = "#FA8072";
        return false;
    } else if (usernameExists(person.id, person.username) || person.username==="" ) {
        document.getElementById(elem2).style.backgroundColor = "#FA8072";
        return false;
    }else if (person.password==="") {
        document.getElementById(elem3).style.backgroundColor = "#FA8072";
        return false;
    }else if (person.country==="") {
        document.getElementById(elem4).style.backgroundColor = "#FA8072";
        return false;
    }else if(person.birthDate==="NaN-NaN-NaN"  || person.birthDate==="Invalid Date"){
        document.getElementById(elem5).style.backgroundColor = "#FA8072";
        return false;
    }
    return true;
}


/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos Session através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getSessions = function (dontShow) {
    this.sessions = [];
    var sessions = this.sessions;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sessions");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.sessions.forEach(function (current) {
                sessions.push(new Session(current.idSessao, current.dataSessao, current.idNivel,
                    current.personagem, current.idSessaoContra, current.idUtilizador));
            });
            document.getElementById("containerInformation").style.display = "block";
            info.showSessions();
        } else if (this.status === 401 && this.readyState === 4 && !dontShow) {
            document.getElementById("permission").style.display = "block";
        }
    }
    xhr.send();
};


/**
 * Função que apaga o recurso sessão com um pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeSession = function (id) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("DELETE", "/sessions/" + id);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            for (var i = 0; i < info.sessions.length; i++) {
                if (info.sessions[i].id == id) {
                    info.sessions.splice(i, 1);
                }
            }
            info.showSessions();
        }
    }
    xhr.send();
}


/**
 * Função que insere ou atualiza o recurso sessão com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 * @param {String} action - controla qual a operação do CRUD queremos fazer
 * @param {int} id - id da sessão
  */
Information.prototype.processingSession = function (id, action) {
    var date = formatedToString(new Date(document.getElementById("dateSession").value));
    var selectLevel = document.getElementById("levelSession");
    var level = selectLevel.options[selectLevel.selectedIndex].value;
    var selectCharacter = document.getElementById("characters");
    var character = selectCharacter.options[selectCharacter.selectedIndex].value;
    var sessionAgainst = document.getElementById("pagainst").value;
    var person = document.getElementById("playerSession").value;
    var session = new Session(id, date, level, character, sessionAgainst, person);
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (action === "create") {
        xhr.open("POST", "/sessions/");
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                var newSession = new Session(xhr.response.insertId, date, level, character, sessionAgainst, person);
                info.sessions.push(newSession);
                info.showSessions();
            }
        }
    } else {
        xhr.open("PUT", "/sessions/" + id);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                for (var i = 0; i < info.sessions.length; i++) {
                    if (info.sessions[i].id == id) {
                        info.sessions[i] = session;
                    }
                }
                info.showSessions();
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    if (validateSessionData(session)) {
        xhr.send(JSON.stringify(session));
        return true;
    }
    return false;

}

/**
 * Função que verifica se uma sessão tem os dados corretos
 * @param {Session} session - sessão a verificar os dados
 */
function validateSessionData(session) {
    clearSession();
    if (!idSessionExists(session.sessionAgainst)) {
        document.getElementById("pagainst").style.backgroundColor = "#FA8072";
        return false;
    } else if (!idPersonExists(session.player)) {
        document.getElementById("playerSession").style.backgroundColor = "#FA8072";
        return false;
    }else if(!(session.date instanceof Date) || session.date==="NaN-NaN-NaN"  || session.date==="Invalid Date"){
        document.getElementById("dateSession").style.backgroundColor = "#FA8072";
        return false;
    }
    return true;
}

/**
 * Função que verifica se existe uma pessoa com um respetivo id
 * @param {int} personId - id da pessoa
 */
function idPersonExists(personId) {
    for (var i = 0; i < info.people.length; i++) {
        if (info.people[i].id == personId) {
            return true;
        }
    }
    return false;
}

/**
 * Função que verifica se existe uma sesão com um respetivo id
 * @param {int} sessionId - id da sessão
 */
function idSessionExists(sessionId) {
    if (sessionId == -1)
        return true;
    for (var i = 0; i < info.sessions.length; i++) {
        if (info.sessions[i].id == sessionId) {
            return true;
        }
    }
    return false;
}

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos estatistica através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getStatistics = function () {
    this.statistics = [];
    var statistics = this.statistics;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statistics/");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.statistics.forEach(function (current) {
                statistics.push(new Statistic(current.idEstatistica, current.idTipoEstatistica, current.valor, current.idSessao));
            });
            document.getElementById("tableStatistics").style.display = "block";
            info.showStatistics();
        } else if (this.status === 401 && this.readyState === 4) {
            document.getElementById("permission").style.display = "block";
        }
    }
    xhr.send();
};

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos rank através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getStatisticsRanking = function () {
    this.statisticsRanking=[];
    var statisticsRanking = this.statisticsRanking;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statistics/ranking");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.statistics.forEach(function (current) {
                statisticsRanking.push(new Rank(current));
            });
        }
    }
    xhr.send();
};

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos TimePlayed através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getStatisticsTimePlayed = function () {
    this.statisticsTimePlayed=[];
    var statisticsTimePlayed = this.statisticsTimePlayed;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statistics/timeplayed");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.statistics.forEach(function (current) {
                statisticsTimePlayed.push(new TimePlayed(current));
            });
        }
    }
    xhr.send();
};

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos TimePlayed através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getStatisticsCountry = function () {
    this.statisticsPlayerPerCountry = [];
    var statisticsPlayerPerCountry = this.statisticsPlayerPerCountry;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statistics/country");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.statistics.forEach(function (current) {
                statisticsPlayerPerCountry.push(new StatisticCountry(current));
            });
        }
    }
    xhr.send();
};

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS os recursos StatisticType através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getStatisticType = function () {
    this.statisticsTypes=[];
    var statisticsTypes = this.statisticsTypes;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statisticsType");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var response = JSON.parse(this.responseText);
            response.statisticsType.forEach(function (current) {
                statisticsTypes.push(new StatisticType(current));
            });
            info.showStatisticsTypes();
        }
    }
    xhr.send();
};

/**
 * Função que apaga o recurso statistic com um pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removeStatistic = function (id) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("DELETE", "/statistics/" + id);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            for (var i = 0; i < info.statistics.length; i++) {
                if (info.statistics[i].id == id) {
                    info.statistics.splice(i, 1);
                }
            }
            info.showStatistics();
        }
    }
    xhr.send();
}

/**
 * Função que insere ou atualiza o recurso statistica com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 * @param {String} action - controla qual a operação do CRUD queremos fazer
 * @param {int} id - id da sessão
  */
Information.prototype.processingStatistic = function (id, action) {
    var value = document.getElementById("value").value;
    var selectType = document.getElementById("statisticType");
    var type = selectType.options[selectType.selectedIndex].value;
    var idSession = document.getElementById("idSessaoStatistic").value;
    var statistic = new Statistic(id, type, value, idSession);
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (action === "create") {
        xhr.open("POST", "/statistics/");
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                var newStatistic = new Statistic(xhr.response.insertId, type, value, idSession);
                info.statistics.push(newStatistic);
                info.showStatistics();
            }
        }
    } else {
        xhr.open("PUT", "/statistics/" + id);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                for (var i = 0; i < info.statistics.length; i++) {
                    if (info.statistics[i].id == id) {
                        statistic.type = getStatisticTypeName(statistic.type);
                        info.statistics[i] = statistic;
                    }
                }
                info.getStatistics();
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    if (validateStatistic(statistic)) {
        xhr.send(JSON.stringify(statistic));
        return true;
    }
    return false;
}

/**
 * Função que verifica se uma estatistica tem os dados corretos
 * @param {Statistic} statistic - estatistica a verificar os dados
 */
function validateStatistic(statistic) {
    clearStatisticModal();
    if (isNaN(statistic.value) && statistic.type === 2) {
        document.getElementById("value").style.backgroundColor = "#FA8072";
        return false;
    } else if (!idSessionExists(statistic.idSession)) {
        document.getElementById("idSessaoStatistic").style.backgroundColor = "#FA8072";
        return false;
    }else if (statistic.value==="") {
        document.getElementById("value").style.backgroundColor = "#FA8072";
        return false;
    }
    return true;
}

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o login de uma pessoa através do verbo POST, usando pedidos assincronos e JSON
 */
Information.prototype.login = function () {
    var username = document.getElementById("nameLR").value;
    var person = new Person(-1, username);
    person.password = document.getElementById("passLR").value;
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/signin/");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            document.getElementById("login").style.display = "none";
            document.getElementById("mainLogin").style.display = "none";
            alert("Logado!");
            info.getPerson();
            info.getStatistics();
            info.getSessions();
        } else if (this.status === 404 && this.readyState === 4) {
            alert("Credenciais erradas!");
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(person));
}

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o registo de uma pessoa através do verbo POST, usando pedidos assincronos e JSON
 */
Information.prototype.register = function () {
    var username = document.getElementById("nameLR").value;
    var birthDate = formatedToString(new Date(document.getElementById("dateLR").value));
    var select = document.getElementById("countryLR");
    var country = select.options[select.selectedIndex].value;
    var email = document.getElementById("emailLR").value;
    var person = new Person(-1, username, birthDate, country, email);
    person.password = document.getElementById("passLR").value;

    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "/users/");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var newPerson = new Person(xhr.response.insertId, username, birthDate, country, email);
            info.people.push(newPerson);
            alert("Utilizador criado!");
        }else if (this.status === 401 && this.readyState === 4){
            document.getElementById("nameLR").style.backgroundColor = "#FA8072";
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    if (validatePersonData(person, "emailLR", "nameLR","passLR","countryLR","dateLR")) {
        xhr.send(JSON.stringify(person));
    }

}

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso person logado através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.getUserLogged = function () {
    var statisticsTimePlayed = this.statisticsTimePlayed;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/account/");
    xhr.onreadystatechange = function () {
        var response;
        if (this.status === 200 && this.readyState === 4) {
            response = JSON.parse(this.responseText);
            info.userLogged = response;
            document.getElementById("Account").style.display = "block";
            document.getElementById("confirmAcc").addEventListener("click", info.editAccount);
            info.showPersonDataAccount();
        } else if (this.status === 404 && this.readyState === 4) {
            document.getElementById("permission").style.display = "block";
        }
        loadInformation(response);
    }
    xhr.send();
};

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o logout da pessoa logada através do verbo GET, usando pedidos assincronos e JSON
 */
Information.prototype.logout = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/account/logout/");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            alert("Logout efetuado com sucesso!");
            document.getElementById("accountForm").reset();
            loadInformation();
        }
    }
    xhr.send();
};

/**
 * Função que atualiza o recurso pessoa com um pedido ao NODE.JS através do verbo PUT, usando pedidos assincronos e JSON
  */
Information.prototype.editAccount = function () {
    var username = document.getElementById("usernameAcc").value;
    var birthdate = formatedToString(new Date(document.getElementById("birthdateAcc").value));
    var select = document.getElementById("countryAcc");
    var country = select.options[select.selectedIndex].value;
    var email = document.getElementById("emailAcc").value;
    var password = document.getElementById("passwordAcc").value;
    var person = new Person(-1, username, birthdate, country, email);
    person.password = document.getElementById("passwordAcc").value;
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("PUT", "/account/");
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            alert("Dados alterados com sucesso!");
            info.getUserLogged();
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    if (validatePersonData(person, "emailAcc", "usernameAcc","passwordAcc","countryAcc","birthdateAcc")) {
        xhr.send(JSON.stringify(person));
    }
}

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com informação relativa ao estado das suas propriedades
 * @param {Object} object - objecto do qual vamos transformar o conteudo dos seus atributos em linhas
 * @param {boolean} headerFormat - controla de o formato é cabeçalho ou linha normal
 */
function tableLine(object, headerFormat) {
    var tr = document.createElement("tr");
    var tableCell = null;
    if (!headerFormat)
        addCheckBox(tr);
    else {
        tableCell = document.createElement("th");
        tr.appendChild(tableCell);
    }
    for (var property in object) {
        if ((object[property] instanceof Function))
            continue;
        if (headerFormat) {
            tableCell = document.createElement("th");
            if (property === "birthDate")
                tableCell.textContent = "Age";
            else
                tableCell.textContent = property[0].toUpperCase() + property.substr(1, property.length - 1);
        } else {

            tableCell = document.createElement("td");
            var value;
            if (property === "birthDate")
                value = calculateAge(object[property]);
            else {
                if (object[property] instanceof Date) {
                    value = formatedToString(object[property]);
                } else {
                    value = object[property];
                }
            }
            tableCell.textContent = value;
        }
        tr.appendChild(tableCell);
    }
    return tr;
};

/**
 * Função genérica que tem como objetivo a criação de uma coluna com checkbox adicionando-a a uma linha
 * @param {HTMLElement} tr - linha a inserir a checkbox
 */
function addCheckBox(tr) {
    var td = document.createElement("td");
    var spanCheckBox = document.createElement("span");
    spanCheckBox.className = "customCheckbox";
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("value", "1");
    spanCheckBox.appendChild(checkBox);
    spanCheckBox.appendChild(document.createElement("label"));
    td.appendChild(spanCheckBox);
    tr.appendChild(td);
}

/**
 * Função que calcula a idade atraves de um data de nascimento
 * @param {String} birthday - data
 */
function calculateAge(birthday) { 
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Função que formata um data para "YYYY-MM-DD"
 * @param {Date} date - data
 */
function formatedToString(date) {
    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}

/**
 * Função que retorna o nome de um type de estatistica atraves de um id dado
 * @param {int} id - id de tipo de estatistica
 */
function getStatisticTypeName(id) {
    for (var i = 0; i < info.statisticsTypes.length; i++) {
        if (info.statisticsTypes[i].id == id) {
            return info.statisticsTypes[i].name;
        }
    }
    return undefined;
}

/**
 * Função que retorna o nome de um type de estatistica atraves de um nome dado
 * @param {String} type - nome de tipo de estatistica
 */
function getStatisticTypeId(type) {
    for (var i = 0; i < info.statisticsTypes.length; i++) {
        if (info.statisticsTypes[i].name == type || info.statisticsTypes[i].id == type) {
            return info.statisticsTypes[i].id;
        }
    }
    return undefined;
}


