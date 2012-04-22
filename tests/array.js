module('Array support');


test('Test case 1', function() {
    var a = [ 1, 2, 3 ];
    var from = {
        a: a,
        b: a
    };


    var to = {
        a:  [ 1, 2, 3 ],
        b: '$$link .a'
    };

    check(from, to);
});

test('Test case 2: self link in array', function() {
    var a = [ 1, 2, 3 ];
    var from = {
        a: a
    };
    from.a[1] = from;

    var to = {
        a:  [ 1, '$$link .', 3 ]
    };

    check(from, to);
});

test('Test case 3: first object occurance in array', function() {
    var a = { a: 7 };
    var from = {
        a: [
            1,
            a,
            'test string'
        ],
        b: a
    };
    var to = {
        a: [
            1,
            { a: 7 },
            'test string'
        ],
        b: '$$link .a[1]'
    };

    check(from, to);
});