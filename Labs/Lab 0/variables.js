
const secret = true;
//const falsys = [0, -0, 0n, "", null, undefined, NaN, false];
const users = ["ApeLincoln", "TheNotoriousP.I.G", "Brieonce"]

document.getElementById('buttonShow').addEventListener("click", ()=> {
  let userInput;
  let isRight = "incorrect";
  let falsyResult = "This is not a falsy value.";
  let isUser = "Unknown user"

  userInput = document.getElementById('txtUserInput').value;

  if (userInput.trim() === "") 
  {
    falsyResult = "This is a falsy value.";
    userInput = "No input provided";
  }
  else if (!isNaN(Number(userInput))) 
  {
      userInput = Number(userInput);
      
  }
  else if (userInput.toLowerCase() === "true") 
  {
      userInput = true;
  }
  else if (userInput.toLowerCase() === "false") 
  {
      userInput = false;
  }
  else if (userInput.toLowerCase() === "null") 
  {
      userInput = null;
  }
  else if (userInput.toLowerCase() === "undefined") 
  {
      userInput = undefined;
  }
  else if (userInput.toLowerCase() === "nan") 
  {
      userInput = NaN;
  }
  else if (userInput.toLowerCase() === "0n") 
  {
      userInput = 0n;
  }

  if (userInput === secret) 
  {
    isRight = "Correct!";
  }

  if (!userInput) 
  {
    falsyResult = "This is a falsy value.";
  }

  for (let i = 0; i < users.length; i++) 
  {
    if (userInput.toLowerCase() === users[i].toLowerCase()) 
    {
      isUser = `Hello, ${users[i]}!`;
    }
  }

  document.getElementById('showText').innerText = `You entered: ${userInput}. ${isRight}\nType of input: ${typeof userInput}. ${falsyResult}\n${isUser}`;

});