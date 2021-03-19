let encryptRSA = message => {
    let valueList = privateKeyRSA(4621, 6793);
    let numMessage = messageToNum(message);
    let code = "";
    for (let i = 0; i < numMessage.toString().length/3; i++) {
        let block = parseInt(numMessage[i]);
        block = moduloCalc(block, valueList[1], valueList[0]);
        block = ("00000000" + block).slice(-(valueList[0].toString().length));
        code += block.toString();
    }
    return [code,valueList[2],valueList[0]]; //code, key, modulo
}

let decryptRSA = (message, key, mod) => {
    let code = "";
    let charSize = mod.toString().length;
    for (let i = 0; i < message.length; i+=charSize) {
        let block = moduloCalc(parseInt(message.slice(i,charSize+i), 10),key,mod);
        let value = convertToString(parseInt(block, 10));
        code += value;
    }
    return code;
}

let privateKeyRSA = (p, q) => {
    let phiN = (p-1)*(q-1);
    let e = coprimeGen(phiN);
    let d = moduloSoln(e, phiN);
    return [p*q, e, d];
}

let coprimeGen = phiN => {
    //generate random comprime integer between 1 and phiN, exclusive
    while (phiN) {
        let randNum = Math.floor(Math.random()*phiN);
        if (gcd(phiN, randNum) === 1) {
            return randNum;
        }
    }
}

let moduloSoln = (e, phiN) => {
    //solves de congruent to 1 (mod phiN)
    try {
    for (var x = 2; x < phiN; x++) {
        if ((e*x)%phiN == 1) {
            return x;
            }
        }
        throw new Error();
    } catch (e) {
        console.log("iussue");
    }
}


let gcd = (x, y) => {
    if ((typeof x !== 'number') || (typeof y !== 'number')) {
        return false;
    }
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

let messageToNum = message => {
    let numMessageArray = [];
    for (let i = 0; i < message.length; i++) {
        numMessageArray.push(convertToNum(message[i].toLowerCase()));
    }
    while (numMessageArray.length % 2 != 0) {
        numMessageArray.push("00");
    }
    return numMessageArray;
}

let convertToNum = char => {
    switch(char) {
        case "a":
            value = "01";
            break;
        case "b":
            value = "02";
            break;
        case "c":
            value = "03";
            break;
        case "d":
            value = "04";
            break;
        case "e":
            value = "05";
            break;
        case "f":
            value = "06";
            break;      
        case "g":
            value = "07";
            break;
        case "h":
            value = "08";
            break;  
        case "i":
            value = "09";
            break;
        case "j":
            value = "10";
            break;
        case "k":
            value = "11";
            break; 
        case "l":
            value = "12";
            break; 
        case "m":
            value = "13";
            break;
        case "n":
            value = "14";
            break; 
        case "o":
            value = "15";
            break; 
        case "p":
            value = "16";
            break; 
        case "q":
            value = "17";
            break; 
        case "r":
            value = "18";
            break;    
        case "s":
            value = "19";
            break;
        case "t":
            value = "20";
            break;
        case "u":
            value = "21";
            break;
        case "v":
            value = "22";
            break;
        case "w":
            value = "23";
            break;
        case "x":
            value = "24";
            break;
        case "y":
            value = "25";
            break;
        case "z":
            value = "26";
            break;
        case " ":
            value = "27";
            break;    
        case ".":
            value = "28";
            break;
        case "!":
            value = "29";
            break;
        case "?":
            value = "30";
            break;
        case ",":
            value = "31";
            break;
        case "'":
            value = "32";
            break;   
    }
    return value;
}

let convertToString = num => {
    console.log(num);
    let list = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," ",".","!","?",",","'"];
    num -= 1;
    if (num > list.length || num < 0) {
        return "";
    } else {
        return list[num];
    }
}

let moduloCalc = (value, power, mod) => {
    let value0 = value;
    for (let i = 1; i < power; i++) {
        value *= value0;
        value %= mod;
    }
    return value;
}

document.getElementById('RSAMessage').addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        let message = document.getElementById('RSAMessage').value;
        let encryptionInfo = encryptRSA(message);
        let encryptedMessage = encryptionInfo[0];
        let encryptedMessageKey = encryptionInfo[1];
        let encryptedMessageModulo = encryptionInfo[2];
        document.getElementById("encryptedMessage").innerHTML = `Code: ${encryptedMessage}<br/>Key: ${encryptedMessageKey}<br/>Modulo: ${encryptedMessageModulo}` ;
        document.getElementById('RSAMessage').value = '';
    }
})

let decryptButton = () => {
    let code = document.getElementById('RSADecoder').value;
    let key = document.getElementById('RSADecoderKey').value;
    let mod = document.getElementById('RSADecoderModulo').value;
    if (![code,key,mod].includes("")) {
        let message = decryptRSA(code, parseInt(key), parseInt(mod));
        document.getElementById("DecryptedMessage").innerHTML = message;
    } else {
        document.getElementById("DecryptedMessage").innerHTML = "failure :(";
    }
}