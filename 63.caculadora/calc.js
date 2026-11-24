var operacion1 = "";
var operacion2 = "";
var operar;

function insertar(event) {
    var x = event.target.value;
    var pantalla = document.getElementById("resultado").innerText;



    if ((parseFloat(x) >= "0" && !operar)) {
        operacion1 = operacion1 + x;
        document.getElementById("resultado").innerText = operacion1;
    }

    if (operar && parseFloat(x) >= "0") {
        operacion2 = operacion2 + x;
        document.getElementById("resultado").innerText = operacion2;
    }

    if (!parseFloat(x) && !operacion2 && x != "0") {
        operar = x;
        document.getElementById("resultado").innerText = operacion1 + operar;
    }
    console.log("numero 1", operacion1)
    console.log("numero 2", operacion2)
    console.log("signo", operar)
}

function mostrar() {
    if (operacion1 && operar && operacion2) {
        document.getElementById("resultado").innerText = calculo();
    }
    if (calculo() && operar == "/" && operacion2 == "0") {
        alert("No es posible ejecutar esta accion")
    }
    if (calculo()) {
        operacion1 = calculo();
        operacion2 = "";
        operar = "";
    }
}

function limpiar() {
    operacion1 = "";
    operacion2 = "";
    operar = "";
    document.getElementById("resultado").innerText = "";
}

function sumar() {
    return (parseFloat(operacion1) + parseFloat(operacion2))
}

function restar() {
    return (parseFloat(operacion1) - parseFloat(operacion2))
}

function multiplicar() {
    return (parseFloat(operacion1) * parseFloat(operacion2))
}

function dividir() {
    return (parseFloat(operacion1) / parseFloat(operacion2))
}

function calculo() {
    switch (operar) {
        case "+":
            return sumar();
            break;
        case "-":
            return restar();
            break;
        case "*":
            return multiplicar();
            break;
        case "/":
            return dividir();
            break;
    }
}
