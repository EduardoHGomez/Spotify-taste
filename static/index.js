const clientId = '8d6a62d1e85e412d9f237a08f9ee13ee';
const redirectUri = 'http://localhost:3000/';

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');


// ------------ Redirect functions -------------------

console.log(code);
console.log(localStorage.access_token);
// After the user is redirected once accepted the petition, it is given back to code
const getToken = async code => {

    const url = `https://accounts.spotify.com/api/token`;

    // stored in the previous step let codeVerifier = localStorage.getItem('code_verifier');

    const payload = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        }),


    }

  const body = await fetch(url, payload);
  const response = await body.json();

  localStorage.setItem('access_token', response.access_token);

}


if (code) {
    localStorage.setItem("code_redirect", code);

    // Check if token exists
    if (localStorage.access_token) {
        window.location.href = 'http://localhost:3000';
    } else {
        getToken(code);
    }
}


// ---------- End of redirect functions -------------------------




document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#signInButton').addEventListener('click', () => {
        signInFunction();
    });

    document.querySelector('#getProfileButton').addEventListener('click', () => {
        getProfile();
    });

})

// ------- Own code ------

async function signInFunction() {
    // Examples
    const codeVerifier  = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);


    const scope = 'user-read-private user-read-email';
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params =  {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();

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



// Example of usage
async function getProfile(accessToken) {

    console.log(localStorage.getItem('access_token'));

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  });

  console.log(response);

  const data = await response.json();

}
