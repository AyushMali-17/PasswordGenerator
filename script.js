const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const lengthInput = document.getElementById('lengthInput');
const themeSelect = document.getElementById('themeSelect');
const generateButton = document.getElementById('generateButton');

const themes = {
    nature: ['forest', 'river', 'mountain', 'sunset', 'ocean', 'flower'],
    cosmic: ['star', 'galaxy', 'nebula', 'comet', 'planet', 'moon'],
    art: ['canvas', 'palette', 'brush', 'melody', 'rhythm', 'harmony']
};

function generatePassword() {
    const length = parseInt(lengthInput.value);
    const theme = themeSelect.value;
    const themeWord = themes[theme][Math.floor(Math.random() * themes[theme].length)];

    let password = '';
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';

    password += getRandomChar('abcdefghijklmnopqrstuvwxyz');
    password += getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    password += getRandomChar('0123456789');
    password += getRandomChar('!@#$%^&*()-_=+[]{}|;:,.<>?');

    
    password += themeWord;

    while (password.length < length) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    password = shuffleString(password);

    passwordOutput.value = password;
}

function getRandomChar(charset) {
    return charset[Math.floor(Math.random() * charset.length)];
}

function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

generateButton.addEventListener('click', generatePassword);

copyButton.addEventListener('click', () => {
    passwordOutput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});

generatePassword();