const myModal = new bootstrap.Modal("#register-Modal")
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("create-form-login").addEventListener("submit", function (e){
    e.preventDefault();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const session = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert ("OPS! verifique o usuário ou senha.");
        return;
    }

    if (account) {
        if(account.password !== password) {
            alert("OPS! verifique o usuário ou senha");
            return;
        }

        saveSession(email, session);

        window.location.href = "home.html";

    }

});
// CRIAR CONTA

document.getElementById("create-form-modal").addEventListener("submit", function(e){
    e.preventDefault();
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;
    
    if(email.length <5){
        alert("Preencher com um e-mail válido")
        return;
    }

    if(password.length <4){
        alert("Preencha a senha com no mínimo 4 dígitos")
        return;
    }
    saveAccount({
        login: email,
        password: password,
        transactions: []
    });
    myModal.hide();

    alert("Conta criada com sucesso!")
});

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if(logged) {
        saveSession(logged, session);
        window.location.href = "home.html";

    }

}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}


function saveSession (data, saveSession) {
    if (saveSession){
        localStorage.setItem("session", data)
    }

    sessionStorage.setItem("logged", data);
}



function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }

    return "";
}


