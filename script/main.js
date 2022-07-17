//import data from '../json/places.json' assert {type: 'json'} 
let data;
fetch('json/places.json').then(res => res.json())
                .then(dataRaw => {
                  console.log("raaw " + dataRaw)
                data = dataRaw;
  changeData(0);
                });
console.log("data" + data, "data0" + data[0]);
setTimeout(() => {
  console.log("data" + data, "data0" + data[0]);
  ), 1000};

//#region variables

//assigning the elements we need to change every time the place change
const pageTitle = document.getElementsByTagName("title")[0];

const placeTitle = document.getElementsByClassName("place-title")[0];
const placeContent = document.getElementsByClassName("place-content")[0];
const placePrice = document.getElementsByClassName("place-price")[0];
const placePicture = document.getElementsByClassName("place-picture")[0];
const placeWebsite = document.getElementsByClassName("place-website")[0];

//making an array of the elements to ease the uses of classList.add/remove
const contentElements = [
  placeTitle,
  placeContent,
  placePrice,
  placePicture,
  placeWebsite,
];

//defining path for the pictures
const path = "./assets/pictures/";

//index of the current place the user is looking at
let placeIndex = 0;

//setting this variable to let delay between scroll changes
let canChange = true;

//#endregion

//#region change data

const changeData = (id) => {
  //changing the texts of the content and the page's title
  pageTitle.innerHTML = data[id].meta.title;
  placeTitle.innerHTML = data[id].components.h2;
  placeContent.innerHTML = data[id].components.p;
  placeWebsite.innerHTML = data[id].website.name;
  placeWebsite.href = data[id].website.link;

  //checking if the price is free to avoid putting the dollar signs
  if (data[id].price == "Free") {
    placePrice.innerHTML = data[id].price;
  } else {
    //removing any other content first
    while (placePrice.firstChild) {
      placePrice.firstChild.remove();
    }

    let maxDollars = 3;
    //appending the dollar signs
    for (let i = 0; i < maxDollars; i++) {
      let span = document.createElement("span");

      span.classList.add("dollar-sign");
      span.innerText = "$";

      placePrice.append(span);
    }

    //highlighting the dollar signs according to the price of the place
    for (let i = 0; i < data[id].price; i++) {
      document
        .getElementsByClassName("dollar-sign")
        [i].classList.add("highlight");
    }
  }

  placePicture.src = path + data[id].img.src;
  placePicture.alt = data[id].img.alt;
};

//#endregion

//#region bullet navigation

let bulletNavigation = document.getElementsByClassName("bullet-navigation");

//adding the listener so when the user click the circle it changes the place
for (let i = 0; i < bulletNavigation.length; i++) {
  bulletNavigation[i].addEventListener("click", function () {
    if (canChange) {
      canChange = false;

      //changing the style of the current circle
      document.getElementsByClassName("current")[0].classList.remove("current");
      this.classList.add("current");

      //adding an animate class to toggle the css animation
      placePicture.classList.add("animate");

      //animating all the text/content elements
      for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].classList.add("animate");
      }

      //reversing the animation when the user goes down the indexes (its cool for the details lol)
      if (placeIndex > this.getAttribute("index")) {
        placePicture.classList.add("reverse");
      }

      placeIndex = this.getAttribute("index");
      //stoping the animation and changing the place
      setTimeout(() => {
        changeData(placeIndex);
      }, 750);
      setTimeout(() => {
        placePicture.classList.remove("animate", "reverse");
        for (let i = 0; i < contentElements.length; i++) {
          contentElements[i].classList.remove("animate");
        }
        canChange = true;
      }, 1500);
    }
  });
}

//#endregion

//#region arrow navigation

let arrowNavigation = document.getElementsByClassName("arrow");

//adding the listener so when the user clicks it it changes according to the current index
for (let i = 0; i < arrowNavigation.length; i++) {
  arrowNavigation[i].addEventListener("click", function () {
    if (this.getAttribute("direction") == "up" && canChange) {
      canChange = false;

      placeIndex != 0 ? placeIndex-- : (placeIndex = 6);

      //changing the current bullet navigation
      document.getElementsByClassName("current")[0].classList.remove("current");
      document
        .querySelector(`[index="${placeIndex}"]`)
        .classList.add("current");

      //adding an animate class to toggle the css animation and
      //reversing the animation when the user goes down the indexes (its cool for the details lol)
      placePicture.classList.add("animate", "reverse");

      //animating all the text/content elements
      for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].classList.add("animate");
      }

      //stoping the animation and changing the place
      setTimeout(() => {
        changeData(placeIndex);
      }, 750);
      setTimeout(() => {
        placePicture.classList.remove("animate", "reverse");
        for (let i = 0; i < contentElements.length; i++) {
          contentElements[i].classList.remove("animate");
        }
        canChange = true;
      }, 1500);
    }

    if (this.getAttribute("direction") == "down" && canChange) {
      canChange = false;

      placeIndex != 6 ? placeIndex++ : (placeIndex = 0);

      //changing the current bullet navigation
      document.getElementsByClassName("current")[0].classList.remove("current");
      document
        .querySelector(`[index="${placeIndex}"]`)
        .classList.add("current");

      //adding an animate class to toggle the css animation
      placePicture.classList.add("animate");

      //animating all the text/content elements
      for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].classList.add("animate");
      }

      //stoping the animation and changing the place
      setTimeout(() => {
        changeData(placeIndex);
      }, 750);
      setTimeout(() => {
        placePicture.classList.remove("animate");
        for (let i = 0; i < contentElements.length; i++) {
          contentElements[i].classList.remove("animate");
        }
        canChange = true;
      }, 1500);
    }
  });
}

//#endregion

//#region  scroll navigation

window.addEventListener("wheel", (event) => {
  //detecting the direction of the scroll
  if (event.deltaY > 0 && canChange) {
    canChange = false;

    placeIndex != 6 ? placeIndex++ : (placeIndex = 0);

    //changing the current bullet navigation
    document.getElementsByClassName("current")[0].classList.remove("current");
    document.querySelector(`[index="${placeIndex}"]`).classList.add("current");

    //adding an animate class to toggle the css animation
    placePicture.classList.add("animate");

    //animating all the text/content elements
    for (let i = 0; i < contentElements.length; i++) {
      contentElements[i].classList.add("animate");
    }

    //stoping the animation and changing the place
    setTimeout(() => {
      changeData(placeIndex);
    }, 750);
    setTimeout(() => {
      canChange = true;
      placePicture.classList.remove("animate");
      for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].classList.remove("animate");
      }
    }, 1500);
  } else if (event.deltaY < 0 && canChange) {
    canChange = false;

    placeIndex != 0 ? placeIndex-- : (placeIndex = 6);

    //changing the current bullet navigation
    document.getElementsByClassName("current")[0].classList.remove("current");
    document.querySelector(`[index="${placeIndex}"]`).classList.add("current");

    //adding an animate class to toggle the css animation and
    //reversing the animation when the user goes down the indexes (its cool for the details lol)
    placePicture.classList.add("animate", "reverse");

    //animating all the text/content elements
    for (let i = 0; i < contentElements.length; i++) {
      contentElements[i].classList.add("animate");
    }

    //stoping the animation and changing the place
    setTimeout(() => {
      changeData(placeIndex);
    }, 750);
    setTimeout(() => {
      canChange = true;
      placePicture.classList.remove("animate", "reverse");
      for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].classList.remove("animate");
      }
    }, 1500);
  }
});

//#endregion
