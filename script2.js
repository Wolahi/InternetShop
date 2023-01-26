var names,imgs,cost,count,secondCost;
var test ;
let index = -1;
var headphonesBasket = [
    {
        img: String,
        title:  String,
        cost: Number,
        rate: Number
    }
];
var headphonesBasketWithCount = [
    {
        img: String,
        title:  String,
        cost: Number,
        rate: Number,
        count:Number
    }
]

headphonesBasketWithCount = [];
function appendDiv (index) {
    let div = document.createElement('div');
    div.className = "elBasket";
    div.innerHTML = `<div class="imgAdd"><div class="imgScr"></div><div class="plusMinus"><img src = "ImagesForTop/-.png" id="plus"  onclick="minus(${index})"><div class = "textPlusMinus" ></div><img src = "ImagesForTop/+.png" id="minus" onclick="plus(${index})"></div></div><div class = "nameCost"><div class="nameText">Apple</div><div class = "secondCost">2222</div></div><div class ="delCost"><div class = "deletPurchase" onclick = "deletPurchase(${index})"><img src="ImagesForTop/Vector(4).png"></div><div class="cost"></div></div>`;
    document.getElementsByClassName("basket")[0].appendChild(div);
    
}

function checkArr() {
        let i = 0;
        let keys = Object.keys(sessionStorage);
        for (let key of keys) {
            let headphonesBasketJsPars = sessionStorage.getItem(key);
            headphonesBasket[i] = JSON.parse(headphonesBasketJsPars);
            i++;
        }
        
        let count = 0;
        for(let i = 0; i<headphonesBasket.length;i++) {  
             let countHeadphone = headphonesBasket.filter( elem => elem.img == headphonesBasket[i].img).length;
             if(headphonesBasketWithCount.filter( elem  => elem.img == headphonesBasket[i].img).length == 0){
                headphonesBasketWithCount[count] = headphonesBasket[i];
                headphonesBasketWithCount[count].count = countHeadphone;
                count++;
             }   
        }
    
}

function writeList() {
    
    for(let i = 0;i < headphonesBasketWithCount.length; i++){
        appendDiv(i);
    }
    
    if(headphonesBasketWithCount.length > 2){
        document.getElementsByTagName("footer")[0].style.marginTop = `${24.22 * (headphonesBasketWithCount.length-2)}%`;
    }
    document.getElementsByClassName("basket")[0].style.gridTemplateRows = `repeat(${headphonesBasketWithCount.length},30%)`;

    names = document.getElementsByClassName("nameText");
    imgs = document.getElementsByClassName("imgScr");
    cost = document.getElementsByClassName("cost");
    count = document.getElementsByClassName("textPlusMinus");
    secondCost =document.getElementsByClassName("secondCost");
    for(let i = 0; i < headphonesBasketWithCount.length; i++){
        let costCount = headphonesBasketWithCount[i].cost *   headphonesBasketWithCount[i].count;
        names[i].innerHTML = "<nobr>" + headphonesBasketWithCount[i].title + "</nobr>";
        imgs[i].innerHTML = `<img src = '${headphonesBasketWithCount[i].img}'` + " >";
        cost[i].innerHTML = costCount + "₽";
        secondCost[i].innerHTML = headphonesBasketWithCount[i].cost + "₽";
        count[i].innerHTML = headphonesBasketWithCount[i].count;
        
    }
    
    
}

function countSum(index) {
    if(headphonesBasketWithCount.length > 0) {
        var sumText = document.getElementById("costSum");
        let costSum = 0;
        let sum = 0;
        for(let i = 0; i < headphonesBasketWithCount.length; i++){
            sum += headphonesBasketWithCount[i].cost * headphonesBasketWithCount[i].count;
            
        }
        if(index >= 0 ){
            costSum = headphonesBasketWithCount[index].cost * headphonesBasketWithCount[index].count
            cost[index].innerHTML = costSum + "₽"; 
        }
       

        sumText.innerHTML = sum + "₽";
    }
   
}
function deleteInStore(img){
    let headphone;
    let keys = Object.keys(sessionStorage);
    for (let key of keys) {
            let headphonesBasketJsPars = sessionStorage.getItem(key);
            headphone = JSON.parse(headphonesBasketJsPars);
            if(headphone.img == img){
                return key;
            }
        }
    

}
function deletPurchase(index) {
   
    for(let j = 0; j< headphonesBasketWithCount[index].count ; j++){
        let ok = true;
        let i = 0;
        while (ok && (i < headphonesBasket.length)){
            if(headphonesBasketWithCount[index].img == headphonesBasket[i].img) {
                console.log(headphonesBasket.length + "  " + i);
                sessionStorage.removeItem(deleteInStore(headphonesBasket[i].img));
                headphonesBasket.splice(i, 1);
                ok = false;
            }
            i++;
        }
    }
   
    location.reload();
}
function minus(index){
    let countElem = headphonesBasketWithCount[index].count;
    countElem -= 1;
    headphonesBasketWithCount[index].count = countElem;
    let ok = true;
    let i = 0;
    while (ok && (i < headphonesBasket.length)){
        if(headphonesBasketWithCount[index].img == headphonesBasket[i].img) {
            console.log(headphonesBasket.length + "  " + i);
            sessionStorage.removeItem(deleteInStore(headphonesBasket[i].img));
            headphonesBasket.splice(i, 1);
            ok = false;
        }
        i++;
    }
    count[index].innerHTML =  headphonesBasketWithCount[index].count;
    countSum(index);
    if(headphonesBasketWithCount[index].count == 0){
        location.reload();
    }
   
   
}

function plus(index) {
    let countElem = headphonesBasketWithCount[index].count;
    countElem += 1;
    headphonesBasketWithCount[index].count = countElem;
    let ok = true;
    let i = 0;
    while (ok && (i < headphonesBasket.length)){
        if(headphonesBasketWithCount[index].img == headphonesBasket[i].img) {
            console.log(headphonesBasket.length + "  " + i);
            sessionStorage.setItem(sessionStorage.length, JSON.stringify(headphonesBasket[i]));
            headphonesBasket.push(headphonesBasket[i]);
            ok = false;
        }
        i++;
    }
    count[index].innerHTML =  headphonesBasketWithCount[index].count;
    countSum(index);
}

window.onload = function() {
    checkArr();
    writeList();
    countSum();
    if(sessionStorage.length == 0) {
        document.getElementsByClassName("buyCont")[0].style.display = "flex";
        let item_basketzero = document.getElementsByClassName("buyCont")[0];
        let content_basketzero = `
            <div class="zeroCont">
                <span id = "textForBuyMenu">В корзине нет товаров<span>
                <a href="index.html"><div id = "button"><span id ="buttonText">Перейти на главную</span></div></a>
            </div>
            </div>
        `;
        item_basketzero.innerHTML = content_basketzero;
    }   

  
}

















