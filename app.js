'use strict'

//Globals//
var lastImg = [];
var tempArray = [];
var numberOfRounds = 25;
var numberOfClicks = 0;
var buttonElement = document.getElementById('button')
var imgResults = document.getElementById('img-results')


// Create Objects//
var products = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];



//Main Constructor//
function StoredProduct(name) {
  this.nameImg = name.substring(0, name.length - 4);
  this.timesShown = 0;
  this.timesClicked = 0;
  this.image = `assets/${name}`;

  StoredProduct.allImages.push(this);
  StoredProduct.imageMap[this.name] = this;
}
StoredProduct.allImages = [];
StoredProduct.imageMap = {};


for (var i = 0; i < products.length; i++){
  new StoredProduct(products[i]);

}

//Returns array with images//
function threeRndImg(){
  console.log('last set of pics',lastImg );

  tempArray[0] = getRnd();
  var leftImg = StoredProduct.allImages[tempArray[0]]

  // console.log('1st # is', tempArray[0]);
 
  tempArray[1] = getRnd();
  var centerImg = StoredProduct.allImages[tempArray[1]]

  // console.log('2nd # is',tempArray[1] );

  tempArray[2]  = getRnd();
  var rightImg = StoredProduct.allImages[tempArray[2]]

   console.log('pics selected',tempArray );
  //  console.log('last set of pics',lastImg );

  lastImg = tempArray;

  // console.log('lastImg',lastImg );

  return[leftImg, centerImg, rightImg];
}

//Get and Check random number viability//
function getRnd(){
  var rndNum = Math.floor(Math.random() * StoredProduct.allImages.length);

   //console.log('rndNum initially is',rndNum);
  while(lastImg.includes(rndNum)||tempArray.includes(rndNum)){
    console.log('duplicate #', rndNum);
    rndNum = getRnd();
    //console.log(typeof imgOne);
     console.log('needed a new #', rndNum);
  }
  return(rndNum);
}


 console.log(StoredProduct.allImages);


//DOM Elements//
var imgContainter = document.getElementById('img-container');


//Render//
function renderTrio(leftImg, centerImg, rightImg){
  var imgCalled1 = document.getElementById('img-called1');
  var imgCalled2 = document.getElementById('img-called2');
  var imgCalled3 = document.getElementById('img-called3');
  
  imgCalled1.src = leftImg.image;
  leftImg.timesShown++;

  imgCalled2.src = centerImg.image;
  centerImg.timesShown++;

  imgCalled3.src = rightImg.image;
  rightImg.timesShown++;

}

//Initialize//
var randomImgs = threeRndImg();
renderTrio(randomImgs[0],randomImgs[1],randomImgs[2]);




//Detect Click//
imgContainter.addEventListener('click', function (event) {
  //log click//
  //console.log(event.target); 

  for (var i = 0; i < StoredProduct.allImages.length; i++) {
    if (event.target.src.includes(StoredProduct.allImages[i].image)) {
      StoredProduct.allImages[i].timesClicked++;
      numberOfClicks++;
      //console.log(StoredProduct.allImages[i]);
    }
  }
  if (numberOfClicks < numberOfRounds){
    var newImgs = threeRndImg();
    renderTrio(newImgs[0], newImgs[1], newImgs[2]);
  }else{
    console.log('DUN!');
    imgContainter.style.display='none';
    //buttonElement.style.display= 'inline-block';
    printResults();
    return buttonElement;
  }
});

//Printer Func//

function printResults(){

  var elementTarget = document.getElementById("img-results");

  for (var i = 0; i < StoredProduct.allImages.length; i++){

    var listItem = document.createElement('li');

    listItem.textContent = StoredProduct.allImages[i].nameImg + ' had '+ StoredProduct.allImages[i].timesClicked+ 'votes, and was seen'+ StoredProduct.allImages[i].timesShown+ ' times.';

    elementTarget.appendChild(listItem);
    

    //console.log(StoredProduct.allImages[i].nameImg, ' had ', StoredProduct.allImages[i].timesClicked, ' votes, and was seen ', StoredProduct.allImages[i].timesShown, ' times.');


  }

}

