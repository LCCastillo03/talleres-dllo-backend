function findMax(array) {
    let mayor = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] > mayor) {
            mayor = array[i]
        }
    }
    return mayor
}


function includes(array, number) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === number) {
            return true
        }
    }
    return false
}

function sum(array) {
    let suma = 0
    for (let i = 0; i < array.length; i++) {
        suma += array[i]
    }
    return suma
}

function missingNumbers(numeros) {
    if (numeros.length === 0) return []; 
  
    let min = numeros[0], max = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
      if (numeros[i] < min) min = numeros[i];
      if (numeros[i] > max) max = numeros[i];
    }
  
    let existentes = {};
    for (let i = 0; i < numeros.length; i++) {
      existentes[numeros[i]] = true;
    }
  
    let faltantes = [];
    for (let i = min; i <= max; i++) {
      if (!existentes[i]) { 
        faltantes.push(i);
      }
    }
  
    return faltantes;
  }



console.log(findMax([3,17,-1,4,-19])); // 17
console.log(includes([3,17,-1,4,-19], 4)); // tru
console.log(sum([3,17,-1,4,-19])); // 4
console.log(missingNumbers([7,2,4,6,3,9])); // [5, 8]
  

