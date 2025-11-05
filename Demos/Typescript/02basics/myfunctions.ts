function addTwo(num: number) : number {
    return num + 2;
}

function getUpper(val: string) {
    return val.toUpperCase();
}

function signUpUser(name: string, email: string, isPaid: boolean) {}
function loginUser(name: string, email: string, isPaid: boolean = false) {}

addTwo(5);
getUpper("michael");
signUpUser("Michael", "michaeltrhoades42@gmail.com", false);
loginUser("Michael", "michaeltrhoades42@gmail.com");


// function getValue(myVal: number) : string {
//     if (myVal > 5) {
//         return true;
//     }
//     return "200 ok";
// }

const getHello = (s: string) : string => {
    return "";
}

const heroes = ["thor", "spider-man", "iron man"];
//const heroes = [1, 2, 3];

heroes.map((hero) : string => {
    return `hero is ${hero}`;
})


function consoleError(errmsg : string) : void {
    console.log(errmsg);
}

function handleError(errmsg : string) : never {
    throw new Error(errmsg);
}



export{}