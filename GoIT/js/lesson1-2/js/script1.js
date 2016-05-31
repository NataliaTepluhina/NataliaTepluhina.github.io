var base = +prompt('Enter base number:');
while ((isNaN(base)) || (base != Math.round (base)))  {
    var base = prompt('Base is not a valid integer number. Please enter correct one:');
}

var exponent = +prompt('Enter exponent:');
while ((isNaN(exponent)) || (exponent != Math.round (exponent))) {
    var exponent = prompt('Exponent is not a valid integer number. Please enter correct one:');
}

console.log ('Result is', pow(base, exponent) );

function pow (b, e) {
    var result = 1;
    var exp = Math.abs(e);
    for (var i = 1; i <= exp; i++) {
        if (e>0) {
            result *= b;
        }
        else {
            result *= 1/b;
        }
    }
    return result;
}