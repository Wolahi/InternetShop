var count = 0;
var length = 0;
var col = 0;
const headphones = [
    {
        img: "ImagesForTop/Image.png",
        title: "Apple BYZ S852I",
        cost: 4000,
        rate: 4.7,
    },
    {
        img: "ImagesForTop/Image2.png",
        title: "Apple EarPods",
        cost: 2327,
        rate: 4.5,
    },
    {
        img: "ImagesForTop/Image3.png",
        title: "Apple EarPods",
        cost: 2327,
        rate: 4.5,
    },
    {
        img: "ImagesForTop/Image.png",
        title: "Apple BYZ S852I",
        cost: 2927,
        rate: 4.7,
    },
    {
        img: "ImagesForTop/Image2.png",
        title: "Apple EarPods",
        cost: 2327,
        rate: 4.5,
    },
    {
        img: "ImagesForTop/Image3.png",
        title: "Apple EarPods",
        cost: 2327,
        rate: 4.5,
    },
    {
        img: "ImagesForTop/image4.png",
        title: "Apple AirPods",
        cost: 9527,
        rate: 4.7,
    },
    {
        img: "ImagesForTop/Image5.png",
        title: "GERLAX GH-04",
        cost: 6527,
        rate: 4.5,
    },
    {
        img: "ImagesForTop/Image6.png",
        title: "BOROFONE BO4",
        cost: 7527,
        rate: 4.5,
    }

] 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function readKey(){
    let ok = false;
    let keys = Object.keys(sessionStorage);
    let rand = 0;
    while(ok == false){
        rand = getRandomInt(1000);
        let notFound = true;
        for (let key of keys) {
            if(key == rand){
                notFound = false;
            }
            
        }
        if(notFound) {
            ok = true
        }
    }
    return rand;
}
function countPurchases(num){
   
    document.getElementById("ellipse").style.display = "inline-flex";
  
    let rand = readKey();
    sessionStorage.setItem(rand, JSON.stringify(headphones[num]));
    document.getElementById("countPurchases").innerHTML = sessionStorage.length;
}


function printHeadphones() {
    let rate = document.getElementsByClassName('rateNum'); 
    let cost = document.getElementsByClassName('cost');
    let titles = document.getElementsByClassName('nameText');
    let img = document.getElementsByClassName('imgScr');
   
    for(let i = 0;i < headphones.length; i++){
        rate[i].innerHTML = headphones[i].rate; 
        cost[i].innerHTML = headphones[i].cost + " " + "₽";
        titles[i].innerHTML = headphones[i].title;
        img[i].innerHTML=`<img src=' ${headphones[i].img}' >`;
      
    }

}
window.onload = function() {

    printHeadphones();
}




