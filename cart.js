let plus = document.querySelector(".plus")
let minus = document.querySelector(".minus")
let product = document.querySelector(".cardd")
fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
.then(pasuxi => pasuxi.json())
.then(data => {
    console.log(data);
    
    data.forEach(item => product.innerHTML += card(item))})




    
    
    




function card(item){
    let num = item.quantity
    function mimateba(item){
        num ++
    }
    function gamokleba(){
        if(num > 0){
            num--
        }
    }
    return  `<div class="card">
                <div class="cardleft">
                    <div class="x">
                        <i class="fa-solid fa-xmark"></i>
                        <i class="fa-solid fa-pencil"></i>
                    </div>
                    <img class="cardphoto" src="${item.product.image}" alt="">
                    <h1 class="cardh">${item.product.name}</h1>
                </div>
                <div class="cardright">
                    <div class="amount">
                        <button onclick="mimateba()" class="plus">+</button>
                        <h1>${num}</h1>
                        <button onclick="gamokleba()" class="minus">-</button>
                    </div>
                    <h1 class="pricecart">$${item.price}</h1>
                    <h1 class="totalprice">$10</h1>
                </div>
            </div>`
}