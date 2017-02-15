let _ = require('underscore');

let representation = { 
"collection" :
  {
    "version" : "1.0",
    "href" : "http://example.org/friends/",
    
    "links" : [
      {"rel" : "feed", "href" : "http://example.org/friends/rss"}
    ],
    
    "items" : [
      {
        "href" : "http://example.org/friends/jdoe",
        "data" : [
          {"name" : "full-name", "value" : "J. Doe", "prompt" : "Full Name"},
          {"name" : "email", "value" : "jdoe@example.org", "prompt" : "Email"}
        ],
        "links" : [
          {"rel" : "blog", "href" : "http://examples.org/blogs/jdoe", "prompt" : "Blog"},
          {"rel" : "avatar", "href" : "http://examples.org/images/jdoe", "prompt" : "Avatar", "render" : "image"}
        ]
      },
      
      {
        "href" : "http://example.org/friends/msmith",
        "data" : [
          {"name" : "full-name", "value" : "M. Smith", "prompt" : "Full Name"},
          {"name" : "email", "value" : "msmith@example.org", "prompt" : "Email"}
        ],
        "links" : [
          {"rel" : "blog", "href" : "http://examples.org/blogs/msmith", "prompt" : "Blog"},
          {"rel" : "avatar", "href" : "http://examples.org/images/msmith", "prompt" : "Avatar", "render" : "image"}
        ]
      },
      
      {
        "href" : "http://example.org/friends/rwilliams",
        "data" : [
          {"name" : "full-name", "value" : "R. Williams", "prompt" : "Full Name"},
          {"name" : "email", "value" : "rwilliams@example.org", "prompt" : "Email"}
        ],
        "links" : [
          {"rel" : "blog", "href" : "http://examples.org/blogs/rwilliams", "prompt" : "Blog"},
          {"rel" : "avatar", "href" : "http://examples.org/images/rwilliams", "prompt" : "Avatar", "render" : "image"}
        ]
      }      
    ],
    
    "queries" : [
      {"rel" : "search", "href" : "http://example.org/friends/search", "prompt" : "Search",
        "data" : [
          {"name" : "search", "value" : ""}
        ]
      }
    ],
    
    "template" : {
      "data" : [
        {"name" : "full-name", "value" : "", "prompt" : "Full Name"},
        {"name" : "email", "value" : "", "prompt" : "Email"},
        {"name" : "blog", "value" : "", "prompt" : "Blog"},
        {"name" : "avatar", "value" : "", "prompt" : "Avatar"}
        
      ]
    }
  } 
};

function getVersion(presentation){
    if(!presentation || !_.has(presentation, "collection")){
        fail("invalid collection+json document!");
    }

    return presentation.collection.version;
}

function getHref(object){
    let href = object.href;
    if(!href){
        fail("cannot find href!")
    }
    return href;
}

function getLinkRelation(object, rel){
    let _links = object.links;
    if( !_.isArray(_links) ){
        fail("invalid links - links is not array!");
    }
    if( _links.length === 0){
        note("length of links is 0!");
        return [];
    }
    
    let linkRel = _.find(_links, (value)=>{
        return value.rel === rel;
    });

    if(!linkRel){
        fail("cannot find link relation!");
    }
    return linkRel;
}

function getItems(items){
    let result = [];

    if ( !_.isArray(items)){
        fail("invalid items - items is not array!");
    }
    if ( !items.length === 0){
        note("length of items is 0");
        return [];
    }

    items.forEach((item, index, array)=>{
        result.push(getData(item.data));
    });

    return result;
}

function getData(data){
    let result = {};

    data.forEach((item, index, array)=>{
        let key = _.propertyOf(item)('name');
        let value = _.propertyOf(item)('value');
        result[key] = value;
    });

    return result;
}

function getTemplate(template){
    return getData(template.data);
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

function prettyNote(thing){
    let prettify = JSON.stringify(thing, null, 2);
    console.log(["PRETTY NOTE: ", prettify].join( ''));
}

// let myVersion = getVersion(representation);
// let myLinkRel = getLinkRelation(representation.collection, 'feed');
// let myHref = getHref(myLinkRel);
// let myData = getItems(representation.collection.items);
let myTemplate = getTemplate(representation.collection.template);
prettyNote(myTemplate);
// getQuery(representation.collection.queries[0]);