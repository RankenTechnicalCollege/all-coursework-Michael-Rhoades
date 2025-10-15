function addTwo(num: number) {
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


export{}