var check = function(from, to) {
    var formatted = new Preformatter().format(from);
    deepEqual(formatted, to);
    // Check, that json stringify does not throw exception.
    var str = JSON.stringify(formatted);
};

module('Simple, no cycles');

test('Test case 1', function() {
    var from = {
        a: 'some string',
        b: 1,
        c: true
    };

    var to = {
        a: 'some string',
        b: 1,
        c: true
    };

    check(from, to);
});

test('Test case 2', function() {
    var from = {
        a: 'some string',
        b: { c: 1 }
    };

    var to = {
        a: 'some string',
        b: { c: 1 }
    };

    check(from, to);
});


test('Test case 3', function() {
    var from = {
        a: {
            b: {
                c: 'some string'
            }
        }
    };

    var to = {
        a: {
            b: {
                c: 'some string'
            }
        }
    };

    check(from, to);
});