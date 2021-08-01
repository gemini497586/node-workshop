console.log("hello world!");

function sum(n) {
  let result = 0;
  for (i = 1; i <= n; i++) {
    result += i;
  }
  return result;
}

console.log(sum(3));
console.log(sum(7));
console.log(sum(10));
