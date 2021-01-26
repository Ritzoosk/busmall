'use strict'


function StoredProduct(image) {
  this.nameImg = nameImg;
  this.pathImg = image;
  this.timesShown = 0;
  this.timesClicked = 0;

  StoredProduct.allImages.push(this);

}

StoredProduct.allImages = [];

function threeRndImg(){

  var imgOne = Math.floor(Math.random() * StoredProduct.allImages.length);
  console.log('1st',imgOne);

  var imgTwo = Math.floor(Math.random() * StoredProduct.allImages.length);
  console.log('2nd',imgTwo);

  var imgThree = Math.floor(Math.random() * StoredProduct.allImages.length);
  console.log('3rd',imgThree);


}

// Create Img Objects//
new StoredProduct('path');
new StoredProduct('path');
new StoredProduct('path');


//DOM Elements

//Was Clicked//
productContainer.addEventListener('click', function(event)){
  console.log(event.target);

  for(var i = 0; i < StoredProduct.allImages.length; i++)
  {
    if (event.target.src.includes(StoredProduct.allImages[i]))
    {
      StoredProduct.allImages[i].timesClicked++;
    }

  }


}