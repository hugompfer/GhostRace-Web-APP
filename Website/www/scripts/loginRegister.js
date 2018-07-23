/**
 * Abre o popup do login
 */
document.getElementById("loginLI").addEventListener("click", function () {
  var span = document.getElementById("close");
  var modal = document.getElementById('login');
  var login = document.getElementById("mainLogin");


  modal.style.display = "block";
  login.style.display = "block";
  document.getElementById("signIn").click();

  span.onclick = function () {
    close(modal, login);
  }

});

/**
 * Fecha o popup login 
 */
function close(modal, login) {
  modal.style.display = "none";
  login.style.display = "none";
}

/**
 * Abre a tab de registo
 */
document.getElementById("signUp").addEventListener("click", function () {
  clearform();
  //vai buscar todos os inputs do form e "ativa-os"
  var inputs = document.querySelectorAll('.inputform');
  document.querySelectorAll('#ulTabs > li')[0].id = "";
  document.querySelectorAll('#ulTabs > li')[1].id = "active";

  //mete os inputs visiveis
  for (var i = 0; i < inputs.length; i++) {
    document.querySelectorAll('.inputform')[i].className = "inputform d_block";
  }

  //timer para aparecer umde cada vez com efeito
  setTimeout(function () {
    for (var d = 0; d < inputs.length; d++) {
      document.querySelectorAll('.inputform')[d].className = "inputform d_block active_inp";
    }
    document.querySelectorAll('.inputform')[4].className = "inputform d_block active_inp active_inpSelected";
  }, 100);

  clearRegister();
  var btnSign = document.getElementById('btnSign');
  btnSign.textContent = "SIGN UP";
  btnSign.onclick= info.register;

});

//limpa formuario
function clearform() {
  document.getElementById("form").reset();
  document.getElementById("countryLR").selectedIndex = 0;
}

//abre a tab de login
document.getElementById("signIn").addEventListener("click", function () {
  clearform();
  clearRegister();
  //vai buscar todos os inputs e mete o 1 e 2 input visivel
  var inputs = document.querySelectorAll('.inputform');
  document.querySelectorAll('#ulTabs > li')[0].id = "active";
  document.querySelectorAll('#ulTabs > li')[1].id = "";

  //mete todos os outros invisiveis
  for (var i = 2; i < inputs.length; i++) {
    document.querySelectorAll('.inputform')[i].className = "inputform d_block";
  }

  document.querySelectorAll('.inputform')[inputs.length - 1].className = "inputform d_none";

  var btnSign = document.getElementById('btnSign');
  btnSign.textContent = "SIGN IN";
  btnSign.onclick= info.login;
});

/**
 * Limpa os campos(metendo a branco) do modal sessão
 */
function clearRegister() {
  document.getElementById("nameLR").style.backgroundColor = "white";
  document.getElementById("passLR").style.backgroundColor = "white";
  document.getElementById("emailLR").style.backgroundColor = "white";
  document.getElementById("dateLR").style.backgroundColor = "white";
  document.getElementById("countryLR").style.backgroundColor = "white";
}
