
$(document).ready(function () {
    loadChart('bar');
});

//Tipos de graficos disponiveis
var types = ['bar', 'pie'];

/**
 * Adiciona ticks a começar a zero se o grafico escolhido for de barras
 */
function addTicks(myChart,type) {
    if (type === "bar") {
        myChart.options.scales.yAxes[0].ticks.beginAtZero = true;
    }
    myChart.update();
}

/**
 * carrega o grafico de um certo tipode grafico e dados
 * @param {String} chartType - tipo de grafico
 * @param {String} dataType - tipo de dados
 */
function loadChart(chartType,dataType) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var dataDic=getData(dataType);
    var myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: Object.keys(dataDic),
            datasets: [{
                label: "",
                data: Object.values(dataDic),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                borderColor: '#414141',
                hoverBorderWidth: 3,
                hoveBorderColor: '#000'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Gerir '+toString(dataType),
                fontSize: 20
            },
            legend: {
                labels: {
                    fontColor: '#000'
                }
            }
        }
    });
    addTicks(myChart,chartType);
}

function toString(dataType){
    if(dataType==="ranking"){
        return "Ranking";
    } else if (dataType === "timeplayed") {
        return "Tempo Jogado";
    } else if (dataType === "playercountry") {
        return "Jogador por pais";
    }
}

/**
 * Carrega os dados de um certo tipo
 * @param {String} dataType - tipo de dados
 */
function getData(dataType){
    dic={}
    var i;
    var list;
    if(dataType==="ranking"){
        list=info.statisticsRanking;
        for(i=0;i<list.length;i++){
            dic[list[i].username]=list[i].vitorias;
        }
    } else if (dataType === "timeplayed") {
        list=info.statisticsTimePlayed;
        for(i=0;i<list.length;i++){
            dic[list[i].username]=list[i].timeplayed;
        }
    } else if (dataType === "playercountry") {
        list=info.statisticsPlayerPerCountry;
        for(i=0;i<list.length;i++){
            dic[list[i].country]=list[i].numberOfPlayers;
        }
    }
    return dic;
}
