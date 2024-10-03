let palabraSecreta = "";
let intentosRestantes = 6;
let letrasIncorrectas = [];
let letrasCorrectas = [];


const letrasAdivinadasDiv = document.getElementById("letras-adivinadas");
const letrasIncorrectasDiv = document.getElementById("letras-incorrectas");
const intentosDiv = document.getElementById("intentos");
const resultadoDiv = document.getElementById("resultado");
const letraInput = document.getElementById("letra-input");


function iniciarJuego() {
    
    const inputPalabraSecreta = document.getElementById("palabra-secreta").value.toLowerCase();

    if (inputPalabraSecreta.length === 0) {
        alert("Por favor, ingresa una palabra para comenzar el juego.");
        return;
    }

    
    palabraSecreta = inputPalabraSecreta;
    letrasCorrectas = Array(palabraSecreta.length).fill("_");
    
    
    document.getElementById("seccion-juego").classList.remove("oculto");
    document.getElementById("ingreso-palabra").classList.add("oculto");

    
    letrasAdivinadasDiv.textContent = letrasCorrectas.join(" ");
}


function hacerIntento() {
    const letra = letraInput.value.toLowerCase();

    
    if (!letra.match(/[a-zñ]/i) || letra.length !== 1) {
        alert("Por favor, ingresa una letra válida.");
        letraInput.value = "";
        return;
    }

    
    if (letrasCorrectas.includes(letra) || letrasIncorrectas.includes(letra)) {
        alert("Ya intentaste esa letra.");
        letraInput.value = "";
        return;
    }

    
    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                letrasCorrectas[i] = letra;
            }
        }
    } else {
        
        letrasIncorrectas.push(letra);
        intentosRestantes--;
    }

    
    letrasAdivinadasDiv.textContent = letrasCorrectas.join(" ");
    letrasIncorrectasDiv.textContent = letrasIncorrectas.join(", ");
    intentosDiv.textContent = intentosRestantes;

    
    if (letrasCorrectas.join("") === palabraSecreta) {
        resultadoDiv.textContent = "¡Felicidades, ganaste!";
        resultadoDiv.className = "ganaste";
        desactivarJuego();
    } else if (intentosRestantes === 0) {
        resultadoDiv.textContent = `Perdiste. La palabra era "${palabraSecreta}".`;
        resultadoDiv.className = "perdiste";
        desactivarJuego();
    }

    
    letraInput.value = "";
}


function desactivarJuego() {
    letraInput.disabled = true;
    document.querySelector("button").disabled = true;
}