var inputs = Array.from(document.getElementsByName('keyin'));
const cricon = document.getElementById('cricon');
var argu = document.getElementById('argu');
var arglen = document.getElementById('argulen');
var keybox = document.getElementById('keybox');

var cleankeymode = 'all';
var currentIndex = 0;

function reminder(text, time) {
    Toastify({
        text: `${text}`,
        duration: time,
        newWindow: true,
        close: true,
    }).showToast();
}


// panel
var encode = document.getElementById('encode');
var decode = document.getElementById('decode');

var enout = document.getElementById('enout');
var deout = document.getElementById('deout');

const core = new Core();

encode.addEventListener('input', (event) => {
    const value = event.target.value;
    if (value != '') { var result = core.encode(value); };
    if (result === undefined) { result = ''; }
    enout.value = result;
});
decode.addEventListener('input', (event) => {
    const value = event.target.value;
    var result = core.decode(value);
    if (result === false || result === undefined) { result = ''; }
    deout.value = result;
});

function recode() { enout.value = core.encode(encode.value); }

function clean(id) {
    if (id == 'en') {
        encode.value = '';
        enout.value = '';
    } else if (id == 'de') {
        decode.value = '';
        deout.value = '';
    } else if (id == 'argu') {
        argu.value = '';
        arglen.innerHTML = 0;
    } else if (id == 'keybox') {
        keybox.value = '';
    }
}

function copy(id) {
    var text
    if (id == 'key') text = window.key2str();
    else text = document.getElementById(id).value;
    if (text != '') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => { })
                .catch(() => { reminder('Errer!'); });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        reminder('Copy successful!')
    }
}


// key
argu.value = window.key2str();
keybox.value = JSON.stringify(PolybiusSquire.key);

arglen.innerHTML = argu.value.length;
argu.addEventListener('input', (event) => {
    arglen.innerHTML = event.target.value.length;
});


keybox.addEventListener('input', (event) => {
    PolybiusSquire.key = JSON.parse(event.target.value);
    window.inputkey('eval(keybox.value)[i][j]', 'eval(keybox.value)');
});

function cleankey() {
    if (cleankeymode == 'all') {
        window.inputkey("''", 'eval(keybox.value)');
        cricon.innerHTML = '<i class="bi bi-arrow-counterclockwise" onclick="cleankey()"></i>';
        keybox.value = '';
        cleankeymode = 'restore';
    } else if (cleankeymode == 'restore') {
        window.inputkey('PolybiusSquire.key[i][j]', 'PolybiusSquire.key');
        cricon.innerHTML = '<i class="bi bi-x-circle" onclick="cleankey()"></i>';
        keybox.value = JSON.stringify(PolybiusSquire.key);
        cleankeymode = 'all';
    }
}

// 将key中值依次输入到<input>
// Input the values of key in order to <input>
window.inputkey('PolybiusSquire.keybase[i][j]', 'PolybiusSquire.keybase');
function inputkey(argument, listname) {
    for (var i = 0; i < eval(listname).length; i++) {
        for (var j = 0; j < eval(listname)[i].length; j++) {
            inputs[i * eval(listname)[i].length + j].value = eval(argument);

            if (argument == "''") inputs[i * eval(listname)[i].length + j].style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
            else inputs[i * eval(listname)[i].length + j].style.backgroundColor = '';

            if (eval(argument) == '') inputs[i * eval(listname)[i].length + j].style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
            else {
                if (eval(argument).length > 1) {
                    inputs[i * eval(listname)[i].length + j].value = '';
                    inputs[i * eval(listname)[i].length + j].style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
                }
            }
        }
    }
}

// 在多个input标签之间移动
// Move between multiple input tags
inputs.forEach(function (input, index) {
    input.addEventListener('focus', () => {
        currentIndex = index;
    });
});
document.addEventListener('keydown', function (event) {
    const focusedElement = document.activeElement;
    if (inputs.includes(focusedElement)) {
        if (event.key === "ArrowLeft") {
            currentIndex = (currentIndex === 0) ? inputs.length - 1 : currentIndex - 1;
            inputs[currentIndex].focus();
        } else if (event.key === "ArrowUp") {
            currentIndex = (currentIndex - 10 < 0) ? inputs.length - (10 - currentIndex) : currentIndex - 10;
            inputs[currentIndex].focus();
        } else if (event.key === "ArrowRight") {
            currentIndex = (currentIndex === inputs.length - 1) ? 0 : currentIndex + 1;
            inputs[currentIndex].focus();
        } else if (event.key === "ArrowDown") {
            currentIndex = (currentIndex + 10 > inputs.length - 1) ? 10 - (inputs.length - currentIndex) : currentIndex + 10;
            inputs[currentIndex].focus();
        }
    }
});

// 监测方阵各值，输入长度大于一个字符自动清零
// Monitor the values of the square matrix, and input lengths greater than one character are automatically zeroed
inputs.forEach(input => {
    input.addEventListener('input', function () {
        if (this.value.length == 1) {
            var k1 = (currentIndex - (currentIndex % 10)) / 10
            var k2 = currentIndex % 10
            if (PolybiusSquire.key[k1][k2] != this.value) {
                PolybiusSquire.key[k1][k2] = this.value;
            }
        }
        keybox.value = JSON.stringify(PolybiusSquire.key);

        if (this.value.length > 1) this.value = '';
        if (this.value == '') this.style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
        else {
            this.style.backgroundColor = '';
            inputs[currentIndex + 1].focus();
        }
    });
    input.addEventListener('keydown', function (event) {
        if (this.value == '') {
            if (event.key === 'Backspace') {
                inputs[currentIndex - 1].focus();
            }
        }
    });
});


function random() {
    if (argu.value.length == 100) {
        var key = str2key(shuffle(argu.value));
        PolybiusSquire.key = key;
        keybox.value = JSON.stringify(key);
        window.inputkey('eval(keybox.value)[i][j]', 'eval(keybox.value)');
    } else {
        reminder("Elem's length must be 100!");
    }

}


function sequential() {
    if (argu.value.length == 100) {
        PolybiusSquire.key = str2key(argu.value);
        keybox.value = JSON.stringify(str2key(argu.value));
        window.inputkey('eval(keybox.value)[i][j]', 'eval(keybox.value)');
    } else {
        reminder("Elem's length must be 100!");
    }
}

// 将key存入cookie
// Store key in cookie
function savekey() {
    var key = key2str();

    // console.log(key);

    var key1 = key.split(';')[0];
    var key2 = key.split(';')[1];
    document.cookie = `key1=${key1}`;
    document.cookie = `key2=${key2}`;
    reminder('Key saved!');
}

// 从cookie中还原key
// Restore key from cookie
function loadkey() {
    try {
        var key1 = document.cookie.split(';')[0];
        var key2 = document.cookie.split(';')[1];

        key1 = key1.match(/=(.+)/)[1];
        key2 = key2.match(/=(.+)/)[1];
        var key = key1 + ';' + key2;

        key = str2key(key);
        PolybiusSquire.keybase = key;
        PolybiusSquire.key = PolybiusSquire.keybase;
    } catch {
        PolybiusSquire.key = PolybiusSquire.keybase;
        reminder('No key!');
    }
    keybox.value = JSON.stringify(PolybiusSquire.key);
    window.inputkey('eval(keybox.value)[i][j]', 'eval(keybox.value)');
}

// 将一串字符串打乱顺序
// Shuffle a string
function shuffle(str) {
    var arr = str.split('');
    var result = '';
    while (arr.length > 0) {
        var index = Math.floor(Math.random() * arr.length);
        result += arr[index];
        arr.splice(index, 1);
    }
    return result;
}

// 把列表PolybiusSquire.key中的字符变为一个字符串
// Turn a list of characters in PolybiusSquire.key into a string
function key2str() {
    var key = '';
    for (var i = 0; i < PolybiusSquire.key.length; i++) {
        for (var j = 0; j < PolybiusSquire.key[i].length; j++) {
            key += PolybiusSquire.key[i][j];
        }
    }
    return key;
}

// 把字符串变为PolybiusSquire.key列表
// Turn a string into PolybiusSquire.key list
function str2key(str) {
    var key = [];
    for (var i = 0; i < str.length; i++) {
        if (i % 10 == 0) key.push([]);
        key[key.length - 1].push(str[i]);
    }
    return key;
}

// 列表样例
// List sample
// [
//     ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
//     ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
//     ["U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d"],
//     ["e", "f", "g", "h", "i", "j", "k", "l", "m", "n"],
//     ["o", "p", "q", "r", "s", "t", "u", "v", "w", "x"],
//     ["y", "z", "0", "1", "2", "3", "4", "5", "6", "7"],
//     ["8", "9", "+", "-", "*", "/", ".", ",", "!", "?"],
//     [":", ";", "@", "#", "$", "&", "%", "^", "|", "\\"],
//     ["(", ")", "[", "]", "{", "}", "<", ">", "`", "~"],
//     [" ", "_", "·", "=", "⌈", "⌋", "⌊", "⌉", "'", "\""]
// ]
// [
//     ["A", "B", "C", "D", "E", "0", "1", "2", "3", "4"],
//     ["F", "G", "H", "I", "K", "5", "6", "7", "8", "9"],
//     ["L", "M", "N", "O", "P", "*", "/", "+", "-", "="],
//     ["Q", "R", "S", "T", "U", "!", "@", "#", "$", "%"],
//     ["V", "W", "X", "Y", "Z", "^", "&", "_", "[", "]"],
//     ["a", "b", "c", "d", "e", ".", ",", ":", ";", "`"],
//     ["f", "g", "h", "i", "k", "~", "|", "<", ">", " "],
//     ["l", "m", "n", "o", "p", "(", ")", "{", "}", "\\"],
//     ["q", "r", "s", "t", "u", "J", "j", "'", "\"", "?"],
//     ["v", "w", "x", "y", "z", "⌈", "⌋", "⌊", "⌉", "·"]
// ]