var _ = require('underscore');
function plucker(FIELD){
    return function(obj){
        return (obj && obj[FIELD]);
    };
}

var best = { title: "Infinite Jest", author: "DFW" };

var getTitle = plucker('title');

getTitle(best);
// Infinite Jest

var books = [{title: "title1", stars: 3}, {starts: 5}, {title:"title3"}];

var third = plucker(2);

third(books); // {title: "title2" }

var tmp = _.filter(books, getTitle);

console.log(tmp);