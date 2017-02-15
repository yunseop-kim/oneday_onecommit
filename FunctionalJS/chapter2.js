var _ = require('underscore');

var zombie = { name: "Bub", film: "Day of the Dead" };
_.keys(zombie);
_.values(zombie);
_.pluck([
    { title: "Chton", author: "Anthony"},
    { title: "Grendel", author: "Gardner"},
    { title: "After Dark"}], 'author');
_.pairs(zombie);
_.object(_.map(_.pairs(zombie), function(pair){
    return [pair[0].toUpperCase(), pair[1]];
}));
_.invert(zombie);
_.pluck(_.map([{ title: "Chton", author: "Anthony"},
    { title: "Grendel", author: "Gardner"},
    { title: "After Dark"}], 
    function(obj){
        return _.defaults(obj, {author: 'Unknown'})
    }), 'author'); 