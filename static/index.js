document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#signInButton').addEventListener('click', () => {
        signInFunction();
    });

})

// ------- Own code ------

function signInFunction() {
    alert('Pressed');
}

// --------------------

// Code Verifier 
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// Code challenge
const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

// Base 64 generator
const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


// Examples
const codeVerifier  = generateRandomString(64);
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);




