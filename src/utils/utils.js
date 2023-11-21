const permute = (source, permutation) => {
    let result = ''
    for (let index = 0; index < permutation.length; index++) {
        result += source[permutation[index] - 1];
    }
    return result
}

const string_to_binary = (string) => {
    let result = ''
    for (let index = 0; index < string.length; index++) {
        result += string[index].charCodeAt(0).toString(2).padStart(8, '0');
    }
    return result;
}

const binary_to_string = (binary) => {
    let result = ''

    let input = binary
    while(input.length > 0) {
        const part = input.slice(0, 8)
        if (part === '00000000') break;
        result += String.fromCharCode(parseInt(part, 2))
        input = input.slice(8)
    }

    return result
}

const binary_to_hex = (binary) => {
    let result = ''

    let input = binary
    while (input.length > 0) {
        const part = input.slice(0, 8)
        result += parseInt(part, 2).toString(16).padStart(2, '0')
        input = input.slice(8)

        result += input.length > 0 ? ' ' : ''
    }

    return result
}

const hex_to_binary = (hex) => {
    let result = ''

    let input = hex.split(' ')
    for (let index = 0; index < input.length; index++) {
        result += parseInt(input[index], 16).toString(2).padStart(8, '0')
    }

    return result
}

const xor = (string1, string2) => {
    let result = ''
    for (let index = 0; index < string1.length; index++) {
        result += string1[index] === string2[index] ? '0' : '1'
    }
    return result
}

export {permute, string_to_binary, binary_to_string, binary_to_hex, hex_to_binary, xor}