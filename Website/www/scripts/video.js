/**
 * Fecha o video e para-o
 */
document.getElementById("close-player").addEventListener("click", function (){
    header = document.getElementById("header");
    video = document.getElementById("video");
    closePlayer = document.getElementById("close-player");
    video.style.display = "none";
    closePlayer.style.display = "none";
    header.style.display = "block";
    stopVideo(document.getElementById("player"))
});

/**
 * Abre o video e mete a dar play
 */
document.getElementById("play-button").addEventListener("click", function (){
    header = document.getElementById("header");
    video = document.getElementById("video");
    closePlayer = document.getElementById("close-player");

    if (header.style.visibility !== "hidden") {
        header.style.display = "none";
        video.style.display = "block";
        video.src += "&autoplay=1";
        closePlayer.style.display = "block";
    }

});

/**
 * Para o video
*/
var stopVideo = function (element) {
    var iframe = element.querySelector('iframe');
    if (iframe) {
        var iframeSrc = iframe.src;
        var fields = iframeSrc.split('&');
        var x = fields.slice(0, fields.length - 1).join("&");
        iframe.src = x;
    }
};
