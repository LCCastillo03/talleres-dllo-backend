function esVocal(letra) {
    return ["a", "e", "i", "o", "u"].includes(letra)
}

function esConsonante(letra) {
    return letra.match(/[a-z]/) && !esVocal(letra)
}

function desglosarString(cadena, tipo) {
    let caracteres = cadena.toLowerCase().split("")

    if (tipo === "vocales") {
        return caracteres.filter(esVocal).length
    } else if (tipo === "consonantes") {
        return caracteres.filter(esConsonante).length
    }
    
    return 0
}


function twoSum(numeros, objetivo) {
    let indices = {}; 

    for (let i = 0; i < numeros.length; i++) {
        let complemento = objetivo - numeros[i]

        if (complemento in indices) {
            return [indices[complemento], i] 
        }
        indices[numeros[i]] = i
    }
    return 0
}


function conversionRomana(romano) {
    let valores = {
        "I": 1, "V": 5, "X": 10, "L": 50, 
        "C": 100, "D": 500, "M": 1000
    }

    let total = valores[romano[romano.length - 1]] 

    for (let i = 0; i < romano.length - 1; i++) {
        let actual = valores[romano[i]]
        let siguiente = valores[romano[i + 1]];
        
        if (actual < siguiente) {
            total -= actual 
        } else {
            total += actual
        }
    }

    return total
}


console.log(desglosarString("murcielagos", "vocales")) // 5 
console.log(twoSum([2, 7, 11, 15], 9)) // [0, 1]
console.log(conversionRomana("MXMVII"))  // 1997