var clicked = true;
window.onload = function loadPage() {
    closeNav();
    closeAll();
    document.getElementById("aboutLI").click();
    loadInformation();
}

/**
 * mete invisivel todas as sections
 * */
function closeAll() {
    document.getElementById("About").style.display = "none";
    document.getElementById("Information").style.display = "none";
    document.getElementById("header").style.display = "none";
    document.getElementById("player").style.display = "none";
    document.getElementById("Account").style.display = "none";
    document.getElementById("Stats").style.display = "none";
    document.getElementById("permission").style.display = "none";
}


/**
 * mete visivel a section about com o header e todas as outras invisiveis
 * */
document.getElementById("aboutLI").onclick = function () {
    closeAll();
    document.getElementById("About").style.display = "block";
    document.getElementById("header").style.display = "block";
    document.getElementById("player").style.display = "block";
}
/**
 * mostra o titulo da secção de informação
 * */
function showtitle() {
    document.getElementById("Information").style.display = "block";
    document.getElementById("containerInformation").style.display = "none";
}

/**
 * mete visivel a section information e todas as outras invisiveis, altera o titulo para Jogadores e solicita a informação dos utilizadores
 */
document.getElementById("playersLI").onclick = function () {
    closeAll();
    showtitle();
    document.getElementById("titleDiv").textContent = "Jogadores";
    info.getPerson();
}

/**
 * mete visivel a section information e todas as outras invisiveis, altera o titulo para Sessões e solicita a informação das sessões
 */
document.getElementById("sessionLI").onclick = function () {
    closeAll();
    showtitle();
    document.getElementById("titleDiv").textContent = "Sessões";
    info.getPerson();
    info.getSessions();
}

/**
 * muda o select statsOptions para a posiçao 3 a força o evento update a executar 
 */
document.getElementById("statisticsLI").onclick = function () {
    if (clicked) {
        closeAll();
        document.getElementById("statsOptions").selectedIndex = "3";
        forceToChange();
    }
    clicked = true;
}

/**
 * muda o select statsOptions para a posiçao 0 a força o evento update a executar 
 */
document.getElementById("rankingLI").onclick = function () {
    closeAll();
    clicked = false;
    document.getElementById("statsOptions").selectedIndex = "0";
    forceToChange();
}

/**
 * muda o select statsOptions para a posiçao 1 a força o evento update a executar 
 */
document.getElementById("timeLI").onclick = function () {
    closeAll();
    clicked = false;
    document.getElementById("statsOptions").selectedIndex = "1";
    forceToChange();
}

/**
 * muda o select statsOptions para a posiçao 2 a força o evento update a executar 
 */
document.getElementById("countryLI").onclick = function () {
    closeAll();
    clicked = false;
    document.getElementById("statsOptions").selectedIndex = "2";
    forceToChange();
}

/**
 * mete visivel a section account e todas as outras invisiveis
 */
document.getElementById("accountLI").onclick = function () {
    closeAll();
    info.getUserLogged();
}

/**
 * faz o pedido de logout
 */
document.getElementById("LogoutLI").onclick = function () {
    info.logout();
}
/**
 * Força o evento on change a ser executado
 */
function forceToChange() {
    var element = document.getElementById('statsOptions');
    var event = new Event('change');
    element.dispatchEvent(event);
}

