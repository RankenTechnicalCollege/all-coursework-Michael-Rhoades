// function brewCoffee() {
//   const start = Date.now();
//   while (Date.now() - start < 3000) {
//     // Simulate a time-consuming task
//   }

// }




const brewCoffee = () => {
  if (document.getElementById('buttonCoffee').innerText != 'Loading') {
    setTimeout(() => {
      document.getElementById('showText').innerText += 'Coffee!\n';
      document.getElementById('buttonCoffee').innerText = 'Brew Coffee';
    }, 3000);
  }
  document.getElementById('buttonCoffee').innerText = 'Loading';
}

const makeToast = () => {
  if (document.getElementById('buttonToast').innerText != 'Loading') {
    setTimeout(() => {
      document.getElementById('showText').innerText += 'Toast!\n';
      document.getElementById('buttonToast').innerText = 'Make Toast';
    }, 2000);
  }
  document.getElementById('buttonToast').innerText = 'Loading';
}

const pourJuice = () => {
  if (document.getElementById('buttonJuice').innerText != 'Loading') {
    setTimeout(() => {
      document.getElementById('showText').innerText += 'Juice!\n';
      document.getElementById('buttonJuice').innerText = 'Pour Juice';
    }, 1000);
  }
  document.getElementById('buttonJuice').innerText = 'Loading';
}

document.getElementById("buttonCoffee").addEventListener("click", () => {
  brewCoffee();
});

document.getElementById("buttonToast").addEventListener("click", () => {
  makeToast();
});

document.getElementById("buttonJuice").addEventListener("click", () => {
  pourJuice();
});