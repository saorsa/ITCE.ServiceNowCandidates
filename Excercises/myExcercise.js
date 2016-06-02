'use strict';
//Null and undefined
console.log(a);
var a;
var b = null;
//This is of type string (small s)
var myString = "string";
//This is of type String (capital S)
/*
  Wrap(myString) into an object
  {
    function length() {
     .... count and return length
   }
 } This has a reference addres AE45321
  Give the object to console.log(AE45321)
*/
console.log(myString.length);
console.log('A is:' + a);
console.log('B is:' + b);
//CallStack
function doSomething(someInteger) {
    //debugger;
}

function doSomethingElse(someInteger) {
    someInteger++;
    doSomething(someInteger);
}
doSomethingElse(1);

//Methods
/* Rules:
  1. Do only the thing you have declared
  2. Encapsulate logic
  3. Help you reuse
*/

function sum(a, b) {
    return a + b;
}
//now sum and mySumFunction are alliases
//mySumFunction holds the address of window.sum
var mySumFunction = function (a, b) {
    return a + b;
};
console.log(mySumFunction(1, 2));
var incrementBy = 5;
var myIncrementFunction = function (incrementMe) {
    var incrementBy = 5;
    incrementBy++;
    return incrementMe + incrementBy;
};

//Defining classes
function Car() {
    //this is public
    this.givenName = "";
    var maxSpeed = 200;
    var getHalfPossibleSpeed = function () {
        return maxSpeed / 2;
    };
    this.howMuchSpeed = function () {
        return getHalfPossibleSpeed();
    };
}
var myCar = new Car();
myCar.maxSpeed = 100;
//Operators gotchas
var i = "1";
var z = 4;
var undef;
console.log(z + parseInt(i));
console.log(i == z); //true
console.log(i === z);
//&& ||
//also check if the variable is null or undefined
if (undef) {
    //Not executed
    console.log('this is never reached');
}
undef = "ddsd";
if (undef) {
    console.log('undef is not true, but this is still executed.');
}
var Person = function (options) {
    var ourOptions = options || {
        myOption: true
    };
    var self = this || {};
    self.eyes = "green";
    self.initialize = function () {
        if (ourOptions.myOption) {
            self.eyes = "blue";
            //What's wrong?
            for (var z = 0; z < 10; z++) {
                console.log(z);
            }
        }
    };
    self.initialize();
};
var noOptionsPerson = new Person();
var optionsPerson = new Person({
    myOption: false
});
//More on self invoking functions = http://stackoverflow.com/questions/592396/what-is-the-purpose-of-a-self-executing-function-in-javascript
var myJq; //mimmicking JQuery :D
try {
    (function (jQuery) {
        var $ = jQuery;
        var self = this || {};
        self.initialize = function () {
            if (!$) {
                throw "No JQuery here";
            }
            $("#myDiv").hide();
        };
        self.initialize();
    })(myJq);
} catch (e) {
    console.log(e);
}
//var myInstance = new SomethingThatUsesJQuery($);
console.log(NaN == NaN);
console.log(NaN === NaN);
var person = {
    eyes: "green",
    getEyes: function () {
        return this.eyes;
    }
};
person.getEyes();

//The .prototype
Person.prototype.cancer = true;
Person.prototype.makeIll = function () {
    this.eyes = "black";
};
//Array manipulation
//Map
var myArray = [
    {
        "eyes": "green",
        valid: true
    },
    {
        "eyes": "black",
        valid: true
    },
    {
        "eyes": "yellow",
        valid: true
    },
    {
        "eyes": "umf",
        valid: true
    },
];
//array.Map
function validEyeColor(person) {
    person.valid = person.eyes === "green" || person.eyes === "black";
    return person;
}
console.log(myArray.map(validEyeColor));
//array.reduce
var reduceToASingleColor = function (previous, current, index) {
    if (current === 0) {
        return {
            "eyes": ""
        };
    }
    return {
        "eyes": current.eyes + previous.eyes
    };
};
console.log(myArray.reduce(reduceToASingleColor));
//find
console.log(myArray.find(function (currentObject) {
    if (currentObject.eyes === "green")
        return true;
}));
//Sort
var numbers = [4, 1, 5, 2, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);
//NameSpaces
var sum = function(binary, otherBinary) {
  return binary + otherBinary;
};
var sum = function(dec, otherDec) {
  return dec + otherDec;
};

/*
  c#
  using ScientificLibrary
  using ScientificLibrary.Binary
  using ScientificLibrary.Decimal
*/
var ScientificLibrary = {};
//Dynamic
ScientificLibrary.Binary = function() {
  var self = this || {};
  self.sum = function(bin, otherBin) {
    return bin + otherBin;
  };
  self.doSmthngAtStartup = function() {
    alert('doSmthngAtStartup is doing something.');
  };
  self.doSmthngAtStartup();
};
//Static
ScientificLibrary.Decimal = {
  sum: function(bin, otherBin) {
    return bin + otherBin;
  }
};
console.log(new ScientificLibrary.Binary().sum(1,2));
console.log(ScientificLibrary.Decimal.sum(1,2));
//Exceptions

//Symbol
var symbol = Symbol("theNameOfMyPrivateProperty");
class myClassWithPrivateProperty {
  constructor() {
    this[symbol] = "someValue";
  }
  get someValue() {
    return this[symbol];
  }
}

var excel = [
  {
    "sheet": {
      name: "users",
      rows: [
        {A: "dssa", B: "..."}
      ]
    }
  }
];
var mySheet = excel.find(function... { if name == "users" return objl });
console.log(mySheet.name);
for(row of mySheet.rows) {
  console.log(row.A)
}
