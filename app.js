'use strict'

function StoredProduct(name,image) {
  this.nameImg = name;
  this.image = image;
  this.timesShown = 0;
  this.timesClicked = 0;

  StoredProduct.allImages.push(this);
}
StoredProduct.allImages = [];

//Globals//
var lastImg = [1,2,3];
var tempArray = [];

//Returns array with images//
function threeRndImg(){

  tempArray[0] = getRnd();
  var leftImg = StoredProduct.allImages[tempArray[0]]

  // console.log('1st # is', tempArray[0]);
 
  tempArray[1] = getRnd();
  var centerImg = StoredProduct.allImages[tempArray[1]]

  // console.log('2nd # is',tempArray[1] );

  tempArray[2]  = getRnd();
  var rightImg = StoredProduct.allImages[tempArray[2]]

  // console.log('tempArray',tempArray );
  // console.log('lastImg',lastImg );

  lastImg = tempArray;

  // console.log('lastImg',lastImg );

  return[leftImg, centerImg, rightImg];
}

//Get and Check random number viability//
function getRnd(){
  var rndNum = Math.floor(Math.random() * StoredProduct.allImages.length);

  // console.log('rndNum initially is',rndNum);
  while(lastImg.includes(rndNum)||tempArray.includes(rndNum)){
    rndNum = getRnd();
    //console.log(typeof imgOne);
    // console.log('got a new #', rndNum);
  }
  return(rndNum);
}

// Create Objects//
new StoredProduct('bag', 'assets/bag.jpg');
new StoredProduct('banana', 'assets/banana.jpg');
new StoredProduct('bathroom', 'assets/bathroom.jpg');
new StoredProduct('boots', 'assets/boots.jpg');
new StoredProduct('breakfast', 'assets/breakfast.jpg');
new StoredProduct('bubblegum', 'assets/bubblegum.jpg');
new StoredProduct('chair', 'assets/chair.jpg');
new StoredProduct('cthulhu', 'assets/cthulhu.jpg');
new StoredProduct('dog-duck', 'assets/dog-duck.jpg');
new StoredProduct('dragon', 'assets/dragon.jpg');
new StoredProduct('pen', 'assets/pen.jpg');
new StoredProduct('pet-sweep', 'assets/pet-sweep.jpg');
new StoredProduct('scissors', 'assets/scissors.jpg');
new StoredProduct('shark', 'assets/shark.jpg');
new StoredProduct('sweep', 'assets/sweep.png');
new StoredProduct('tauntaun', 'assets/tauntaun.jpg');
new StoredProduct('unicorn', 'assets/unicorn.jpg');
new StoredProduct('usb', 'assets/usb.gif');
new StoredProduct('water-can', 'assets/water-can.jpg');
new StoredProduct('wine-glass', 'assets/wine-glass.jpg');

// console.log(StoredProduct.allImages);

// console.log(threeRndImg());

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

//Globals//
var numberOfRounds = 25;
var numberOfClicks = 0;
var buttonElement = document.getElementById('button')
var imgResults = document.getElementById('img-results')


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

    listItem.textContent = StoredProduct.allImages[i].nameImg + ' had'+ StoredProduct.allImages[i].timesClicked+ 'votes, and was seen'+ StoredProduct.allImages[i].timesShown+ 'times.';

    elementTarget.appendChild(listItem);
    

    console.log(StoredProduct.allImages[i].nameImg, ' had ', StoredProduct.allImages[i].timesClicked, ' votes, and was seen ', StoredProduct.allImages[i].timesShown, ' times.');


  }

}

