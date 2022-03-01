console.log('Hello');
// alert('yooo yoooooo');

var b = "smoothie";

console.log(b);

// var age = prompt("What is your age");

function fun(){
    console.log("This is a function")
}

fun();

//Arrays

let fruits = ["a","b","c","d","e"];
fruits = new Array("a","b","c","d","e");

// Objects

let student = {
    first : "Abdullah",
    last : "francisco",
    age:25,
    height: 173,
    studentInfo : function(){
        return this.first + "\n" + this.last;
    }

};

console.log(student.first)
console.log(student.last)
console.log(student.studentInfo());