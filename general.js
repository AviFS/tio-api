/*
var a = "abc";
var b = "xyz";
var c = "123";
var d = ["cat", "dog", "boy"];

var X = "thiss";
var Y = "";
var Z = ["hey", "bye"];

var json = {
    "unspecified": [a,b,c,d],
    "specified": {
        "this": X,
        "that": Y,
        "other": Z,
    },
}
*/

var fieldSeparator = "\xff";
var startOfExtraFields = "\xfe";

let gen = {

    makeLink: 
    function makeLink(params) {

        var unspecified = params["unspecified"];
        var specified = params["specified"];

        var stateString = unspecified[0];

        var saveTextArea = function(textArea) {
            stateString += fieldSeparator + textToByteString(textArea);
        };

        var init = unspecified.slice(1,-1);
        var last = unspecified[unspecified.length-1]

        if (init.some(Array.isArray)) {
            console.log("Only the last element in 'unspecified' can be an array.")
            alert("Error: Check console.");
        }

        function saveMaybeArray(value) {
            if (Array.isArray(value)) {
                [...value].forEach(saveTextArea);
            }
            else {
                saveTextArea(value);
            }
        }

        init.forEach(saveTextArea);
        saveMaybeArray(last);
        
        for (var key in specified) {
            value = specified[key];
            if (value != "") {
                stateString += startOfExtraFields + key;
                saveMaybeArray(value);
            }
        }
    return arrToB64(deflate(byteStringToByteArray(stateString)));
    },
    

    parseLink: 
    function parseLink(link) {

        params = {"unspecified": [], "specified": {}}

        var stateString = byteArrayToByteString(inflate(b64ToArr(link)));
        var [unspecified, ...specified] = stateString.split(startOfExtraFields);

        params["unspecified"] = unspecified.split(fieldSeparator);
        for (const spec of specified) {
            var [key, value] = spec.split(fieldSeparator);
            params["specified"][key] = value;
        }
        
        return params;
    }
};

/*
console.log(gen.makeLink(json));

console.log(gen.parseLink(gen.makeLink(json)));
*/