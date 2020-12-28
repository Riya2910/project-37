var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var bedroom,bedroom1
var garden,garden1
var washroom,washroom1


function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
bedroom1=loadImage("Images/bedroom.jpg")}
garden1=loadImage("Images/garden.jpg")
washroom1=loadImage("Images/washroom.jpg")

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  readState=database.ref('gameState');
  readState.on("value",function(data){
gameState=data.val();
  })

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 bedroom()
 {
 
background(bedroom,550,500)
 }

 garden()
 {
   background(garden550,500)
 }
 washroom()
 {
   background(washroom,550,500)
 }

 currentTime=hour();
 if(currentTime==(lastfed=1)){
   update("Playing")
   foodObj.garden()
 }else if(currentTime===(lastFed+2)){
   update("Sleeping");
   foodObj.bedroom;
 }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
   update("Bathing");
   foodObj.washroom();
 }else{
   update("Hungry")
   foodObj.display();
 }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function update(stste){
  database.ref('/').update({
    gameSate:state
  })
}