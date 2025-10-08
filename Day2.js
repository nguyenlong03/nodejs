const users = [
  { name: "Long", age: 21 },
  { name: "Nam", age: 20 },
  { name: "An", age: 22 }
];
const LayName = users.map((item , index)=>(
     item.name
)
)

console.log(LayName)
// filter
const filter = users.filter((item , index)=>(
    item.age>20
))
console.log(filter);

// reduce 

const Array = [1,2,3,4]
let initalvalue = 5
const reduce = Array.reduce((acc, cur)=>{
    const TongArray = acc+cur
    return TongArray

},initalvalue)
console.log(reduce);


// objects
const user = {
  name: "Long",
  age: 21,
  address:{
    city:"hà nội",
    country:'Việt nam'
  }
};
const {name , age, address:{city}} = user

console.log(city);

// spread operator
// Dùng với mảng
const mangA = [1,2,3,4,45]
const NewmangA= [...mangA]
console.log(NewmangA);
// dùng với object
const userA = {
  name: "Long",
  age: 21,
  address:{
    city:"hà nội",
    country:'Việt nam'
  }
};
const NewUserA = {...userA}
console.log(NewUserA);


// rest parameter

const FuncRest =(...number)=>{
 return number
}
console.log(FuncRest(1,2,3,4));



// find()
const ArrayB = [1,2,3,45,6]
const NewArrayB = ArrayB.find((elemnt)=>(
    elemnt>1 
))
console.log(NewArrayB);

const ArrayC = [
    {
    id:1,
    name : 'long' ,
    age: 21,
    address:{
        city:'Hà nội',
        country: "Việt nam"
    }
},
    {
    id: 2,
    name : 'long' ,
    age: 24,
    address:{
        city:'Hà nội',
        country: "Việt nam"
    }
}
]
const NewArrayC = ArrayC.find((elemnt)=>(
elemnt.age<24
 ) )
 console.log(NewArrayC);
 

// Findindex()
const Index = [1,2,3,4]
const NewIndex = Index.findIndex((element)=>(
    element>3
))
console.log(NewIndex);


const arrayD = ['cam' , 'chuối', 'Bưởi']
const indexChuoi = arrayD.indexOf('chuối')
console.log(indexChuoi);
if(indexChuoi!=-1){
    console.log('Chuối đã tồn tại');
    arrayD.splice(indexChuoi,1, "táo tầu")
    
}
console.log(arrayD);
