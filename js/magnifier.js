let magRegion = document.getElementById("magRegion");
let magnifier = document.getElementById("magnifier");

//Create element for unmagnified background and attach to magnifier - optional
let unmagBg = document.createElement("div");
unmagBg.id = "unmagBg";
magnifier.appendChild(unmagBg); 

//Create copy of magnified region and attach to magnifier
let magCopy = magRegion.cloneNode(true);
magCopy.id = "magCopy";
magnifier.appendChild(magCopy);

//Initialize magnification of magnified copy at 1x
let magnification = 1;

//Global centroidal position of magnified region
let magRegionCX = magRegion.offsetLeft + magRegion.offsetWidth / 2;
let magRegionCY = magRegion.offsetTop + magRegion.offsetHeight / 2;

let magnifierCX, magnifierCY;     //Global centroidal position of magnifier
let magnifierLeft, magnifierTop;  //Global offsets for magnifier
let copyLeft, copyTop;            //Local offsets for magnified copy within magnifier
let unmagBgLeft, unmagBgTop;      //Local offsets for unmagnified background within magnifier - optional
let magDeltaX = 0, magDeltaY = 0; //Distance moved by magnifier from centroidal position of magnified region

//Initialize magnifier position at centroid of magnifiable region
positionMagnifier({pageX: magRegionCX, pageY: magRegionCY});

//Set up mouse scroll wheel event handler - parameters can be customized
let wheelMagStep = 0.25;          //Magnification increment for mouse wheel scroll
let wheelMagLLimit = 1;           //Lower magnification limit
let wheelMagULimit = 4;           //Upper magnification limit
magnifier.addEventListener("wheel", magnify);

/*Function calculates and sets position of magnifier, unmagnified non-solid background, and magnified copy
based on mouse location relative to document*/
function positionMagnifier(event) {
  //Set centroidal position of magnifier as mouse location, limited to magnified region
  magnifierCX = event.pageX;
  magnifierCY = event.pageY;

  if (magnifierCX < magRegion.offsetLeft)
    magnifierCX = magRegion.offsetLeft;
  if (magnifierCX > magRegion.offsetLeft + magRegion.offsetWidth)
    magnifierCX = magRegion.offsetLeft + magRegion.offsetWidth; 
  if (magnifierCY < magRegion.offsetTop)
    magnifierCY = magRegion.offsetTop;
  if (magnifierCY > magRegion.offsetTop + magRegion.offsetHeight)
    magnifierCY = magRegion.offsetTop + magRegion.offsetHeight;

  //Calculate global magnifier offsets
  magnifierLeft = magnifierCX - magnifier.offsetWidth / 2;
  magnifierTop = magnifierCY - magnifier.offsetHeight / 2;

  //Calculate movement of magnifier
  magDeltaX = magnifierCX - magRegionCX;
  magDeltaY = magnifierCY - magRegionCY;

  /*Calculate local offsets for magnification copy within magnifier in order to:
    - first, align magnifier and copy centroids
    - second, adjust copy location to account for movement of magnifier*/
  copyLeft = magnifier.offsetWidth / 2 - magCopy.offsetWidth / 2 - magnification * magDeltaX;
  copyTop = magnifier.offsetHeight / 2 - magCopy.offsetHeight / 2 - magnification * magDeltaY;

  /*Calculate local offsets for unmagnified background within magnifier - optional
   - same as above only with 1x magnification*/
  unmagBgLeft = magnifier.offsetWidth / 2 - magCopy.offsetWidth / 2 - magDeltaX;
  unmagBgTop = magnifier.offsetHeight / 2 - magCopy.offsetHeight / 2 - magDeltaY;
  
  //Set offsets
  magnifier.style.left = `${magnifierLeft}px`;
  magnifier.style.top = `${magnifierTop}px`;
  magCopy.style.left = `${copyLeft}px`;
  magCopy.style.top = `${copyTop}px`;
  unmagBg.style.left = `${unmagBgLeft}px`;     //optional
  unmagBg.style.top = `${unmagBgTop}px`;       //optional
}

//Function adjusts magnification level and magnified copy position based on mouse scroll wheel movement
function magnify(event) {        
  if (event.deltaY < 0) //Wheel scrolled away from user
    magnification = (magnification + wheelMagStep > wheelMagULimit) ? wheelMagULimit : magnification + wheelMagStep;
  else                  //Wheel scrolled toward user
    magnification = (magnification - wheelMagStep < wheelMagLLimit) ? wheelMagLLimit : magnification - wheelMagStep;
  
  magCopy.style.setProperty("transform", `scale(${magnification})`);
  
  copyLeft = magnifier.offsetWidth / 2 - magCopy.offsetWidth / 2 - magnification * magDeltaX;
  copyTop = magnifier.offsetHeight / 2 - magCopy.offsetHeight / 2 - magnification * magDeltaY;
  magCopy.style.left = `${copyLeft}px`;
  magCopy.style.top = `${copyTop}px`;
}

//Function hides page scroll bars
function hideScrollBars() {
  document.body.style.overflow = "hidden";
}

//Function displays page scroll bars
function showScrollBars() {
  document.body.style.overflow = "visible";
}