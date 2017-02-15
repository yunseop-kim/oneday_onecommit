var _ = require('underscore');

function parseAge(age){
    if (!_.isString(age)) fail("Expecting a string");
    var a;

    note("Attempting to parse an age");

    a = parseInt(age, 10);

    if(_.isNaN(a)){
        warn(["Could not parse age:", age].join(' '));
        a = 0;
    }

    return a;
}

function fail(thing){
    throw new Error(thing);
}

function warn(thing){
    console.log(["WARNING:", thing].join(' '));
}

function note(thing){
    console.log(["NOTE:", thing].join(' '));
}

var age = parseAge("42");
console.log(age);

function existy(x) { return x != null };
function truthy(x) { return (x !== false) && existy(x) };
function doWhen(cond, action){
    if(truthy(cond))    return action();
    else    return undefined;
}
function excuteIfHasField(target, name){
    return doWhen(target[name], function(){
        var result = _.result(target, name);
        console.log(['The result is', result].join(' '));
        return result;
    });
}

excuteIfHasField([1,2,3], 'reverse');
excuteIfHasField({foo: 42}, 'foo');
excuteIfHasField([1,2,3], 'notHere');