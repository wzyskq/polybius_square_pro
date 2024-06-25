// 创建 <input> 表
var table = document.getElementsByTagName('tbody')[0];
for (let i = 0; i < 10; i++) {
    let tr = document.createElement('tr');
    let td0 = document.createElement('td');
    td0.textContent = i;
    tr.appendChild(td0);
    for (let i = 0; i < 10; i++) {
        let td = document.createElement('td');
        let input0 = document.createElement('input');
        input0.type = 'text';
        input0.name = 'keyin';
        td.appendChild(input0);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}



var inputs = Array.from(document.getElementsByName('keyin'));
const cricon = document.getElementById('cricon');
var argu = document.getElementById('argu');
var arglen = document.getElementById('argulen');
var auto = document.getElementById('auto');



var emptyList = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""]
];

function reminder(text, time) {
    Toastify({
        text: `${text}`,
        duration: time,
        newWindow: true,
        close: true,
    }).showToast();
}


// 仪表盘
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
auto.addEventListener('input', () => {
    if (auto.checked) reminder('Continuous input mode!');
    else reminder('Fixed input mode!')
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
        PolybiusSquire.key = emptyList;
        window.inputkey(PolybiusSquire.key);
        // 开启连续输入模式
        auto.checked = true;
        reminder('Continuous input mode!');
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
var reIndex = [];

argu.value = window.key2str();
arglen.innerHTML = argu.value.length;
argu.addEventListener('input', (event) => {
    arglen.innerHTML = event.target.value.length;

    if (arglen.textContent == 100) {
        for (let char of argu.value) {
            if (window.IndexesOf(argu.value, char)[1] !== 1) {
                // console.log(char);
                if (reIndex.indexOf(char) == -1) {
                    reIndex.push(char);
                }
            }
        }

        // console.log(reIndex)
        for (let elem of reIndex) {
            let info = `Value repeating! \nValue: ${elem[0]} \nLocation: ${window.IndexesOf(argu.value, elem)[0]}`;
            reminder(info, 3000);
            console.log(info);
        }

        console.log('----- -----');
        reminder('Press F12 to check more information!', 5000);

        if (reIndex == []) {
            PolybiusSquire.key = str2key(argu.value)
            window.inputkey(PolybiusSquire.key);
            // 关闭连续输入模式
            auto.checked = false;
            reminder('Fixed input mode!')
        } else reIndex = []

    } else {
        PolybiusSquire.key = emptyList;
        window.inputkey(PolybiusSquire.key);
    }
});


// 将 key 中值依次输入到 <input>
window.inputkey(PolybiusSquire.key);
function inputkey(list) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            inputs[i * 10 + j].value = list[i][j];
            if (list[i][j] == '') inputs[i * 10 + j].style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
            else inputs[i * 10 + j].style.backgroundColor = '';
        }
    }
}


// 在多个input标签之间移动
var ckey = 0;
var xkey = 0;
var ykey = 0;

inputs.forEach(function (input, index) {
    input.addEventListener('focus', () => {
        ckey = index;
        xkey = Math.floor(ckey / 10);
        ykey = ckey % 10;
        // inputs[index].value = '';
        // inputs[index].style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
    });
});
document.addEventListener('keydown', function (event) {
    const focusedElement = document.activeElement;
    if (inputs.includes(focusedElement)) {
        if (event.key === "ArrowLeft") {
            ckey = (ckey === 0) ? inputs.length - 1 : ckey - 1;
            inputs[ckey].focus();
        } else if (event.key === "ArrowUp") {
            ckey = (ckey - 10 < 0) ? inputs.length - (10 - ckey) : ckey - 10;
            inputs[ckey].focus();
        } else if (event.key === "ArrowRight") {
            ckey = (ckey === inputs.length - 1) ? 0 : ckey + 1;
            inputs[ckey].focus();
        } else if (event.key === "ArrowDown") {
            ckey = (ckey + 10 > inputs.length - 1) ? 10 - (inputs.length - ckey) : ckey + 10;
            inputs[ckey].focus();
        }
    }
});


// 监测方阵各值，输入长度大于一个字符自动取末尾字符
inputs.forEach((input) => {
    input.addEventListener('input', function () {
        if (this.value.length < 1) {
            this.style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
            PolybiusSquire.key
        }
        else {
            this.value = this.value[this.value.length - 1];
            this.style.backgroundColor = ''
            // PolybiusSquire.key[xkey][ykey] = this.value;
        }

        let reElemValue = PolybiusSquire.encode(this.value);
        // console.log(reElemValue);

        //重复元素清除
        if (reElemValue && +reElemValue !== +ckey) {
            this.value = '';
            this.style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
            PolybiusSquire.key[xkey][ykey] = '';

            inputs[+reElemValue].value = '';
            inputs[+reElemValue].style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
            PolybiusSquire.key[Math.floor(reElemValue / 10)][reElemValue % 10] = '';
            reminder('Value repeating!');
        } else {
            PolybiusSquire.key[xkey][ykey] = this.value;
            if (auto.checked && this.value !== '') { inputs[ckey + 1].focus(); }
        }
        argu.value = key2str(PolybiusSquire.key);
        arglen.innerHTML = argu.value.length;


    });

    input.addEventListener('keydown', function (event) {
        if (this.value == '') {
            if (event.key === 'Backspace') {
                if (+ckey == 0) inputs[99].focus();
                else inputs[ckey - 1].focus();
            } else if (event.key === 'Delete') {
                if (+ckey == 99) inputs[0].focus();
                else inputs[ckey + 1].focus();
            }
        }
    });
});


// 将一串字符串打乱顺序
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


function random() {
    if (argu.value.length == 100) {
        argu.value = shuffle(argu.value)
        var key = str2key(argu.value);
        PolybiusSquire.key = key;
        window.inputkey(PolybiusSquire.key);
    } else {
        reminder("Elem's length must be 100!");
    }

}



//将 key 存入 localStorage
function savekey() {
    var key = key2str();
    localStorage.setItem('key', key);
    reminder('Key saved!');
}


// 从 localStorage 中还原 key
function loadkey() {
    try {
        var key = localStorage.getItem('key');
        argu.value = key;
        key = str2key(key);
        PolybiusSquire.key = key;
        window.inputkey(key);
    } catch {
        reminder('No key!');
    }
}



// 把列表PolybiusSquire.key中的字符变为一个字符串
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
function str2key(str) {
    var key = [];
    for (var i = 0; i < str.length; i++) {
        if (i % 10 == 0) key.push([]);
        key[key.length - 1].push(str[i]);
    }
    return key;
}

// 找出 keyword 在 str 中的所有位置
function IndexesOf(str, keyword) {
    let indexes = [];
    let pos = str.indexOf(keyword);

    while (pos !== -1) {
        indexes.push(pos);
        pos = str.indexOf(keyword, pos + 1);
    }
    return [indexes, indexes.length];
}

// 列表样例
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
