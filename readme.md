### Dependencies
`Array.isArray`

### Usage

`<script src="debug-tools.js"></script>`

#### Added methods

##### JSON.stringify2
`JSON.stringify2`: works like `JSON.stringify`, but first it removes all cyclic references and functions.
All cyclic references are replaced with strings of the following format:
`$$link <ref>`.
Refs are like so:

`.` - a reference to root object itself;

`.a` - a reference to object property named `a` (`a`'s value must be `object` / `array`);

`.a.b` - property `b` of the root object property `a`;

`.a[1]` - a reference to an object, that is introduced as the second element of an array, where array is a property of the root object, named `a`.

*Example
```js
// Creating an object with many links in it:
var n = { i: 7 };

var ar = [ 'a', 'b', n ];
ar[1] = ar;

var obj = {
  a: ar,
  b: {
    c: ar,
    d: null
  },
  c: n
};
obj.b.d = obj;

// Standard JSON.stringify() fails:
JSON.stringify(obj, null, '  '); // TypeError: Converting circular structure to JSON

// Whereas JSON.stringify2() shows something:
JSON.stringify2(obj, null, '  ');

// RESULT:
{
  "a": [
    "a",
    "$$link .a",
    {
      "i": 7
    }
  ],
  "b": {
    "c": "$$link .a",
    "d": "$$link ."
  },
  "c": "$$link .a[2]"
}
```