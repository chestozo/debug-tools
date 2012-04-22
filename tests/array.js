module('Array support');


test('Test case 1', function() {
    var a = [ 1, 2, 3 ];
    var from = {
        a: a,
        b: a
    };


    var to = {
        a:  [ 1, 2, 3 ],
        b: '$$link ..a'
    };

    check(from, to);
});


// Test case 2.
// self link in array