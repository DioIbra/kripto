document.addEventListener("DOMContentLoaded", function () {
    const plaintext = document.getElementById("plaintext");
    const algorithm = document.getElementById("algorithm");
    const keyInput = document.getElementById("key-input");
    const key = document.getElementById("key");
    const result = document.getElementById("result");

    // Menampilkan input key hanya jika algoritma membutuhkan kunci
    algorithm.addEventListener("change", () => {
        if (algorithm.value === "vigenere") {
            keyInput.style.display = "block";
        } else {
            keyInput.style.display = "none";
            key.value = "";
        }
    });

    // Tombol Enkripsi
    document.getElementById("encrypt-btn").addEventListener("click", function () {
        const text = plaintext.value;
        const selectedAlgorithm = algorithm.value;
        const encryptionKey = key.value;
        let encryptedText = "";

        if (selectedAlgorithm === "caesar") {
            encryptedText = caesarCipherEncrypt(text, 3); // Geser 3 posisi
        } else if (selectedAlgorithm === "vigenere") {
            encryptedText = vigenereCipherEncrypt(text, encryptionKey);
        }

        result.value = encryptedText;
    });

    // Tombol Dekripsi
    document.getElementById("decrypt-btn").addEventListener("click", function () {
        const text = plaintext.value;
        const selectedAlgorithm = algorithm.value;
        const decryptionKey = key.value;
        let decryptedText = "";

        if (selectedAlgorithm === "caesar") {
            decryptedText = caesarCipherDecrypt(text, 3);
        } else if (selectedAlgorithm === "vigenere") {
            decryptedText = vigenereCipherDecrypt(text, decryptionKey);
        }

        result.value = decryptedText;
    });

    // Fungsi Caesar Cipher
    function caesarCipherEncrypt(text, shift) {
        return text.split('')
            .map(char => {
                const charCode = char.charCodeAt(0);
                if (char >= 'a' && char <= 'z') {
                    return String.fromCharCode((charCode - 97 + shift) % 26 + 97);
                } else if (char >= 'A' && char <= 'Z') {
                    return String.fromCharCode((charCode - 65 + shift) % 26 + 65);
                } else {
                    return char;
                }
            }).join('');
    }

    function caesarCipherDecrypt(text, shift) {
        return caesarCipherEncrypt(text, 26 - shift);
    }

    // Fungsi Vigenère Cipher
    function vigenereCipherEncrypt(text, key) {
        let encrypted = "";
        key = key.toLowerCase();
        for (let i = 0, j = 0; i < text.length; i++) {
            const currentChar = text[i];
            if (currentChar.match(/[a-z]/i)) {
                const shift = key[j % key.length].charCodeAt(0) - 97;
                encrypted += caesarCipherEncrypt(currentChar, shift);
                j++;
            } else {
                encrypted += currentChar;
            }
        }
        return encrypted;
    }

    function vigenereCipherDecrypt(text, key) {
        let decrypted = "";
        key = key.toLowerCase();
        for (let i = 0, j = 0; i < text.length; i++) {
            const currentChar = text[i];
            if (currentChar.match(/[a-z]/i)) {
                const shift = key[j % key.length].charCodeAt(0) - 97;
                decrypted += caesarCipherDecrypt(currentChar, shift);
                j++;
            } else {
                decrypted += currentChar;
            }
        }
        return decrypted;
    }
});
