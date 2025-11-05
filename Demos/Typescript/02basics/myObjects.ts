// const User = {
//   name: "Michael",
//   email: "michaeltrhoades42@gmail.com",
//   isActive: true
// };

// function createUser({name: string, isPaid: boolean, email: string}){}

// let newUser = {name: "Michael", isPaid: false, email: "michaeltrhoades42@gmail.com"}

// createUser(newUser);


// function createCourse():{name: string, price: number}{
//   return {name: "reactjs", price: 399};
// }



// type bool = boolean;
// type User = {
//   name: string,
//   email: string,
//   isActive: bool
// }

// function createUser(user: User) : User{return user}

// createUser({name: "Michael", email: "michaeltrhoades42@gmail.com", isActive: true});



type bool = boolean;
type User = {
  readonly _id: string,
  name: string,
  email: string,
  isActive: bool,
  credcardDetails?: number
}

let myUser: User = {_id: "1245", name: "Michael", email: "michaeltrhoades42@gmail.com", isActive: false}

type cardNumber = {
  cardNumber: string;
}

type cardDate = {
  cardDate: string;
}

type cardDetails = cardNumber & cardDate & {
  cvv: number
}

myUser.email = "m@g.c";
// myUser._id = "nope"




export {};