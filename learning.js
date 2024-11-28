arr=[]
for(i=0;i<=1000;i++){
    if(i%2==0){
        arr.push(i)
    }
}
for(i=0;i<=1000;i++){
    if(i%3==0){
        arr.push(i)
    }
}
for(i=0;i<=1000;i++){
    if(i%5==0){
        arr.push(i)
    }
}

const uniqueArray = [...new Set(arr)];

console.log(uniqueArray);
console.log(uniqueArray.length);


