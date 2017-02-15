var _ = require('underscore');

function always(VALUE){
    return function(){
        return VALUE;
    };
}

var f = always(function(){});

f() === f();
// => true

var g = f();
var h = g();
console.log(h);