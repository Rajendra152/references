const mobileBtn = document.getElementById('mobile-cta');
nav = document.querySelector('nav');
mobileBtnExit = document.getElementById('mobile-exit');
mobileBtn.addEventListener('click',() => {
    nav.classList.add('menu-btn');
});
mobileBtnExit.addEventListener('click',() => {
    nav.classList.remove('menu-btn');
});

const createCard = () => {
  const textField = document.getElementById("textField").value;
  const card = document.createElement("div");
  card.innerHTML = `<div class="card">
    <img class="avatar" src="./self.jpg" alt="Profile Picture" />
    <div class="post-text"></div></div>`;
  card.querySelector(".post-text").innerText = textField;
  return card;
};

const submit = () => {
  const element = document.getElementById("feedCards");
  const textField = document.getElementById("textField").value;
  textField.length > 0
    ? element.prepend(createCard())
    : alert("Please enter some text");
};

const clearFields = () => {
  document.getElementById("textField").value = "";
};
