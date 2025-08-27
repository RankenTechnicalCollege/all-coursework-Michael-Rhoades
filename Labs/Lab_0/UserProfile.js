const User = 
{
  name: "John Doe",
  email: "JohnDoe@gmail.com",
  online: false
};

  document.getElementById('showText').innerText = `Name: ${User.name}\nEmail: ${User.email}\nOnline: ${User.online}`;

document.getElementById("buttonUdName").addEventListener("click", () => {
  User.name = document.getElementById("txtUserInput").value;
  document.getElementById('showText').innerText = `Name: ${User.name}\nEmail: ${User.email}\nOnline: ${User.online}`;
});

document.getElementById("buttonUdEmail").addEventListener("click", () => {
  User.email = document.getElementById("txtUserInput").value;
  document.getElementById('showText').innerText = `Name: ${User.name}\nEmail: ${User.email}\nOnline: ${User.online}`;
});

document.getElementById("buttonToggle").addEventListener("click", () => {
  if (User.online) {
    User.online = false;
  }
  else {
    User.online = true;
  }
  document.getElementById('showText').innerText = `Name: ${User.name}\nEmail: ${User.email}\nOnline: ${User.online}`;
});