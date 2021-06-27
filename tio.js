// Following five functions are courtesy of dzaima
function deflate(arr) {
    return pako.deflateRaw(arr, {
        "level": 9
    });
}

function inflate(arr) {
    return pako.inflateRaw(arr);
}

function encode(str) {
    let bytes = new TextEncoder("utf-8").encode(str);
    return deflate(bytes);
}

function arrToB64(arr) {
    var bytestr = "";
    arr.forEach(c => bytestr += String.fromCharCode(c));
    return btoa(bytestr).replace(/\+/g, "@").replace(/=+/, "");
}

function b64ToArr(str) {
    return new Uint8Array([...atob(decodeURIComponent(str).replace(/@/g, "+"))].map(c => c.charCodeAt()))
}

// more help from dzaima here
async function TIO(code, input, lang) {
    const encoder = new TextEncoder("utf-8");
    let length = encoder.encode(code).length;
    let iLength = encoder.encode(input).length;
    //  Vlang\u00001\u0000{language}\u0000F.code.tio\u0000{# of bytes in code}\u0000{code}F.input.tio\u0000{length of input}\u0000{input}Vargs\u0000{number of ARGV}{ARGV}\u0000R
    let rBody = "Vlang\x001\x00" + lang + "\x00F.code.tio\x00" + length + "\x00" + code + "F.input.tio\x00" + iLength + "\x00" + input + "Vargs\x000\x00R";
    rBody = encode(rBody);
    let fetched = await fetch("https://tio.run/cgi-bin/run/api/", {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: rBody
    });
    let read = (await fetched.body.getReader().read()).value;
    let text = new TextDecoder('utf-8').decode(read);
    return text.slice(16).split(text.slice(0, 16));
}

// Test
console.log(TIO(",[-.,]", "Ifmmp!xpsme\"", "brainfuck"));