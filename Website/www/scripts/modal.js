/**
 * abre o modal pretendido
 * @param {int} modalId - id do modal a abrir
 * @param {String} fromElem - nome do elemento de onde veio o evento
 */
function openModal(modalId, fromElem) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
    modal.style.marginTop = "-90px";

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.getElementsByClassName("cancel")[0].click();
        }
    };

    modal.getElementsByClassName("cancel")[0].onclick = function (event) {
        clearForm(modal);
        close(modal, login);
    };

    updateModal(modal, fromElem);
}

/**
 * Altera as informações do modal dos jogadores e de remoção de acordo com o botão clicádo, solicitando os pedidos correspondentes
 */
function managePlayers(modal, fromElem) {
    
    if (fromElem.includes("add")) {
        clearPerson("emailPlayer", "usernamePlayer","passwordPlayer","countryPlayer","birthdatePlayer");
        document.getElementById("playerTitleText").textContent = "Adicionar Jogador";
        var pws = modal.getElementsByClassName("pw");
        pws[0].style.display = "block";
        document.getElementById("playerConfirm").onclick= function () {
            if (info.processingPerson(-1, "create")) {
                clearForm(modal);
                close(modal, login);
            }
        };
    } else if (fromElem.includes("edit")) {
        clearPerson("emailPlayer", "usernamePlayer","passwordPlayer","countryPlayer","birthdatePlayer");
        document.getElementById("playerTitleText").textContent = "Editar Jogador";
        var pws = modal.getElementsByClassName("pw");
        pws[0].style.display = "none";
        var table = document.getElementById("personsTable");
        for (var i = 1; i < table.rows.length; i++) {
            var checkbox = table.rows[i].cells[0].firstChild.firstChild;
            var idPerson = table.rows[i].cells[1].firstChild.nodeValue;
            if (checkbox.checked) {
                showPersonData(idPerson);
                info.atualPerson=idPerson;
                document.getElementById("playerConfirm").onclick= function () {
                    if (info.processingPerson(info.atualPerson)) {
                        clearForm(modal);
                        close(modal, login);
                    }
                };
                break;
            }
        }

    } else if (fromElem.includes("removePlayers")) {

        document.getElementById("deleteTitle").textContent = "Eliminar Jogadores";
        document.getElementById("deleteConfirm").onclick= function () {
            var table = document.getElementById("personsTable");
            for (var i = 1; i < table.rows.length; i++) {
                var checkbox = table.rows[i].cells[0].firstChild.firstChild;
                var idPerson = table.rows[i].cells[1].firstChild.nodeValue;
                if (checkbox.checked) {
                    info.removePerson(idPerson);
                }
            }
            clearForm(modal);
            close(modal, login);
        };
    }
}
/**
 * Limpa os campos(metendo a branco) do modal sessão
 */
function clearSession() {
    document.getElementById("pagainst").style.backgroundColor = "white";
    document.getElementById("playerSession").style.backgroundColor = "white";
    document.getElementById("dateSession").style.backgroundColor = "white";
}

/**
 * Limpa os campos(metendo a branco) dos elementos passados
 */
function clearPerson() {
    for (i = 0; i < arguments.length; i++) {
        document.getElementById(arguments[i]).style.backgroundColor = "white";
    }
}


/**
 * Altera as informações do modal das sessões e de remoção de acordo com o botão clicádo, solicitando os pedidos correspondentes
 */
function manageSession(modal, fromElem) {
    if (fromElem.includes("add")) {
        document.getElementById("sessionTitleText").textContent = "Adicionar Sessão de jogo";
        clearSession();
        document.getElementById("sessionConfirm").onclick= function () {
            if (info.processingSession(-1, "create")) {
                clearForm(modal);
                close(modal, login);
            }
        };

    } else if (fromElem.includes("edit")) {
        document.getElementById("sessionTitleText").textContent = "Editar Sessão de jogo";
        clearSession();
        var table = document.getElementById("tableSessions");
        for (var i = 1; i < table.rows.length; i++) {
            var checkbox = table.rows[i].cells[0].firstChild.firstChild;
            var idSession = table.rows[i].cells[1].firstChild.nodeValue;
            if (checkbox.checked) {
                showSessionData(idSession);
                info.atualSession=idSession;        
                document.getElementById("sessionConfirm").onclick= function () {
                    if (info.processingSession(info.atualSession)) {
                        clearForm(modal);
                        close(modal, login);
                    }
                };
                break;
            }
        }
    } else if (fromElem.includes("removeSessions")) {
        document.getElementById("deleteTitle").textContent = "Eliminar Sessões de jogo";
        document.getElementById("deleteConfirm").onclick= function () {
            var table = document.getElementById("tableSessions");
            for (var i = 1; i < table.rows.length; i++) {
                var checkbox = table.rows[i].cells[0].firstChild.firstChild;
                var idSession = table.rows[i].cells[1].firstChild.nodeValue;
                if (checkbox.checked) {
                    info.removeSession(idSession);
                }
            }
            clearForm(modal);
            close(modal, login);
        };
    }
}

/**
 * Limpa os campos(metendo a branco) do modal statistica
 */
function clearStatisticModal() {
    document.getElementById("idSessaoStatistic").style.backgroundColor = "white";
    document.getElementById("value").style.backgroundColor = "white";
}

/**
 * Altera as informações do modal das estatisticas e de remoção de acordo com o botão clicádo, solicitando os pedidos correspondentes
 */
function manageStatistic(modal, fromElem) {
    if (fromElem.includes("add")) {
        clearStatisticModal();
        document.getElementById("playerTitleText").textContent = "Adicionar Estatística";
        document.getElementById("statisticConfirm").onclick= function () {
            if (info.processingStatistic(-1, "create")) {
                clearForm(modal);
                close(modal, login);
            }
        };

    } else if (fromElem.includes("edit")) {
        document.getElementById("statisticsTitleText").textContent = "Editar Estatística";
        clearStatisticModal();
        var table = document.getElementById("statisticsTable");
        for (var i = 1; i < table.rows.length; i++) {
            var checkbox = table.rows[i].cells[0].firstChild.firstChild;
            var idStatistic = table.rows[i].cells[1].firstChild.nodeValue;
            if (checkbox.checked) {
                showStatisticData(idStatistic);
                info.atualStatistic=idStatistic;  
                document.getElementById("statisticConfirm").onclick= function () {
                    if (info.processingStatistic(info.atualStatistic)) {
                        clearForm(modal);
                        close(modal, login);
                    }
                };
            }
        }
    } else if (fromElem.includes("removeStatistics")) {
        document.getElementById("deleteTitle").textContent = "Eliminar Estatísticas";

        document.getElementById("deleteConfirm").onclick= function () {
            var table = document.getElementById("statisticsTable");
            for (var i = 1; i < table.rows.length; i++) {
                var checkbox = table.rows[i].cells[0].firstChild.firstChild;
                var idStatistic = table.rows[i].cells[1].firstChild.nodeValue;
                if (checkbox.checked) {
                    info.removeStatistic(idStatistic);
                }
            }
            clearForm(modal);
            close(modal, login);
        };
    }
}

/**
 * Dependendo do botao clicado é executado o manage respetivo
*/
function updateModal(modal, fromElem) {
    if (fromElem.includes("Player")) {
        managePlayers(modal, fromElem);
    } else if (fromElem.includes("Session")) {
        manageSession(modal, fromElem);
    } else if (fromElem.includes("Statistic")) {
        manageStatistic(modal, fromElem);
    }
}

/**
 * limpa formulario se o modal tiver o mesmo
 * @param {HTMLElement} modal - modal a limpar
 */
function clearForm(modal) {
    var form = modal.getElementsByClassName("form");
    if (form.length !== 0)
        form[0].reset();
}

/**
 * Insere a informação da pessoa no formulario
 * @param {int} idPerson - id da pessoa
 */
function showPersonData(idPerson) {
    var form = document.getElementById("playerModalForm");
    for (var i = 0; i < info.people.length; i++) {
        if (info.people[i].id == idPerson) {
            var person = info.people[i];
            form.usernamePlayer.value = person["username"];
            form.emailPlayer.value = person["email"];
            form.birthdatePlayer.value = formatedToString(person["birthDate"]);
            form.countryPlayer.options[info.countries[person["country"]]].selected = 'selected';
            break;
        }
    }
}

/**
 * Insere a informação da sessão no formulario
 * @param {int} idSession - id da sessão
 */
function showSessionData(idSession) {
    for (var i = 0; i < info.sessions.length; i++) {
        if (info.sessions[i].id == idSession) {
            var session = info.sessions[i];
            document.getElementById("dateSession").value = formatedToString(session["date"]);
            document.getElementById("levelSession").options[session["level"] - 1].selected = 'selected';
            document.getElementById("characters").options[getCharacterId(session["character"])].selected = 'selected';
            document.getElementById("pagainst").value = session["sessionAgainst"];
            document.getElementById("playerSession").value = session["player"];
            break;
        }
    }
}

/**
 * Função que retorna um Character atraves de um nome dado
 * @param {String} name - nome de tipo de personagem
 */
function getCharacterId(name) {
    for (var i = 0; i < info.characters.length; i++) {
        if (info.characters[i].name == name) {
            return i;
        }
    }
}

/**
 * Insere a informação da sessão no formulario
 * @param {int} idStatistic - id da estatistica
 */
function showStatisticData(idStatistic) {
    for (var i = 0; i < info.statistics.length; i++) {
        if (info.statistics[i].id == idStatistic) {
            var statistic = info.statistics[i];
            document.getElementById("value").value = statistic["value"];
            document.getElementById("idSessaoStatistic").value = statistic["idSession"];
            var select = document.getElementById("statisticType");
            select.options[getStatisticTypeId(statistic["type"]) - 1].selected = 'selected';
            break;
        }
    }
}


