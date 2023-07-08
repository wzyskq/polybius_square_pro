var key = [
    ['A', 'B', 'C', 'D', 'E', '0', '1', '2', '3', '4'],
    ['F', 'G', 'H', 'I', 'K', '5', '6', '7', '8', '9'],
    ['L', 'M', 'N', 'O', 'P', '*', '/', '+', '-', '='],
    ['Q', 'R', 'S', 'T', 'U', '!', '@', '#', '$', '%'],
    ['V', 'W', 'X', 'Y', 'Z', '^', '&', '_', '[', ']'],
    ['a', 'b', 'c', 'd', 'e', '.', ',', ':', ';', '`'],
    ['f', 'g', 'h', 'i', 'k', '~', '|', '<', '>', ' '],
    ['l', 'm', 'n', 'o', 'p', '(', ')', '{', '}', '\\'],
    ['q', 'r', 's', 't', 'u', 'J', 'j', '\'', '\"', '《'],
    ['v', 'w', 'x', 'y', 'z', '⌈', '⌋', '⌊', '⌉', '》']
];

class PolybiusSquire {
    static key = key;

    static encode(message) {
        const key = PolybiusSquire.key;
        const codeList = [];

        for (let char of message) {
            let i = 0, j = 0;
            while (i < key.length && !key[i].includes(char)) {
                i++;
            }
            if (i < key.length) {
                j = key[i].indexOf(char);
                codeList.push(`${i}${j}`);
            } else {
                return false;
            }
        }

        const ciphertext = codeList.join('');
        return ciphertext;
    }

    static decode(ciphertext) {
        const key = PolybiusSquire.key;
        const originalList = [];

        try {
            const splited = ciphertext.match(/.{1,2}/g);
            for (let i of splited) {
                i = parseInt(i);
                originalList.push(key[Math.floor(i / 10)][i % 10]);
            }
        } catch {
            return false;
        }

        const plaintext = originalList.join('');
        return plaintext;
    }
}

class Double {
    static encode(num) {
        let result = '';
        for (let i = 0; i < num.length; i++) {
            result += num[i] + Math.floor(Math.random() * 6);
        }
        return result;
    }

    static decode(num) {
        let result = '';
        var splited
        try {
            splited = num.match(/.{1,2}/g);
        } catch (error) {
            // console.log('Incorrect input!');
            return false;
        }

        for (let i = 0; i < splited.length; i++) {
            result += splited[i].slice(0, 1);
        }
        return result;
    }
}

class Plugins {
    static encode(num) {
        let s = 0;
        var result
        for (let i = 0; i < num.length; i++) {
            s += parseInt(num[i]);
        }
        // console.log(s);
        if (String(s).length % 2 === 0) {
            result = `${Math.floor(Math.random() * 10)}${num}${s}1`;
        } else {
            result = `${Math.floor(Math.random() * 10)}${num}${s}${Math.floor(Math.random() * 10)}0`;
        }
        return result;
    }

    static decode(num) {
        const check = num.slice(-1);
        num = num.slice(1, -1);
        let result;
        if (check === '1') {
            result = Plugins.checking(num);
        } else {
            num = num.slice(0, -1);
            result = Plugins.checking(num);
        }
        return result;
    }

    static checking(string) {
        for (let i = 1; i <= 5; i++) {
            let s = 0;
            const fh = string.slice(0, -i);
            const sh = string.slice(-i);
            for (let k = 0; k < fh.length; k++) {
                s += parseInt(fh[k]);
            }
            if (s === parseInt(sh)) {
                return fh;
            }
        }
    }
}

class Core {
    static error = '❌The format or content of the input is incorrect!';


    encode(string) {
        const poe = PolybiusSquire.encode(string);
        if (!poe) {
            // console.log(this.error);
            reminder(Core.error,4000)
        } else {
            const doe = Double.encode(poe);
            const ple = Plugins.encode(doe);
            const pod = PolybiusSquire.decode(ple);
            return pod;
        }
    }

    decode(string) {
        try {
            const poe = PolybiusSquire.encode(string);
            const pld = Plugins.decode(poe);
            const dod = Double.decode(pld);
            const pod = PolybiusSquire.decode(dod);
            return pod;
        } catch (error) {
            // console.log(this.error);
            reminder(Core.error,4000)
        }
    }
}
