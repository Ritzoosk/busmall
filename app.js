'use strict'

//Globals//
var lastImg = [];
var tempArray = [];
var numberOfRounds = 5;
var numberOfClicks = 0;
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

  //console.log('1st # is', tempArray[0]);
 
  tempArray[1] = getRnd();
  var centerImg = StoredProduct.allImages[tempArray[1]]

  //console.log('2nd # is',tempArray[1] );

  tempArray[2]  = getRnd();
  var rightImg = StoredProduct.allImages[tempArray[2]]

  console.log('pics selected',tempArray );
  //console.log('last set of pics',lastImg );

  lastImg = tempArray;

  //console.log('lastImg',lastImg );

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
 //console.log(StoredProduct.allImages);


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


var buttonElement = document.getElementById('submitButton')


//Detect Click//
imgContainter.addEventListener('click', function (event) {
  console.log(event.target); 

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

    buttonElement.style.display= 'inline-block';
    //printResults();
    //buttonElement is Global//
    return buttonElement;
  }
});

//Printer Func//
//Not Used//
function printResults(){

  var elementTarget = document.getElementById("img-results");

  for (var i = 0; i < StoredProduct.allImages.length; i++){

    var listItem = document.createElement('li');

    listItem.textContent = StoredProduct.allImages[i].nameImg + ' had '+ StoredProduct.allImages[i].timesClicked+ 'votes, and was seen'+ StoredProduct.allImages[i].timesShown+ ' times.';
    elementTarget.appendChild(listItem);  
  }
}

var lastShows = new Array(20).fill(0);
var lastVotes = new Array(20).fill(0);
console.log('initialized arry' , lastShows);
//Submit Results Listener??
buttonElement.addEventListener('click', function (event) {
  event.preventDefault();
 
  var ctx = document.getElementById('myChart').getContext('2d');
  var votesByProduct = [];
  var timesShownChart = [];
  var cleanNames = [];

   var lastVotes = localStorage.getItem('votes')||'[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]';
  lastVotes = JSON.parse(lastVotes);
  console.log('lastVotes', lastVotes);

  var lastShows = localStorage.getItem('shown')||'[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]';
  lastShows = JSON.parse(lastShows);
  console.log('lastShows', lastShows);


  for(var  i=0; i < StoredProduct.allImages.length; i++){

    votesByProduct.push((StoredProduct.allImages[i].timesClicked) + lastVotes[i]);
    timesShownChart.push((StoredProduct.allImages[i].timesShown) + lastShows[i]);
    cleanNames.push(StoredProduct.allImages[i].nameImg);
  }
  console.log('votes', votesByProduct);
  console.log('shown', timesShownChart);


  var votesByString = JSON.stringify(votesByProduct);
  localStorage.setItem('votes', votesByString);
  var shownString = JSON.stringify(timesShownChart);
  localStorage.setItem('shown', shownString);

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cleanNames,
      datasets: [{
        label: '|Times Selected|',

        data: votesByProduct,
        
        backgroundColor: [
          'rgba(255, 99, 132, 5)',
          'rgba(54, 162, 235,5)',
          'rgba(255, 206, 86, 5)',
          'rgba(75, 192, 192, 5)',
          'rgba(153, 102, 255, 5)',
          'rgba(255, 159, 64, 5)',
          'rgba(255, 99, 132, 5)',
          'rgba(54, 162, 235, 5)',
          'rgba(255, 206, 86, 5)',
          'rgba(75, 192, 192, 5)',
          'rgba(153, 102, 255, 5)',
          'rgba(255, 159, 64, 5)',
          'rgba(255, 99, 132, 5)',
          'rgba(54, 162, 235, 5)',
          'rgba(255, 206, 86, 5)',
          'rgba(75, 192, 192, 5)',
          'rgba(153, 102, 255, 5)',
          'rgba(255, 159, 64, 5)', 
          'rgba(255, 99, 132, 5)', 
          'rgba(54, 162, 235,5)'

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)', 
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)', 
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)', 
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      },{
        label: '|Times Seen|',

        data: timesShownChart,
        
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)', 
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)', 
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)', 
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      } ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
      }]
    }
    }
  });
  
});



