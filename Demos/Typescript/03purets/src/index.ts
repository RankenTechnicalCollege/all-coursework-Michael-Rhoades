// class User {
//   email: string
//   name: string
//   private readonly city: string = "st. louis"
//   constructor(email: string, name: string) {
//     this.email = email
//     this.name = name
//   }
// }

class User {

  protected _courseCount = 1;

  private readonly city: string = "st. louis"

  constructor(
    public email: string, 
    public name: string, 
    //private userId: number
  ) {

  }

  private deleteToken() {
    console.log("Token deleted")
  }

  get getAppleEmail() : string {
    return `apple${this.email}`
  }

  get courseCount() : number {
    return this._courseCount
  }

  set courseCount(courseNum: number) {
    if (courseNum <= 1) {
      throw new Error("Course count should be greater than 1")
    }
    this._courseCount = courseNum;
  }
}

class SubUser extends User {
  isFamily: boolean = true
  changeCourseCount() {
    this._courseCount = 4
  }
}


const michael = new User("m@g.c", "Michael")
