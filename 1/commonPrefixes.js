function commonPrefix(inputs) {
    return inputs.map(str => {
        let sum = 0;
        for (let i = 0; i <= str.length; i++) {
            let prefixLength = 0;
            for (let j = 0; j < str.length - i; j++) {
                if (str[j] === str[i + j]) {
                    prefixLength++;
                } else {
                    break;
                }
            }
            sum += prefixLength;
        }
        return sum;
    });
}

const inputs = ['abcabcd','ababaa'];

const results = commonPrefix(inputs);
console.log(results);
