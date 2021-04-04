function existsOrError(value, msg) {
    if(!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

function caculatorAge(anoAniversario, mesAniversario, diaAniversario) {
    const d = new Date
    
    anoAtual = d.getFullYear()
    mesAtual = d.getMonth() + 1
    diaAtual = d.getDate()

    anoAniversario = +anoAniversario
    mesAniversario = +mesAniversario
    diaAniversario = +diaAniversario

    quantosAnos = anoAtual - anoAniversario

    if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
        quantosAnos--
    }

    return quantosAnos < 0 ? 0 : quantosAnos;
}

function validName(value, msg) {
    existsOrError(value, 'please type a name')

    if(value.length < 3) throw msg
}

function validSexo(value, msg) {
    existsOrError(value, msg)
}

function validIdade(value, msg) {
    existsOrError(value, 'please type a idade')
    
    if(value <= 0) throw msg
}

function validHobby(value, msg) {
    existsOrError(value, 'please type a hobby')
    
    if(value.length < 5) throw msg
}

function validDataNascimento(value, idade, msg) {
    existsOrError(value, 'please type a data de nascimento')

    const dataNascimento = value.split('-')
    
    if(caculatorAge(dataNascimento[0], dataNascimento[1], dataNascimento[2]) != idade) throw msg
    
}

module.exports = { validName, validSexo, validIdade, validHobby, validDataNascimento }