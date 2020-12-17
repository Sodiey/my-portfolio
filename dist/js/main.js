// Select Dom Items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");
const body = document.querySelector("body");

//Set the initial state of the menu

let showMenu = false;

// if (!menuBtn == null) { // I dont remember why ?????
// }

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach((item) => {
      item.classList.add("show");
    });

    //Set Menu State
    showMenu = !showMenu;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach((item) => {
      item.classList.remove("show");
    });

    //Set Menu State
    showMenu = !showMenu;
  }
}

//    CHANGE THEME &
// Add functionality to the toggle button

const toggler = document.querySelector(".menu-toggler");

document.addEventListener("DOMContentLoaded", function () {
  toggler.addEventListener("click", handleThemeSelect);

  let themeState = false;

  function handleThemeSelect() {
    toggler.classList.toggle("on"); // gives the class "ON" to the button for animation
    if (themeState) {
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      body.classList.remove("dark");
      body.classList.add("light");
    }
    themeState = !themeState;
  }
});

// Cool Mouse Move Effect
const overlay = document.querySelector(".overlay");
body.onmousemove = (e) => {
  const x = e.pageX - e.target.offsetLeft;
  const y = e.pageY - e.target.offsetTop;
  overlay.style.setProperty("--x", `${x}px`);
  overlay.style.setProperty("--y", `${y}px`);
};

// TYPE EFFECT

//Display the current year in the footer
const date = new Date().getFullYear();
const copyWrite = document.getElementById("copyRight-date");
if (copyWrite !== null) {
  copyWrite.textContent = date;
}

//TYPE EFFECT WITH CONSTRUCTOR FUNCTION
const TypeWriter = function (txtElement, words, wait = 3000, speed) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.isDeleting = false;
  this.speed = speed;
  this.type();
};
//TYPE METHOD
TypeWriter.prototype.type = function () {
  //Current index of word
  const current = this.wordIndex % this.words.length
  const fullTxt = this.words[current]
  let typeSpeed;
  if(this.speed === "slow") {
    typeSpeed = 300;
  } else if(this.speed === "fast") {
    typeSpeed = 100;
  }

  //Check if deleting

  if(this.isDeleting) {
    typeSpeed /= 2;
    this.txt = fullTxt.substring(0,this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0,this.txt.length + 1);
    this.txtElement.classList.remove("type-effect-fix")

  }

  //Inserts txt into element
  this.txtElement.textContent = this.txt;

  // Type Speed
  if(this.txt === fullTxt) {
    this.isDeleting = true;
    typeSpeed = this.wait;
   
  } else if(this.txt == "") {
    this.txtElement.classList.add("type-effect-fix")
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed  = 550; 
  } 

  setTimeout(() => this.type(), typeSpeed);
};

//INIT ON DOM LOAD
document.addEventListener("DOMContentLoaded", init);

// INIT APP
function init() {
  const txtElement = document.querySelector(".type-effect");
  if (txtElement === null) { return;}
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  const speed = JSON.parse(txtElement.getAttribute("data-speed"));
  
  new TypeWriter(txtElement, words, wait, speed);
}


// project description pop up menu

const popUpMenuBtn = document.querySelectorAll(".btn-light");

const popUpMenu = (e) => {
  e.target.classList.toggle("menu-active");
  const paragraphElm  = e.target.children[2]
  let height = findElmHeight(paragraphElm)
  createAnimation(paragraphElm, height)
}

const createAnimation = (elm, height) => {
  elm.animate([
  { height: '0px' }, 
  { height: `${height}` }
  ],{
    duration: 500
  })
}

function findElmHeight(elm) {
  let compStyles = window.getComputedStyle(elm);
  return compStyles.getPropertyValue('height');
}

popUpMenuBtn.forEach((elem)=> {
  elem.addEventListener("click", popUpMenu);
});