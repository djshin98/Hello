console.log("Hello");
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var sum = a.reduce(function(curr, prev) {
    return prev + curr;
});

console.log("sum = " + sum);