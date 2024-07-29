const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const lengthInput = document.getElementById('lengthInput');
const themeSelect = document.getElementById('themeSelect');
const generateButton = document.getElementById('generateButton');
const strengthBar = document.querySelector('.strength-bar');
const strengthText = document.getElementById('strengthText');

const themes = {
    nature: ['forest', 'river', 'mountain', 'sunset', 'ocean', 'flower', 'meadow', 'breeze', 'petal', 'leaf'],
    cosmic: ['star', 'galaxy', 'nebula', 'comet', 'planet', 'moon', 'asteroid', 'supernova', 'quasar', 'void'],
    art: ['canvas', 'palette', 'brush', 'melody', 'rhythm', 'harmony', 'sculpture', 'fresco', 'mural', 'sketch'],
    music: ['melody', 'rhythm', 'harmony', 'symphony', 'jazz', 'rock', 'blues', 'opera', 'concerto', 'sonata'],
    technology: ['quantum', 'cyber', 'nano', 'binary', 'pixel', 'vector', 'neural', 'crypto', 'quantum', 'hologram']
};

function generatePassword() {
    const length = parseInt(lengthInput.value);
    const theme = themeSelect.value;
    const themeWord = themes[theme][Math.floor(Math.random() * themes[theme].length)];

    let password = '';
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';

    // Ensure at least one character from each category
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
    updateStrengthMeter(password);
}

function getRandomChar(charset) {
    return charset[Math.floor(Math.random() * charset.length)];
}

function shuffleString(str) {
    return str.split('').sort(() => Math.random() - 0.5).join('');
}

function updateStrengthMeter(password) {
    const strength = calculatePasswordStrength(password);
    let color, text;

    if (strength > 80) {
        color = '#4CAF50';
        text = 'Strong';
    } else if (strength > 60) {
        color = '#FFA500';
        text = 'Moderate';
    } else {
        color = '#F44336';
        text = 'Weak';
    }

    strengthBar.style.width = `${strength}%`;
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = `Password Strength: ${text}`;
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    strength += Math.min(20, password.length * 2);

    if (/[a-z]/.test(password)) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/\d/.test(password)) strength += 10;
    if (/[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password)) strength += 15;

    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password)) {
        strength += 15;
    }

    return Math.min(100, strength);
}

generateButton.addEventListener('click', generatePassword);

copyButton.addEventListener('click', () => {
    passwordOutput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});

generatePassword();
