# TIO API

A work-in-progress interface with TIO, and eventually perhaps other people's interpreters as well.

The function `TIO(code, input, language)` is already good to go. You use it just the way it looks. For example `TIO(",+.", "a", "brainfuck") => "b"`.

If you'd like to use it in the meantime, just copy the js file and be sure to include the script tag in `tio.html` that starts `<<script src="https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.min.js">`. It brings in pako which is a dependency for the js, the only one so far. It's unavoidable though, as TIO's source code uses pako to generate the encoded links.