// phần 1 
const rawComment = "   I love JAVASCRIPT!!! It's soooo COOL!!!   ";


// xóa khoảng trắng dư ở đầu và cuối 

const deleteTrim =  rawComment.trim()
console.log(deleteTrim);

// viết hoa chữ cái đầu còn lại viết thường
const upCase = deleteTrim.charAt(0).toUpperCase() + deleteTrim.slice(1).toLowerCase()
console.log(upCase);

// giới hạn tối đa 30 ký tự nếu dài hơn thì thay bằng dấu ...
const gioihan = deleteTrim.slice(0,30)+'...'

console.log(gioihan);
// nếu comment chứa 'cool' thì thay bằng great
const replaceCool = deleteTrim.replace(/COOL/g, 'great')
console.log(replaceCool);



// PHẦN 2 
let cart = ["apple", "banana", "orange"];
// Thêm mango vào cuối mảng
const newcart = cart.push('mango')
console.log(cart);

// nếu banana có trong mảng thì xóa nó đi dùng  indexOf + splice
const index = cart.indexOf('banana')
if (index !== -1) {
    cart.splice(index, 1)
}
console.log(cart);

const addgrape = cart.splice(-2,0,'grape')
console.log('check ' ,cart);



// sau khi xóa thêm 'grape' ngay sau apple




// nếu mảng có hơn 4 món thì xóa món cuối cùng
if (cart.length > 4 ) {
    cart.pop()
}
console.log(cart + cart.length);



//phần 3
const rawNames = "Alice,, Bob,   Charlie , ,David,";
// tách thành mảng theo dấu ,
const namesArray = rawNames.split(',');
// xóa khoảng trắng thừa và các chuỗi rỗng
const newRawNames = namesArray.map(name => name.trim()).filter(name => name !== '');
console.log(newRawNames);

const joinRawnames = newRawNames.join('|')
console.log(joinRawnames)

// phần 4 regex
// tạo hàm 
const validateUserInput = (input)=>{
   

}

// phần 4 Primitive vs Reference

let user1 = { name: "Huy", skills: ["JS"] };
let user2 = user1;
let user3 = structuredClone(user1); // deep copy

user2.name = "Nam";
user2.skills.push("TS");
user3.skills.push("React");

console.log(user1, user2, user3);
