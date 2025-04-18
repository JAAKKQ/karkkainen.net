export class AuthService {
    constructor() {
        this.isLoggedin = false;
        this.credential = undefined;
        this.extensions = undefined;
    }

    async register() {
        this.credential = await navigator.credentials.create({
            publicKey: {
                challenge: new Uint8Array([117, 61, 252, 231, 191, 241 /* … */]),
                rp: { id: window.location.hostname, name: "Rene Kärkkäinen" },
                user: {
                    id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
                    name: "Test WebAuthn PRF Extension Support",
                    displayName: "Test WebAuthn PRF Extension Support",
                },
                pubKeyCredParams: [
                    { type: "public-key", alg: -7 },
                    { alg: -257, type: "public-key" }],
                extensions: { prf: { eval: { first: new Uint8Array(new Array(32).fill(1)) } } },
            },
        });
        return this.credential;
    }

    async login() {
        this.credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array([139, 66, 181, 87, 7, 203 /* … */]),
                rpId: window.location.hostname,
                userVerification: "required",

            },
            extensions: { prf: { eval: { first: new Uint8Array(new Array(32).fill(1)) } } },
        });

        this.extensions = this.credential.getClientExtensionResults();

        return this.credential
    }

    checkPRF() {
        return this.extensions.prf?.results?.first || false
    }
}

export default AuthService