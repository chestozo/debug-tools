module('Simple cycles');

test('Test case 1', function() {
    var x = { a: 1 };
    var from = {
        a: x,
        b: x
    };

    var to = {
        a: { a: 1 },
        b: '$$link ..a'
    };

    check(from, to);
});


test('Test case 2', function() {
    var x = { a: 1 };
    var from = {
    a: { b: x },
        c: x
    };

    var to = {
        a: { b: { a: 1 } },
        c: '$$link ..a.b'
    };

    check(from, to);
});


test('Test case 3', function() {
    var x = { a: 1 };
    var from = {
        a: x,
        b: {
            c: x
        }
    };

    var to = {
        a: { a: 1 },
        b: {
            c: '$$link ..a'
        }
    };

    check(from, to);
});


test('Test case 4', function() {
    var from = { a: 1 };
    from.me = from;

    var to = {
        a:  1,
        me: '$$link .'
    };

    check(from, to);
});
