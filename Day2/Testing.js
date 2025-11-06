const map1 = (arr , callback)=>{
  const result = [];
  for(let i = 0; i < arr.length; i++){
    result.push(callback(arr[i] , i , arr));
  }
  return result;
}
const reduce1 = (arr , callback , initialValue)=>{
  let accumulator = initialValue;
    for(let i = 0; i < arr.length; i++){
        accumulator = callback(accumulator , arr[i]);
    }
    return accumulator;
}


const filter1 = (arr , callback)=>{
    let resuts = []
    for (let i = 0; i < arr.length; i++) {
    if(callback(arr[i] , i , arr)){
        resuts.push(arr[i] )
    }
     
    }
    return resuts   

}

const manga = [1,2,3,4,5,5,6,6]
const newmanga = filter1(manga,(item)=>item < 4)
console.log(newmanga);
