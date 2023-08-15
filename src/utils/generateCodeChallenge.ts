export default async function generateCodeChallenge(codeVerifier: string) {
  function base64encode(buffer: ArrayBuffer) {
    const byteArray = new Uint8Array(buffer);
    let binaryStr = '';
    byteArray.forEach((byte) => {
      binaryStr += String.fromCharCode(byte);
    });

    return btoa(binaryStr).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
}
