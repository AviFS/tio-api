# TIO API

Everything in `extra/` can be ignored for now. All of it is still in progress; I just decided to leave it on the main branch.

So the project is just two files: `tio.js` and `util.js`. If you want to use this project, you can just copy paste those two files. It's all you need!

The functions in `tio.js` are your interface. The functions in `util.js`you shouldn't need. A function is intended for use by you iff it's in `tio.js`. There are, right now, three functions there:

### Functions

##### Untyped

- ```js
  async TIO.run(code, input, lang) -> Promise([stdout, stderr+timing, ?])
  ```

- ```js
  TIO.makeLink(languageId, header, code, footer, input, args, options, fullLink)-> link
  ```

- ```js
  TIO.parseLink(link) -> {
    "languageId": languageId,
    "header": header,
    "code": code,
    "footer": footer,
    "input": input,
    "args": args,
    "options": options
  }
  ```

##### Typed

- ```js
  async TIO.run(code: string, input: string, lang: string)
    -> Promise([stdout, stderr+timing, ?]): Promise([string, string, string])
  ```

- ```js
  TIO.makeLink(languageId: string, header: string, code: string, footer: string, input: string,
               args: [string], options: [string], fullLink: boolean)-> link: string
  ```

- ```js
  TIO.parseLink(link: string) -> {
    "languageId": languageId,
    "header": header,
    "code": code,
    "footer": footer,
    "input": input,
    "args": args,
    "options": options
  }: JSON
  ```

#####

### Examples

```js
>> ///// TIO.run /////
>> TIO.run(",+.", "A", "brainfuck").then(n=>console.log(n[0]))
B
>> TIO.run(",+.", "A", "brainfuck").then(n=>console.log(n[1]))
"Real time: 0.074 s\
User time: 0.039 s\
Sys. time: 0.034 s\
CPU share: 98.64 %\
Exit code: 0"
>> TIO.run("console.log('stdout');console.err('stderr');", "stdin", "javascript-node").then(n=>console.log(n[0] + '-------\n' + n[1].slice(0,200)))
"stdout\
-------\
/home/runner/.code.tio:1\
(function (exports, require, module, __filename, __dirname) { \
console.log('stdout');console.err('stderr');"

>> ///// TIO.makeLink /////
>> TIO.makeLink("tinylisp")
"https://tio.run/##K8nMq8zJLC74DwQA"
>> TIO.makeLink("apl-dyalog-classic", "∇f", "⍎⊖⍕⊃⊂|⌊-*+○⌈×÷!⌽⍉⌹~⍴⍋⍒,⍟?⍳0", "∇\nf")
"https://tio.run/##AVwAo/9hcGwtZHlhbG9nLWNsYXNzaWP/4oiHZv/ijY…eL4oyIw5fDtyHijL3ijYnijLl@4o204o2L4o2SLOKNnz/ijbMw/@KIhwpm/w"
>> TIO.makeLink("brain-flak", "", "", "", "", ["-h", "-d"])
"https://tio.run/##SypKzMzTTctJzP4PAroZ/3VTAA"
>> TIO.makeLink("brain-flak", "", "", "", "", ["-h", "-d"], [], false)
"SypKzMzTTctJzP4PAroZ/3VTAA"

>> ///// TIO.parseLink /////
>> TIO.parseLink("https://tio.run/##K8nMq8zJLC74DwQA").languageId
"tinylisp"
>> TIO.parseLink("https://tio.run/##AVwAo/9hcGwtZHlhbG9nLWNsYXNzaWP/4oiHZv/ijY7iipbijZXiioPiioJ84oyKLSor4peL4oyIw5fDtyHijL3ijYnijLl@4o204o2L4o2SLOKNnz/ijbMw/@KIhwpm/w")
Object { languageId: "apl-dyalog-classic", header: "∇f", code: "⍎⊖⍕⊃⊂|⌊-*+○⌈×÷!⌽⍉⌹~⍴⍋⍒,⍟?⍳0", footer: "∇\nf", input: "", args: [], options: [] }
>> TIO.parseLink("https://tio.run/##SypKzMzTTctJzP4PAroZ/3VTAA").args
Array [ "-h", "-d" ]
```



If there is any other functionality you'd like, please submit an issue. There's no such thing as too tiny or too big an idea, at least not yet; all interaction is welcome! Other functions to interact with TIO and adding support for other online interpreters are both in scope for the library. If an issue already exists for it, please comment on it to let me know you're interested. Reacting on the issue with an emoji isn't loud enough!



Note that functions in `tio.js` rely on those in `util.js` so be sure to `<src>` those in first. Or if you copy/paste both into one file, put the contents of `util.js` first.



Also, note that the `lang`/`languageId` field in `TIO.run` & `TIO.makeLink` must be the same id that TIO has in its system. It's not always self-evident what the id is. You can consult `extra/ids.js`, put together by [@RedwolfPrograms](https://github.com/RedwolfPrograms), to find it. Here's an example:

```js
>> var lang = "js"
>> TIO.run("","", lang).then(n=>console.log(n[0]))
"The language 'js' could not be found on the server."
>> var lang = "javascript"
>> TIO.run("","", lang).then(n=>console.log(n[0]))
"The language 'javascript' could not be found on the server."
>> // Hmmm, 'node' doesn't work either. Nor does 'nodejs' nor 'node-js'
>> // Running out of ideas... Consult ids.js!
>> var search = "node"
>> for (const key in TIO.IDS) { if (key.toLowerCase().includes(search)) { console.log(key + ": " + TIO.IDS[key]);} }
"JavaScript (Babel Node): javascript-babel-node\
JavaScript (Node.js): javascript-node"

```
