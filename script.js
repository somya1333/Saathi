const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const array = [
  {
    image: "./img/drink.jpg",
    text: "I am Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I am Hungry",
  },
  {
    image: "./img/play.jpg",
    text: "I want to play",
  },
  {
    image: "./img/mom.jpg",
    text: "I want Mom",
  },
  {
    image: "./img/happy.jpg",
    text: "I am happy",
  },
  {
    image: "./img/hurt.jpg",
    text: "I am hurt",
  },
  {
    image: "./img/sad.jpg",
    text: "I am sad",
  },
  {
    image: "./img/angry.jpg",
    text: "I am angry",
  },
  {
    image: "./img/dad.jpg",
    text: "I want dad",
  },
  {
    image: "./img/scared.jpg",
    text: "I am scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I want to go outside",
  },
  {
    image: "./img/home.jpg",
    text: "I want to go home",
  },
];

array.forEach(createBox);

//Create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info">${text}</p>
    `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    //Add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

//Init speech synthesis

const message = new SpeechSynthesisUtterance();

//store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

//Set text
function setTextMessage(text) {
  message.text = text;
}

//Speak text
function speakText() {
  speechSynthesis.speak(message);
}

//Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

//Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

//toggle to text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

//close the text box
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

//Change voice
voicesSelect.addEventListener("change", setVoice);

//Read text button
readBtn.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
