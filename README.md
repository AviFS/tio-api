# TIO API

A work-in-progress library to interface with TIO, and eventually perhaps other people's interpreters as well.

The function `TIOrun(code, input, language)` is already good to go. You use it just the way it looks. For example `TIOrun(",+.", "a", "brainfuck") => "b"`. And now `TIOlinkMake` is ready to generate TIO permalinks as well! Check `tio.js` for these frontend functions, and `util.js` for the nitty gritty.

If you'd like to use the library now, just copy the js file and be sure to include the script tag in `tio.html` that starts `<<script src="https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.3/pako.min.js">`. It brings in pako which is a dependency for the js, the only one so far. It's unavoidable though, as TIO's source code uses pako to generate the encoded links.

Please make issues for any functions you'd like to see, or other online interpreters you'd like this to support!
