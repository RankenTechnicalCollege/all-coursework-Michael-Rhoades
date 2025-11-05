function detectType(val: string | number) {
  if(typeof val == "string") {
    return val.toLowerCase()
  }
  return val + 3
}

function provideId(id: string | null) {
  if (!id) {
    console.log("Please provide valid id");
    return
  }
  id.toLowerCase()
}

interface User {
  name: string,
  email: string
}

interface Admin extends User {
  isAdmin: boolean
}

function isAdminAccount(account: User | Admin) {
  // return account.isAdmin

  if ("isAdmin" in account) {
    return account.isAdmin
  }
  return false
}


function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
  } else {
    console.log(x.toUpperCase());
  }
}

type Fish = {swim: () => void}
type Bird = {fly: () => void}

function isFish(pet: Fish | Bird) : pet is Fish {
  return (pet as Fish).swim != undefined
}

function getFood(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet
    return "Fish food"
  } else {
    pet
    return "Bird food"
  }
}


interface Circle {
  kind: "circle",
  radius: number
}

interface Square {
  kind: "square",
  side: number
}

interface Rectangle {
  kind: "rectangle",
  width: number,
  height: number
}

type Shape = Circle | Square | Rectangle

function getTrueShape(shape: Shape) {
  if (shape.kind == "circle") {
    return Math.PI * shape.radius ** 2
  }
  // return shape.side ** 2
}

function getArea(shape: Shape) {
  switch(shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square": 
      return shape.side ** 2
    case "rectangle":
      return shape.width * shape.height
    default:
      const _defaultForShape: never = shape
      return _defaultForShape
  }
}