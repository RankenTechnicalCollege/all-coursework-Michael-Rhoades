const score: Array<number> = []
const names: Array<string> = []

function identityOne(val: boolean | number): boolean | number {
  return val
}

function identityTwo(val: any): any {
  return val
}

function identityThree<Type>(val: Type): Type {
  return val
}

// identityThree(3)

function identityFour<T>(val: T): T {
  return val
}

interface Bottle {
  brand: string,
  type: number
}

identityFour<Bottle>({brand: "water", type: 5})

//the next 2 had an error for some reason, even though I am pretty sure I copied it exactly

// function getSearchProducts<T>(products: T[]): T {
//   const myIndex = 3
//   return products[myIndex]
// }

// const getMoreSearchProducts = <T,>(products: T[]): T => {
//   const myIndex = 4
//   return products[myIndex]
// }

interface Database {
  connection: string,
  username: string,
  password: string
}

function anotherFunction<T,U extends Database>(val1: T, val2: U): Object {
  return {
    val1, 
    val2
  }
}

anotherFunction(3, {connection: "string", username: "string", password: "string"})

interface Quiz {
  name: string,
  type: string
}

interface Course {
  name: string,
  author: string,
  subject: string
}

class Sellable<T> {
  public cart: T[] = []

  addToCart(product: T) {
    this.cart.push(product)
  }
}