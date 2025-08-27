

function add(a, b) {
    return a + b;
}

const addExpression = function add3(a, b, c) {
    return a + b + c;
}

const greet = (name = guest) => {
  return "Hello!" + name;
}
const square = x => x * x;

const createUser = (name, age) => ({name, age});

document.getElementById("buttonShow").addEventListener("click", () => {
    document.getElementById('showText').innerText = `The sum is: ${add(5, 3)}\n
    The sum of three numbers is: ${addExpression(2, 4, 6)} \n
    Greeting: ${greet()}\n
    Square of 5: ${square(5)}\n
    User Object: ${JSON.stringify(createUser("Alice", 30))}`;
});