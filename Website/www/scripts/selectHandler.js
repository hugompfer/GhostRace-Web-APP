/**
 * Dependendo da opção do select escolhida, abre a tabela ou os graficos
 */
document.getElementById("option").addEventListener("change", function () {
    var type = document.getElementById("option").value;
    var option = document.getElementById("statsOptions");
    if (option.value !== "none") {
        if (type === "table") {
            document.getElementById("chartZone").style.display = "none";
            document.getElementById("tableStatistics").style.display = "block";
        }
        else {
            document.getElementById("chartZone").style.display = "block";
            document.getElementById("tableStatistics").style.display = "none";
            loadChart(type, document.getElementById("statsOptions").value);
        }
    }
});

/**
 * Dependendo da opção do select escolhida, e mostra/esconde os div necessarios, muda o placeholder do filtro e solicita os metodos para mostrar a informação
 */
document.getElementById("statsOptions").addEventListener("change", function () {
    var category = document.getElementById("category");
    var type = document.getElementById("statsOptions").value;
    var input = document.getElementById("myInput");
    info.getPerson(true);
    info.getSessions(true);
    closeAll();
    if (type === "ranking") {
        document.getElementById("Stats").style.display = "block";
        document.getElementById("tableStatistics").style.display = "block";
        info.showStatisticsRanking();
        input.placeholder="Search for player username...";
        document.getElementById("permission").style.display = "none";
    } else if (type === "timeplayed") {
        document.getElementById("Stats").style.display = "block";
        document.getElementById("tableStatistics").style.display = "block";
        info.showStatisticsTimePlayed();
        input.placeholder="Search for player username...";
        document.getElementById("permission").style.display = "none";
    } else if (type === "playercountry") {
        document.getElementById("Stats").style.display = "block";
        document.getElementById("tableStatistics").style.display = "block";
        info.showStatisticsCountry();
        input.placeholder="Search for player username...";
        document.getElementById("permission").style.display = "none";
      } else {
        document.getElementById("Stats").style.display = "block";
        input.placeholder="Search for type...";    
        info.getStatistics();
    }

});

/**
 * Filtro os dados da tabela dependendo do select escolhido
 */
function filter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("statisticsTable");
    tr = table.getElementsByTagName("tr");
    var type = document.getElementById("statsOptions").value;

    for (i = 0; i < tr.length; i++) {
        if (type !== "none")
            td = tr[i].getElementsByTagName("td")[1];
        else
            td = tr[i].getElementsByTagName("td")[2];

        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}