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
    if (value != '') {var result = core.encode(value);};
    if (result === undefined) {result = '';}
    enout.value = result;
});
decode.addEventListener('input', (event) => {
    const value = event.target.value;
    var result = core.decode(value);
    if (result === false || result === undefined) {result = '';}
    deout.value = result;
});


function clean(id) {
    if (id == 'en'){
        encode.value = '';
        enout.value = '';
    } else if (id = 'de') {
        decode.value = '';
        deout.value = '';
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                reminder('Copy successful!')
            })
            .catch((error) => {
                console.error('Error!', error);
            });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

function copy(id) {
    var element = document.getElementById(id).value;
    if (element != '') {
        copyToClipboard(element);
    }
}


// key
document.addEventListener('DOMContentLoaded', function () {

    var inputs = Array.from(document.getElementsByName('keyin'));

    // 在多个input标签之间移动
    // Move between multiple input tags
    var currentIndex = 0;
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

    // 输入长度大于一个字符自动清零
    //  Input lengths greater than one character are automatically zeroed
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (this.value.length > 1) {
                this.value = '';
                this.style.backgroundColor = 'rgba(255, 192, 203, 0.5)';
            } else {
                this.style.backgroundColor = '';
            }
        });

    });
});


