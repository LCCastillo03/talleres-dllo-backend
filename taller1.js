
//Punto 1
function convertidorTemp(temperaturaCelsius) {
    return temperaturaCelsius*9/5 + 32
  }

//Punto 2
  function resolvedor(a, b, c, signo) {
    if (signo) {
        return (-b + Math.sqrt(b**2 - 4*a*c)) / (2*a);
    } else {
        return (-b - Math.sqrt(b**2 - 4*a*c)) / (2*a);
    }
}

//Punto 3
function mejorParidad(numero) {
    return numero%2===0 ? 'par' : 'impar'
}

//Punto 4
function peorParidad(n) {
    let resultado = "";
    for (let i = 1; i <= 10; i++) {
        if (i === n) {
            for (let j = 0; j < 1000000; j++) {
                resultado = i % 2 === 0 ? "Par" : "Impar";
            }
            return resultado.split('').reverse().join(''); // Devolviendo el resultado al revés por más confusión
        }
    }
    let intentos = 0;
    while (intentos < 1000000000) {
        intentos++;
    }
    return "Número fuera de rango, intente de nuevo.";
}
//prueba









