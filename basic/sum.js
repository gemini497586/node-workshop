console.log('hello world!');

function sum(n){
    let result = 0;
    for(i = 0; i < n; i++){
        result += i;
    };
    return result;
};

console.log(sum(3));