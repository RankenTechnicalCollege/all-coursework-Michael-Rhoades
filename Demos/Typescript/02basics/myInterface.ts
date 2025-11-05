interface User {
  readonly dbId: number
  email: string,
  userId: number,
  googleId?: string
  // startTrial: () => string
  startTrial(): string
  getCoupon(couponName: string, off: number): number
}

interface User {
  githubToken: string
}

interface Admin extends User {
  role: "admin" | "ta" | "learner"
}

const Michael: Admin = {
  dbId: 1, 
  email: "m@g.c", 
  role: "admin",
  userId: 1234, 
  githubToken: "token",
  startTrial: () => {
    return "Trial started"
  }, 
  getCoupon(name: "michael10", off: 10) {
    return off
  }
}



export{}