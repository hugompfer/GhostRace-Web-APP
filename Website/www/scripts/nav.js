var lastUl;

//gere o abrir/fechar do menu dependendo da resolução atual
document.getElementById("icon").onclick=function() {
    var width = screen.width;
    var ul = document.getElementById("list");
    var icon = document.getElementById("icon");

    var open = false;
    if (document.getElementById("myNav").style.width === "100px") {
        open = true;
    }
    if (width < 1050) {
        navToggle();
    } else if (width < 1200) {
        open ? openNav("240px") : closeNav();
    } else if (width < 1350) {
        open ? openNav("325px") : closeNav();
    } else if (width < 1450) {
        open ? openNav("300px") : closeNav();
    } else if (width > 1750) {
        open ? openNav("375px") : closeNav();
    } else {
        open ? openNav("340px") : closeNav();
    }
}


window.onresize = function () {
    location.reload();
};

/**
 * Abre o menu lateral com um determinado comprimento
 * @param {String} width - comprimento pretendido
 */
function openNav(width) {
    document.getElementById("list").style.display = "block";
    document.getElementById("myNav").style.width = width;

    var main = document.getElementById("main");
    main.style.marginLeft = width;
    main.style.width = "calc(100%-" + width + ")";

    var icon = document.getElementById("icon");
    icon.style.marginLeft = "-10px";
    icon.style.marginTop = "42px";

    var anchors = document.getElementById('list').getElementsByTagName('a');

    for (var x = 0; x < lastUl.length; x++) {
        removeChilds(anchors[x]);
        childs = lastUl[x].childNodes;
        for (var i = 0; i < childs.length; i++) {
            anchors[x].appendChild(childs[i--]);
        }
    }

    var inputs = document.querySelectorAll('.tooltiptext.d_block');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].className = "tooltiptext d_none";
    }

    var icon = document.getElementById('caret-down');
    icon.style.display = "inline";

    document.getElementById("title").style.visibility = "visible";

}

/**
 * Remove os filhos de um determinado nó
 * @param {Node} node - comprimento pretendido
 */
function removeChilds(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

/**
 * Fecha o menu lateral
 */
function closeNav() {
    width=screen.width;
    if (width > 1050) {
        var nav = document.getElementById("myNav")
        var main = document.getElementById("main");
        var ul = document.getElementById("list");
        var title = document.getElementById("title").style.visibility = "hidden";
        var icon = document.getElementById("icon");

        nav.style.width = "100px";

        var elem = document.getElementById('list').getElementsByTagName('a');
        lastUl = [];
        for (var x = 0; x < elem.length; x++) {
            elemCloned = elem[x].cloneNode(true)
            elemClonedcopied = elemCloned;
            lastUl.push(elemClonedcopied);
            childs = elem[x].childNodes;
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].nodeName !== "IMG" || childs[i].id !== "") {
                    elem[x].removeChild(childs[i--]);
                }
            }
        }
        anchors = document.getElementsByClassName("inside")
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].style.paddingLeft = "50px";
        }

        main.style.marginLeft = "100px";
        main.style.width = "calc(100%-100px)";

        icon.style.marginTop = "-10px";
        icon.style.marginLeft = "22px";
        if(width<1200){
            icon.style.marginLeft = "35px";
        }else if(width<1350){
            icon.style.marginLeft = "30px";
        }else if(width<1450){
            icon.style.marginLeft = "28px";
        }else if(width<1750){
            icon.style.marginLeft = "30px";
        }
        

        var inputs = document.querySelectorAll('.tooltiptext');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].className = "tooltiptext d_block";
        }

        var submenu = document.getElementById("submenu");
        submenu.onmouseover = function () {
            submenu.style.overflow = "visible";
        }

        submenu.onmouseleave = function () {
            submenu.style.overflow = "hidden";
        }
    }
}

/**
 * Fecha o menu horizontal
 */
function closeDropDownMenu() {
    var nav = document.getElementById("myNav");
    var main = document.getElementById("main");
    var menu = document.getElementsByClassName("menuitems");

    if (nav.style.height === "400px") {
        nav.style.height = "70px";
        var i = 0;
        for (i = 0; i < menu.length; i++) {
            menu[i].style.opacity = "0.0";
            menu[i].style.marginTop = "100px";
        };
    }
}

/**
 * Gere o abrir/fechar do menu horizontal
 * */
function navToggle() {
    var nav = document.getElementById("myNav");
    var menu = document.getElementsByClassName("menuitems");

    if (nav.style.height === "400px") {
        closeDropDownMenu();
    } else if (nav.style.height <= "70px") {

        nav.style.height = "400px";
        var i = 0;
        for (i = 0; i < menu.length; i++) {
            menu[i].style.opacity = "1.0";
            menu[i].style.marginTop = "0px";
        }
    }
    var icon = document.getElementById('caret-down');
    icon.style.display = "none";
};

