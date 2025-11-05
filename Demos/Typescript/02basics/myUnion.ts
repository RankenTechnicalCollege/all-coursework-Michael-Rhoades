let score: number | string = 33;
score = 44;
score = "55";

type User = {
  name: string,
  id: number
}

type Admin = {
  username: string,
  id: number
}

let Michael: User | Admin = {name: "Michael", id: 1234}
Michael = {username: "Michael", id: 1234}

function getDbId(id: number | string) {
  console.log(`Db id is ${id}`);
  if (typeof id === "string") {
    id.toLowerCase();
  }
}

getDbId(3);
getDbId("3");


const data: number[] = [1,2,3]
const data2: string[] = ['1','2','3']
const data3: number[] | string[] = [1,2,3]
const data4: (number | string)[] = [1,'2',3]

let pi: 3.14 = 3.14
//pi = 3.14159265358979323846264338327950288419616939937510

let seatAllotment: "aisle" | "middle" | "window";
seatAllotment = "aisle";
seatAllotment = "middle";
// seatAllotment = "floor";


export{}