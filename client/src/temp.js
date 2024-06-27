let mp=new Map();

mp.set(2,[1,4,5])

let arr=mp.get(2).filter((val)=>val!=4)
console.log(arr);